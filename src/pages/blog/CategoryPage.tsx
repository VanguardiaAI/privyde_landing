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
      <header data-oid="luf1i.:">
        <title data-oid="ln5uipe">
          {categoryName ? `${categoryName} - Blog Privyde` : "Blog | Privyde"}
        </title>
        <meta
          name="description"
          content={
            categoryName
              ? `Artículos sobre ${categoryName} en el blog de Privyde`
              : "Blog de Privyde"
          }
          data-oid="glsacbz"
        />
      </header>

      <Navbar data-oid="x.4rdhp" />

      <main data-oid="a9kznbp">
        {/* Hero de categoría */}
        <section
          className="relative py-16 bg-gradient-to-r from-gray-900 to-black overflow-hidden"
          data-oid="a.tf46c"
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            data-oid="g3elx07"
          >
            <div
              className="absolute -top-20 -left-20 w-72 h-72 bg-gray-1000 rounded-full blur-3xl"
              data-oid="utmlc15"
            ></div>
          </div>
          <div
            className="container relative mx-auto px-4 z-10"
            data-oid="zbl-nc4"
          >
            <div className="max-w-3xl" data-oid="z04wd6_">
              <div className="flex items-center mb-6" data-oid="d8_4ir:">
                <Link
                  to="/blog"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                  data-oid="ba_hywm"
                >
                  <ArrowLeft size={18} className="mr-2" data-oid="bas43md" />
                  <span data-oid="r.hzszw">Blog</span>
                </Link>
                <span className="mx-3 text-white/50" data-oid="rm73yyx">
                  /
                </span>
                <span className="text-white" data-oid="824-ri2">
                  Categoría
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4" data-oid="9t7gob_">
                <div className="bg-black p-2.5 rounded-lg" data-oid="ujxi3ml">
                  <FolderOpen
                    size={22}
                    className="text-white"
                    data-oid="3sr42yb"
                  />
                </div>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                  data-oid="yjgynuy"
                >
                  {categoryName || "Todas las categorías"}
                </h1>
              </div>

              {category && (
                <p
                  className="text-xl text-white/80 mb-6 max-w-2xl"
                  data-oid="1g6lu9p"
                >
                  Explora nuestros artículos sobre{" "}
                  <span
                    className="text-gray-400 font-medium"
                    data-oid="tm-ebn_"
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

        <div className="bg-gray-50" data-oid="jid361t">
          {/* Lista de categorías */}
          <div
            className="container mx-auto px-4 py-6 border-b border-gray-200"
            data-oid="08aogub"
          >
            <CategoryList
              categories={categories}
              activeCategory={category}
              data-oid="1z804ff"
            />
          </div>

          <div className="container mx-auto px-4 py-12" data-oid="56okau5">
            <div
              className="flex flex-col lg:flex-row gap-12"
              data-oid="hojm4u4"
            >
              {/* Main Content */}
              <div className="lg:w-2/3" data-oid="i196ip8">
                {category && (
                  <div className="mb-8 text-gray-600" data-oid="q92-8nq">
                    <p data-oid=".b-74g4">
                      Mostrando {posts.length} artículo
                      {posts.length !== 1 ? "s" : ""} en la categoría{" "}
                      <span
                        className="font-medium text-gray-900"
                        data-oid="ctdg5mo"
                      >
                        "{categoryName}"
                      </span>
                    </p>
                  </div>
                )}

                {/* Lista de posts */}
                {isLoading ? (
                  <div className="flex justify-center py-20" data-oid="-9z30a8">
                    <div
                      className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"
                      data-oid="fhq1h9f"
                    ></div>
                  </div>
                ) : currentPosts.length > 0 ? (
                  <>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      data-oid="4h36x:t"
                    >
                      {currentPosts.map((post) => (
                        <BlogCard
                          key={post.id}
                          post={post}
                          data-oid="kn9scgh"
                        />
                      ))}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      data-oid="2vt5k3r"
                    />
                  </>
                ) : (
                  <div
                    className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-100"
                    data-oid=".vb-tl7"
                  >
                    <div
                      className="inline-flex justify-center items-center w-16 h-16 bg-gray-200 rounded-full text-black mb-6"
                      data-oid="v70vyv:"
                    >
                      <FolderOpen size={28} data-oid="ai0rui:" />
                    </div>
                    <h2
                      className="text-2xl font-bold text-gray-900 mb-2"
                      data-oid="w76de7y"
                    >
                      Categoría vacía
                    </h2>
                    <p
                      className="text-gray-600 mb-8 max-w-md mx-auto"
                      data-oid="s8wj570"
                    >
                      No hay artículos disponibles en esta categoría. Pronto
                      agregaremos nuevo contenido.
                    </p>
                    <Button asChild data-oid="4fvxde5">
                      <Link to="/blog" data-oid="j78vw-d">
                        Ver todas las categorías
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 mt-12 lg:mt-0" data-oid="n5hxc5k">
                <div className="sticky top-24 pt-8" data-oid="wp5xshx">
                  <Sidebar data-oid="cul0dm1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer data-oid=":ky_o2g" />
    </>
  );
};

export default CategoryPage;
