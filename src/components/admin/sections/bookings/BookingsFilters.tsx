import { Button } from "@/components/ui/button";

const BookingsFilters = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6" data-oid="qom9xlm">
      <div
        className="bg-white rounded-xl shadow-sm p-4 lg:flex-1"
        data-oid="sdyam.6"
      >
        <h3
          className="text-sm font-medium text-gray-500 mb-3"
          data-oid="60nboks"
        >
          Filtros
        </h3>
        <div className="flex flex-wrap gap-2" data-oid="4crfcjs">
          <div className="w-full sm:w-auto" data-oid="rmlssf9">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              data-oid="784s:.o"
            >
              <option value="" data-oid="z1j_fz2">
                Todos los estados
              </option>
              <option value="pending" data-oid="ifog0wl">
                Pendientes
              </option>
              <option value="confirmed" data-oid="bsa83x.">
                Confirmados
              </option>
              <option value="in_progress" data-oid="vvx.qgu">
                En progreso
              </option>
              <option value="completed" data-oid="j.6zbah">
                Completados
              </option>
              <option value="cancelled" data-oid="e00.ka4">
                Cancelados
              </option>
              <option value="no_show" data-oid="tt.m_6o">
                No presentados
              </option>
            </select>
          </div>
          <div className="w-full sm:w-auto" data-oid="iqum:n1">
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Fecha desde"
              data-oid="e6rk78m"
            />
          </div>
          <div className="w-full sm:w-auto" data-oid="_:_yziv">
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Fecha hasta"
              data-oid="7x7lcqe"
            />
          </div>
          <Button variant="outline" size="sm" data-oid="-y16pn0">
            Aplicar filtros
          </Button>
        </div>
      </div>

      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex-1"
        data-oid="o2yy0t2"
      >
        <div className="bg-white rounded-xl shadow-sm p-4" data-oid="7r987z0">
          <h3 className="text-xs text-gray-500" data-oid="1x39v9s">
            Hoy
          </h3>
          <p className="text-2xl font-semibold mt-1" data-oid="n_jn8al">
            12
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4" data-oid="pwjxhoh">
          <h3 className="text-xs text-gray-500" data-oid="5u.c5q0">
            Pendientes
          </h3>
          <p
            className="text-2xl font-semibold mt-1 text-amber-600"
            data-oid="4-3i_f."
          >
            8
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4" data-oid="ip2cyoq">
          <h3 className="text-xs text-gray-500" data-oid="vxj4eq-">
            En progreso
          </h3>
          <p
            className="text-2xl font-semibold mt-1 text-gray-600"
            data-oid="7g282a_"
          >
            3
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4" data-oid="66bfv3p">
          <h3 className="text-xs text-gray-500" data-oid="gmrbtgd">
            Incidencias
          </h3>
          <p
            className="text-2xl font-semibold mt-1 text-gray-600"
            data-oid="pdp4rul"
          >
            2
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingsFilters;
