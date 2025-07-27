import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Crear un array de páginas para mostrar (con elipsis si es necesario)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Si hay 7 o menos páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar la primera página
      pages.push(1);

      // Mostrar elipsis o páginas específicas
      if (currentPage > 3) {
        pages.push("...");
      }

      // Páginas alrededor de la actual
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Mostrar elipsis o páginas específicas
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Siempre mostrar la última página
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-10" data-oid="_gba:ca">
      <div className="flex items-center space-x-2" data-oid="ysheo7d">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          data-oid="bpmy4oi"
        >
          <ChevronLeft size={16} data-oid="8:sdmot" />
        </Button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-3 py-2"
              data-oid="95qf:4n"
            >
              ...
            </span>
          ) : (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              className={
                currentPage === page ? "bg-black hover:bg-gray-800" : ""
              }
              onClick={() => typeof page === "number" && onPageChange(page)}
              data-oid="gsv4f.a"
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          data-oid="li__y9i"
        >
          <ChevronRight size={16} data-oid="r2nibns" />
        </Button>
      </div>
    </div>
  );
};
