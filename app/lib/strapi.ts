import { BlogPost, StrapiResponse } from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://3.93.220.178:1337';

export function getStrapiURL(path: string = ''): string {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

async function fetchAPI<T>(path: string): Promise<T> {
  const res = await fetch(getStrapiURL(`/api${path}`), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }

  return res.json();
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetchAPI<StrapiResponse<BlogPost[]>>(
    '/blog-posts?populate=*&sort=publishedAt:desc'
  );
  return response.data;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Try by slug first
  const bySlug = await fetchAPI<StrapiResponse<BlogPost[]>>(
    `/blog-posts?filters[slug][$eq]=${slug}&populate=*`
  );
  if (bySlug.data[0]) return bySlug.data[0];

  // Fallback: try by documentId
  const byDocId = await fetchAPI<StrapiResponse<BlogPost[]>>(
    `/blog-posts?filters[documentId][$eq]=${slug}&populate=*`
  );
  return byDocId.data[0] || null;
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const response = await fetchAPI<StrapiResponse<BlogPost[]>>(
    '/blog-posts?filters[isFeatured][$eq]=true&populate=*&sort=publishedAt:desc'
  );
  return response.data;
}
