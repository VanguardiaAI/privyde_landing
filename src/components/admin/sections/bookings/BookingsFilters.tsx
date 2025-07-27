import { Button } from "@/components/ui/button";

const BookingsFilters = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6" data-oid=":5lcp1e">
      <div
        className="bg-white rounded-xl shadow-sm p-4 lg:flex-1"
        data-oid="dc1d83o"
      >
        <h3
          className="text-sm font-medium text-gray-500 mb-3"
          data-oid="dwt8xa:"
        >
          Filtros
        </h3>
        <div className="flex flex-wrap gap-2" data-oid="dj734zh">
          <div className="w-full sm:w-auto" data-oid="lhhu7bf">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              data-oid="9.0e4sj"
            >
              <option value="" data-oid="gr.u2vy">
                Todos los estados
              </option>
              <option value="pending" data-oid=".tltvtl">
                Pendientes
              </option>
              <option value="confirmed" data-oid="oc4oj44">
                Confirmados
              </option>
              <option value="in_progress" data-oid="4jz4o-9">
                En progreso
              </option>
              <option value="completed" data-oid="kjcb9bh">
                Completados
              </option>
              <option value="cancelled" data-oid="g-60bfs">
                Cancelados
              </option>
              <option value="no_show" data-oid="47iq5i5">
                No presentados
              </option>
            </select>
          </div>
          <div className="w-full sm:w-auto" data-oid="6thjcr5">
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Fecha desde"
              data-oid="u7q-:bw"
            />
          </div>
          <div className="w-full sm:w-auto" data-oid="qxbxakp">
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Fecha hasta"
              data-oid="aaym0j."
            />
          </div>
          <Button variant="outline" size="sm" data-oid="h3n79kp">
            Aplicar filtros
          </Button>
        </div>
      </div>

      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex-1"
        data-oid="inkraty"
      >
        <div className="bg-white rounded-xl shadow-sm p-4" data-oid="wyswp5-">
          <h3 className="text-xs text-gray-500" data-oid="mrcywj1">
            Hoy
          </h3>
          <p className="text-2xl font-semibold mt-1" data-oid="dd8orgl">
            12
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4" data-oid="ggwdysb">
          <h3 className="text-xs text-gray-500" data-oid="vnl9n0p">
            Pendientes
          </h3>
          <p
            className="text-2xl font-semibold mt-1 text-amber-600"
            data-oid="es-2ez9"
          >
            8
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4" data-oid="yk_ma2i">
          <h3 className="text-xs text-gray-500" data-oid="_ek:w23">
            En progreso
          </h3>
          <p
            className="text-2xl font-semibold mt-1 text-gray-600"
            data-oid="3jh_zst"
          >
            3
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4" data-oid="-fg463u">
          <h3 className="text-xs text-gray-500" data-oid="4_znzjb">
            Incidencias
          </h3>
          <p
            className="text-2xl font-semibold mt-1 text-gray-600"
            data-oid="x3u:zv3"
          >
            2
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingsFilters;
