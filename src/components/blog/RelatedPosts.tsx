import { BlogPost } from "../../types/blog";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  currentPost: BlogPost;
  posts: BlogPost[];
}

export const RelatedPosts = ({ currentPost, posts }: RelatedPostsProps) => {
  // Filtrar posts por categorías similares y excluir el post actual
  const relatedPosts = posts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        post.categories.some((cat) => currentPost.categories.includes(cat)),
    )
    .slice(0, 3); // Limitar a 3 posts relacionados

  if (relatedPosts.length === 0) return null;

  return (
    <section
      className="py-10 border-t border-gray-200 mt-12"
      data-oid="sp_yb0p"
    >
      <h2 className="text-2xl font-bold mb-8 text-left" data-oid="voybac3">
        Artículos relacionados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-oid="5xi7ds5">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} data-oid="92-5jma" />
        ))}
      </div>
    </section>
  );
};
