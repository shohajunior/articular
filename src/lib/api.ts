import { supabase } from './supabase';
import type { NewsItem, PartnerItem, StatItem } from '../types/content';

const BUCKET = 'media';

function client() {
  if (!supabase) throw new Error('Supabase is not configured (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).');
  return supabase;
}

/* ---------------- Images ---------------- */

async function compressImage(file: File, maxSide = 1600): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Image compression failed'))), 'image/jpeg', 0.85)
  );
}

/** Uploads an image and returns its public URL. News photos are compressed; logos keep transparency. */
export async function uploadImage(file: File, folder: 'news' | 'partners'): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.');
  if (file.size > 8 * 1024 * 1024) throw new Error('Image is too large (max 8 MB).');

  const sb = client();
  const isNews = folder === 'news' && file.type !== 'image/svg+xml' && file.type !== 'image/gif';
  const body: Blob = isNews ? await compressImage(file) : file;
  const ext = isNews ? 'jpg' : (file.name.split('.').pop() || 'png').toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await sb.storage.from(BUCKET).upload(path, body, {
    contentType: isNews ? 'image/jpeg' : file.type,
    cacheControl: '31536000',
  });
  if (error) throw error;
  return sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Best-effort delete of a file previously uploaded to our bucket. */
export async function deleteImage(url: string | null | undefined) {
  if (!supabase || !url) return;
  const marker = `/object/public/${BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return;
  await supabase.storage.from(BUCKET).remove([decodeURIComponent(url.slice(i + marker.length))]);
}

/* ---------------- News ---------------- */

export async function getNews(limit?: number): Promise<NewsItem[]> {
  let q = client().from('news').select('*').order('created_at', { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error) throw error;
  return data as NewsItem[];
}

export async function saveNews(item: Partial<NewsItem> & { title: string; description: string }) {
  const sb = client();
  const payload = { title: item.title, description: item.description, image_url: item.image_url ?? null };
  const { error } = item.id
    ? await sb.from('news').update(payload).eq('id', item.id)
    : await sb.from('news').insert(payload);
  if (error) throw error;
}

export async function deleteNews(item: NewsItem) {
  const { error } = await client().from('news').delete().eq('id', item.id);
  if (error) throw error;
  await deleteImage(item.image_url);
}

/* ---------------- Stats ---------------- */

export async function getStats(): Promise<StatItem[]> {
  const { data, error } = await client().from('stats').select('*').order('sort_order');
  if (error) throw error;
  return data as StatItem[];
}

export async function saveStats(items: StatItem[]) {
  const sb = client();
  for (const [i, s] of items.entries()) {
    const payload = { value: s.value.trim(), label: s.label.trim(), sort_order: i };
    const { error } = s.id
      ? await sb.from('stats').update(payload).eq('id', s.id)
      : await sb.from('stats').insert(payload);
    if (error) throw error;
  }
}

/* ---------------- Partners ---------------- */

export async function getPartners(): Promise<PartnerItem[]> {
  const { data, error } = await client().from('partners').select('*').order('sort_order');
  if (error) throw error;
  return data as PartnerItem[];
}

export async function savePartner(p: Omit<PartnerItem, 'id' | 'sort_order'> & { id?: string; sort_order?: number }) {
  const sb = client();
  const payload = { name: p.name, url: p.url, logo_light: p.logo_light, logo_dark: p.logo_dark };
  if (p.id) {
    const { error } = await sb.from('partners').update(payload).eq('id', p.id);
    if (error) throw error;
  } else {
    const { error } = await sb.from('partners').insert({ ...payload, sort_order: p.sort_order ?? 999 });
    if (error) throw error;
  }
}

export async function deletePartner(p: PartnerItem) {
  const { error } = await client().from('partners').delete().eq('id', p.id);
  if (error) throw error;
  await deleteImage(p.logo_light);
  if (p.logo_dark !== p.logo_light) await deleteImage(p.logo_dark);
}

export async function reorderPartners(ordered: PartnerItem[]) {
  const sb = client();
  for (const [i, p] of ordered.entries()) {
    const { error } = await sb.from('partners').update({ sort_order: i }).eq('id', p.id);
    if (error) throw error;
  }
}
