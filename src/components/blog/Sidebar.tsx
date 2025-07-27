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
      <div className="animate-pulse space-y-6" data-oid="xmj05k-">
        <div className="h-12 bg-gray-200 rounded-md" data-oid="g3tnh-l"></div>
        <div className="h-60 bg-gray-200 rounded-md" data-oid="6v:6gb3"></div>
        <div className="h-60 bg-gray-200 rounded-md" data-oid="tx10f0c"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4" data-oid="7jib6uf">
      {/* Categorías populares */}
      <Card className="overflow-hidden shadow-sm" data-oid="3tav9ix">
        <CardHeader
          className="pb-3 bg-gray-50 border-b pt-5"
          data-oid="_vaozm7"
        >
          <CardTitle className="text-lg" data-oid="l.mbo.-">
            Categorías
          </CardTitle>
        </CardHeader>
        <CardContent className="py-5" data-oid="uo6uirg">
          <ul className="space-y-2" data-oid="l_1a2tm">
            {categories.map((category, idx) => (
              <li key={idx} data-oid=".m-..kq">
                <Link
                  to={`/blog/categoria/${category.toLowerCase()}`}
                  className="flex items-center justify-between text-gray-700 hover:text-gray-600 transition-colors py-2"
                  data-oid="tk2h0cs"
                >
                  <span data-oid="j3ottug">{category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Posts recientes */}
      <Card className="overflow-hidden shadow-sm" data-oid="2-4pkxm">
        <CardHeader
          className="pb-3 bg-gray-50 border-b pt-5"
          data-oid="74sx::n"
        >
          <CardTitle className="text-lg" data-oid="vf2r60p">
            Artículos recientes
          </CardTitle>
        </CardHeader>
        <CardContent className="py-5" data-oid="q_sifhu">
          <ul className="space-y-5 divide-y divide-gray-100" data-oid="-6izupu">
            {recentPosts.map((post) => (
              <li
                key={post.id}
                className="pt-5 first:pt-0 pb-1"
                data-oid="uqo47:1"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block"
                  data-oid=".3ftws-"
                >
                  <h3
                    className="text-sm font-medium text-gray-900 group-hover:text-gray-600 line-clamp-2 transition-colors"
                    data-oid="7qpzyw2"
                  >
                    {post.title}
                  </h3>
                  <div
                    className="flex items-center text-xs text-gray-500 mt-2 space-x-2"
                    data-oid="rbdv1ea"
                  >
                    <Clock
                      size={12}
                      className="text-gray-400"
                      data-oid="ad944d1"
                    />

                    <span data-oid=":o2u3nu">
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
      <Card className="overflow-hidden shadow-sm mb-6" data-oid="c2q.5:v">
        <CardHeader
          className="pb-3 bg-gray-50 border-b pt-5"
          data-oid="ruo0u3y"
        >
          <CardTitle
            className="flex items-center gap-2 text-lg"
            data-oid="ol_56hh"
          >
            <TagIcon size={16} data-oid="qyxfe:l" />
            <span data-oid="a95ngys">Etiquetas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-5" data-oid="o0pwpix">
          <TagList tags={tags} data-oid="-6y.g:u" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
