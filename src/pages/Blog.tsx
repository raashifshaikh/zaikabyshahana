import BlogPostCard from "@/components/BlogPostCard";
import { blogPosts } from "@/data/blogPosts";
import SEO from "@/components/SEO";

const Blog = () => {
  return (
    <>
      <SEO 
        title="From Our Kitchen Journal"
        description="Stories, tips, and inspiration for the home cook. Read our latest blog posts on everything from spice blending to meal prep."
      />
      <div className="bg-amber-50">
        <div className="container mx-auto py-16 md:py-24 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-red-900">From Our Kitchen Journal</h1>
            <p className="text-stone-600 mt-2">Stories, tips, and inspiration for the home cook.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;