export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
}

export interface StatItem {
  id?: string;
  value: string;
  label: string;
  sort_order: number;
}

export interface PartnerItem {
  id: string;
  name: string;
  url: string;
  logo_light: string;
  logo_dark: string;
  sort_order: number;
}
