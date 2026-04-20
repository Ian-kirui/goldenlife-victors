// ─── Tag ────────────────────────────────────────────────────────────────────
export interface Tag {
  id: string;
  name: string;
}

// ─── Category ────────────────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  postCount: number;
}

// ─── Post (public list item) ─────────────────────────────────────────────────
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;    // may be a URL returned by the API, or null
  imageUrl?: string;      // some backends use this key instead
  status: "DRAFT" | "PUBLISHED" | string;
  createdAt: string;      // ISO date string
  updatedAt?: string;
  category?: Category;
  tags?: Tag[];
  author?: {
    id: string;
    username: string;
    email?: string;
  };
}

// ─── API list wrappers (adjust if your backend paginates) ────────────────────
export type PostsResponse  = Post[];
export type TagsResponse   = Tag[];
export type CategoriesResponse = Category[];