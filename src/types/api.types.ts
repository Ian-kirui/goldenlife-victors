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

// ─── Event ────────────────────────────────────────────────────────────────────
export interface Event {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  status: "DRAFT" | "PUBLISHED" | string;
  meetLink?: string | null;
  location?: string | null;
  dateCreated?: string;
  author?: {
    id: string;
    name: string;
  };
}

export type EventsResponse = Event[];

// ─── Comment ──────────────────────────────────────────────────────────────────
export interface Comment {
  id: string;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  dateCreated?: string;
  author?: {
    id: string;
    name: string;
  };
  post?: {
    id: string;
    title: string;
  };
}

export type CommentsResponse = Comment[];