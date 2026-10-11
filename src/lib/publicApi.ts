import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config';
import type { NewsItem, PartnerItem, StatItem } from '../types/content';

/**
 * Read-only public queries over the plain PostgREST HTTP API.
 * Keeps the heavy supabase-js SDK out of the landing bundle (it is only loaded in /admin).
 */
async function select<T>(table: string, query: string): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: { apikey: SUPABASE_ANON_KEY!, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
  });
  if (!res.ok) throw new Error(`Failed to load ${table}`);
  return res.json() as Promise<T>;
}

export const fetchNews = (limit?: number) =>
  select<NewsItem[]>('news', `select=*&order=created_at.desc${limit ? `&limit=${limit}` : ''}`);

export const fetchStats = () => select<StatItem[]>('stats', 'select=*&order=sort_order.asc');

export const fetchPartners = () => select<PartnerItem[]>('partners', 'select=*&order=sort_order.asc');
