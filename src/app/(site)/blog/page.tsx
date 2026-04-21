import React from "react";
import BlogList from "@/components/Blog/BlogList";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { Metadata } from "next";
import { getAllPublicPosts, getAllCategories, getAllTags } from "@/utils/blogApi";

export const metadata: Metadata = {
  title: "Blog | GoldenLife Victors",
};

// Force dynamic rendering — prevents Vercel from trying to statically
// generate this page at build time (which times out hitting the Render backend)
export const dynamic = "force-dynamic";

const BlogPage = async () => {
  const [posts, categories, tags] = await Promise.all([
    getAllPublicPosts(),
    getAllCategories(),
    getAllTags(),
  ]);

  return (
    <>
      <HeroSub title="Blog" />
      <BlogList posts={posts} categories={categories} tags={tags} />
      <Volunteer />
    </>
  );
};

export default BlogPage;