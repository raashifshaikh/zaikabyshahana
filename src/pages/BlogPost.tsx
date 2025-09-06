import { useParams } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import NotFound from "./NotFound";
import { Calendar, User } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-red-900 mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-stone-500 mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          </div>
          <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />
          <div className="prose prose-lg max-w-none text-stone-700">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;