import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  AlertCircle,
  Star,
  Users,
  Car,
  DollarSign,
  Clock,
  Map,
  BarChart2,
  Calendar,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Datos de ejemplo para las visualizaciones
const monthlyRevenueData = [
  { name: "Ene", revenue: 15000, gastos: 8000, beneficio: 7000 },
  { name: "Feb", revenue: 18000, gastos: 9500, beneficio: 8500 },
  { name: "Mar", revenue: 17000, gastos: 9000, beneficio: 8000 },
  { name: "Abr", revenue: 21000, gastos: 10000, beneficio: 11000 },
  { name: "May", revenue: 24000, gastos: 11000, beneficio: 13000 },
  { name: "Jun", revenue: 32000, gastos: 14000, beneficio: 18000 },
  { name: "Jul", revenue: 38000, gastos: 15000, beneficio: 23000 },
  { name: "Ago", revenue: 36000, gastos: 15500, beneficio: 20500 },
  { name: "Sep", revenue: 31000, gastos: 14000, beneficio: 17000 },
  { name: "Oct", revenue: 28000, gastos: 13000, beneficio: 15000 },
  { name: "Nov", revenue: 25000, gastos: 12000, beneficio: 13000 },
  { name: "Dic", revenue: 33000, gastos: 14500, beneficio: 18500 },
];

const bookingsByType = [
  { name: "Aeropuerto", value: 45, color: "#000000" },
  { name: "Urbano", value: 25, color: "#404040" },
  { name: "Por Horas", value: 15, color: "#525252" },
  { name: "Eventos", value: 10, color: "#737373" },
  { name: "Corporativo", value: 5, color: "#A3A3A3" },
];

const vehicleUsage = [
  { name: "Sedan Lujo", value: 35, color: "#000000" },
  { name: "SUV Premium", value: 25, color: "#262626" },
  { name: "Limusina", value: 15, color: "#404040" },
  { name: "Van Ejecutiva", value: 10, color: "#525252" },
  { name: "Minibus VIP", value: 5, color: "#737373" },
];

const dailyBookings = [
  { name: "Lun", value: 25 },
  { name: "Mar", value: 30 },
  { name: "Mié", value: 28 },
  { name: "Jue", value: 35 },
  { name: "Vie", value: 40 },
  { name: "Sáb", value: 55 },
  { name: "Dom", value: 45 },
];

const clientSegmentation = [
  { name: "VIP", value: 30, color: "#000000" },
  { name: "Empresas", value: 35, color: "#262626" },
  { name: "Turismo", value: 20, color: "#404040" },
  { name: "Eventos", value: 15, color: "#525252" },
];

const routePopularity = [
  { name: "Aeropuerto-Centro", value: 40, color: "#000000" },
  { name: "Costa-Ciudad", value: 25, color: "#262626" },
  { name: "Hoteles-Restaurantes", value: 15, color: "#404040" },
  { name: "Eventos Especiales", value: 12, color: "#525252" },
  { name: "Recorrido Turístico", value: 8, color: "#737373" },
];

const driverPerformance = [
  { name: "Carlos R.", rating: 4.9, bookings: 45 },
  { name: "Laura M.", rating: 4.8, bookings: 38 },
  { name: "Javier L.", rating: 4.9, bookings: 42 },
  { name: "Sofía G.", rating: 4.7, bookings: 35 },
  { name: "Miguel P.", rating: 4.6, bookings: 32 },
];

// Componente para mostrar barras horizontales
const HorizontalBar = ({
  value,
  maxValue,
  color,
}: {
  value: number;
  maxValue: number;
  color: string;
}) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5" data-oid="ia8fei.">
      <div
        className="h-2.5 rounded-full"
        style={{ width: `${percentage}%`, backgroundColor: color }}
        data-oid="-27vdr5"
      ></div>
    </div>
  );
};

// Componente para mostrar barras verticales
const VerticalBar = ({
  value,
  maxValue,
  color,
  label,
}: {
  value: number;
  maxValue: number;
  color: string;
  label: string;
}) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="flex flex-col items-center" data-oid="p460t_g">
      <div
        className="flex-1 w-16 bg-gray-100 rounded-t-lg relative h-[150px] flex items-end"
        data-oid="au:_-5a"
      >
        <div
          className="w-full rounded-t-lg"
          style={{ height: `${percentage}%`, backgroundColor: color }}
          data-oid="1b0p_.j"
        ></div>
      </div>
      <div className="text-xs mt-1 text-gray-600" data-oid="-047.so">
        {label}
      </div>
    </div>
  );
};

