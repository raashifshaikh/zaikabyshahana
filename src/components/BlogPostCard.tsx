import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blogPosts";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <Link to={`/blog/${post.id}`}>
      <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <CardHeader className="p-0">
          <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-sm text-stone-500 mb-2">
            <span>By {post.author}</span>
            <span>{post.date}</span>
          </div>
          <h3 className="text-xl font-bold text-red-900 mb-2">{post.title}</h3>
          <p className="text-stone-600 mb-4">{post.excerpt}</p>
          <div className="font-semibold text-red-800 flex items-center group-hover:underline">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogPostCard;