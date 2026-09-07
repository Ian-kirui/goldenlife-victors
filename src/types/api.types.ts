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

// ─── Comment ──────────────────────────────────────────────────────────────────
export interface Comment {
  id: string;
  postId?: string;
  content: string;
  authorName: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  dateCreated?: string;
}

// ─── Post ─────────────────────────────────────────────────────────────────────
export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  postStatus: "DRAFT" | "PUBLISHED" | string;
  dateCreated?: string;
  readingTime?: number;
  author?: { id: string; name: string };
  category?: Category;
  tags?: Tag[];
  comments?: Comment[];
}

// ─── Event Image (new) ────────────────────────────────────────────────────────
export interface EventImageResponse {
  id: string;
  url: string;
  originalFilename: string;
}

// ─── Event ────────────────────────────────────────────────────────────────────
export interface Event {
  id: string;
  title: string;
  content: string;
  status: "DRAFT" | "PUBLISHED" | string;
  imageUrl?: string | null;        // banner/cover image
  authorId?: string;
  meetLink?: string | null;
  location?: string | null;
  registrationLink?: string | null;
  dateCreated?: string;
  images?: EventImageResponse[];   // post-event gallery images
}

// ─── API list wrappers ────────────────────────────────────────────────────────
export type PostsResponse      = Post[];
export type TagsResponse       = Tag[];
export type CategoriesResponse = Category[];
export type EventsResponse     = Event[];
export type CommentsResponse   = Comment[];

// ─── Contact Form ─────────────────────────────────────────────────────────────
export interface ContactFormRequest {
  name: string;
  email: string;
  subject?: string;
  message?: string;
}