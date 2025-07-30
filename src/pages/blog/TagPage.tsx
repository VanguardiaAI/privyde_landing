import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { Pagination } from "@/components/blog/Pagination";
import Sidebar from "@/components/blog/Sidebar";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { ArrowLeft, Tag, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

const TagPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (tag) {
          const tagPosts = await blogService.getPostsByTag(tag);
          setPosts(tagPosts);
        } else {
          const allPosts = await blogService.getAllPosts();
          setPosts(allPosts);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // Restablecer la página actual al cambiar de etiqueta
    setCurrentPage(1);
    // Scroll al inicio cuando cambia la etiqueta
    window.scrollTo(0, 0);
  }, [tag]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calcular los índices para la paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Formatear el nombre de la etiqueta para mostrar
  const tagName = tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : "";

  return (
    <>
      <header data-oid="6vwxaim">
        <title data-oid=".mw4trv">
          {tagName ? `#${tagName} - Blog Privyde` : "Blog | Privyde"}
        </title>
        <meta
          name="description"
          content={
            tagName
              ? `Artículos con etiqueta #${tagName} en el blog de Privyde`
              : "Blog de Privyde"
          }
          data-oid="vxzbzq5"
        />
      </header>

      <Navbar data-oid="26w9gty" />

      <main data-oid="o87-026">
        {/* Hero de tag */}
        <section
          className="relative py-16 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden"
          data-oid="s-nau5n"
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            data-oid="1jig_qr"
          >
            <div
              className="absolute -top-20 -right-20 w-72 h-72 bg-gray-1000 rounded-full blur-3xl"
              data-oid="lz0xkwo"
            ></div>
            <div
              className="absolute bottom-10 left-1/4 w-32 h-32 bg-gray-1000 rounded-full blur-3xl"
              data-oid="-8o7pkh"
            ></div>
          </div>
          <div
            className="container relative mx-auto px-4 z-10"
            data-oid="liteeu5"
          >
            <div className="max-w-3xl" data-oid="g:81xvr">
              <div className="flex items-center mb-6" data-oid="aqydf_t">
                <Link
                  to="/blog"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                  data-oid="vis430w"
                >
                  <ArrowLeft size={18} className="mr-2" data-oid="pyegu.h" />
                  <span data-oid="exk_xn-">Blog</span>
                </Link>
                <span className="mx-3 text-white/50" data-oid="otljjyl">
                  /
                </span>
                <span className="text-white" data-oid="66u317d">
                  Etiqueta
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4" data-oid="_wak2:.">
                <div className="bg-black p-2.5 rounded-lg" data-oid="1zgy-wc">
                  <Hash size={22} className="text-white" data-oid="zswi90g" />
                </div>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                  data-oid="10g2z1y"
                >
                  {tagName}
                </h1>
              </div>

              {tag && (
                <p
                  className="text-xl text-white/80 mb-6 max-w-2xl"
                  data-oid="vxf0z25"
                >
                  Artículos etiquetados como{" "}
                  <span
                    className="text-gray-400 font-medium"
                    data-oid="2iedx69"
                  >
                    #{tagName}
                  </span>{" "}
                  en nuestro blog especializado en transporte ejecutivo y
                  servicios premium.
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="bg-gray-50 py-12" data-oid="w5tsjxq">
          <div className="container mx-auto px-4" data-oid="9-llpvz">
            <div
              className="flex flex-col lg:flex-row gap-12"
              data-oid="8q_:pjd"
            >
              {/* Main Content */}
              <div className="lg:w-2/3" data-oid="f7vv:1b">
                {tag && (
                  <div className="mb-8 text-gray-600" data-oid="e0ybwcp">
                    <p data-oid="ojscnog">
                      Mostrando {posts.length} artículo
                      {posts.length !== 1 ? "s" : ""} con la etiqueta{" "}
                      <span
                        className="font-medium text-gray-900"
                        data-oid="t55ep.i"
                      >
                        #{tagName}
                      </span>
                    </p>
                  </div>
                )}

                {/* Lista de posts */}
                {isLoading ? (
                  <div className="flex justify-center py-20" data-oid=".9b.4te">
                    <div
                      className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"
                      data-oid="mc3sjly"
                    ></div>
                  </div>
                ) : currentPosts.length > 0 ? (
                  <>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      data-oid="6-a3xvn"
                    >
                      {currentPosts.map((post) => (
                        <BlogCard
                          key={post.id}
                          post={post}
                          data-oid="rn4-6vh"
                        />
                      ))}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      data-oid="d9d:_w."
                    />
                  </>
                ) : (
                  <div
                    className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-100"
                    data-oid="p9yp86n"
                  >
                    <div
                      className="inline-flex justify-center items-center w-16 h-16 bg-gray-200 rounded-full text-black mb-6"
                      data-oid="enzrw7n"
                    >
                      <Tag size={28} data-oid="mm0wkvm" />
                    </div>
                    <h2
                      className="text-2xl font-bold text-gray-900 mb-2"
                      data-oid="wix7.1:"
                    >
                      Etiqueta sin contenido
                    </h2>
                    <p
                      className="text-gray-600 mb-8 max-w-md mx-auto"
                      data-oid="apsfnem"
                    >
                      No hay artículos disponibles con esta etiqueta. Pronto
                      agregaremos nuevo contenido.
                    </p>
                    <Button asChild data-oid="reffhqz">
                      <Link to="/blog" data-oid="jc3z.l4">
                        Volver al blog
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 mt-12 lg:mt-0" data-oid="12zby3q">
                <div className="sticky top-24 pt-8" data-oid="lmpqk4p">
                  <Sidebar data-oid="1w62rd_" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer data-oid="wf9407m" />
    </>
  );
};

export default TagPage;
