import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryList } from "@/components/blog/CategoryList";
import { Pagination } from "@/components/blog/Pagination";
import Sidebar from "@/components/blog/Sidebar";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Obtener todos las categorías para el componente de filtro
        const allCategories = await blogService.getAllCategories();
        setCategories(allCategories);

        // Si hay una categoría seleccionada, filtrar por ella
        if (category) {
          const categoryPosts = await blogService.getPostsByCategory(category);
          setPosts(categoryPosts);
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
    // Restablecer la página actual al cambiar de categoría
    setCurrentPage(1);
    // Scroll al inicio cuando cambia la categoría
    window.scrollTo(0, 0);
  }, [category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calcular los índices para la paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Formatear el nombre de la categoría para mostrar
  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  return (
    <>
      <header data-oid="ldzm128">
        <title data-oid="zmqhb6p">
          {categoryName ? `${categoryName} - Blog Privyde` : "Blog | Privyde"}
        </title>
        <meta
          name="description"
          content={
            categoryName
              ? `Artículos sobre ${categoryName} en el blog de Privyde`
              : "Blog de Privyde"
          }
          data-oid="uyqg3uf"
        />
      </header>

      <Navbar data-oid="_g:sfpu" />

      <main data-oid="10l-qfl">
        {/* Hero de categoría */}
        <section
          className="relative py-16 bg-gradient-to-r from-gray-900 to-black overflow-hidden"
          data-oid="y4:f4:g"
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            data-oid="0z508me"
          >
            <div
              className="absolute -top-20 -left-20 w-72 h-72 bg-gray-1000 rounded-full blur-3xl"
              data-oid="pei:npv"
            ></div>
          </div>
          <div
            className="container relative mx-auto px-4 z-10"
            data-oid="cgyg2az"
          >
            <div className="max-w-3xl" data-oid="jfka1ts">
              <div className="flex items-center mb-6" data-oid="_p5elm0">
                <Link
                  to="/blog"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                  data-oid="yd7mmw5"
                >
                  <ArrowLeft size={18} className="mr-2" data-oid="mzs0jxn" />
                  <span data-oid="zk06srw">Blog</span>
                </Link>
                <span className="mx-3 text-white/50" data-oid=":zfb8f.">
                  /
                </span>
                <span className="text-white" data-oid="o5w8:lq">
                  Categoría
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4" data-oid="reswija">
                <div className="bg-black p-2.5 rounded-lg" data-oid="ty5mpd.">
                  <FolderOpen
                    size={22}
                    className="text-white"
                    data-oid="fnh.jj5"
                  />
                </div>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                  data-oid="--oub_e"
                >
                  {categoryName || "Todas las categorías"}
                </h1>
              </div>

              {category && (
                <p
                  className="text-xl text-white/80 mb-6 max-w-2xl"
                  data-oid="0x7_.ps"
                >
                  Explora nuestros artículos sobre{" "}
                  <span
                    className="text-gray-400 font-medium"
                    data-oid="if.grgi"
                  >
                    {categoryName}
                  </span>
                  , con información valiosa para mejorar tu experiencia en
                  transporte ejecutivo.
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="bg-gray-50" data-oid="b554hlt">
          {/* Lista de categorías */}
          <div
            className="container mx-auto px-4 py-6 border-b border-gray-200"
            data-oid="wki3toy"
          >
            <CategoryList
              categories={categories}
              activeCategory={category}
              data-oid="7ifq7t7"
            />
          </div>

          <div className="container mx-auto px-4 py-12" data-oid="hgkx1-0">
            <div
              className="flex flex-col lg:flex-row gap-12"
              data-oid="vsy6rvp"
            >
              {/* Main Content */}
              <div className="lg:w-2/3" data-oid="fb3z8cb">
                {category && (
                  <div className="mb-8 text-gray-600" data-oid="buuk62:">
                    <p data-oid="nas2z-x">
                      Mostrando {posts.length} artículo
                      {posts.length !== 1 ? "s" : ""} en la categoría{" "}
                      <span
                        className="font-medium text-gray-900"
                        data-oid="w6l-qve"
                      >
                        "{categoryName}"
                      </span>
                    </p>
                  </div>
                )}

                {/* Lista de posts */}
                {isLoading ? (
                  <div className="flex justify-center py-20" data-oid="na8ajez">
                    <div
                      className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"
                      data-oid="_hl-bd_"
                    ></div>
                  </div>
                ) : currentPosts.length > 0 ? (
                  <>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      data-oid="1ytitr9"
                    >
                      {currentPosts.map((post) => (
                        <BlogCard
                          key={post.id}
                          post={post}
                          data-oid="f7yy2t1"
                        />
                      ))}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      data-oid="9lyd7g1"
                    />
                  </>
                ) : (
                  <div
                    className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-100"
                    data-oid="286i1-."
                  >
                    <div
                      className="inline-flex justify-center items-center w-16 h-16 bg-gray-200 rounded-full text-black mb-6"
                      data-oid="do1f8x7"
                    >
                      <FolderOpen size={28} data-oid="4egrwbf" />
                    </div>
                    <h2
                      className="text-2xl font-bold text-gray-900 mb-2"
                      data-oid="urikeuv"
                    >
                      Categoría vacía
                    </h2>
                    <p
                      className="text-gray-600 mb-8 max-w-md mx-auto"
                      data-oid="xbqb410"
                    >
                      No hay artículos disponibles en esta categoría. Pronto
                      agregaremos nuevo contenido.
                    </p>
                    <Button asChild data-oid="36.5lvs">
                      <Link to="/blog" data-oid="zw5:std">
                        Ver todas las categorías
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 mt-12 lg:mt-0" data-oid="niubkyg">
                <div className="sticky top-24 pt-8" data-oid="nowrjzq">
                  <Sidebar data-oid="cfl0bgh" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer data-oid="n:30o56" />
    </>
  );
};

export default CategoryPage;
