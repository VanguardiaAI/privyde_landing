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
    <div className="w-full bg-gray-200 rounded-full h-2.5" data-oid="14vc9t-">
      <div
        className="h-2.5 rounded-full"
        style={{ width: `${percentage}%`, backgroundColor: color }}
        data-oid="4iv:rc2"
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
    <div className="flex flex-col items-center" data-oid=":16ocmy">
      <div
        className="flex-1 w-16 bg-gray-100 rounded-t-lg relative h-[150px] flex items-end"
        data-oid="n3:ov3j"
      >
        <div
          className="w-full rounded-t-lg"
          style={{ height: `${percentage}%`, backgroundColor: color }}
          data-oid=".fmk5q6"
        ></div>
      </div>
      <div className="text-xs mt-1 text-gray-600" data-oid="t_y4xcv">
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
      data-oid="sa6sy0k"
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
    <div className="relative flex flex-col items-center" data-oid="wc6je6l">
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        data-oid="vysc3_e"
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
              data-oid="owr2tth"
            />
          );

          offset += (percentage * 2 * Math.PI * (50 - 20 / 2)) / 100;
          return segment;
        })}
        <circle cx={50} cy={50} r={30} fill="white" data-oid="i68lkzj" />
      </svg>

      <div className="mt-4" data-oid=":4dwgpt">
        <div className="flex flex-wrap gap-3 justify-center" data-oid="lbdqqf_">
          {data.map((item, index) => (
            <div key={index} className="flex items-center" data-oid="x3zwgg_">
              <div
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: item.color }}
                data-oid="ohxz5z."
              ></div>
              <span className="text-xs" data-oid="e1lo_jm">
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
      <div className="space-y-6" data-oid="-:kcdrq">
        {/* Header y controles */}
        <div className="flex justify-between items-center" data-oid="v:090nn">
          <div data-oid="771qhc5">
            <h1 className="text-2xl font-bold text-gray-800" data-oid="jypg1-y">
              Estadísticas y Análisis
            </h1>
            <p className="text-sm text-gray-500 mt-1" data-oid="5z83mj2">
              Monitoriza y analiza el rendimiento de tu negocio
            </p>
          </div>
          <div className="flex space-x-2" data-oid="qdvkm8v">
            <select
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={this.state.timeRange}
              onChange={this.handleTimeRangeChange}
              data-oid="jeo8n05"
            >
              <option value="week" data-oid="sc81i_p">
                Última semana
              </option>
              <option value="month" data-oid="xrxbbx:">
                Último mes
              </option>
              <option value="quarter" data-oid="s3xmsjb">
                Último trimestre
              </option>
              <option value="year" data-oid="6ev8xme">
                Último año
              </option>
              <option value="all" data-oid="r8-.48_">
                Todo el tiempo
              </option>
            </select>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              data-oid="xqbi_ua"
            >
              <Calendar size={16} className="mr-2" data-oid="8jsnzpg" />
              Personalizar
            </Button>
            <Button className="bg-black hover:bg-gray-800" data-oid="hl0zmz9">
              <BarChart2 size={16} className="mr-2" data-oid="i-f_6a9" />
              Generar Informe
            </Button>
          </div>
        </div>

        {/* Tarjetas de resumen */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          data-oid="tncqshf"
        >
          <Card data-oid="1rv_41k">
            <CardContent className="p-6" data-oid="-ck:dcp">
              <div
                className="flex justify-between items-start mb-2"
                data-oid="dna9ust"
              >
                <div
                  className="text-xs text-gray-500 uppercase"
                  data-oid="wdrh7yl"
                >
                  Ingresos Totales
                </div>
                <DollarSign
                  size={18}
                  className="text-black"
                  data-oid="g94tr2d"
                />
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="584837p">
                268.450€
              </div>
              <div
                className="text-xs text-gray-600 mt-1 flex items-center"
                data-oid="4uccu1k"
              >
                <TrendingUp size={14} className="mr-1" data-oid="ai6dkdn" />
                15% respecto al período anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="hrh1gg.">
            <CardContent className="p-6" data-oid="e71be9k">
              <div
                className="flex justify-between items-start mb-2"
                data-oid="jh6__ue"
              >
                <div
                  className="text-xs text-gray-500 uppercase"
                  data-oid="toz7-h-"
                >
                  Reservas Completadas
                </div>
                <Clock size={18} className="text-black" data-oid="t::jc.-" />
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="0r7z3er">
                1.245
              </div>
              <div
                className="text-xs text-gray-600 mt-1 flex items-center"
                data-oid="ce2eu9x"
              >
                <TrendingUp size={14} className="mr-1" data-oid="miv2kw3" />
                8% respecto al período anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="mytcxbe">
            <CardContent className="p-6" data-oid="d8yn7ks">
              <div
                className="flex justify-between items-start mb-2"
                data-oid="f0u:12c"
              >
                <div
                  className="text-xs text-gray-500 uppercase"
                  data-oid="1bbd:7_"
                >
                  Satisfacción Media
                </div>
                <Star size={18} className="text-amber-500" data-oid="cvw69ow" />
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="1tyjvwf">
                4.8/5
              </div>
              <div
                className="text-xs text-gray-600 mt-1 flex items-center"
                data-oid=".ws0q1r"
              >
                <TrendingUp size={14} className="mr-1" data-oid="ocpdbi4" />
                0.2 respecto al período anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="l6j8wml">
            <CardContent className="p-6" data-oid="xpx_hxc">
              <div
                className="flex justify-between items-start mb-2"
                data-oid="4-hd4s_"
              >
                <div
                  className="text-xs text-gray-500 uppercase"
                  data-oid="zg5no1a"
                >
                  Tasa de Cancelación
                </div>
                <AlertCircle
                  size={18}
                  className="text-gray-500"
                  data-oid="lu2o7nf"
                />
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="--c69uh">
                2.3%
              </div>
              <div
                className="text-xs text-gray-600 mt-1 flex items-center"
                data-oid="v2x6i_y"
              >
                <ArrowDown size={14} className="mr-1" data-oid="of5nr._" />
                0.5% menos que el período anterior
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ingresos mensuales y reservas por tipo */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          data-oid="7_8z7bt"
        >
          <Card data-oid="zgsr5fb">
            <CardHeader data-oid="u0g.46.">
              <CardTitle className="flex items-center" data-oid="k6ecmee">
                <DollarSign
                  size={18}
                  className="mr-2 text-black"
                  data-oid=":d0i888"
                />
                Ingresos y Beneficios
              </CardTitle>
            </CardHeader>
            <CardContent data-oid=":xewl1w">
              <div
                className="w-full h-[300px] overflow-x-auto"
                data-oid="h2qoho_"
              >
                <div
                  className="flex items-end space-x-2 h-full pt-8 pb-10"
                  data-oid="4o4usti"
                >
                  {monthlyRevenueData.map((month, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center"
                      data-oid="x8wetca"
                    >
                      <div
                        className="relative h-[200px] w-16 flex flex-col justify-end"
                        data-oid="h-n4yoa"
                      >
                        {/* Barra de ingresos */}
                        <div
                          className="w-8 bg-black opacity-80 rounded-t-sm mx-auto"
                          style={{
                            height: `${(month.revenue / 40000) * 100}%`,
                          }}
                          data-oid="ftmpkuu"
                        ></div>

                        {/* Barra de beneficios (superpuesta) */}
                        <div
                          className="w-8 bg-gray-600 opacity-80 rounded-t-sm mx-auto absolute bottom-0"
                          style={{
                            height: `${(month.beneficio / 40000) * 100}%`,
                          }}
                          data-oid="oowj3_s"
                        ></div>
                      </div>
                      <div
                        className="text-xs mt-2 text-gray-600"
                        data-oid="97h8j3m"
                      >
                        {month.name}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Leyenda */}
                <div
                  className="flex justify-center space-x-4 mt-2"
                  data-oid="jugfzg:"
                >
                  <div className="flex items-center" data-oid="hp95uo.">
                    <div
                      className="w-3 h-3 bg-black opacity-80 mr-1"
                      data-oid="c-jdw.c"
                    ></div>
                    <span className="text-xs" data-oid="90yv056">
                      Ingresos
                    </span>
                  </div>
                  <div className="flex items-center" data-oid="fl_08sb">
                    <div
                      className="w-3 h-3 bg-gray-600 opacity-80 mr-1"
                      data-oid="fxwn7q2"
                    ></div>
                    <span className="text-xs" data-oid="22vqkxk">
                      Beneficio
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6" data-oid="vyfvwmw">
            {/* Reservas por tipo */}
            <Card data-oid="t-s9hz0">
              <CardHeader data-oid="qkgycmb">
                <CardTitle className="flex items-center" data-oid="ve4cpmw">
                  <Car
                    size={18}
                    className="mr-2 text-black"
                    data-oid="rtan8p9"
                  />
                  Reservas por Tipo de Servicio
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center" data-oid="8bf9i7j">
                <DonutChart data={bookingsByType} data-oid="bqdtozs" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Segunda fila de gráficos */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          data-oid="fm.r5rd"
        >
          {/* Uso de vehículos */}
          <Card data-oid="oge81az">
            <CardHeader data-oid="lzm6t:a">
              <CardTitle className="flex items-center" data-oid="dv2itzm">
                <Car
                  size={18}
                  className="mr-2 text-gray-500"
                  data-oid="vdb8l.k"
                />
                Uso de Vehículos por Categoría
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="p5rrv_m">
              <div className="space-y-4" data-oid="oj86ctw">
                {vehicleUsage.map((item, index) => (
                  <div key={index} className="mb-3" data-oid="5.k::ju">
                    <div
                      className="flex justify-between items-center mb-1"
                      data-oid="76:r3mz"
                    >
                      <span className="text-sm font-medium" data-oid="bjjns07">
                        {item.name}
                      </span>
                      <span
                        className="text-sm text-gray-500"
                        data-oid="m-nerf8"
                      >
                        {item.value}%
                      </span>
                    </div>
                    <HorizontalBar
                      value={item.value}
                      maxValue={maxVehicleUsage}
                      color={item.color}
                      data-oid="g3w7np4"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reservas diarias */}
          <Card data-oid="3van90r">
            <CardHeader data-oid="8-ua-ua">
              <CardTitle className="flex items-center" data-oid="a-dmtk1">
                <Calendar
                  size={18}
                  className="mr-2 text-amber-500"
                  data-oid="qxo5ev1"
                />
                Reservas por Día de la Semana
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="t3l4s3a">
              <div
                className="flex justify-between items-end h-[210px] pt-5"
                data-oid="u:xvgj6"
              >
                {dailyBookings.map((day, index) => (
                  <VerticalBar
                    key={index}
                    value={day.value}
                    maxValue={maxBookingValue}
                    color="#000000"
                    label={day.name}
                    data-oid="8k0zg0x"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Segmentación de clientes */}
          <Card data-oid="opgxs3p">
            <CardHeader data-oid="9z3s0b2">
              <CardTitle className="flex items-center" data-oid="1-ybsbe">
                <Users
                  size={18}
                  className="mr-2 text-gray-500"
                  data-oid="m:egkb4"
                />
                Segmentación de Clientes
              </CardTitle>
            </CardHeader>
            <CardContent data-oid=".l587oy">
              <DonutChart data={clientSegmentation} data-oid="yen:4d8" />
            </CardContent>
          </Card>
        </div>

        {/* Métricas específicas del sector */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          data-oid="t7ncjzo"
        >
          {/* Rutas más populares */}
          <Card data-oid="1adzxt0">
            <CardHeader data-oid="tzyj656">
              <CardTitle className="flex items-center" data-oid="rv9:4yy">
                <Map
                  size={18}
                  className="mr-2 text-gray-600"
                  data-oid="rhy8909"
                />
                Rutas Más Populares
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="mzlnyo_">
              <div className="space-y-4" data-oid="y0o7eu3">
                {routePopularity.map((route, index) => (
                  <div key={index} className="mb-3" data-oid="oti:2n2">
                    <div
                      className="flex justify-between items-center mb-1"
                      data-oid="ppve0s."
                    >
                      <span className="text-sm font-medium" data-oid="3-hib_g">
                        {route.name}
                      </span>
                      <span
                        className="text-sm text-gray-500"
                        data-oid="9fi7p0."
                      >
                        {route.value}%
                      </span>
                    </div>
                    <HorizontalBar
                      value={route.value}
                      maxValue={maxRouteValue}
                      color={route.color}
                      data-oid="dk7rk_o"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rendimiento de conductores */}
          <Card data-oid="mb8souf">
            <CardHeader data-oid="b:p615x">
              <CardTitle className="flex items-center" data-oid="x:k2b0q">
                <Users
                  size={18}
                  className="mr-2 text-black"
                  data-oid="-1anytx"
                />
                Rendimiento de Conductores
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="jjlu5yb">
              <div className="space-y-5" data-oid="7d9e0zg">
                {driverPerformance.map((driver, index) => (
                  <div key={index} className="mb-4" data-oid="kz9bsgv">
                    <div
                      className="flex justify-between items-center mb-1"
                      data-oid="7kmp96l"
                    >
                      <div data-oid="gopzhz3">
                        <span
                          className="text-sm font-medium"
                          data-oid="upcy309"
                        >
                          {driver.name}
                        </span>
                        <div
                          className="flex items-center mt-1"
                          data-oid="w6i7wwi"
                        >
                          <Star
                            size={14}
                            className="text-amber-500 fill-current"
                            data-oid="23puomn"
                          />

                          <span className="text-xs ml-1" data-oid="1t.tq-:">
                            {driver.rating}
                          </span>
                          <span
                            className="text-xs ml-3 text-gray-500"
                            data-oid="v5uc.gs"
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
                      data-oid="lnyx7q9"
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
          data-oid="igvhzz8"
        >
          <Card data-oid="ku:_w5x">
            <CardContent className="p-6" data-oid="1-smr37">
              <div
                className="text-xs text-gray-500 uppercase"
                data-oid=":7rw2cc"
              >
                Clientes Premium
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="4h3bdpf">
                68
              </div>
              <div className="text-xs text-gray-600 mt-1" data-oid="2:salck">
                ↑ 12% respecto al mes anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="ojay_.k">
            <CardContent className="p-6" data-oid="1e2:b75">
              <div
                className="text-xs text-gray-500 uppercase"
                data-oid="3qllt3y"
              >
                Ocupación Flota
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="pydsaff">
                78%
              </div>
              <div className="text-xs text-gray-600 mt-1" data-oid="hf94ag8">
                ↑ 5% respecto al mes anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="i:-3kf4">
            <CardContent className="p-6" data-oid="ylr2qyq">
              <div
                className="text-xs text-gray-500 uppercase"
                data-oid="2c4obrh"
              >
                Tiempo medio espera
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="o5bmu7e">
                4.2 min
              </div>
              <div className="text-xs text-gray-600 mt-1" data-oid="2nia71c">
                ↓ 0.8 min respecto al mes anterior
              </div>
            </CardContent>
          </Card>
          <Card data-oid="xl_9a9p">
            <CardContent className="p-6" data-oid="84_icg_">
              <div
                className="text-xs text-gray-500 uppercase"
                data-oid="bkt-3iq"
              >
                Valor medio reserva
              </div>
              <div className="text-3xl font-bold mt-2" data-oid="__u4l3f">
                185€
              </div>
              <div className="text-xs text-gray-600 mt-1" data-oid="lci-sdb">
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
