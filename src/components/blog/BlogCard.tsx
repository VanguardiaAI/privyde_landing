import { BlogPost } from "@/types/blog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CalendarIcon, User } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured";
}

export const BlogCard = ({ post, variant = "default" }: BlogCardProps) => {
  const isFeatured = variant === "featured";

  // Asegurarse de que las categorías siempre sean un array
  const categories = Array.isArray(post.categories)
    ? post.categories
    : post.categories
      ? String(post.categories)
          .split(",")
          .map((c) => c.trim())
      : [];

  // Fecha formateada
  const formattedDate = new Date(post.publishDate).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Formatear URL de imagen para asegurar que sea completa
  const getFullImageUrl = (url: string | undefined): string => {
    if (!url)
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UsIHNhbnMtc2VyaWYiIGZpbGw9IiM5OTk5OTkiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";

    // Si es una URL absoluta o ya comienza con http, mantenerla como está
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    try {
      // Si la URL es relativa al servidor, construir la URL completa
      const baseApiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      // Asegurarnos de que la URL tenga el formato correcto
      let fullUrl = url;
      if (!url.startsWith("/")) {
        fullUrl = "/" + url;
      }

      // Combinar la URL base con la ruta relativa
      return baseApiUrl + fullUrl;
    } catch (error) {
      console.error("Error al formatear URL de imagen:", error);
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UsIHNhbnMtc2VyaWYiIGZpbGw9IiM5OTk5OTkiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";
    }
  };

  // Imagen por defecto en base64
  const defaultImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UsIHNhbnMtc2VyaWYiIGZpbGw9IiM5OTk5OTkiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";

  if (isFeatured) {
    return (
      <Card
        className="overflow-hidden mb-6 border border-gray-200 hover:shadow-md transition-all duration-300 group"
        data-oid="3ca:uch"
      >
        <div className="flex flex-col lg:flex-row" data-oid="-e58h2y">
          {/* Imagen destacada */}
          <div className="lg:w-1/2 relative overflow-hidden" data-oid="02nxjpw">
            <img
              src={getFullImageUrl(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-cover aspect-video lg:aspect-auto min-h-[300px] transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                console.error("Error cargando imagen:", post.featuredImage);
                e.currentTarget.src = defaultImage;
              }}
              data-oid="f.jq6a2"
            />
          </div>

          {/* Contenido */}
          <div className="lg:w-1/2 p-6 flex flex-col" data-oid="st0nm6o">
            {/* Categorías */}
            <div className="flex gap-2 mb-4 flex-wrap" data-oid="63kj85i">
              {categories.map((category: string, idx: number) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-gray-100 text-gray-800"
                  data-oid="oh.bjcu"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Título */}
            <Link
              to={`/blog/${post.slug}`}
              className="block group-hover:text-gray-600 transition-colors"
              data-oid="d1i8u.u"
            >
              <h3
                className="text-2xl font-bold mb-3 leading-tight"
                data-oid="kkd-jd:"
              >
                {post.title}
              </h3>
            </Link>

            {/* Extracto */}
            <p
              className="text-gray-600 mb-6 leading-relaxed"
              data-oid="lw.o.1_"
            >
              {post.excerpt}
            </p>

            {/* Footer */}
            <div
              className="flex items-center justify-between w-full text-sm text-gray-500 mt-auto"
              data-oid="5y:acdn"
            >
              <div className="flex items-center gap-2" data-oid="pjmfapb">
                <User size={16} className="text-black" data-oid="uljmm_i" />
                <span data-oid="z08t0:1">{post.author}</span>
              </div>
              <div className="flex items-center gap-2" data-oid="plspcrz">
                <CalendarIcon
                  size={16}
                  className="text-black"
                  data-oid="wor8lr7"
                />

                <span data-oid="3o0o3p7">{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Tarjeta por defecto (no destacada)
  return (
    <Card
      className="h-full flex flex-col mb-6 border border-gray-200 hover:shadow-md transition-all duration-300 group overflow-hidden"
      data-oid="4h451-1"
    >
      {/* Imagen */}
      <div className="relative overflow-hidden aspect-video" data-oid="ua9ax48">
        <img
          src={getFullImageUrl(post.featuredImage)}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            console.error("Error cargando imagen:", post.featuredImage);
            e.currentTarget.src = defaultImage;
          }}
          data-oid="8kwgp8x"
        />
      </div>

      {/* Contenido */}
      <div className="p-5 flex-grow flex flex-col" data-oid="2249ck2">
        {/* Categorías */}
        <div className="flex flex-wrap gap-1 mb-3" data-oid="8qg17dw">
          {categories.slice(0, 2).map((category: string, idx: number) => (
            <Badge
              key={idx}
              variant="outline"
              className="bg-gray-100 text-gray-800 text-xs"
              data-oid="qo:gjp6"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Título */}
        <Link
          to={`/blog/${post.slug}`}
          className="block group-hover:text-gray-600 transition-colors"
          data-oid="70eifho"
        >
          <h3
            className="text-xl font-bold mb-2 leading-tight"
            data-oid="hjsm5xl"
          >
            {post.title}
          </h3>
        </Link>

        {/* Extracto */}
        <p
          className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-4"
          data-oid="k._shdn"
        >
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto" data-oid="4hq6_pq">
          <div
            className="flex items-center justify-between w-full text-sm text-gray-500"
            data-oid="k.bxg0x"
          >
            <div className="flex items-center gap-1" data-oid="95xf-yf">
              <User size={14} className="text-black" data-oid="_zcr7vx" />
              <span className="text-xs" data-oid=".qls0-x">
                {post.author}
              </span>
            </div>
            <div className="flex items-center gap-1" data-oid="zsscv1f">
              <CalendarIcon
                size={14}
                className="text-black"
                data-oid="x74taob"
              />

              <span className="text-xs" data-oid=":2vud.q">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
