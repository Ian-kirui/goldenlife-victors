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

// ─── Comment (matches CommentDto from OpenAPI) ────────────────────────────────
export interface Comment {
  id: string;
  postId?: string;
  content: string;
  authorName: string;   // flat field, not nested author object
  authorEmail?: string;
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
  author?: {
    id: string;
    name: string;
  };
  category?: Category;
  tags?: Tag[];
  comments?: Comment[];  // only present on PostDto_PostDetail (single post view)
}

// ─── Event (matches EventResponse from OpenAPI) ───────────────────────────────
export interface Event {
  id: string;
  title: string;
  content: string;
  status: "DRAFT" | "PUBLISHED" | string;
  imageUrl?: string | null;
  authorId?: string;
  meetLink?: string | null;
  location?: string | null;
  dateCreated?: string;
}

// ─── API list wrappers ────────────────────────────────────────────────────────
export type PostsResponse      = Post[];
export type TagsResponse       = Tag[];
export type CategoriesResponse = Category[];
export type EventsResponse     = Event[];
export type CommentsResponse   = Comment[];