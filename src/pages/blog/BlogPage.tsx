import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { SearchBlog } from "@/components/blog/SearchBlog";
import { CategoryList } from "@/components/blog/CategoryList";
import { Pagination } from "@/components/blog/Pagination";
import Sidebar from "@/components/blog/Sidebar";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (searchQuery) {
          const searchResults = await blogService.searchPosts(searchQuery);
          setPosts(searchResults);
          setFeaturedPosts([]);
        } else {
          const [allPosts, featuredPosts, allCategories] = await Promise.all([
            blogService.getAllPosts(),
            blogService.getFeaturedPosts(),
            blogService.getAllCategories(),
          ]);

          setPosts(allPosts);
          setFeaturedPosts(featuredPosts);
          setCategories(allCategories);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    navigate(query ? `/blog?q=${encodeURIComponent(query)}` : "/blog");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calcular los índices para la paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <>
      <header data-oid="3sqg78m">
        <title data-oid="2myz:vr">
          Blog | Privyde - Transporte Ejecutivo y Premium
        </title>
        <meta
          name="description"
          content="Artículos sobre transporte ejecutivo, viajes corporativos y servicios premium de Privyde."
          data-oid="o2n6w2o"
        />
      </header>

      <Navbar data-oid="slgqinx" />

      <main data-oid="4-n3je9">
        {/* Hero Section */}
        <section
          className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          data-oid="_25cdx:"
        >
          {/* Decorative elements */}
          <div
            className="absolute inset-0 overflow-hidden opacity-20"
            data-oid=":n1w-_j"
          >
            <div
              className="absolute -top-24 -right-24 w-96 h-96 bg-gray-1000 rounded-full blur-3xl"
              data-oid="6o3ilg3"
            ></div>
            <div
              className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"
              data-oid="gtqxodf"
            ></div>
          </div>

          <div
            className="container relative mx-auto px-4 z-10"
            data-oid="oborxi9"
          >
            <div className="max-w-3xl mx-auto" data-oid="uo4y::w">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-left"
                data-oid="05ucd3y"
              >
                Blog de{" "}
                <span className="text-black" data-oid="ljt4me:">
                  Privyde
                </span>
              </h1>
              <p
                className="text-xl text-white/80 mb-8 text-left max-w-2xl"
                data-oid="m59907w"
              >
                Artículos, guías y tendencias sobre transporte ejecutivo y
                servicios premium para viajeros y empresas exigentes.
              </p>

              <div className="max-w-xl" data-oid="cx-kfjo">
                <SearchBlog
                  onSearch={handleSearch}
                  initialQuery={searchQuery}
                  data-oid="okg:hbg"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gray-50" data-oid="ljjee4g">
          {/* Categorías en desktop */}
          <div
            className="container mx-auto px-4 py-6 border-b border-gray-200"
            data-oid="rk_z2po"
          >
            <CategoryList categories={categories} data-oid="yi1ok6q" />
          </div>

          <div className="container mx-auto px-4 py-12" data-oid="9i6u_4h">
            <div
              className="flex flex-col lg:flex-row gap-12"
              data-oid="hb18u0m"
            >
              {/* Main Content */}
              <div className="lg:w-2/3" data-oid="ge9guk3">
                {/* Sección de posts destacados */}
                {featuredPosts.length > 0 && !searchQuery && (
                  <section className="mb-16" data-oid="3e8ujj0">
                    <h2
                      className="text-2xl font-bold mb-6 text-left border-b border-gray-200 pb-2"
                      data-oid="5z2j3h4"
                    >
                      Artículos destacados
                    </h2>
                    <div className="space-y-8" data-oid="m6g6s.y">
                      {featuredPosts.map((post) => (
                        <BlogCard
                          key={post.id}
                          post={post}
                          variant="featured"
                          data-oid="873nb-o"
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Lista de posts */}
                <section data-oid="wal6931">
                  <h2
                    className="text-2xl font-bold mb-6 text-left border-b border-gray-200 pb-2"
                    data-oid="p0.sf0u"
                  >
                    {searchQuery
                      ? `Resultados para "${searchQuery}" (${posts.length})`
                      : "Artículos recientes"}
                  </h2>

                  {isLoading ? (
                    <div
                      className="flex justify-center py-20"
                      data-oid="-10zp6a"
                    >
                      <div
                        className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"
                        data-oid="7ub4y3w"
                      ></div>
                    </div>
                  ) : currentPosts.length > 0 ? (
                    <>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        data-oid="t25u-_s"
                      >
                        {currentPosts.map((post) => (
                          <BlogCard
                            key={post.id}
                            post={post}
                            data-oid="d7u3cg4"
                          />
                        ))}
                      </div>

                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        data-oid="1d6z2e0"
                      />
                    </>
                  ) : (
                    <div
                      className="text-center py-20 bg-white rounded-lg shadow-sm"
                      data-oid="cad:-i5"
                    >
                      <p className="text-xl text-gray-500" data-oid="efnzkff">
                        {searchQuery
                          ? "No se encontraron resultados para tu búsqueda."
                          : "No hay artículos disponibles en este momento."}
                      </p>
                    </div>
                  )}
                </section>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 mt-12 lg:mt-0" data-oid="g228wh2">
                <div className="sticky top-24 pt-8" data-oid="cm_rspj">
                  <Sidebar data-oid="1ap7g09" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer data-oid="ez4yw0s" />
    </>
  );
};

export default BlogPage;
