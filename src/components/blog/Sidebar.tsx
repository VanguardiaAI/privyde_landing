import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Tag as TagIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TagList } from "./TagList";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [allCategories, allTags, allPosts] = await Promise.all([
          blogService.getAllCategories(),
          blogService.getAllTags(),
          blogService.getAllPosts(),
        ]);

        setCategories(allCategories);
        setTags(allTags);
        // Ordenar por fecha de publicación y tomar los 3 más recientes
        const sortedPosts = [...allPosts]
          .sort(
            (a, b) =>
              new Date(b.publishDate).getTime() -
              new Date(a.publishDate).getTime(),
          )
          .slice(0, 3);
        setRecentPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6" data-oid="fp097wu">
        <div className="h-12 bg-gray-200 rounded-md" data-oid="af6cvd7"></div>
        <div className="h-60 bg-gray-200 rounded-md" data-oid="hi0z2px"></div>
        <div className="h-60 bg-gray-200 rounded-md" data-oid="latee6f"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4" data-oid="ty3xexy">
      {/* Categorías populares */}
      <Card className="overflow-hidden shadow-sm" data-oid="cjo464u">
        <CardHeader
          className="pb-3 bg-gray-50 border-b pt-5"
          data-oid="2964_-d"
        >
          <CardTitle className="text-lg" data-oid="weaf3hg">
            Categorías
          </CardTitle>
        </CardHeader>
        <CardContent className="py-5" data-oid="hw9tyj:">
          <ul className="space-y-2" data-oid="-ibdql_">
            {categories.map((category, idx) => (
              <li key={idx} data-oid="w.kg._c">
                <Link
                  to={`/blog/categoria/${category.toLowerCase()}`}
                  className="flex items-center justify-between text-gray-700 hover:text-gray-600 transition-colors py-2"
                  data-oid="r7_hoes"
                >
                  <span data-oid="a05yz5.">{category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Posts recientes */}
      <Card className="overflow-hidden shadow-sm" data-oid="fyd3f9i">
        <CardHeader
          className="pb-3 bg-gray-50 border-b pt-5"
          data-oid=".rz8xpq"
        >
          <CardTitle className="text-lg" data-oid="63e236l">
            Artículos recientes
          </CardTitle>
        </CardHeader>
        <CardContent className="py-5" data-oid="9.ns16l">
          <ul className="space-y-5 divide-y divide-gray-100" data-oid="q1yh2:1">
            {recentPosts.map((post) => (
              <li
                key={post.id}
                className="pt-5 first:pt-0 pb-1"
                data-oid="gtdj_s1"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block"
                  data-oid="nr6wic."
                >
                  <h3
                    className="text-sm font-medium text-gray-900 group-hover:text-gray-600 line-clamp-2 transition-colors"
                    data-oid="sd59:16"
                  >
                    {post.title}
                  </h3>
                  <div
                    className="flex items-center text-xs text-gray-500 mt-2 space-x-2"
                    data-oid="xa7b:gm"
                  >
                    <Clock
                      size={12}
                      className="text-gray-400"
                      data-oid="_xqyl2o"
                    />

                    <span data-oid="0rmu5ak">
                      {new Date(post.publishDate).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card className="overflow-hidden shadow-sm mb-6" data-oid="fb6odgb">
        <CardHeader
          className="pb-3 bg-gray-50 border-b pt-5"
          data-oid="p-g9-hh"
        >
          <CardTitle
            className="flex items-center gap-2 text-lg"
            data-oid="e5cowqv"
          >
            <TagIcon size={16} data-oid="nc8u:3d" />
            <span data-oid="j4.zmor">Etiquetas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-5" data-oid="y5d047t">
          <TagList tags={tags} data-oid="k6rm8vj" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
