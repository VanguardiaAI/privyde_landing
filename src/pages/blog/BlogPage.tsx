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
      <header data-oid=".xr_f_e">
        <title data-oid="b26mg_i">
          Blog | Privyde - Transporte Ejecutivo y Premium
        </title>
        <meta
          name="description"
          content="Artículos sobre transporte ejecutivo, viajes corporativos y servicios premium de Privyde."
          data-oid="7-ji:f9"
        />
      </header>

      <Navbar data-oid="8go8xwn" />

      <main data-oid="81gag:8">
        {/* Hero Section */}
        <section
          className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          data-oid="l-j1p8f"
        >
          {/* Decorative elements */}
          <div
            className="absolute inset-0 overflow-hidden opacity-20"
            data-oid="axpnzeh"
          >
            <div
              className="absolute -top-24 -right-24 w-96 h-96 bg-gray-1000 rounded-full blur-3xl"
              data-oid="sbuhwrr"
            ></div>
            <div
              className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"
              data-oid="4yb5p6i"
            ></div>
          </div>

          <div
            className="container relative mx-auto px-4 z-10"
            data-oid="nrkn6qh"
          >
            <div className="max-w-3xl mx-auto" data-oid="s.6wt6j">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-left"
                data-oid="_ab7bsz"
              >
                Blog de{" "}
                <span className="text-black" data-oid="c:3fwo3">
                  Privyde
                </span>
              </h1>
              <p
                className="text-xl text-white/80 mb-8 text-left max-w-2xl"
                data-oid="-kzqnaz"
              >
                Artículos, guías y tendencias sobre transporte ejecutivo y
                servicios premium para viajeros y empresas exigentes.
              </p>

              <div className="max-w-xl" data-oid="sw8zbrh">
                <SearchBlog
                  onSearch={handleSearch}
                  initialQuery={searchQuery}
                  data-oid="qjvh4yw"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gray-50" data-oid="3z:rs:6">
          {/* Categorías en desktop */}
          <div
            className="container mx-auto px-4 py-6 border-b border-gray-200"
            data-oid="x:d9cw."
          >
            <CategoryList categories={categories} data-oid="i9ck_wd" />
          </div>

          <div className="container mx-auto px-4 py-12" data-oid=".yckyd1">
            <div
              className="flex flex-col lg:flex-row gap-12"
              data-oid="loktfn-"
            >
              {/* Main Content */}
              <div className="lg:w-2/3" data-oid="u:u.s0l">
                {/* Sección de posts destacados */}
                {featuredPosts.length > 0 && !searchQuery && (
                  <section className="mb-16" data-oid="am5aafd">
                    <h2
                      className="text-2xl font-bold mb-6 text-left border-b border-gray-200 pb-2"
                      data-oid="l1_48xc"
                    >
                      Artículos destacados
                    </h2>
                    <div className="space-y-8" data-oid="d.iqh0z">
                      {featuredPosts.map((post) => (
                        <BlogCard
                          key={post.id}
                          post={post}
                          variant="featured"
                          data-oid="cmaabwc"
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Lista de posts */}
                <section data-oid="vzo4_jq">
                  <h2
                    className="text-2xl font-bold mb-6 text-left border-b border-gray-200 pb-2"
                    data-oid="0mu7fhk"
                  >
                    {searchQuery
                      ? `Resultados para "${searchQuery}" (${posts.length})`
                      : "Artículos recientes"}
                  </h2>

                  {isLoading ? (
                    <div
                      className="flex justify-center py-20"
                      data-oid="4pj-p.e"
                    >
                      <div
                        className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"
                        data-oid="s8onqv2"
                      ></div>
                    </div>
                  ) : currentPosts.length > 0 ? (
                    <>
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        data-oid="wsg-iik"
                      >
                        {currentPosts.map((post) => (
                          <BlogCard
                            key={post.id}
                            post={post}
                            data-oid="3nu9_ay"
                          />
                        ))}
                      </div>

                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        data-oid="g:3fyi2"
                      />
                    </>
                  ) : (
                    <div
                      className="text-center py-20 bg-white rounded-lg shadow-sm"
                      data-oid="v0ly-q7"
                    >
                      <p className="text-xl text-gray-500" data-oid="y-z1t3.">
                        {searchQuery
                          ? "No se encontraron resultados para tu búsqueda."
                          : "No hay artículos disponibles en este momento."}
                      </p>
                    </div>
                  )}
                </section>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 mt-12 lg:mt-0" data-oid="y-ttboh">
                <div className="sticky top-24 pt-8" data-oid="v63hqc4">
                  <Sidebar data-oid="_1mhp67" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer data-oid="_h:.6:z" />
    </>
  );
};

export default BlogPage;