// Componente para mostrar un segmento de donut chart
interface DonutSegmentProps {
  percentage: number;
  color: string;
  offset: number;
  name?: string;
  value?: number;
}

const DonutSegment: React.FC<DonutSegmentProps> = ({
  percentage,
  color,
  offset,
}) => {
  const strokeWidth = 20;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage * circumference) / 100} ${circumference}`;

  return (
    <circle
      cx={50}
      cy={50}
      r={radius}
      fill="transparent"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={-offset}
      transform="rotate(-90 50 50)"
      data-oid="6k:4r2d"
    />
  );
};

// Componente para mostrar un gráfico tipo donut
const DonutChart: React.FC<{
  data: any[];
  width?: number;
  height?: number;
}> = ({ data, width = 200, height = 200 }) => {
  let total = data.reduce((sum, item) => sum + item.value, 0);
  let offset = 0;

  return (
    <div className="relative flex flex-col items-center" data-oid="rycx8xf">
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        data-oid="ago9_ms"
      >
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const segment = (
            <DonutSegment
              key={index}
              percentage={percentage}
              color={item.color}
              offset={offset}
              name={item.name}
              value={item.value}
              data-oid="bdfud_m"
            />
          );

          offset += (percentage * 2 * Math.PI * (50 - 20 / 2)) / 100;
          return segment;
        })}
        <circle cx={50} cy={50} r={30} fill="white" data-oid="0_2cgi1" />
      </svg>

      <div className="mt-4" data-oid="znk.l3l">
        <div className="flex flex-wrap gap-3 justify-center" data-oid="tlkmlps">
          {data.map((item, index) => (
            <div key={index} className="flex items-center" data-oid="d226mpf">
              <div
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: item.color }}
                data-oid="27vr1hq"
              ></div>
              <span className="text-xs" data-oid="hjr5wp5">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Principal StatsSection
class StatsSection extends React.Component {
  // Estado del componente
  state = {
    timeRange: "month",
  };

  // Manejador para cambiar el período de tiempo
  handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ timeRange: e.target.value });
  };

  render() {
    // Encontrar el valor máximo para las barras
    const maxVehicleUsage = Math.max(...vehicleUsage.map((item) => item.value));
    const maxRouteValue = Math.max(
      ...routePopularity.map((item) => item.value),
    );
    const maxBookingValue = Math.max(
      ...dailyBookings.map((item) => item.value),
    );
    const maxDriverBookings = Math.max(
      ...driverPerformance.map((item) => item.bookings),
    );

    return (
      <div className="space-y-6" data-oid="k_u2t:x">
        {/* Header y controles */}
        <div className="flex justify-between items-center" data-oid="3:.40fl">
          <div data-oid=":cy7rpf">
            <h1 className="text-2xl font-bold text-gray-800" data-oid="esr-fee">
              Estadísticas y Análisis
            </h1>
            <p className="text-sm text-gray-500 mt-1" data-oid="al02-rp">
              Monitoriza y analiza el rendimiento de tu negocio
            </p>
          </div>
          <div className="flex space-x-2" data-oid="xpw5058">
            <select
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={this.state.timeRange}
              onChange={this.handleTimeRangeChange}
              data-oid="9zecbwr"
            >
              <option value="week" data-oid="mj.9.l9">
                Última semana
              </option>
              <option value="month" data-oid="7-.f.n6">
                Último mes
              </option>
              <option value="quarter" data-oid="u2h_6tz">
                Último trimestre
              </option>
              <option value="year" data-oid="fhjgu3w">
                Último año
              </option>
              <option value="all" data-oid="2ul97.v">
                Todo el tiempo
              </option>
            </select>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              data-oid="zqva6nf"
            >
              <Calendar size={16} className="mr-2" data-oid="5vx:oiz" />
              Personalizar
            </Button>
            <Button className="bg-black hover:bg-gray-800" data-oid="gozugw8">
              <BarChart2 size={16} className="mr-2" data-oid="8i7o79r" />
              Generar Informe
            </Button>
          </div>
        </div>

        {/* Tarjetas de resumen */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          data-oid="xp0-1lj"
        >
          <Card data-oid="q9auxtt">
            <CardContent className="p-6" data-oid="a41pbkk">
              <div
                className="flex justify-between items-start mb-2"
                data-oid="-7c3l6l"
              >
                <div
                  className="text-xs text-gray-500 uppercase"
                  data-oid="k_kho2g"
                >
                  Ingresos Totales
                </div>
                <DollarSign
                  size={18}
                  className="text-black"
                  data-oid="ojta:td"
                />
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="mdldon3">
                268.450€
              </div>
              <div
                className="text-xs text-gray-600 mt-1 flex items-center"
                data-oid="r111kfm"
              >
                <TrendingUp size={14} className="mr-1" data-oid="_2p2z-d" />
                15% respecto al período anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="l0g15o8">
            <CardContent className="p-6" data-oid="vis3lp:">
              <div
                className="flex justify-between items-start mb-2"
                data-oid="jeratdt"
              >
                <div
                  className="text-xs text-gray-500 uppercase"
                  data-oid="e-x7psy"
                >
                  Reservas Completadas
                </div>
                <Clock size={18} className="text-black" data-oid=".tly6gh" />
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="2:.yvnl">
                1.245
              </div>
              <div
                className="text-xs text-gray-600 mt-1 flex items-center"
                data-oid="d5:c03s"
              >
                <TrendingUp size={14} className="mr-1" data-oid="081.fk:" />
                8% respecto al período anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="8.2mn33">
            <CardContent className="p-6" data-oid="5cd6t.7">
              <div
                className="flex justify-between items-start mb-2"
                data-oid="heii4vb"
              >
                <div
                  className="text-xs text-gray-500 uppercase"
                  data-oid="5lrqc50"
                >
                  Satisfacción Media
                </div>
                <Star size={18} className="text-amber-500" data-oid="d7sbjx:" />
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="r-t0z0l">
                4.8/5
              </div>
              <div
                className="text-xs text-gray-600 mt-1 flex items-center"
                data-oid="sww.rhp"
              >
                <TrendingUp size={14} className="mr-1" data-oid="i2hx3_-" />
                0.2 respecto al período anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="wz70csw">
            <CardContent className="p-6" data-oid="o.oust1">
              <div
                className="flex justify-between items-start mb-2"
                data-oid="32c.ang"
              >
                <div
                  className="text-xs text-gray-500 uppercase"
                  data-oid="lo4565g"
                >
                  Tasa de Cancelación
                </div>
                <AlertCircle
                  size={18}
                  className="text-gray-500"
                  data-oid="mignr1t"
                />
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="yrtti2p">
                2.3%
              </div>
              <div
                className="text-xs text-gray-600 mt-1 flex items-center"
                data-oid="n9-1608"
              >
                <ArrowDown size={14} className="mr-1" data-oid="rp.6ojh" />
                0.5% menos que el período anterior
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ingresos mensuales y reservas por tipo */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          data-oid=".c0hx:q"
        >
          <Card data-oid="l8kjj3w">
            <CardHeader data-oid="y5k-s5u">
              <CardTitle className="flex items-center" data-oid="58jqhsw">
                <DollarSign
                  size={18}
                  className="mr-2 text-black"
                  data-oid="-qduy3x"
                />
                Ingresos y Beneficios
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="sj66myh">
              <div
                className="w-full h-[300px] overflow-x-auto"
                data-oid="n8pmx76"
              >
                <div
                  className="flex items-end space-x-2 h-full pt-8 pb-10"
                  data-oid="tp3_eun"
                >
                  {monthlyRevenueData.map((month, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center"
                      data-oid="b2:sfat"
                    >
                      <div
                        className="relative h-[200px] w-16 flex flex-col justify-end"
                        data-oid="5k9.x.u"
                      >
                        {/* Barra de ingresos */}
                        <div
                          className="w-8 bg-black opacity-80 rounded-t-sm mx-auto"
                          style={{
                            height: `${(month.revenue / 40000) * 100}%`,
                          }}
                          data-oid="10umcp5"
                        ></div>

                        {/* Barra de beneficios (superpuesta) */}
                        <div
                          className="w-8 bg-gray-600 opacity-80 rounded-t-sm mx-auto absolute bottom-0"
                          style={{
                            height: `${(month.beneficio / 40000) * 100}%`,
                          }}
                          data-oid="rs1th1."
                        ></div>
                      </div>
                      <div
                        className="text-xs mt-2 text-gray-600"
                        data-oid="tz0.ie3"
                      >
                        {month.name}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Leyenda */}
                <div
                  className="flex justify-center space-x-4 mt-2"
                  data-oid="pzx5cmx"
                >
                  <div className="flex items-center" data-oid="rz0r624">
                    <div
                      className="w-3 h-3 bg-black opacity-80 mr-1"
                      data-oid="epie5cd"
                    ></div>
                    <span className="text-xs" data-oid=":ej5qur">
                      Ingresos
                    </span>
                  </div>
                  <div className="flex items-center" data-oid="yt579:r">
                    <div
                      className="w-3 h-3 bg-gray-600 opacity-80 mr-1"
                      data-oid="s45x4e2"
                    ></div>
                    <span className="text-xs" data-oid="kdr806o">
                      Beneficio
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6" data-oid="-n:2h0j">
            {/* Reservas por tipo */}
            <Card data-oid="n4wnmo8">
              <CardHeader data-oid="r-aqd-t">
                <CardTitle className="flex items-center" data-oid="0etshez">
                  <Car
                    size={18}
                    className="mr-2 text-black"
                    data-oid="8vd2ils"
                  />
                  Reservas por Tipo de Servicio
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center" data-oid="bm3c09k">
                <DonutChart data={bookingsByType} data-oid="4_z6w00" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Segunda fila de gráficos */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          data-oid="y7lhzua"
        >
          {/* Uso de vehículos */}
          <Card data-oid="oakt.hu">
            <CardHeader data-oid="-t5cx.t">
              <CardTitle className="flex items-center" data-oid="u4sh58z">
                <Car
                  size={18}
                  className="mr-2 text-gray-500"
                  data-oid="7nml735"
                />
                Uso de Vehículos por Categoría
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="vnypexj">
              <div className="space-y-4" data-oid="vqlktfo">
                {vehicleUsage.map((item, index) => (
                  <div key={index} className="mb-3" data-oid="n7auxxs">
                    <div
                      className="flex justify-between items-center mb-1"
                      data-oid="96pe2:b"
                    >
                      <span className="text-sm font-medium" data-oid="pri2xml">
                        {item.name}
                      </span>
                      <span
                        className="text-sm text-gray-500"
                        data-oid="uwlnbiq"
                      >
                        {item.value}%
                      </span>
                    </div>
                    <HorizontalBar
                      value={item.value}
                      maxValue={maxVehicleUsage}
                      color={item.color}
                      data-oid="8e0l89g"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reservas diarias */}
          <Card data-oid="g1:mt04">
            <CardHeader data-oid="n3jv5y7">
              <CardTitle className="flex items-center" data-oid=".-04o0w">
                <Calendar
                  size={18}
                  className="mr-2 text-amber-500"
                  data-oid="u3dzau-"
                />
                Reservas por Día de la Semana
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="iy25hbe">
              <div
                className="flex justify-between items-end h-[210px] pt-5"
                data-oid="f22p1co"
              >
                {dailyBookings.map((day, index) => (
                  <VerticalBar
                    key={index}
                    value={day.value}
                    maxValue={maxBookingValue}
                    color="#000000"
                    label={day.name}
                    data-oid="t0wd.:2"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Segmentación de clientes */}
          <Card data-oid="398c4wv">
            <CardHeader data-oid="f.0pq3g">
              <CardTitle className="flex items-center" data-oid="qo2ht_d">
                <Users
                  size={18}
                  className="mr-2 text-gray-500"
                  data-oid="t1fno1j"
                />
                Segmentación de Clientes
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="gr2smgi">
              <DonutChart data={clientSegmentation} data-oid=".7fz70e" />
            </CardContent>
          </Card>
        </div>

        {/* Métricas específicas del sector */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          data-oid="-_ybfx:"
        >
          {/* Rutas más populares */}
          <Card data-oid="u-jj8v4">
            <CardHeader data-oid="l79byo3">
              <CardTitle className="flex items-center" data-oid="2vrx16k">
                <Map
                  size={18}
                  className="mr-2 text-gray-600"
                  data-oid="1p:3e2k"
                />
                Rutas Más Populares
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="t8u9dli">
              <div className="space-y-4" data-oid="vqxjlhp">
                {routePopularity.map((route, index) => (
                  <div key={index} className="mb-3" data-oid="rgf2so2">
                    <div
                      className="flex justify-between items-center mb-1"
                      data-oid="wx.t59h"
                    >
                      <span className="text-sm font-medium" data-oid="s-80-.y">
                        {route.name}
                      </span>
                      <span
                        className="text-sm text-gray-500"
                        data-oid="ren_4b1"
                      >
                        {route.value}%
                      </span>
                    </div>
                    <HorizontalBar
                      value={route.value}
                      maxValue={maxRouteValue}
                      color={route.color}
                      data-oid="an:kttt"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rendimiento de conductores */}
          <Card data-oid="y3f0sb7">
            <CardHeader data-oid="86mwm5-">
              <CardTitle className="flex items-center" data-oid="8nla17y">
                <Users
                  size={18}
                  className="mr-2 text-black"
                  data-oid="6pzdigs"
                />
                Rendimiento de Conductores
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="jbnmci5">
              <div className="space-y-5" data-oid="42lm7by">
                {driverPerformance.map((driver, index) => (
                  <div key={index} className="mb-4" data-oid="m4x112k">
                    <div
                      className="flex justify-between items-center mb-1"
                      data-oid="7nwhi6i"
                    >
                      <div data-oid="4y5c.3g">
                        <span
                          className="text-sm font-medium"
                          data-oid="5j:9.ru"
                        >
                          {driver.name}
                        </span>
                        <div
                          className="flex items-center mt-1"
                          data-oid="-wzixfx"
                        >
                          <Star
                            size={14}
                            className="text-amber-500 fill-current"
                            data-oid="roi:usz"
                          />

                          <span className="text-xs ml-1" data-oid="fn0nn3m">
                            {driver.rating}
                          </span>
                          <span
                            className="text-xs ml-3 text-gray-500"
                            data-oid="r-c3bgv"
                          >
                            {driver.bookings} viajes
                          </span>
                        </div>
                      </div>
                    </div>
                    <HorizontalBar
                      value={driver.bookings}
                      maxValue={maxDriverBookings}
                      color="#000000"
                      data-oid="9sim_3r"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Métricas adicionales */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          data-oid="vhmr6qh"
        >
          <Card data-oid="kc4gd98">
            <CardContent className="p-6" data-oid="6eqf01p">
              <div
                className="text-xs text-gray-500 uppercase"
                data-oid="_tz84_:"
              >
                Clientes Premium
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="i-_eqgv">
                68
              </div>
              <div className="text-xs text-gray-600 mt-1" data-oid="pi2i-nd">
                ↑ 12% respecto al mes anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="93.a8t_">
            <CardContent className="p-6" data-oid="5-8.wn3">
              <div
                className="text-xs text-gray-500 uppercase"
                data-oid="gab2xla"
              >
                Ocupación Flota
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="niwmt2_">
                78%
              </div>
              <div className="text-xs text-gray-600 mt-1" data-oid="4x_:cmg">
                ↑ 5% respecto al mes anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="mxmti7q">
            <CardContent className="p-6" data-oid="f6ge2-g">
              <div
                className="text-xs text-gray-500 uppercase"
                data-oid="c91cpw3"
              >
                Tiempo medio espera
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="6-_.b0u">
                4.2 min
              </div>
              <div className="text-xs text-gray-600 mt-1" data-oid="9iqsf1n">
                ↓ 0.8 min respecto al mes anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="kvyfth8">
            <CardContent className="p-6" data-oid="3:xz_t9">
              <div
                className="text-xs text-gray-500 uppercase"
                data-oid="-5:cy-j"
              >
                Valor medio reserva
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="xkvl:oy">
                185€
              </div>
              <div className="text-xs text-gray-600 mt-1" data-oid="cw115x3">
                ↑ 12€ respecto al mes anterior
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default StatsSection;
