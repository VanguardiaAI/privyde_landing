"use client";

import { useState, useEffect, useRef } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ChevronDown,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { TimePicker } from "@/components/ui/time-picker";
import { useTranslation } from "react-i18next";

// Definición de tipos
interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface BookingFormData {
  tripType: "ida" | "horas";
  from: {
    place_id?: string;
    description: string;
    address?: string;
  };
  to?: {
    place_id?: string;
    description: string;
    address?: string;
  };
  duration?: string;
  date: string;
  time: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Componente de calendario mejorado
function CalendarComponent({
  selectedDate,
  onDateChange,
}: {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}) {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  // Función para obtener el primer día del mes (0 = domingo, 1 = lunes, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Ajuste para que la semana comience en lunes
  };

  // Función para obtener el número de días en un mes
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Función para avanzar al mes siguiente
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  // Función para retroceder al mes anterior
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  // Nombres de los meses traducidos
  const monthNames = t('bookingForm.months', { returnObjects: true }) as string[];

  // Obtener datos del mes actual
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Días del mes anterior para completar la primera semana
  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => {
    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0,
    );
    return prevMonth.getDate() - firstDayOfMonth + i + 1;
  });

  // Días del mes siguiente para completar la última semana
  const nextMonthDays = Array.from(
    { length: 42 - (firstDayOfMonth + daysInMonth) },
    (_, i) => i + 1,
  );

  // Comprobar si una fecha es la seleccionada
  const isSelectedDate = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  // Comprobar si una fecha es anterior a hoy
  const isPastDate = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    return (
      date < today &&
      !(
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    );
  };

  // Función para manejar la selección de una fecha
  const handleSelectDate = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    if (!isPastDate(day)) {
      onDateChange(newDate);
    }
  };

  return (
    <div className="calendar" data-oid="846dvpo">
      {/* Cabecera del calendario con navegación de meses */}
      <div
        className="flex justify-between items-center mb-4"
        data-oid="rkkr15z"
      >
        <button
          onClick={prevMonth}
          disabled={
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear()
          }
          className={`p-1 rounded-full ${
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear()
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          type="button"
          data-oid="siy8bkf"
        >
          <ChevronLeft className="h-5 w-5" data-oid="g9tc4g7" />
        </button>

        <h2 className="text-base font-semibold" data-oid="5snobm9">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>

        <button
          onClick={nextMonth}
          className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
          type="button"
          data-oid="yxlwqlb"
        >
          <ChevronRight className="h-5 w-5" data-oid="1uzg314" />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2" data-oid="3fsbrw5">
        {(t('bookingForm.daysOfWeek', { returnObjects: true }) as string[]).map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-500 py-1"
            data-oid="8wvub91"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Días del calendario */}
      <div className="grid grid-cols-7 gap-1" data-oid="nwx_d-v">
        {/* Días del mes anterior */}
        {prevMonthDays.map((day, index) => (
          <div
            key={`prev-${index}`}
            className="text-center py-2 text-sm text-gray-300"
            data-oid=".t:wmk5"
          >
            {day}
          </div>
        ))}

        {/* Días del mes actual */}
        {daysArray.map((day) => (
          <button
            key={day}
            type="button"
            disabled={isPastDate(day)}
            onClick={() => handleSelectDate(day)}
            className={`
              text-center py-2 rounded-md text-sm transition-all
              ${
                isSelectedDate(day)
                  ? "bg-black text-white font-bold"
                  : isPastDate(day)
                    ? "text-gray-300 cursor-not-allowed"
                    : "hover:bg-gray-100"
              }
            `}
            data-oid="zdez21p"
          >
            {day}
          </button>
        ))}

        {/* Días del mes siguiente */}
        {nextMonthDays.map((day, index) => (
          <div
            key={`next-${index}`}
            className="text-center py-2 text-sm text-gray-300"
            data-oid="gl2wvni"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente de selector de duración mejorado
function DurationSelector({
  selectedDuration,
  onDurationChange,
}: {
  selectedDuration: string;
  onDurationChange: (duration: string) => void;
}) {
  const { t } = useTranslation();
  // Categorías de duración
  const durationCategories = {
    [t('bookingForm.durations.short')]: [t('bookingForm.durations.1hour'), t('bookingForm.durations.2hours'), t('bookingForm.durations.3hours')],
    [t('bookingForm.durations.medium')]: [t('bookingForm.durations.4hours'), t('bookingForm.durations.5hours'), t('bookingForm.durations.6hours')],
    [t('bookingForm.durations.long')]: [t('bookingForm.durations.7hours'), t('bookingForm.durations.8hours'), t('bookingForm.durations.fullDay')],
  };

  return (
    <div className="duration-selector" data-oid="g2r6r7e">
      {Object.entries(durationCategories).map(([category, durations]) => (
        <div key={category} className="mb-5 last:mb-0" data-oid="u3dtcv:">
          <div
            className="text-sm font-medium text-gray-500 mb-2"
            data-oid="m0oul-h"
          >
            {category}
          </div>
          <div className="grid grid-cols-1 gap-2" data-oid="9u74jom">
            {durations.map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() => onDurationChange(duration)}
                className={`
                  text-left px-4 py-3 rounded-md transition-all flex justify-between items-center
                  ${
                    selectedDuration === duration
                      ? "bg-black text-white font-bold"
                      : "hover:bg-gray-100 border border-gray-200"
                  }
                `}
                data-oid="ns_o8oy"
              >
                <span data-oid="itoeh.l">{duration}</span>
                {selectedDuration === duration && (
                  <span className="text-white" data-oid="0h61tkh">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface BookingFormProps {
  darkMode?: boolean;
}

export default function BookingForm({ darkMode = false }: BookingFormProps) {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<BookingFormData>({
    tripType: "ida",
    from: {
      description: "",
    },
    to: {
      description: "",
    },
    duration: t('bookingForm.durations.2hours'),
    date: format(new Date(), "yyyy-MM-dd"),
    time: "12:00",
  });
  const navigate = useNavigate();

  // Estados para la UI
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [durationDialogOpen, setDurationDialogOpen] = useState(false);
  const [fromPredictions, setFromPredictions] = useState<PlacePrediction[]>([]);
  const [toPredictions, setToPredictions] = useState<PlacePrediction[]>([]);
  const [showFromPredictions, setShowFromPredictions] = useState(false);
  const [showToPredictions, setShowToPredictions] = useState(false);
  const [loading, setLoading] = useState(false);

  // Referencias para los dropdowns
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // Manejador para búsqueda de lugares "desde"
  const handleFromSearch = async (query: string) => {
    setFormData((prev) => ({
      ...prev,
      from: { ...prev.from, description: query },
    }));

    if (query.length < 3) {
      setFromPredictions([]);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/places/autocomplete`, {
        params: { query },
      });
      setFromPredictions(response.data);
      setShowFromPredictions(true);
    } catch (error) {
      console.error("Error al obtener predicciones:", error);
      setFromPredictions([]);
    }
  };

  // Manejador para búsqueda de lugares "hacia"
  const handleToSearch = async (query: string) => {
    setFormData((prev) => ({
      ...prev,
      to: { ...prev.to, description: query },
    }));

    if (query.length < 3) {
      setToPredictions([]);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/places/autocomplete`, {
        params: { query },
      });
      setToPredictions(response.data);
      setShowToPredictions(true);
    } catch (error) {
      console.error("Error al obtener predicciones:", error);
      setToPredictions([]);
    }
  };

  // Manejador para seleccionar un lugar "desde"
  const handleSelectFrom = (prediction: PlacePrediction) => {
    setFormData((prev) => ({
      ...prev,
      from: {
        place_id: prediction.place_id,
        description: prediction.description,
      },
    }));
    setShowFromPredictions(false);
  };

  // Manejador para seleccionar un lugar "hacia"
  const handleSelectTo = (prediction: PlacePrediction) => {
    setFormData((prev) => ({
      ...prev,
      to: {
        place_id: prediction.place_id,
        description: prediction.description,
      },
    }));
    setShowToPredictions(false);
  };

  // Manejador para seleccionar fecha
  const handleDateChange = (newDate: Date) => {
    setFormData((prev) => ({ ...prev, date: format(newDate, "yyyy-MM-dd") }));
    setDateDialogOpen(false);
  };

  // Manejador para seleccionar hora
  const handleTimeChange = (time: string) => {
    setFormData((prev) => ({ ...prev, time }));
  };

  // Manejador para seleccionar duración
  const handleDurationChange = (duration: string) => {
    setFormData((prev) => ({ ...prev, duration }));
    setDurationDialogOpen(false);
  };

  // Manejador para el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validar campos
    if (!formData.from.description) {
      console.error("El punto de partida es obligatorio.");
      setLoading(false);
      return;
    }

    if (formData.tripType === "ida" && !formData.to?.description) {
      console.error("El destino es obligatorio para viajes de solo ida.");
      setLoading(false);
      return;
    }

    try {
      // Guardar datos en localStorage para pasarlos a la siguiente página
      localStorage.setItem("bookingDetails", JSON.stringify(formData));

      // Redirigir a la página de checkout
      navigate("/checkout");
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
      alert("Hubo un problema al procesar tu solicitud. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Cerrar los dropdowns cuando se hace clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFromPredictions(false);
      }
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target as Node)
      ) {
        setShowToPredictions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTabChange = (value: "ida" | "horas") => {
    setFormData((prev) => ({
      ...prev,
      tripType: value,
      to: value === "horas" ? { description: "" } : prev.to,
      duration: value === "ida" ? "" : prev.duration || t('bookingForm.durations.2hours'),
    }));
  };

  return (
    <>
      <Card
        className={`w-full max-w-full mx-auto shadow-lg rounded-xl overflow-hidden border-0 relative z-20 booking-contrast-shadow ${darkMode ? 'bg-black' : 'bg-white'}`}
        data-oid="s8ju0jq"
      >
        <Tabs
          value={formData.tripType}
          className="w-full"
          onValueChange={(value) => handleTabChange(value as "ida" | "horas")}
          data-oid="c:ig013"
        >
          <TabsList
            className={`grid w-full grid-cols-2 p-0 h-12 rounded-none ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
            data-oid="y9do.07"
          >
            <TabsTrigger
              value="ida"
              className={`rounded-none data-[state=active]:shadow-none h-full text-lg font-semibold ${darkMode ? 'data-[state=active]:bg-black data-[state=active]:text-white text-gray-400' : 'data-[state=active]:bg-white'}`}
              data-oid="i-vtb9o"
            >
              {t('bookingForm.tabs.oneWay')}
            </TabsTrigger>
            <TabsTrigger
              value="horas"
              className={`rounded-none data-[state=active]:shadow-none h-full text-lg font-semibold ${darkMode ? 'data-[state=active]:bg-black data-[state=active]:text-white text-gray-400' : 'data-[state=active]:bg-white'}`}
              data-oid="z21rf8l"
            >
              {t('bookingForm.tabs.hourly')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ida" className="m-0" data-oid="i32:n4v">
            <CardContent className="p-4 sm:p-6" data-oid="eu_3rpo">
              <form
                className="space-y-3"
                onSubmit={handleSubmit}
                data-oid="acf9-6q"
              >
                <div
                  className="relative"
                  ref={fromDropdownRef}
                  data-oid="m.fx_b2"
                >
                  <MapPin
                    className="absolute left-3 top-4 h-6 w-6 text-gray-400"
                    data-oid="q_qt59w"
                  />

                  <div
                    className={`flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-gray-400 hover:border-gray-400 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50'}`}
                    data-oid="6x:ei2j"
                  >
                    <label
                      className={`booking-form-label mb-0 text-left text-sm ${darkMode ? 'text-white' : ''}`}
                      data-oid="ji0e.10"
                    >
                      {t('bookingForm.fields.from')}
                    </label>
                    <Input
                      className={`border-0 p-0 h-7 text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none placeholder:text-gray-400 booking-form-input ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}
                      placeholder={t('bookingForm.fields.placeholder')}
                      value={formData.from.description}
                      onChange={(e) => handleFromSearch(e.target.value)}
                      onFocus={() => setShowFromPredictions(true)}
                      style={{ boxShadow: "none" }}
                      data-oid="kg5uzln"
                    />
                  </div>

                  {/* Predicciones para el origen */}
                  {showFromPredictions && fromPredictions.length > 0 && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
                      data-oid="_pbfonl"
                    >
                      {fromPredictions.map((prediction) => (
                        <div
                          key={prediction.place_id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectFrom(prediction)}
                          data-oid="in3hxdu"
                        >
                          <div className="font-medium" data-oid="wmvdq..">
                            {prediction.structured_formatting.main_text}
                          </div>
                          <div
                            className="text-base text-gray-500"
                            data-oid="hap_-c9"
                          >
                            {prediction.structured_formatting.secondary_text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className="relative"
                  ref={toDropdownRef}
                  data-oid="w4vd0x-"
                >
                  <MapPin
                    className="absolute left-3 top-4 h-6 w-6 text-gray-400"
                    data-oid="xp8:at8"
                  />

                  <div
                    className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-gray-400 hover:border-gray-400 bg-gray-50"
                    data-oid="r3w2xc8"
                  >
                    <label
                      className="booking-form-label mb-0 text-left text-sm"
                      data-oid="uuhkuiq"
                    >
                      {t('bookingForm.fields.to')}
                    </label>
                    <Input
                      className="border-0 p-0 h-7 text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none placeholder:text-gray-400 booking-form-input bg-gray-50"
                      placeholder={t('bookingForm.fields.placeholder')}
                      value={formData.to?.description || ""}
                      onChange={(e) => handleToSearch(e.target.value)}
                      onFocus={() => setShowToPredictions(true)}
                      style={{ boxShadow: "none" }}
                      data-oid="-ncej-e"
                    />
                  </div>

                  {/* Predicciones para el destino */}
                  {showToPredictions && toPredictions.length > 0 && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
                      data-oid="cp52vce"
                    >
                      {toPredictions.map((prediction) => (
                        <div
                          key={prediction.place_id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectTo(prediction)}
                          data-oid="ok7q52o"
                        >
                          <div className="font-medium" data-oid="fjjiiy8">
                            {prediction.structured_formatting.main_text}
                          </div>
                          <div
                            className="text-base text-gray-500"
                            data-oid="86iw-4q"
                          >
                            {prediction.structured_formatting.secondary_text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" data-oid=":hogdva">
                  <CalendarIcon
                    className="absolute left-3 top-4 h-6 w-6 text-gray-400"
                    data-oid="8y7m1cr"
                  />

                  <div
                    className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-gray-400 hover:border-gray-400 bg-gray-50 cursor-pointer"
                    onClick={() => setDateDialogOpen(true)}
                    data-oid="kag:gwp"
                  >
                    <label
                      className="booking-form-label mb-0 text-left text-sm"
                      data-oid="gm0c0-2"
                    >
                      {t('bookingForm.fields.date')}
                    </label>
                    <div
                      className="flex items-center justify-between pr-3"
                      data-oid="9fsyftk"
                    >
                      <div
                        className="booking-form-input h-7 flex items-center focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                        style={{ boxShadow: "none" }}
                        data-oid="677g:40"
                      >
                        {format(new Date(formData.date), "E, dd MMM yyyy", {
                          locale: i18n.language === 'es' ? es : enUS,
                        })}
                      </div>
                      <ChevronDown className="h-5 w-5" data-oid="mady5:q" />
                    </div>
                  </div>
                </div>

                <div className="relative" data-oid="bf_0t3v">
                  <TimePicker
                    value={formData.time}
                    onChange={handleTimeChange}
                    data-oid="1osx4c6"
                  />
                </div>

                <p
                  className="text-sm text-gray-600 mt-1 mb-1"
                  data-oid="ooc36ig"
                >
                  {t('bookingForm.messages.driverWait')}
                </p>

                <button
                  type="submit"
                  className="select-button w-full h-12 text-lg relative z-20"
                  style={{
                    background: "#000000",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  disabled={loading}
                  data-oid="2_014aw"
                >
                  {loading ? (
                    <div
                      className="flex justify-center items-center"
                      data-oid="4thk:gv"
                    >
                      <Loader2
                        className="mr-2 h-5 w-5 animate-spin"
                        data-oid="n5hsgc8"
                      />
                      {t('bookingForm.messages.processing')}
                    </div>
                  ) : (
                    t('bookingForm.buttons.select')
                  )}
                </button>
              </form>
            </CardContent>
          </TabsContent>

          <TabsContent value="horas" className="m-0" data-oid="6.5ui0i">
            <CardContent className="p-4 sm:p-6" data-oid="as8bp1a">
              <form
                className="space-y-3"
                onSubmit={handleSubmit}
                data-oid="ltmr9m1"
              >
                <div
                  className="relative"
                  ref={fromDropdownRef}
                  data-oid=":hqao.j"
                >
                  <MapPin
                    className="absolute left-3 top-4 h-6 w-6 text-gray-400"
                    data-oid="gmud:nl"
                  />

                  <div
                    className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-gray-400 hover:border-gray-400 bg-gray-50"
                    data-oid="frg:h4_"
                  >
                    <label
                      className="booking-form-label mb-0 text-left text-sm"
                      data-oid="mbywmn4"
                    >
                      {t('bookingForm.fields.from')}
                    </label>
                    <Input
                      className="border-0 p-0 h-7 text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none placeholder:text-gray-400 booking-form-input bg-gray-50"
                      placeholder={t('bookingForm.fields.placeholder')}
                      value={formData.from.description}
                      onChange={(e) => handleFromSearch(e.target.value)}
                      onFocus={() => setShowFromPredictions(true)}
                      style={{ boxShadow: "none" }}
                      data-oid="zl54ili"
                    />
                  </div>

                  {/* Predicciones para el origen */}
                  {showFromPredictions && fromPredictions.length > 0 && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
                      data-oid="3j261fr"
                    >
                      {fromPredictions.map((prediction) => (
                        <div
                          key={prediction.place_id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectFrom(prediction)}
                          data-oid="g26bamg"
                        >
                          <div className="font-medium" data-oid="7rjrqk7">
                            {prediction.structured_formatting.main_text}
                          </div>
                          <div
                            className="text-base text-gray-500"
                            data-oid="jm:qgz1"
                          >
                            {prediction.structured_formatting.secondary_text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" data-oid="_vyb5:a">
                  <Clock
                    className="absolute left-3 top-4 h-6 w-6 text-gray-400"
                    data-oid="qdgfavx"
                  />

                  <div
                    className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-gray-400 hover:border-gray-400 bg-gray-50 cursor-pointer"
                    onClick={() => setDurationDialogOpen(true)}
                    data-oid="utb295m"
                  >
                    <label
                      className="booking-form-label mb-0 text-left text-sm"
                      data-oid="8imk3ng"
                    >
                      {t('bookingForm.fields.duration')}
                    </label>
                    <div
                      className="flex items-center justify-between pr-3"
                      data-oid="-33ov9x"
                    >
                      <div
                        className="booking-form-input h-7 flex items-center focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                        style={{ boxShadow: "none" }}
                        data-oid="lp.6sal"
                      >
                        {formData.duration}
                      </div>
                      <ChevronDown className="h-5 w-5" data-oid="y13kays" />
                    </div>
                  </div>
                </div>

                <div className="relative" data-oid=":d18phd">
                  <CalendarIcon
                    className="absolute left-3 top-4 h-6 w-6 text-gray-400"
                    data-oid="cj51npp"
                  />

                  <div
                    className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-gray-400 hover:border-gray-400 bg-gray-50 cursor-pointer"
                    onClick={() => setDateDialogOpen(true)}
                    data-oid="83mh9sq"
                  >
                    <label
                      className="booking-form-label mb-0 text-left text-sm"
                      data-oid="acbblag"
                    >
                      {t('bookingForm.fields.date')}
                    </label>
                    <div
                      className="flex items-center justify-between pr-3"
                      data-oid="8zz44rb"
                    >
                      <div
                        className="booking-form-input h-7 flex items-center focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                        style={{ boxShadow: "none" }}
                        data-oid="zh_upfb"
                      >
                        {format(new Date(formData.date), "E, dd MMM yyyy", {
                          locale: i18n.language === 'es' ? es : enUS,
                        })}
                      </div>
                      <ChevronDown className="h-5 w-5" data-oid="bo_6ptl" />
                    </div>
                  </div>
                </div>

                <div className="relative" data-oid="9xwz6_n">
                  <TimePicker
                    value={formData.time}
                    onChange={handleTimeChange}
                    data-oid="ab958-b"
                  />
                </div>

                <button
                  type="submit"
                  className="select-button w-full h-12 text-lg relative z-20"
                  style={{
                    background: "#000000",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  disabled={loading}
                  data-oid="rltz:ua"
                >
                  {loading ? (
                    <div
                      className="flex justify-center items-center"
                      data-oid="h-vpgmx"
                    >
                      <Loader2
                        className="mr-2 h-5 w-5 animate-spin"
                        data-oid="jg-.wvo"
                      />
                      {t('bookingForm.messages.processing')}
                    </div>
                  ) : (
                    t('bookingForm.buttons.select')
                  )}
                </button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Diálogo de selección de fecha */}
      <Dialog
        open={dateDialogOpen}
        onOpenChange={setDateDialogOpen}
        data-oid="o:m8uab"
      >
        <DialogContent className="sm:max-w-[425px] p-4" data-oid="rho9zsz">
          <DialogHeader data-oid="eadpu91">
            <DialogTitle
              className="text-center text-lg font-bold mb-4"
              data-oid="lh_oodj"
            >
              {t('bookingForm.dialogs.selectDate')}
            </DialogTitle>
          </DialogHeader>
          <div className="calendar-container p-2" data-oid="mrkkspe">
            <CalendarComponent
              selectedDate={new Date(formData.date)}
              onDateChange={handleDateChange}
              data-oid="t8xujxr"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de selección de duración */}
      <Dialog
        open={durationDialogOpen}
        onOpenChange={setDurationDialogOpen}
        data-oid="5y26i:x"
      >
        <DialogContent className="sm:max-w-[425px] p-4" data-oid="g6lj5ty">
          <DialogHeader data-oid="3:cimod">
            <DialogTitle
              className="text-center text-lg font-bold mb-4"
              data-oid="meufwpq"
            >
              {t('bookingForm.dialogs.selectDuration')}
            </DialogTitle>
          </DialogHeader>
          <DurationSelector
            selectedDuration={formData.duration || ""}
            onDurationChange={handleDurationChange}
            data-oid="-u4:a-y"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
