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

function useRemote<T>(fetcher: () => Promise<T>, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let alive = true;
    fetcher()
      .then((d) => {
        // An empty table must not blank the page: keep fallback for stats/partners.
        if (alive && (!Array.isArray(d) || d.length > 0 || (fallback as unknown[]).length === 0)) setData(d);
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
export const useNews = (limit?: number) => useRemote<NewsItem[]>(() => fetchNews(limit), []);
