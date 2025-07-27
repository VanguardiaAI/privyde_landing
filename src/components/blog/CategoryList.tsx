import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CategoryListProps {
  categories: string[];
  activeCategory?: string;
}

export const CategoryList = ({
  categories,
  activeCategory,
}: CategoryListProps) => {
  return (
    <div className="flex flex-wrap gap-2 my-6" data-oid="hx5m:0k">
      <Link to="/blog" data-oid="23b2qmh">
        <Badge
          variant={!activeCategory ? "default" : "outline"}
          className={`text-sm px-4 py-2 cursor-pointer ${!activeCategory ? "bg-black hover:bg-gray-800" : "hover:bg-gray-100"}`}
          data-oid="c62cf34"
        >
          Todos
        </Badge>
      </Link>

      {categories.map((category, idx) => (
        <Link
          key={idx}
          to={`/blog/categoria/${category.toLowerCase()}`}
          data-oid="brmu_kj"
        >
          <Badge
            variant={
              activeCategory === category.toLowerCase() ? "default" : "outline"
            }
            className={`text-sm px-4 py-2 cursor-pointer ${
              activeCategory === category.toLowerCase()
                ? "bg-black hover:bg-gray-800"
                : "hover:bg-gray-100"
            }`}
            data-oid="ojipfs."
          >
            {category}
          </Badge>
        </Link>
      ))}
    </div>
  );
};
