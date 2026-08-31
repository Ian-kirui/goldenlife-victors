// src/components/Home/NewsLetter/NewsletterWrapper.tsx
// Server Component — fetches posts and passes to client Newsletter
import { getAllPublicPosts } from "@/utils/blogApi";
import Newsletter from "./index";

export default async function NewsletterWrapper() {
  const posts = await getAllPublicPosts();
  return <Newsletter posts={posts.slice(0, 3)} />;
}