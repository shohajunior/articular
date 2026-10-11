import { useEffect, useState } from 'react';
import { isSupabaseConfigured } from './config';
import { fetchNews, fetchPartners, fetchStats } from './publicApi';
import { siteData } from '../data/site';
import type { NewsItem, PartnerItem, StatItem } from '../types/content';

/** Built-in fallbacks so the site never breaks if the backend is unavailable. */
export const FALLBACK_STATS: StatItem[] = siteData.stats.map((s, i) => ({
  value: s.value,
  label: s.label,
  sort_order: i,
}));

export const FALLBACK_PARTNERS: PartnerItem[] = [
  {
    id: 'uzcosmos',
    name: 'Uzcosmos Agency',
    url: 'https://uzspace.uz',
    logo_light: './assets/uzcosmos-dark.svg',
    logo_dark: './assets/uzcosmos-white.svg',
    sort_order: 0,
  },
  {
    id: 'yvc',
    name: 'Youth Volunteering Club',
    url: 'https://t.me/yvc_uz',
    logo_light: './assets/yvc-png.png',
    logo_dark: './assets/yvc-white.png',
    sort_order: 1,
  },
];

export const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'ArticularUZ 2026 Space Tournament Registration Open',
    description:
      'Registration for young aerospace and physics talents across Uzbekistan has officially commenced. Form your teams of 3 to 5 participants and submit your credentials via @articularuzbot.',
    image_url: './assets/workshop.jpg',
    created_at: '2026-10-01T10:00:00.000Z',
  },
  {
    id: 'news-2',
    title: 'Uzcosmos Agency Confirmed as Scientific Patron & Jury Mentors',
    description:
      'Uzbekistan Space Agency (Uzcosmos) joins ArticularUZ as official partner. Top finalists will defend their orbital mechanics solutions before leading agency engineers.',
    image_url: './assets/uzcosmos-banner.jpg',
    created_at: '2026-10-05T12:00:00.000Z',
  },
  {
    id: 'news-3',
    title: 'Orbital Math & 100% English Defense Workshops Announced',
    description:
      'Masterclasses and preparation sessions in trajectory modeling, scientific hypothesis defense, and academic English presentation will be conducted across all 14 regional chapters.',
    image_url: './assets/mentoring.jpg',
    created_at: '2026-10-08T15:30:00.000Z',
  },
];

function useRemote<T>(fetcher: () => Promise<T>, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let alive = true;
    fetcher()
      .then((d) => {
        // An empty table must not blank the page: keep fallback for stats/partners/news.
        if (alive && Array.isArray(d)) {
          if (d.length > 0) setData(d as unknown as T);
        } else if (alive && d) {
          setData(d);
        }
      })
      .catch(() => undefined)
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
}

export const useStats = () => useRemote(fetchStats, FALLBACK_STATS);
export const usePartners = () => useRemote(fetchPartners, FALLBACK_PARTNERS);
export const useNews = (limit?: number) => useRemote<NewsItem[]>(() => fetchNews(limit), FALLBACK_NEWS);
