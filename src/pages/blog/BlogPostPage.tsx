import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TagList } from "@/components/blog/TagList";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import Sidebar from "@/components/blog/Sidebar";
import { SharePost } from "@/components/blog/SharePost";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { CalendarIcon, Clock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { marked } from "marked";
import { Toaster } from "@/components/ui/toaster";

// Configuración de marked para convertir markdown a HTML
marked.setOptions({
  gfm: true,
  breaks: true,
});

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!slug) return;

      try {
        const postData = await blogService.getPostBySlug(slug);
        setPost(postData);

        if (postData) {
          // Obtener posts relacionados basados en categorías
          const allPosts = await blogService.getAllPosts();
          setRelatedPosts(allPosts);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // Scroll al inicio cuando cambia el slug
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <Navbar data-oid="0n.yixv" />
        <div
          className="flex justify-center items-center min-h-screen bg-gray-50"
          data-oid="resh9m7"
        >
          <div
            className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"
            data-oid="gz6q29p"
          ></div>
        </div>
        <Footer data-oid="_.df28g" />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar data-oid="qwkl:jf" />
        <div
          className="flex flex-col justify-center items-center min-h-[60vh] bg-gray-50 px-4 text-center"
          data-oid="64_9.33"
        >
          <h1
            className="text-3xl font-bold text-gray-800 mb-4"
            data-oid="3xuyfn4"
          >
            Artículo no encontrado
          </h1>
          <p className="text-gray-600 mb-8" data-oid="raoxlie">
            El artículo que buscas no existe o ha sido eliminado.
          </p>
          <Button asChild data-oid="s3ez_im">
            <Link to="/blog" className="flex items-center" data-oid="7d17x5z">
              <ArrowLeft size={18} className="mr-2" data-oid="ltjn8on" />
              Volver al blog
            </Link>
          </Button>
        </div>
        <Footer data-oid="z0w1hmf" />
      </>
    );
  }

  // Convertir el contenido Markdown a HTML
  const contentHtml = marked.parse(post.content);

  // Calcular tiempo estimado de lectura (aproximadamente 200 palabras por minuto)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      <header data-oid="-x:9pn4">
        <title data-oid="hanhua9">{post.title} | Blog Privyde</title>
        <meta name="description" content={post.excerpt} data-oid="6hj3lb_" />
        {post.seoData && (
          <>
            <meta
              name="keywords"
              content={post.seoData.keywords.join(", ")}
              data-oid="o7kp.q4"
            />

            {post.seoData.canonicalUrl && (
              <link
                rel="canonical"
                href={post.seoData.canonicalUrl}
                data-oid="juwneqg"
              />
            )}
          </>
        )}
      </header>

      <Navbar data-oid="yhdy4u." />

      {/* Hero del artículo */}
      <div className="relative" data-oid="d84o6ak">
        {post.featuredImage && (
          <div className="relative h-[50vh] min-h-[400px]" data-oid="-s2ygsw">
            <div className="absolute inset-0" data-oid="md8h1:7">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
                data-oid="hm4fdq-"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                data-oid="ttfcx.6"
              ></div>
            </div>
            <div
              className="relative container mx-auto px-4 h-full flex items-end pb-12"
              data-oid="_fakp34"
            >
              <div className="max-w-4xl text-white" data-oid="amljx3n">
                {/* Categorías */}
                <div className="flex flex-wrap gap-2 mb-4" data-oid="6esxc:n">
                  {post.categories.map((category, idx) => (
                    <Link
                      key={idx}
                      to={`/blog/categoria/${category.toLowerCase()}`}
                      className="inline-block bg-black text-white px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-gray-800"
                      data-oid=".07rkuk"
                    >
                      {category}
                    </Link>
                  ))}
                </div>

                {/* Título */}
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                  data-oid="rfald0l"
                >
                  {post.title}
                </h1>

                {/* Meta información */}
                <div
                  className="flex flex-wrap items-center text-white/90 text-sm mb-8 gap-6"
                  data-oid=".f20s10"
                >
                  <div className="flex items-center" data-oid="ddrq6zn">
                    <User size={16} className="mr-2" data-oid="x93dl9g" />
                    <span data-oid="c7rh4w:">{post.author}</span>
                  </div>
                  <div className="flex items-center" data-oid="rci9in9">
                    <CalendarIcon
                      size={16}
                      className="mr-2"
                      data-oid="hkkwrbw"
                    />

                    <span data-oid="k43w7ol">
                      {new Date(post.publishDate).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center" data-oid="j.lyfek">
                    <Clock size={16} className="mr-2" data-oid="-7wc36c" />
                    <span data-oid="wgi3uai">{readingTime} min de lectura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <main className="bg-white py-12" data-oid="3euavw-">
        <div className="container mx-auto px-4" data-oid="xzl:o34">
          <div className="flex flex-col lg:flex-row gap-12" data-oid="t6xk0mp">
            <div className="lg:w-2/3" data-oid="fo_.gnc">
              {/* Navegación de regreso */}
              <div className="mb-8" data-oid="tn.pi6k">
                <Button
                  variant="ghost"
                  asChild
                  className="flex items-center text-gray-600 hover:text-gray-600"
                  data-oid="uxiwqm8"
                >
                  <Link to="/blog" data-oid="in6fq33">
                    <ArrowLeft size={18} className="mr-2" data-oid="ylx.vjq" />
                    Volver al blog
                  </Link>
                </Button>
              </div>

              {/* Contenido del artículo */}
              <article className="max-w-3xl" data-oid="vsyv4z_">
                {/* Si no hay imagen destacada, mostrar título y meta aquí */}
                {!post.featuredImage && (
                  <>
                    {/* Categorías */}
                    <div
                      className="flex flex-wrap gap-2 mb-4"
                      data-oid=".04:s5m"
                    >
                      {post.categories.map((category, idx) => (
                        <Link
                          key={idx}
                          to={`/blog/categoria/${category.toLowerCase()}`}
                          className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-red-200"
                          data-oid="1gjds7k"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>

                    {/* Título */}
                    <h1
                      className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
                      data-oid="6kjrif3"
                    >
                      {post.title}
                    </h1>

                    {/* Meta información */}
                    <div
                      className="flex flex-wrap items-center text-gray-500 text-sm mb-8 gap-6"
                      data-oid="3dn1n42"
                    >
                      <div className="flex items-center" data-oid="g6si.dd">
                        <User
                          size={16}
                          className="mr-2 text-black"
                          data-oid=":6qo63-"
                        />

                        <span data-oid="1hk4h2:">{post.author}</span>
                      </div>
                      <div className="flex items-center" data-oid="af-eez6">
                        <CalendarIcon
                          size={16}
                          className="mr-2 text-black"
                          data-oid="162b_02"
                        />

                        <span data-oid="ws3hsdp">
                          {new Date(post.publishDate).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div className="flex items-center" data-oid="x9j98t-">
                        <Clock
                          size={16}
                          className="mr-2 text-black"
                          data-oid="wpo5:9c"
                        />

                        <span data-oid="gzh03an">
                          {readingTime} min de lectura
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Contenido */}
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-sm prose-p:text-left prose-li:text-left"
                  data-oid="vr0s9ou"
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                    data-oid="3sipso3"
                  />
                </div>

                {/* Compartir y Tags */}
                <div
                  className="mt-12 pt-6 border-t border-gray-200"
                  data-oid="7eb:f:f"
                >
                  <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    data-oid="xitbz-g"
                  >
                    <div data-oid="psnf2v_">
                      <h4
                        className="font-medium text-gray-900 mb-2"
                        data-oid="5dob99_"
                      >
                        Etiquetas:
                      </h4>
                      <TagList tags={post.tags} data-oid="4ts8hz5" />
                    </div>

                    <SharePost
                      title={post.title}
                      url={window.location.href}
                      description={post.excerpt}
                      className="mt-2 sm:mt-0"
                      data-oid="bprqfkm"
                    />
                  </div>
                </div>
              </article>

              {/* Posts relacionados */}
              <RelatedPosts
                currentPost={post}
                posts={relatedPosts}
                data-oid="51083r7"
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 mt-12 lg:mt-0" data-oid="53zr89l">
              <div className="sticky top-24 pt-8" data-oid="9sg2ig6">
                <Sidebar data-oid="44lqa1_" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer data-oid="hz33.bk" />
      <Toaster data-oid="ejd2huk" />
    </>
  );
};

export default BlogPostPage;
