// ─── Tag ─────────────────────────────────────────────────────────────────────
export interface Tag {
  id: string;
  name: string;
  postCount?: number;
}

// ─── Category ─────────────────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  postCount: number;
}

// ─── Post — matches actual API response shape ──────────────────────────────
export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;       // API returns imageUrl (not coverImage)
  postStatus: "DRAFT" | "PUBLISHED" | string; // API returns postStatus
  dateCreated?: string;           // API returns dateCreated
  createdAt?: string;             // fallback if backend changes
  readingTime?: number;
  author?: {
    id: string;
    name: string;                 // API returns name (not username)
  };
  category?: Category;
  tags?: Tag[];
}

// ─── API list wrappers ────────────────────────────────────────────────────────
export type PostsResponse       = Post[];
export type TagsResponse        = Tag[];
export type CategoriesResponse  = Category[];