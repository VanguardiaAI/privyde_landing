import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  Image,
} from "lucide-react";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { blogService } from "@/services/blogService";

// API URL base
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BLOG_API_URL = `${API_URL}/blog`;

// Definir tipos para los artículos del blog
export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  status: "draft" | "published" | "scheduled";
  publishDate: string;
  lastModified: string;
  featured: boolean;
  featuredImage?: string;
  categories: string[];
  tags: string[];
  seoData?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl?: string;
  };
}

const BlogSection = () => {
  // Estados para la gestión de artículos
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiPrompt, setAIPrompt] = useState("");
  const [aiGeneratedContent, setAIGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [markdownContent, setMarkdownContent] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    author: "",
    status: "draft",
    publishDate: "",
    lastModified: new Date().toISOString().split("T")[0],
    featured: false,
    categories: [],
    tags: [],
    seoData: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
    },
  });

  // Cargar artículos al iniciar
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  // Función para cargar los artículos desde la API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      console.log(
        `Realizando petición a: ${BLOG_API_URL}/posts?page=${currentPage}`,
      );
      const response = await axios.get(
        `${BLOG_API_URL}/posts?page=${currentPage}`,
      );
      console.log("Respuesta recibida:", response.data);
      setPosts(response.data.posts || response.data);
      setTotalPages(response.data.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los artículos:", error);
      toast.error("Error al cargar los artículos");
      setLoading(false);
    }
  };

  // Función para iniciar la creación de un nuevo artículo
  const handleAddPost = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      author: "",
      status: "draft",
      publishDate: "",
      lastModified: new Date().toISOString().split("T")[0],
      featured: false,
      categories: [],
      tags: [],
      seoData: {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
      },
    });
    setMarkdownContent("");
    setEditingPost(null);
    setShowEditor(true);
    setShowAIGenerator(false);
  };

  // Función para editar un artículo existente
  const handleEditPost = async (postId: string) => {
    try {
      console.log("Intentando editar artículo con ID:", postId);

      // Extraer el ID real en caso de que sea un objeto
      const extractRealId = (id: any): string => {
        if (typeof id === "object" && id.$oid) {
          return id.$oid;
        }
        return String(id);
      };

      // Normalizar el ID
      const normalizedId = extractRealId(postId);
      console.log("ID normalizado:", normalizedId);

      // Usar el servicio para obtener el post por ID
      const post = await blogService.getPostById(normalizedId);

      if (!post) {
        // Intentar buscar en los posts cargados actualmente
        const localPost = posts.find(
          (p) =>
            extractRealId(p._id) === normalizedId ||
            extractRealId((p as any).id) === normalizedId,
        );

        if (localPost) {
          console.log("Artículo encontrado en memoria local:", localPost);
          setFormData({
            ...localPost,
            _id: extractRealId(localPost._id),
            categories: Array.isArray(localPost.categories)
              ? localPost.categories
              : [],
            tags: Array.isArray(localPost.tags) ? localPost.tags : [],
            seoData: localPost.seoData || {
              metaTitle: localPost.title || "",
              metaDescription: localPost.excerpt || "",
              keywords: [],
            },
          });
          setMarkdownContent(localPost.content || "");
          setEditingPost(localPost);
          setShowEditor(true);
          setShowAIGenerator(false);
          return;
        }

        throw new Error(
          "No se pudo encontrar el artículo con ID: " + normalizedId,
        );
      }

      console.log("Artículo recuperado:", post);

      // Asegurarnos de que tenemos todas las propiedades necesarias
      setFormData({
        ...post,
        _id: extractRealId(post._id),
        categories: Array.isArray(post.categories) ? post.categories : [],
        tags: Array.isArray(post.tags) ? post.tags : [],
        seoData: post.seoData || {
          metaTitle: post.title || "",
          metaDescription: post.excerpt || "",
          keywords: [],
        },
      });

      setMarkdownContent(post.content || "");
      setEditingPost(post);
      setShowEditor(true);
      setShowAIGenerator(false);
    } catch (error) {
      console.error("Error al cargar el artículo:", error);
      toast.error(
        "Error al cargar el artículo para edición: " +
          (error instanceof Error ? error.message : "Error desconocido"),
      );
    }
  };

  // Función para eliminar un artículo
  const handleDeletePost = async (postId: string) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este artículo?")
    ) {
      try {
        const success = await blogService.deletePost(postId);

        if (success) {
          toast.success("Artículo eliminado correctamente");
          fetchPosts();
        } else {
          toast.error("Hubo un problema al eliminar el artículo");
        }
      } catch (error) {
        console.error("Error al eliminar el artículo:", error);
        toast.error("Error al eliminar el artículo");
      }
    }
  };

  // Función para ver la vista previa de un artículo
  const handleViewPost = (slug: string) => {
    window.open(`/blog/${slug}`, "_blank");
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof BlogPost] || {}) as Record<string, any>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Manejar cambios en los campos de tipo array
  const handleArrayInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof BlogPost,
  ) => {
    const value = e.target.value;

    // Solo dividimos el valor en array cuando necesitamos guardarlo, pero no al escribir
    setFormData((prev) => {
      // Almacenar el valor tal cual en un campo temporal para mantener la entrada del usuario
      const updatedData = {
        ...prev,
        [`${field}_input`]: value,
      } as any;

      // Actualizar el array real solo cuando se guarde el formulario
      if (value.includes(",")) {
        const arrayValue = value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "");
        updatedData[field] = arrayValue;
        console.log(`Campo ${field} actualizado:`, arrayValue);
      } else if (value.trim() !== "") {
        // Si solo hay un valor sin comas
        updatedData[field] = [value.trim()];
      } else {
        // Si está vacío
        updatedData[field] = [];
      }

      return updatedData;
    });
  };

  // Manejar cambios en los campos de array para SEO
  const handleSeoArrayInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    setFormData((prev) => {
      // Asegurarnos de que seoData existe
      const currentSeoData = prev.seoData || {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
      };

      // Almacenar el valor tal cual para la entrada del usuario
      const updatedSeoData = {
        ...currentSeoData,
        keywords_input: value,
      } as any;

      // Actualizar el array real
      if (value.includes(",")) {
        const arrayValue = value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "");
        updatedSeoData.keywords = arrayValue;
        console.log("Keywords SEO actualizadas:", arrayValue);
      } else if (value.trim() !== "") {
        updatedSeoData.keywords = [value.trim()];
      } else {
        updatedSeoData.keywords = [];
      }

      return {
        ...prev,
        seoData: updatedSeoData,
      };
    });
  };

  // Manejar cambios en el toggle de artículo destacado
  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, featured: e.target.checked }));
  };

  /*
  const _handleImagePreview = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  */

  // Formatear URL de imagen para asegurar que sea completa
  const defaultImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UsIHNhbnMtc2VyaWYiIGZpbGw9IiM5OTk5OTkiPkVycm9yIGNhcmdhbmRvIGltYWdlbjwvdGV4dD48L3N2Zz4=";

  const getFullImageUrl = (url: string | undefined): string => {
    if (!url) return "/placeholder.png";

    // Si es una URL absoluta o ya comienza con http, mantenerla como está
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    try {
      // Si la URL es relativa al servidor, construir la URL completa
      // Eliminar /api del final si existe para acceder correctamente a la ruta de uploads
      const baseApiUrl = API_URL.replace(/\/api$/, "");

      // Asegurarnos de que la URL tenga el formato correcto
      let fullUrl = url;
      if (!url.startsWith("/")) {
        fullUrl = "/" + url;
      }

      // Combinar la URL base con la ruta relativa
      return baseApiUrl + fullUrl;
    } catch (error) {
      console.error("Error al formatear URL de imagen:", error);
      return defaultImage;
    }
  };

  // Configuración para Dropzone (subida de imágenes)
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (!file) return;

        try {
          setUploadingImage(true);
          const formData = new FormData();
          formData.append("image", file);

          const response = await axios.post(
            `${BLOG_API_URL}/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          // Asegurarse de guardar la URL completa
          const imageUrl = getFullImageUrl(response.data.imageUrl);
          console.log("Imagen subida URL:", imageUrl);

          setFormData((prev) => ({
            ...prev,
            featuredImage: imageUrl,
          }));

          toast.success("Imagen subida correctamente");
          setUploadingImage(false);
        } catch (error) {
          console.error("Error al subir la imagen:", error);
          toast.error("Error al subir la imagen");
          setUploadingImage(false);
        }
      }
    },
  });

  // Guardar el artículo (crear o actualizar)
  const handleSubmitPost = async () => {
    // Validación básica
    if (!formData.title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    try {
      // Formatear correctamente las fechas en formato ISO con Z
      const formatDate = (dateString: string) => {
        if (!dateString) return new Date().toISOString().split(".")[0] + "Z";

        // Si solo es una fecha sin hora (YYYY-MM-DD), añadir la hora
        if (dateString.length === 10) {
          return (
            new Date(dateString + "T00:00:00").toISOString().split(".")[0] + "Z"
          );
        }

        // Asegurarnos de que la fecha tenga el formato ISO con Z
        const date = new Date(dateString);
        return date.toISOString().split(".")[0] + "Z";
      };

      // Procesar campos de tipo array
      const processArrayField = (field: string): string[] => {
        // Primero intentamos usar el campo temporal (_input)
        const inputField = (formData as any)[`${field}_input`];

        if (inputField) {
          // Si hay comas, dividir por comas
          if (inputField.includes(",")) {
            return inputField
              .split(",")
              .map((item: string) => item.trim())
              .filter((item: string) => item !== "");
          }
          // Si hay un solo valor sin comas
          else if (inputField.trim() !== "") {
            return [inputField.trim()];
          }
        }

        // Si no hay campo temporal, usar el array existente
        const existingArray = (formData as any)[field];
        return Array.isArray(existingArray) ? existingArray : [];
      };

      // Procesar palabras clave SEO
      const processKeywords = (): string[] => {
        const keywordsInput = (formData.seoData as any)?.keywords_input;

        if (keywordsInput) {
          // Si hay comas, dividir por comas
          if (keywordsInput.includes(",")) {
            return keywordsInput
              .split(",")
              .map((item: string) => item.trim())
              .filter((item: string) => item !== "");
          }
          // Si hay un solo valor sin comas
          else if (keywordsInput.trim() !== "") {
            return [keywordsInput.trim()];
          }
        }

        // Si no hay campo temporal, usar el array existente
        return Array.isArray(formData.seoData?.keywords)
          ? formData.seoData.keywords
          : [];
      };

      // Preparar datos para enviar con el formato correcto
      const dataToSubmit = {
        ...formData,
        publishDate: formatDate(formData.publishDate),
        lastModified: formatDate(new Date().toISOString()),
        content: markdownContent,
        // Asegurar que featuredImage sea una URL completa
        featuredImage: getFullImageUrl(formData.featuredImage),
        // Procesar categorías y etiquetas
        categories: processArrayField("categories"),
        tags: processArrayField("tags"),
        // Asegurar que seoData tenga la estructura correcta
        seoData: {
          metaTitle: formData.seoData?.metaTitle || formData.title || "",
          metaDescription:
            formData.seoData?.metaDescription || formData.excerpt || "",
          keywords: processKeywords(),
        },
      };

      console.log("Datos a enviar:", dataToSubmit);

      let response;
      if (editingPost?._id) {
        // Actualizar artículo existente usando el servicio
        console.log(`Actualizando artículo con ID: ${editingPost._id}`);
        response = await blogService.updatePost(editingPost._id, dataToSubmit);

        if (response) {
          console.log("Respuesta de actualización:", response);
          toast.success("Artículo actualizado correctamente");
        } else {
          throw new Error("No se pudo actualizar el artículo");
        }
      } else {
        // Crear nuevo artículo usando el servicio
        console.log("Creando nuevo artículo");
        response = await blogService.createPost(dataToSubmit);

        if (response) {
          console.log("Respuesta de creación:", response);
          toast.success("Artículo creado correctamente");
        } else {
          throw new Error("No se pudo crear el artículo");
        }
      }

      setShowEditor(false);
      fetchPosts();
    } catch (error) {
      console.error("Error al guardar el artículo:", error);
      toast.error(
        "Error al guardar el artículo: " +
          (error instanceof Error ? error.message : "Error desconocido"),
      );
    }
  };

  // Abrir el generador de contenido con IA
  const handleOpenAIGenerator = () => {
    setShowAIGenerator(true);
    setShowEditor(false);
  };

  // Generar contenido con IA usando la API de OpenAI
  const handleGenerateContent = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Por favor, proporciona un prompt para generar el contenido");
      return;
    }

    setIsGenerating(true);

    try {
      // Llamar a la API de generación de contenido
      const generatedPost = await blogService.generateContent(aiPrompt);

      if (!generatedPost) {
        throw new Error("No se pudo generar el contenido");
      }

      // Actualizar el estado con el contenido generado
      setAIGeneratedContent(generatedPost.content || "");

      // Guardar el post generado para usarlo después
      setFormData((prev) => ({
        ...prev,
        title: generatedPost.title || "",
        slug: generatedPost.slug || "",
        excerpt: generatedPost.excerpt || "",
        author: generatedPost.author || "IA Privyde",
        content: generatedPost.content || "",
        categories: generatedPost.categories || [],
        tags: generatedPost.tags || [],
        status: "draft",
        seoData: {
          metaTitle:
            generatedPost.seoData?.metaTitle || generatedPost.title || "",
          metaDescription:
            generatedPost.seoData?.metaDescription ||
            generatedPost.excerpt ||
            "",
          keywords: Array.isArray(generatedPost.seoData?.keywords)
            ? generatedPost.seoData.keywords
            : [],
        },
      }));

      toast.success("Contenido generado correctamente");
    } catch (error) {
      console.error("Error al generar contenido:", error);
      toast.error(
        "Error al generar contenido: " +
          (error instanceof Error ? error.message : "Error desconocido"),
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Usar el contenido generado por IA en el editor
  const handleUseGeneratedContent = () => {
    if (!aiGeneratedContent) {
      toast.error("No hay contenido generado para usar");
      return;
    }

    // Actualizar el editor con el contenido generado
    setMarkdownContent(aiGeneratedContent);

    // Mostrar la vista de edición
    setShowEditor(true);
    setShowAIGenerator(false);
  };

  // Filtrar posts por búsqueda
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.categories.some((cat) =>
        cat.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  // Cambiar de página
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-6" data-oid="qzz_gpl">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        data-oid="ns.kyb3"
      />

      <div className="flex justify-between items-center" data-oid="yxwh28_">
        <h1 className="text-2xl font-bold text-gray-800" data-oid="bn4p1nv">
          Gestión del Blog
        </h1>
        <div className="flex space-x-2" data-oid="7ii9.ro">
          {!showEditor && !showAIGenerator && (
            <>
              <Button
                onClick={handleOpenAIGenerator}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                data-oid="5iw1qji"
              >
                <RefreshCw size={18} className="mr-2" data-oid="g-o-fl8" />
                Generar con IA
              </Button>
              <Button
                onClick={handleAddPost}
                className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                data-oid="hfy6.4g"
              >
                <Plus size={18} className="mr-2" data-oid="crr6g08" />
                Nuevo Artículo
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Editor de Artículos */}
      {showEditor && (
        <div className="bg-white rounded-xl shadow-md p-6" data-oid="u24d34g">
          <div
            className="flex justify-between items-center mb-4"
            data-oid="wge.kxv"
          >
            <h2 className="text-xl font-semibold" data-oid="gpcyyub">
              {editingPost ? "Editar Artículo" : "Nuevo Artículo"}
            </h2>
            <Button
              onClick={() => {
                setShowEditor(false);
                setEditingPost(null);
              }}
              className="flex items-center px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              data-oid="-h45b3f"
            >
              <ChevronLeft size={18} className="mr-1" data-oid="kz2yjwa" />
              Volver
            </Button>
          </div>

          <div className="space-y-4" data-oid="i4z.fk5">
            <div data-oid="int2dfw">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="jf8zy19"
              >
                Título
              </label>
              <input
                type="text"
                name="title"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={formData.title}
                onChange={handleInputChange}
                data-oid="awjx1ww"
              />
            </div>

            <div data-oid="yhwk1mh">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="xoy94pe"
              >
                Slug (URL amigable)
              </label>
              <input
                type="text"
                name="slug"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="Se generará automáticamente si se deja en blanco"
                data-oid="7_tgvca"
              />

              <p className="text-xs text-gray-500 mt-1" data-oid="6-hkf_1">
                Si se deja en blanco, se generará automáticamente a partir del
                título
              </p>
            </div>

            <div data-oid="y1wng92">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="d8gx6xd"
              >
                Extracto
              </label>
              <textarea
                name="excerpt"
                className="w-full p-2 border border-gray-300 rounded-md h-20 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={formData.excerpt}
                onChange={handleInputChange}
                data-oid="vpx2qay"
              />
            </div>

            <div data-oid=":e7v1j9">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="i8mzsh0"
              >
                Contenido (Markdown)
              </label>
              <div
                className="border border-gray-300 rounded-md overflow-hidden"
                data-oid="_ze3vxb"
              >
                <MDEditor
                  value={markdownContent}
                  onChange={(value) => setMarkdownContent(value || "")}
                  height={400}
                  preview="edit"
                  data-oid="1x07b28"
                />
              </div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-oid="s._6b0h"
            >
              <div data-oid="f23nlyq">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="4g1e2en"
                >
                  Autor
                </label>
                <input
                  type="text"
                  name="author"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.author}
                  onChange={handleInputChange}
                  data-oid="f-9ehgy"
                />
              </div>

              <div data-oid=".rkso_b">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="91ln8qk"
                >
                  Estado
                </label>
                <select
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.status}
                  onChange={handleInputChange}
                  data-oid="wyl9g:q"
                >
                  <option value="draft" data-oid="54uga.-">
                    Borrador
                  </option>
                  <option value="published" data-oid="145c:b2">
                    Publicado
                  </option>
                  <option value="scheduled" data-oid="pz7vocb">
                    Programado
                  </option>
                </select>
              </div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-oid="rr-0pk-"
            >
              <div data-oid="m4nqnad">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="w1yy8pd"
                >
                  Fecha de publicación
                </label>
                <input
                  type="date"
                  name="publishDate"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  data-oid="k:b5j-k"
                />
              </div>

              <div className="flex items-center pt-7" data-oid="zrt1x0d">
                <input
                  type="checkbox"
                  id="featured"
                  className="mr-2 h-4 w-4 text-gray-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={formData.featured}
                  onChange={handleFeaturedChange}
                  data-oid="0lnqny-"
                />

                <label
                  htmlFor="featured"
                  className="text-sm font-medium text-gray-700"
                  data-oid="9_82i3c"
                >
                  Artículo destacado
                </label>
              </div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-oid="ihas_y8"
            >
              <div data-oid="xu0_qv3">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="40eob5d"
                >
                  Categorías (separadas por coma)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={
                    (formData as any).categories_input ||
                    formData.categories.join(", ")
                  }
                  onChange={(e) => handleArrayInputChange(e, "categories")}
                  placeholder="Ej: Negocios, Viajes, Transporte"
                  data-oid="6:g_re8"
                />

                <p className="text-xs text-gray-500 mt-1" data-oid="_5.pig3">
                  Puedes añadir múltiples categorías separadas por comas
                </p>
              </div>

              <div data-oid="ahtobk8">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="h0g-c5x"
                >
                  Etiquetas (separadas por coma)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={
                    (formData as any).tags_input || formData.tags.join(", ")
                  }
                  onChange={(e) => handleArrayInputChange(e, "tags")}
                  placeholder="Ej: ejecutivo, limousinas, 2024"
                  data-oid="75:s1gt"
                />

                <p className="text-xs text-gray-500 mt-1" data-oid="ee3_7lk">
                  Puedes añadir múltiples etiquetas separadas por comas
                </p>
              </div>
            </div>

            <div data-oid="9fvp2fz">
              <label
                className="block text-sm font-medium text-gray-700 mb-3"
                data-oid="n26_pu9"
              >
                Imagen destacada
              </label>

              {formData.featuredImage ? (
                <div className="mb-4" data-oid="hc9px:y">
                  <div className="relative w-full max-w-md" data-oid="g27q4je">
                    <img
                      src={getFullImageUrl(formData.featuredImage)}
                      alt="Imagen destacada"
                      className="w-full h-auto rounded-md border border-gray-300"
                      onError={(e) => {
                        console.error(
                          "Error cargando imagen:",
                          formData.featuredImage,
                        );
                        e.currentTarget.src = defaultImage;
                      }}
                      data-oid=":.9tvtf"
                    />

                    <button
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, featuredImage: "" }))
                      }
                      className="absolute top-2 right-2 bg-black p-1 rounded-full text-white hover:bg-gray-800"
                      data-oid="3bt.qnt"
                    >
                      <Trash2 size={16} data-oid="kg6fet2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-gray-500 transition-colors"
                  data-oid="me9sdbt"
                >
                  <input {...getInputProps()} data-oid="wabyqv:" />
                  {uploadingImage ? (
                    <div
                      className="flex flex-col items-center justify-center"
                      data-oid="bc20lfm"
                    >
                      <RefreshCw
                        className="h-10 w-10 text-gray-400 animate-spin"
                        data-oid="vr.kv_."
                      />

                      <p
                        className="mt-2 text-sm text-gray-500"
                        data-oid="snzf4:-"
                      >
                        Subiendo imagen...
                      </p>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center"
                      data-oid="d6:er5s"
                    >
                      <Image
                        className="h-10 w-10 text-gray-400"
                        data-oid="30nf9e3"
                      />

                      <p
                        className="mt-2 text-sm text-gray-500"
                        data-oid="y9pgbbc"
                      >
                        Arrastra una imagen aquí o haz clic para seleccionar una
                      </p>
                      <p
                        className="text-xs text-gray-400 mt-1"
                        data-oid="hva1:.t"
                      >
                        JPG, PNG, GIF, WebP
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t pt-4 mt-4" data-oid="va-izc7">
              <h3
                className="text-md font-medium text-gray-800 mb-2"
                data-oid="-epm5eh"
              >
                SEO
              </h3>

              <div className="space-y-4" data-oid="9187w_f">
                <div data-oid="r_ez:l8">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="ym336zi"
                  >
                    Meta Título
                  </label>
                  <input
                    type="text"
                    name="seoData.metaTitle"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={formData.seoData?.metaTitle || ""}
                    onChange={handleInputChange}
                    data-oid="9j6d3:2"
                  />
                </div>

                <div data-oid="p:0ur4u">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="2yacc3e"
                  >
                    Meta Descripción
                  </label>
                  <textarea
                    name="seoData.metaDescription"
                    className="w-full p-2 border border-gray-300 rounded-md h-20 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={formData.seoData?.metaDescription || ""}
                    onChange={handleInputChange}
                    data-oid="y839pvo"
                  />
                </div>

                <div data-oid="uks_jhz">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="krjtp.t"
                  >
                    Palabras clave (separadas por coma)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={
                      (formData.seoData as any)?.keywords_input ||
                      formData.seoData?.keywords.join(", ") ||
                      ""
                    }
                    onChange={handleSeoArrayInputChange}
                    placeholder="Ej: transporte ejecutivo, viajes corporativos, servicio premium"
                    data-oid="kl.fl5b"
                  />

                  <p className="text-xs text-gray-500 mt-1" data-oid="ym8o2e7">
                    Puedes añadir múltiples palabras clave separadas por comas
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4" data-oid="1-si9cu">
              <Button
                onClick={() => {
                  setShowEditor(false);
                  setEditingPost(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                data-oid="jz0:lxm"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmitPost}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                data-oid="vw6f7g7"
              >
                {editingPost ? "Actualizar" : "Publicar"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Generador de Contenido con IA */}
      {showAIGenerator && (
        <div className="bg-white rounded-xl shadow-md p-6" data-oid="ndq_qvt">
          <div
            className="flex justify-between items-center mb-4"
            data-oid="-zx0:eg"
          >
            <h2 className="text-xl font-semibold" data-oid="tm7e17h">
              Generador de Contenido con IA
            </h2>
            <Button
              onClick={() => setShowAIGenerator(false)}
              className="flex items-center px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              data-oid=".s8i:u8"
            >
              <ChevronLeft size={18} className="mr-1" data-oid="y5nmoai" />
              Volver
            </Button>
          </div>

          <div className="space-y-4" data-oid="9.mj4mw">
            <div data-oid="v2a2cyy">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="y8r5-13"
              >
                Describe el artículo que deseas generar
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ej: Un artículo sobre las ventajas del transporte ejecutivo para eventos corporativos, enfocado en la puntualidad y el servicio personalizado."
                value={aiPrompt}
                onChange={(e) => setAIPrompt(e.target.value)}
                data-oid="709x.c2"
              />

              <p className="text-xs text-gray-500 mt-1" data-oid=":htg21c">
                Sé específico con los temas, palabras clave y el enfoque que
                deseas para el artículo.
              </p>
            </div>

            <div className="flex justify-end space-x-3" data-oid="q1e2nfb">
              <Button
                onClick={() => setShowAIGenerator(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                data-oid=":osd2xq"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleGenerateContent}
                disabled={!aiPrompt.trim() || isGenerating}
                className={`px-4 py-2 ${isGenerating ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"} text-white rounded-lg transition-colors flex items-center`}
                data-oid="ifsuo3q"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw
                      size={18}
                      className="mr-2 animate-spin"
                      data-oid="d80b27g"
                    />
                    Generando...
                  </>
                ) : (
                  <>
                    <RefreshCw size={18} className="mr-2" data-oid="2k3ms5i" />
                    Generar
                  </>
                )}
              </Button>
            </div>

            {aiGeneratedContent && (
              <div className="mt-6 border-t pt-4" data-oid="on-mxdb">
                <h3
                  className="text-md font-medium text-gray-800 mb-2"
                  data-oid="pfyw::p"
                >
                  Contenido Generado
                </h3>
                <div data-color-mode="light" data-oid="1xf9b:a">
                  <MDEditor.Markdown
                    source={aiGeneratedContent}
                    className="p-4 bg-gray-50 rounded-md h-60 overflow-y-auto"
                    data-oid="4xeb_hf"
                  />
                </div>

                <div className="flex justify-end mt-4" data-oid="srgd5xm">
                  <Button
                    onClick={handleUseGeneratedContent}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    data-oid="txuy86z"
                  >
                    Usar este contenido
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lista de Artículos */}
      {!showEditor && !showAIGenerator && (
        <>
          <div
            className="bg-white rounded-lg shadow p-6 mb-8"
            data-oid="diukdhv"
          >
            <div className="relative" data-oid="gd4n9c-">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
                data-oid="dh62ds."
              />

              <input
                type="text"
                placeholder="Buscar artículos..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-oid="lbshup."
              />
            </div>
          </div>

          <div
            className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
            data-oid="ie53d0-"
          >
            {loading ? (
              <div className="p-8 text-center" data-oid="_ibjpzb">
                <RefreshCw
                  size={36}
                  className="mx-auto animate-spin text-black"
                  data-oid="iljk9fw"
                />

                <p className="mt-2 text-gray-600" data-oid="mmiyacv">
                  Cargando artículos...
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto" data-oid="mzrm8nn">
                <table className="w-full" data-oid="rw6fd4d">
                  <thead data-oid="emmngh5">
                    <tr className="bg-gray-50" data-oid="9a52qho">
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="h_258f0"
                      >
                        Título
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="yc3m2-b"
                      >
                        Autor
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="g.zvlyi"
                      >
                        Categorías
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="nw2aas5"
                      >
                        Estado
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="-yb0spv"
                      >
                        Fecha
                      </th>
                      <th
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="qp76571"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y divide-gray-200"
                    data-oid="63uq6n5"
                  >
                    {filteredPosts.map((post) => (
                      <tr
                        key={post._id}
                        className="hover:bg-gray-50"
                        data-oid="_fmtjy."
                      >
                        <td className="px-6 py-4" data-oid="e5c__g.">
                          <div className="flex items-center" data-oid="0zwor57">
                            {post.featuredImage && (
                              <img
                                src={getFullImageUrl(post.featuredImage)}
                                alt={post.title}
                                className="w-10 h-10 rounded-md object-cover mr-3"
                                onError={(e) => {
                                  console.error(
                                    "Error cargando imagen:",
                                    post.featuredImage,
                                  );
                                  e.currentTarget.src = defaultImage;
                                }}
                                data-oid="956glq1"
                              />
                            )}
                            <div
                              className="text-sm font-medium text-gray-900"
                              data-oid="u.lofda"
                            >
                              {post.title}
                            </div>
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 text-sm text-gray-500"
                          data-oid=":lg3bya"
                        >
                          {post.author}
                        </td>
                        <td className="px-6 py-4" data-oid="9l154a4">
                          <div
                            className="flex flex-wrap gap-1"
                            data-oid=".1iwsqk"
                          >
                            {post.categories.map((category, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                                data-oid="u5ld-5."
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4" data-oid="hbjx_mj">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              post.status === "published"
                                ? "bg-gray-200 text-green-800"
                                : post.status === "draft"
                                  ? "bg-gray-200 text-yellow-800"
                                  : "bg-gray-200 text-blue-800"
                            }`}
                            data-oid="p__kelw"
                          >
                            {post.status === "published"
                              ? "Publicado"
                              : post.status === "draft"
                                ? "Borrador"
                                : "Programado"}
                          </span>
                        </td>
                        <td
                          className="px-6 py-4 text-sm text-gray-500"
                          data-oid="7o-_rma"
                        >
                          {post.publishDate || "Sin publicar"}
                        </td>
                        <td
                          className="px-6 py-4 text-right text-sm font-medium"
                          data-oid="wux-4gt"
                        >
                          <div
                            className="flex justify-end space-x-2"
                            data-oid="u._1gr."
                          >
                            <button
                              onClick={() => handleViewPost(post.slug)}
                              className="text-gray-600 hover:text-blue-900"
                              data-oid=".j4qzi-"
                            >
                              <Eye size={18} data-oid="-3lk.vt" />
                            </button>
                            <button
                              onClick={() => handleEditPost(post._id!)}
                              className="text-amber-600 hover:text-amber-900"
                              data-oid="3:.65z."
                            >
                              <Edit size={18} data-oid="3qtuvr3" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post._id!)}
                              className="text-gray-600 hover:text-red-900"
                              data-oid="xt5aqlx"
                            >
                              <Trash2 size={18} data-oid="8-w0o2a" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredPosts.length === 0 && (
                      <tr data-oid="6qqx.m-">
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                          data-oid=":34tl0d"
                        >
                          No se encontraron artículos
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Paginación */}
            <div
              className="px-6 py-4 flex items-center justify-between border-t"
              data-oid="0fdyopk"
            >
              <div className="text-sm text-gray-500" data-oid="pxeh4kh">
                Mostrando{" "}
                <span className="font-medium" data-oid="f9ybz_g">
                  {filteredPosts.length}
                </span>{" "}
                artículos
              </div>
              <div className="flex space-x-2" data-oid="s:wzuoy">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  data-oid="v-8y4xw"
                >
                  <ChevronLeft size={16} data-oid="bfa-tlu" />
                </button>
                <span className="px-3 py-1 text-sm" data-oid="-.2-srj">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  data-oid="5ez_inn"
                >
                  <ChevronRight size={16} data-oid="q3d.t-9" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogSection;
