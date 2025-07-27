import { cn } from "@/lib/utils";

export function RetroGridWithRoute({
  className,
  angle = 65,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden opacity-100 [perspective:200px]",
        className,
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
      data-oid="a3xx0g8"
    >
      {/* Grid animado */}
      <div
        className="absolute inset-0 [transform:rotateX(var(--grid-angle))]"
        data-oid="7wvy:o6"
      >
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_0)]",
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_0)]",
          )}
          style={{ opacity: 0.7 }}
          data-oid="md4-1aj"
        />
      </div>

      {/* Gradiente de fondo solo oscuro */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%"
        data-oid="zynk2wu"
      />

      {/* Línea de ruta naranja */}
      <svg
        className="absolute inset-0 w-full h-full z-10"
        viewBox="0 0 800 300"
        fill="none"
        style={{ opacity: 0.95 }}
        data-oid="xu.7sih"
      >
        <polyline
          points="0,50 300,200 500,100 650,150"
          stroke="#000000"
          strokeWidth="6"
          fill="none"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 10px #000000aa)" }}
          data-oid="j6bvh-o"
        />

        <circle
          cx="650"
          cy="150"
          r="16"
          fill="#000000"
          opacity="0.5"
          data-oid="cv246.5"
        />

        <circle cx="650" cy="150" r="8" fill="#000000" data-oid="_4g4hup" />
      </svg>
    </div>
  );
}
