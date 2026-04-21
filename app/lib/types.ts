export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    thumbnail?: { url: string; width: number; height: number };
  };
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string | null;
  bio: RichTextBlock[] | null;
  role: string | null;
  socialFacebook: string | null;
  socialX: string | null;
  socialLinkedin: string | null;
  avatar?: StrapiImage | null;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
}

export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string | null;
}

export interface RichTextChild {
  text: string;
  type: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  children?: RichTextChild[];
}

export interface RichTextBlock {
  type: string;
  children: RichTextChild[];
  level?: number;
  format?: string;
  image?: StrapiImage;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  body: RichTextBlock[];
  slug: string | null;
  excerpt: string | null;
  readTime: string | null;
  isFeatured: boolean;
  featuredImage: StrapiImage | null;
  author: Author | null;
  category: Category | null;
  tags: Tag[];
  seo: SEO | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
