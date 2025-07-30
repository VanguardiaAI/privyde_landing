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
        <Navbar data-oid="3a4tsup" />
        <div
          className="flex justify-center items-center min-h-screen bg-gray-50"
          data-oid="36yexu1"
        >
          <div
            className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"
            data-oid="kv:5xy3"
          ></div>
        </div>
        <Footer data-oid="isrgnns" />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar data-oid="lnce5x." />
        <div
          className="flex flex-col justify-center items-center min-h-[60vh] bg-gray-50 px-4 text-center"
          data-oid="nas.ts4"
        >
          <h1
            className="text-3xl font-bold text-gray-800 mb-4"
            data-oid="7.a6uqn"
          >
            Artículo no encontrado
          </h1>
          <p className="text-gray-600 mb-8" data-oid="7zc2yt9">
            El artículo que buscas no existe o ha sido eliminado.
          </p>
          <Button asChild data-oid="tj0o7y6">
            <Link to="/blog" className="flex items-center" data-oid="53g_05y">
              <ArrowLeft size={18} className="mr-2" data-oid="i66ws3i" />
              Volver al blog
            </Link>
          </Button>
        </div>
        <Footer data-oid="gi5:jne" />
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
      <header data-oid="sx09ic_">
        <title data-oid="kmp7sig">{post.title} | Blog Privyde</title>
        <meta name="description" content={post.excerpt} data-oid="boe_oio" />
        {post.seoData && (
          <>
            <meta
              name="keywords"
              content={post.seoData.keywords.join(", ")}
              data-oid="x65o9:1"
            />

            {post.seoData.canonicalUrl && (
              <link
                rel="canonical"
                href={post.seoData.canonicalUrl}
                data-oid="89v-c6b"
              />
            )}
          </>
        )}
      </header>

      <Navbar data-oid="u19lq1o" />

      {/* Hero del artículo */}
      <div className="relative" data-oid="8jz.tc0">
        {post.featuredImage && (
          <div className="relative h-[50vh] min-h-[400px]" data-oid="2w779n6">
            <div className="absolute inset-0" data-oid="csqf1ag">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
                data-oid="_2bbzw2"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                data-oid="-w0r4x3"
              ></div>
            </div>
            <div
              className="relative container mx-auto px-4 h-full flex items-end pb-12"
              data-oid="62x:jj1"
            >
              <div className="max-w-4xl text-white" data-oid="0e29oh0">
                {/* Categorías */}
                <div className="flex flex-wrap gap-2 mb-4" data-oid="1g-yx52">
                  {post.categories.map((category, idx) => (
                    <Link
                      key={idx}
                      to={`/blog/categoria/${category.toLowerCase()}`}
                      className="inline-block bg-black text-white px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-gray-800"
                      data-oid="k_s4eob"
                    >
                      {category}
                    </Link>
                  ))}
                </div>

                {/* Título */}
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                  data-oid="tlukj_5"
                >
                  {post.title}
                </h1>

                {/* Meta información */}
                <div
                  className="flex flex-wrap items-center text-white/90 text-sm mb-8 gap-6"
                  data-oid="fbopm4u"
                >
                  <div className="flex items-center" data-oid="31dqnlh">
                    <User size={16} className="mr-2" data-oid="b9gqb_1" />
                    <span data-oid="x_r34oa">{post.author}</span>
                  </div>
                  <div className="flex items-center" data-oid="_hpjkt0">
                    <CalendarIcon
                      size={16}
                      className="mr-2"
                      data-oid="t8.l367"
                    />

                    <span data-oid="ovkbb8y">
                      {new Date(post.publishDate).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center" data-oid="9gv.lus">
                    <Clock size={16} className="mr-2" data-oid="ai1h6jv" />
                    <span data-oid="2ebn988">{readingTime} min de lectura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <main className="bg-white py-12" data-oid="9wkmo4q">
        <div className="container mx-auto px-4" data-oid="fkgngva">
          <div className="flex flex-col lg:flex-row gap-12" data-oid="gh9ambq">
            <div className="lg:w-2/3" data-oid="e4h14r2">
              {/* Navegación de regreso */}
              <div className="mb-8" data-oid="q494b77">
                <Button
                  variant="ghost"
                  asChild
                  className="flex items-center text-gray-600 hover:text-gray-600"
                  data-oid="xf083d:"
                >
                  <Link to="/blog" data-oid="3v2cb70">
                    <ArrowLeft size={18} className="mr-2" data-oid="ke8:vld" />
                    Volver al blog
                  </Link>
                </Button>
              </div>

              {/* Contenido del artículo */}
              <article className="max-w-3xl" data-oid="un-m3h5">
                {/* Si no hay imagen destacada, mostrar título y meta aquí */}
                {!post.featuredImage && (
                  <>
                    {/* Categorías */}
                    <div
                      className="flex flex-wrap gap-2 mb-4"
                      data-oid="itmixgo"
                    >
                      {post.categories.map((category, idx) => (
                        <Link
                          key={idx}
                          to={`/blog/categoria/${category.toLowerCase()}`}
                          className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-red-200"
                          data-oid="7f.3m4i"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>

                    {/* Título */}
                    <h1
                      className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
                      data-oid="nbi2yi7"
                    >
                      {post.title}
                    </h1>

                    {/* Meta información */}
                    <div
                      className="flex flex-wrap items-center text-gray-500 text-sm mb-8 gap-6"
                      data-oid="9hlefqu"
                    >
                      <div className="flex items-center" data-oid="n9y668b">
                        <User
                          size={16}
                          className="mr-2 text-black"
                          data-oid="ifqj0ie"
                        />

                        <span data-oid=":04v-vz">{post.author}</span>
                      </div>
                      <div className="flex items-center" data-oid="b:l__.1">
                        <CalendarIcon
                          size={16}
                          className="mr-2 text-black"
                          data-oid="-k0y_oc"
                        />

                        <span data-oid="lvpyo79">
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
                      <div className="flex items-center" data-oid="sz946qc">
                        <Clock
                          size={16}
                          className="mr-2 text-black"
                          data-oid="j0rdhgf"
                        />

                        <span data-oid="iq:f6z3">
                          {readingTime} min de lectura
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Contenido */}
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-sm prose-p:text-left prose-li:text-left"
                  data-oid="j9i0zex"
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                    data-oid="3cqazzn"
                  />
                </div>

                {/* Compartir y Tags */}
                <div
                  className="mt-12 pt-6 border-t border-gray-200"
                  data-oid="q.klmkh"
                >
                  <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    data-oid="-8zwu.p"
                  >
                    <div data-oid="6.wc1ns">
                      <h4
                        className="font-medium text-gray-900 mb-2"
                        data-oid="8hmswhd"
                      >
                        Etiquetas:
                      </h4>
                      <TagList tags={post.tags} data-oid="ktlawh0" />
                    </div>

                    <SharePost
                      title={post.title}
                      url={window.location.href}
                      description={post.excerpt}
                      className="mt-2 sm:mt-0"
                      data-oid="jy50cza"
                    />
                  </div>
                </div>
              </article>

              {/* Posts relacionados */}
              <RelatedPosts
                currentPost={post}
                posts={relatedPosts}
                data-oid="egywn5d"
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 mt-12 lg:mt-0" data-oid="5269w:y">
              <div className="sticky top-24 pt-8" data-oid="ea234:v">
                <Sidebar data-oid="xax16tx" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer data-oid="j_o0suc" />
      <Toaster data-oid="t.4ty4f" />
    </>
  );
};

export default BlogPostPage;
