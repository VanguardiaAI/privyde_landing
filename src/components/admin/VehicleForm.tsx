import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Upload,
  X,
  PlusCircle,
  Car,
  DollarSign,
  User,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

// Interfaces para colaboradores y choferes
interface Collaborator {
  id: string;
  name: string;
  type: string;
  status: string;
}

interface Driver {
  id: string;
  name: string;
  email: string;
  status: string;
}

type VehicleFormProps = {
  editMode?: boolean;
  vehicleData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
};

// Definir la interfaz para manejar la estructura exacta de un vehículo
interface VehicleFormData {
  id?: string;
  name: string;
  type: string;
  category: string;
  description: string;
  details: {
    brand: string;
    model: string;
    year: string;
    color: string;
    features: string[];
    armored: boolean;
    armor_level: string;
  };
  capacity: {
    passengers: number;
    luggage: number;
  };
  pricing: {
    base_fare: number;
    per_km: number;
    per_hour: number;
    currency: string;
  };
  location: {
    type: string;
    coordinates: number[];
  };
  availability_radius: number;
  available: boolean;
  image: string;
  licensePlate: string;
  ownerType: string;
  ownerName: string;
  ownerCountry: string;
  availabilityType: string[];
  availabilityDetails: string;
  insurancePolicyNumber: string;
  lastMaintenanceDate: string;
  contractEndDate: string;
  associatedDrivers: string[];
  notes: string;
  // Nuevos campos para ids
  collaboratorId?: string;
}

const VehicleForm = ({
  editMode = false,
  vehicleData,
  onSubmit,
  onCancel,
}: VehicleFormProps) => {
  const [formData, setFormData] = useState<VehicleFormData>(() => {
    const defaultData: VehicleFormData = {
      name: "",
      type: "sedan",
      category: "business_class",
      description: "",
      details: {
        brand: "",
        model: "",
        year: "",
        color: "",
        features: [],
        armored: false,
        armor_level: "",
      },
      capacity: {
        passengers: 4,
        luggage: 2,
      },
      pricing: {
        base_fare: 50,
        per_km: 2,
        per_hour: 30,
        currency: "EUR",
      },
      location: {
        type: "Point",
        coordinates: [-3.7038, 40.4168], // Madrid por defecto
      },
      availability_radius: 50,
      available: true,
      image: "",
      licensePlate: "",
      ownerType: "company",
      ownerName: "",
      ownerCountry: "ES",
      availabilityType: ["zone"],
      availabilityDetails: "",
      insurancePolicyNumber: "",
      lastMaintenanceDate: "",
      contractEndDate: "",
      associatedDrivers: [],
      notes: "",
      collaboratorId: "",
    };

    if (!vehicleData) return defaultData;

    // Si viene de la API (estructura completa)
    if (
      vehicleData.details &&
      typeof vehicleData.details.brand !== "undefined" &&
      vehicleData.capacity &&
      typeof vehicleData.capacity.passengers !== "undefined"
    ) {
      // Convertir availabilityType a array si viene como string
      const availabilityTypeArray = Array.isArray(vehicleData.availabilityType)
        ? vehicleData.availabilityType
        : vehicleData.availabilityType
          ? [vehicleData.availabilityType]
          : ["zone"];

      // Asegurar que tenemos todos los campos obligatorios
      return {
        ...defaultData,
        ...vehicleData,
        details: {
          ...defaultData.details,
          ...vehicleData.details,
        },
        capacity: {
          ...defaultData.capacity,
          ...vehicleData.capacity,
        },
        pricing: {
          ...defaultData.pricing,
          ...vehicleData.pricing,
        },
        location: vehicleData.location || defaultData.location,
        notes: vehicleData.notes || vehicleData.description || "",
        collaboratorId: vehicleData.collaboratorId || "",
        availabilityType: availabilityTypeArray,
        associatedDrivers: vehicleData.associatedDrivers || [],
      };
    }

    // Si viene con estructura plana (desde la tabla)
    // Convertir availabilityType a array si viene como string
    const availabilityTypeArray = Array.isArray(vehicleData.availabilityType)
      ? vehicleData.availabilityType
      : vehicleData.availabilityType
        ? [vehicleData.availabilityType]
        : ["zone"];

    return {
      name:
        vehicleData.name ||
        `${vehicleData.brand || ""} ${vehicleData.model || ""}`.trim(),
      type: vehicleData.type || "sedan",
      category: vehicleData.category || "business_class",
      description: vehicleData.description || "",
      details: {
        brand: vehicleData.brand || "",
        model: vehicleData.model || "",
        year: vehicleData.year ? vehicleData.year.toString() : "",
        color: vehicleData.color || "",
        features: vehicleData.details?.features || [],
        armored: vehicleData.details?.armored || false,
        armor_level: vehicleData.details?.armor_level || "",
      },
      capacity: {
        passengers: vehicleData.seats || vehicleData.capacity?.passengers || 4,
        luggage:
          vehicleData.luggageCapacity || vehicleData.capacity?.luggage || 2,
      },
      pricing: vehicleData.pricing || {
        base_fare: 50,
        per_km: 2,
        per_hour: 30,
        currency: "EUR",
      },
      location: vehicleData.location || {
        type: "Point",
        coordinates: [-3.7038, 40.4168], // Madrid por defecto
      },
      available:
        typeof vehicleData.available !== "undefined"
          ? vehicleData.available
          : true,
      image: vehicleData.image || "",
      licensePlate: vehicleData.licensePlate || "",
      ownerType: vehicleData.ownerType || "company",
      ownerName: vehicleData.ownerName || "",
      ownerCountry: vehicleData.ownerCountry || "ES",
      availabilityType: availabilityTypeArray,
      availabilityDetails: vehicleData.availabilityDetails || "",
      insurancePolicyNumber: vehicleData.insurancePolicyNumber || "",
      lastMaintenanceDate: vehicleData.lastMaintenanceDate || "",
      contractEndDate: vehicleData.contractEndDate || "",
      associatedDrivers: vehicleData.associatedDrivers || [],
      availability_radius: vehicleData.availability_radius || 50,
      notes: vehicleData.notes || vehicleData.description || "",
      collaboratorId: vehicleData.collaboratorId || "",
    };
  });

  const [featuresInput, setFeaturesInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    formData.image || null,
  );
  const [loading, setLoading] = useState(false);

  // Estados para colaboradores y choferes
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loadingCollaborators, setLoadingCollaborators] = useState(false);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [searchDriverQuery, setSearchDriverQuery] = useState("");
  const [driverPopoverOpen, setDriverPopoverOpen] = useState(false);

  // Función para obtener el token de autenticación
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Configurar headers para las peticiones
  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  // Cargar colaboradores al montar el componente
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        setLoadingCollaborators(true);
        const response = await axios.get(
          "/api/admin/collaborators/list",
          getAuthHeaders(),
        );

        if (response.data && response.data.collaborators) {
          setCollaborators(response.data.collaborators);

          // Si estamos en modo edición y ya hay un collaboratorId, actualizar el ownerName
          if (editMode && formData.collaboratorId) {
            const selectedCollaborator = response.data.collaborators.find(
              (c: Collaborator) => c.id === formData.collaboratorId,
            );
            if (selectedCollaborator) {
              setFormData((prev) => ({
                ...prev,
                ownerName: selectedCollaborator.name,
              }));
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar colaboradores:", error);
      } finally {
        setLoadingCollaborators(false);
      }
    };

    fetchCollaborators();
  }, [editMode, formData.collaboratorId]);

  // Cargar choferes cuando cambie el colaborador seleccionado
  useEffect(() => {
    const fetchDrivers = async () => {
      // Solo buscar choferes si hay un colaborador seleccionado
      if (!formData.collaboratorId) {
        setDrivers([]);
        return;
      }

      try {
        setLoadingDrivers(true);
        const response = await axios.get(
          `/api/admin/drivers/by-collaborator/${formData.collaboratorId}`,
          getAuthHeaders(),
        );

        if (response.data && response.data.drivers) {
          setDrivers(response.data.drivers);
        }
      } catch (error) {
        console.error("Error al cargar choferes:", error);
      } finally {
        setLoadingDrivers(false);
      }
    };

    fetchDrivers();
  }, [formData.collaboratorId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      if (section === "details") {
        setFormData({
          ...formData,
          details: {
            ...formData.details,
            [field]: value,
          },
        });
      } else if (section === "capacity") {
        setFormData({
          ...formData,
          capacity: {
            ...formData.capacity,
            [field]: value,
          },
        });
      } else if (section === "pricing") {
        setFormData({
          ...formData,
          pricing: {
            ...formData.pricing,
            [field]: value,
          },
        });
      } else if (section === "location") {
        setFormData({
          ...formData,
          location: {
            ...formData.location,
            [field]: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleBooleanChange = (field: string, value: boolean) => {
    if (field.includes(".")) {
      const [section, subfield] = field.split(".");
      if (section === "details") {
        setFormData({
          ...formData,
          details: {
            ...formData.details,
            [subfield]: value,
          },
        });
      } else if (section === "capacity") {
        setFormData({
          ...formData,
          capacity: {
            ...formData.capacity,
            [subfield]: value,
          },
        });
      } else if (section === "pricing") {
        setFormData({
          ...formData,
          pricing: {
            ...formData.pricing,
            [subfield]: value,
          },
        });
      } else if (section === "location") {
        setFormData({
          ...formData,
          location: {
            ...formData.location,
            [subfield]: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSelectChange = (value: string, field: string) => {
    if (field.includes(".")) {
      const [section, subfield] = field.split(".");
      if (section === "details") {
        setFormData({
          ...formData,
          details: {
            ...formData.details,
            [subfield]: value,
          },
        });
      } else if (section === "capacity") {
        setFormData({
          ...formData,
          capacity: {
            ...formData.capacity,
            [subfield]: value,
          },
        });
      } else if (section === "pricing") {
        setFormData({
          ...formData,
          pricing: {
            ...formData.pricing,
            [subfield]: value,
          },
        });
      } else if (section === "location") {
        setFormData({
          ...formData,
          location: {
            ...formData.location,
            [subfield]: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  // La función handleCoordinateChange se ha eliminado ya que las coordenadas
  // se actualizarán automáticamente

  const handleAddFeature = () => {
    if (featuresInput.trim()) {
      const newFeatures = [...formData.details.features, featuresInput.trim()];
      setFormData({
        ...formData,
        details: {
          ...formData.details,
          features: newFeatures,
        },
      });
      setFeaturesInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...formData.details.features];
    newFeatures.splice(index, 1);
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        features: newFeatures,
      },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // En un caso real, subiríamos la imagen a un servidor
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({
          ...formData,
          image: result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtrar choferes según la búsqueda
  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchDriverQuery.toLowerCase()),
  );

  // Función para manejar la selección/deselección de tipos de disponibilidad
  const handleAvailabilityTypeChange = (type: string) => {
    const currentTypes = [...formData.availabilityType];
    const index = currentTypes.indexOf(type);

    if (index > -1) {
      // Si ya está seleccionado, quitarlo
      currentTypes.splice(index, 1);
    } else {
      // Si no está seleccionado, añadirlo
      currentTypes.push(type);
    }

    setFormData({
      ...formData,
      availabilityType: currentTypes,
    });
  };

  // Constantes con los tipos de disponibilidad disponibles
  const availabilityTypes = [
    { id: "fixed_route", label: "Ruta fija" },
    { id: "flexible_route", label: "Ruta flexible" },
    { id: "zone", label: "Zona" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Preparar datos finales
      const finalData = {
        ...formData,
        // Aseguramos que description y notes sean compatibles
        description: formData.notes || formData.description,
        // Convertir capacity a números
        capacity: {
          passengers: parseInt(formData.capacity.passengers.toString()),
          luggage: parseInt(formData.capacity.luggage.toString()),
        },
        // Convertir pricing a números
        pricing: {
          base_fare: parseFloat(formData.pricing.base_fare.toString()),
          per_km: parseFloat(formData.pricing.per_km.toString()),
          per_hour: parseFloat(formData.pricing.per_hour.toString()),
          currency: formData.pricing.currency,
        },
        // Convertir availability_radius a número
        availability_radius: parseFloat(
          formData.availability_radius.toString(),
        ),
        // Asegurar que collaboratorId está definido
        collaboratorId: formData.collaboratorId || "",
        // Asegurar que availabilityType siempre sea un array no vacío
        availabilityType:
          formData.availabilityType.length === 0
            ? ["zone"]
            : formData.availabilityType,
        // Usar associatedDrivers directamente
        associatedDrivers: formData.associatedDrivers || [],
      };

      // Procesar el envío del formulario
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(finalData);
    } catch (error) {
      console.error("Error al guardar el vehículo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full" data-oid="e8i3ln.">
      <CardHeader data-oid="0y2.psy">
        <CardTitle data-oid="esu_s3z">
          {editMode ? "Editar Vehículo" : "Añadir Nuevo Vehículo"}
        </CardTitle>
        <CardDescription data-oid="k3d2cwj">
          {editMode
            ? "Actualice los detalles del vehículo seleccionado"
            : "Complete el formulario para añadir un nuevo vehículo al sistema"}
        </CardDescription>
      </CardHeader>

      <CardContent data-oid="sefo97s">
        <form onSubmit={handleSubmit} className="space-y-6" data-oid="inv:xyf">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid=":1no6hz"
          >
            {/* Información básica */}
            <div className="space-y-4" data-oid="2q14ys-">
              <h3
                className="text-lg font-medium flex items-center"
                data-oid="uhhnq9b"
              >
                <Car className="mr-2 h-5 w-5" data-oid="zmnk8:d" />
                Información Básica
              </h3>

              <div className="space-y-3" data-oid="pw:6vrn">
                <div data-oid="-jfr8jb">
                  <Label htmlFor="name" data-oid="cn8qov:">
                    Nombre del Vehículo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Mercedes-Benz Clase S"
                    required
                    data-oid="n9d9n_o"
                  />
                </div>

                <div data-oid="9w:jn_8">
                  <Label htmlFor="licensePlate" data-oid="q:r19v4">
                    Matrícula
                  </Label>
                  <Input
                    id="licensePlate"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    placeholder="1234ABC"
                    required
                    data-oid="arz9r9c"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid="_t:hu_k">
                  <div data-oid=".penv_9">
                    <Label htmlFor="type" data-oid="1c___3:">
                      Tipo
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        handleSelectChange(value, "type")
                      }
                      data-oid="1.t.e67"
                    >
                      <SelectTrigger data-oid="pc9uj27">
                        <SelectValue
                          placeholder="Seleccionar tipo"
                          data-oid=".kngv_:"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="0mwd5cr">
                        <SelectItem value="sedan" data-oid=":eqj7t3">
                          Sedán
                        </SelectItem>
                        <SelectItem value="suv" data-oid="r2bk8t1">
                          SUV
                        </SelectItem>
                        <SelectItem value="van" data-oid="rer18zx">
                          Van/Minivan
                        </SelectItem>
                        <SelectItem value="limousine" data-oid="93oro6t">
                          Limusina
                        </SelectItem>
                        <SelectItem value="helicopter" data-oid="0.1zndr">
                          Helicóptero
                        </SelectItem>
                        <SelectItem value="jet" data-oid="8lvl45_">
                          Jet
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div data-oid="_m4bl3z">
                    <Label htmlFor="category" data-oid="gydt5h1">
                      Categoría
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleSelectChange(value, "category")
                      }
                      data-oid="730.a9n"
                    >
                      <SelectTrigger data-oid="vpwazr:">
                        <SelectValue
                          placeholder="Seleccionar categoría"
                          data-oid="hoak8p6"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="5nbxitn">
                        <SelectItem value="business_class" data-oid="aygevxy">
                          Business Class
                        </SelectItem>
                        <SelectItem value="first_class" data-oid="6.__n-j">
                          First Class
                        </SelectItem>
                        <SelectItem value="business_van" data-oid="l_2g6jg">
                          Business Van
                        </SelectItem>
                        <SelectItem value="armored_class" data-oid=".7.v.fy">
                          Blindado
                        </SelectItem>
                        <SelectItem value="limousine_class" data-oid="are8y51">
                          Limusina
                        </SelectItem>
                        <SelectItem value="air_transfer" data-oid="icdw23a">
                          Transporte Aéreo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div data-oid="sbc43fv">
                  <Label htmlFor="notes" data-oid="orhiek-">
                    Descripción/Notas
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Descripción breve del vehículo"
                    className="resize-none"
                    rows={3}
                    data-oid="j3bni3."
                  />
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-oid="zpk5jn3"
                >
                  <div data-oid="e7:z:--">
                    <Label htmlFor="details.brand" data-oid=".i:5upc">
                      Marca
                    </Label>
                    <Input
                      id="details.brand"
                      name="details.brand"
                      value={formData.details.brand}
                      onChange={handleChange}
                      placeholder="Mercedes-Benz"
                      data-oid="p1:e17v"
                    />
                  </div>

                  <div data-oid="k1-_dwy">
                    <Label htmlFor="details.model" data-oid="29c8nu6">
                      Modelo
                    </Label>
                    <Input
                      id="details.model"
                      name="details.model"
                      value={formData.details.model}
                      onChange={handleChange}
                      placeholder="Clase S"
                      data-oid="2h2r7am"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4" data-oid="3iczo24">
                  <div data-oid="qeo88jw">
                    <Label htmlFor="details.year" data-oid="otw:a-b">
                      Año
                    </Label>
                    <Input
                      id="details.year"
                      name="details.year"
                      value={formData.details.year}
                      onChange={handleChange}
                      placeholder="2023"
                      type="number"
                      data-oid="50pprcy"
                    />
                  </div>

                  <div data-oid="p5-_tv:">
                    <Label htmlFor="details.color" data-oid="axzqyia">
                      Color
                    </Label>
                    <Input
                      id="details.color"
                      name="details.color"
                      value={formData.details.color}
                      onChange={handleChange}
                      placeholder="Negro"
                      data-oid=":3m:zz-"
                    />
                  </div>

                  <div data-oid="zgsyg73">
                    <Label htmlFor="capacity.passengers" data-oid="-0zsgy_">
                      Capacidad Pasajeros
                    </Label>
                    <Input
                      id="capacity.passengers"
                      name="capacity.passengers"
                      value={formData.capacity.passengers.toString()}
                      onChange={handleChange}
                      type="number"
                      data-oid="-7-90gw"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid="9j5e82v">
                  <div data-oid="m2ia_wf">
                    <Label htmlFor="capacity.luggage" data-oid="fuig:7a">
                      Capacidad Equipaje
                    </Label>
                    <Input
                      id="capacity.luggage"
                      name="capacity.luggage"
                      value={formData.capacity.luggage.toString()}
                      onChange={handleChange}
                      type="number"
                      data-oid="vgc.9yq"
                    />
                  </div>

                  <div data-oid="8h75zfo">
                    <div
                      className="flex items-center space-x-2 pt-2"
                      data-oid="9kt9ycz"
                    >
                      <Switch
                        id="details.armored"
                        checked={formData.details.armored}
                        onCheckedChange={(checked: boolean) =>
                          handleBooleanChange("details.armored", checked)
                        }
                        data-oid="ic86jok"
                      />

                      <Label htmlFor="details.armored" data-oid="xxj5vef">
                        Blindado
                      </Label>
                    </div>
                  </div>
                </div>

                {formData.details.armored && (
                  <div data-oid="_rtj_48">
                    <Label htmlFor="details.armor_level" data-oid="9bsujs7">
                      Nivel de Blindaje
                    </Label>
                    <Input
                      id="details.armor_level"
                      name="details.armor_level"
                      value={formData.details.armor_level}
                      onChange={handleChange}
                      placeholder="VR9"
                      data-oid="7gge9k9"
                    />
                  </div>
                )}

                <div className="space-y-3" data-oid="matm._p">
                  <Label htmlFor="features" data-oid="xzi5llr">
                    Características/Amenidades
                  </Label>
                  <div className="flex gap-2" data-oid="vinhras">
                    <Input
                      id="features-input"
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      placeholder="Añadir característica"
                      className="flex-1"
                      data-oid="lcl_:t6"
                    />

                    <Button
                      type="button"
                      onClick={handleAddFeature}
                      variant="outline"
                      data-oid="sjhs_lo"
                    >
                      <PlusCircle size={18} data-oid="y519-rw" />
                    </Button>
                  </div>

                  {formData.details.features.length > 0 && (
                    <div
                      className="mt-2 flex flex-wrap gap-2"
                      data-oid="xvpldnp"
                    >
                      {formData.details.features.map(
                        (feature: string, index: number) => (
                          <div
                            key={index}
                            className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"
                            data-oid="m3irt99"
                          >
                            {feature}
                            <button
                              type="button"
                              className="ml-2 text-gray-600 hover:text-gray-600"
                              onClick={() => handleRemoveFeature(index)}
                              data-oid="lradzfa"
                            >
                              <X size={14} data-oid="ihey82_" />
                            </button>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Propietario e información adicional */}
            <div className="space-y-4" data-oid="uys.6ie">
              <h3
                className="text-lg font-medium flex items-center"
                data-oid="63f4wr."
              >
                <User className="mr-2 h-5 w-5" data-oid="t:i5:ez" />
                Propietario y Disponibilidad
              </h3>

              <div className="space-y-3" data-oid="8-2sxll">
                <div data-oid="zbyoj.i">
                  <Label htmlFor="ownerType" data-oid=":iwcguq">
                    Tipo de Propietario
                  </Label>
                  <Select
                    value={formData.ownerType}
                    onValueChange={(value) =>
                      handleSelectChange(value, "ownerType")
                    }
                    data-oid="m47xo0f"
                  >
                    <SelectTrigger data-oid="n9xew54">
                      <SelectValue
                        placeholder="Seleccionar tipo de propietario"
                        data-oid="z3zugep"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="-c6e.:f">
                      <SelectItem value="company" data-oid="xx14s5.">
                        Empresa
                      </SelectItem>
                      <SelectItem value="private_driver" data-oid="u:nwjg8">
                        Chófer Privado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div data-oid="r79jy7l">
                  <Label htmlFor="collaboratorId" data-oid="r3ktfky">
                    Seleccionar Colaborador
                  </Label>
                  <Select
                    value={formData.collaboratorId || ""}
                    onValueChange={(value) => {
                      // Al cambiar el colaborador, resetear los choferes seleccionados
                      if (formData.collaboratorId !== value) {
                        setFormData({
                          ...formData,
                          collaboratorId: value,
                          associatedDrivers: [],
                          ownerName:
                            collaborators.find((c) => c.id === value)?.name ||
                            "",
                        });
                      }
                    }}
                    disabled={loadingCollaborators}
                    data-oid="leahb02"
                  >
                    <SelectTrigger data-oid="8hr0p46">
                      <SelectValue
                        placeholder={
                          loadingCollaborators
                            ? "Cargando colaboradores..."
                            : "Seleccionar colaborador"
                        }
                        data-oid="a:stb1j"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="pe1tfht">
                      {collaborators.length > 0 ? (
                        collaborators.map((collaborator) => (
                          <SelectItem
                            key={collaborator.id}
                            value={collaborator.id}
                            data-oid="d:5bnpw"
                          >
                            {collaborator.name} ({collaborator.type})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem
                          value="no_collaborators"
                          disabled
                          data-oid="8s7jyio"
                        >
                          No hay colaboradores disponibles
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div data-oid="f-4tlxw">
                  <Label className="mb-2 block" data-oid="vyh_r4e">
                    Choferes Asignados
                  </Label>

                  <Popover
                    open={driverPopoverOpen}
                    onOpenChange={(open) => {
                      // Resetear la búsqueda al abrir/cerrar
                      if (!open) {
                        setSearchDriverQuery("");
                      }
                      setDriverPopoverOpen(open);
                    }}
                    data-oid="3p2b-80"
                  >
                    <PopoverTrigger asChild data-oid="j64jn4.">
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !formData.collaboratorId &&
                            "opacity-50 cursor-not-allowed",
                        )}
                        disabled={!formData.collaboratorId || loadingDrivers}
                        data-oid="6eq_5qa"
                      >
                        {formData.associatedDrivers.length > 0
                          ? `${formData.associatedDrivers.length} chofer(es) seleccionado(s)`
                          : "Seleccionar choferes"}
                        <ChevronsUpDown
                          className="ml-2 h-4 w-4 shrink-0 opacity-50"
                          data-oid="pebb3mo"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" data-oid="qwnqx7-">
                      {loadingDrivers ? (
                        <div className="p-4 text-center" data-oid="95c-3pa">
                          <span
                            className="animate-spin inline-block mr-2"
                            data-oid="1xqqo2z"
                          >
                            ⏳
                          </span>
                          Cargando choferes...
                        </div>
                      ) : (
                        <div className="p-1" data-oid="trt5f8u">
                          <div
                            className="border-b px-3 py-2"
                            data-oid="avfosv9"
                          >
                            <input
                              className="w-full border-none bg-transparent outline-none placeholder:text-gray-400"
                              placeholder="Buscar chofer..."
                              value={searchDriverQuery}
                              onChange={(e) => {
                                setSearchDriverQuery(e.target.value);
                              }}
                              data-oid="oiab-cj"
                            />
                          </div>
                          <ScrollArea className="h-60 py-2" data-oid="n3:.fci">
                            {filteredDrivers.length === 0 ? (
                              <div
                                className="py-6 text-center text-sm"
                                data-oid="luniltc"
                              >
                                {drivers.length === 0
                                  ? "No hay choferes disponibles para este colaborador."
                                  : "No se encontraron choferes con esa búsqueda."}
                              </div>
                            ) : (
                              <div className="px-1" data-oid="mghsrk7">
                                {filteredDrivers.map((driver) => {
                                  const isSelected =
                                    formData.associatedDrivers.includes(
                                      driver.id,
                                    );
                                  return (
                                    <button
                                      key={driver.id}
                                      type="button"
                                      className={cn(
                                        "flex w-full items-center rounded-md px-2 py-2 text-sm relative select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                        isSelected
                                          ? "bg-gray-100"
                                          : "hover:bg-gray-50",
                                      )}
                                      onClick={() => {
                                        console.log(
                                          "Seleccionando chofer:",
                                          driver.id,
                                        );
                                        let updatedDrivers;

                                        if (isSelected) {
                                          // Si ya está seleccionado, quitarlo
                                          updatedDrivers =
                                            formData.associatedDrivers.filter(
                                              (id) => id !== driver.id,
                                            );
                                        } else {
                                          // Si no está seleccionado, añadirlo
                                          updatedDrivers = [
                                            ...formData.associatedDrivers,
                                            driver.id,
                                          ];
                                        }

                                        setFormData({
                                          ...formData,
                                          associatedDrivers: updatedDrivers,
                                        });
                                      }}
                                      data-oid="netp73r"
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          isSelected
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                        data-oid="tagux.r"
                                      />

                                      <span data-oid="o37dhs4">
                                        {driver.name}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </ScrollArea>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>

                  {formData.associatedDrivers.length > 0 && (
                    <div
                      className="mt-3 flex flex-wrap gap-2"
                      data-oid="ux-ks9h"
                    >
                      {formData.associatedDrivers.map((driverId) => {
                        const driverInfo = drivers.find(
                          (d) => d.id === driverId,
                        );
                        return driverInfo ? (
                          <Badge
                            key={driverId}
                            className="py-1.5 pl-2 pr-1 flex items-center bg-gray-200 text-blue-800 hover:bg-blue-200"
                            data-oid="zzh3r:7"
                          >
                            {driverInfo.name}
                            <button
                              type="button"
                              className="ml-1 text-gray-600 hover:text-blue-800 focus:outline-none"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  associatedDrivers:
                                    formData.associatedDrivers.filter(
                                      (id) => id !== driverId,
                                    ),
                                });
                              }}
                              data-oid="lbsovb1"
                            >
                              <X className="h-3 w-3" data-oid="m9e-d7m" />
                            </button>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

                <div data-oid="14is:4.">
                  <Label htmlFor="ownerCountry" data-oid="ar8kxwy">
                    País del Propietario
                  </Label>
                  <Select
                    value={formData.ownerCountry}
                    onValueChange={(value) =>
                      handleSelectChange(value, "ownerCountry")
                    }
                    data-oid="g79r1sh"
                  >
                    <SelectTrigger data-oid="tizye9v">
                      <SelectValue
                        placeholder="Seleccionar país"
                        data-oid="6z65z80"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid=":0thl-x">
                      <SelectItem value="ES" data-oid="575qm5s">
                        🇪🇸 España
                      </SelectItem>
                      <SelectItem value="PT" data-oid="zjh__21">
                        🇵🇹 Portugal
                      </SelectItem>
                      <SelectItem value="FR" data-oid="cgpf9rd">
                        🇫🇷 Francia
                      </SelectItem>
                      <SelectItem value="IT" data-oid="t.hplup">
                        🇮🇹 Italia
                      </SelectItem>
                      <SelectItem value="DE" data-oid="zdnsoy7">
                        🇩🇪 Alemania
                      </SelectItem>
                      <SelectItem value="GB" data-oid="cq.ntfo">
                        🇬🇧 Reino Unido
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div data-oid=".mtn-y9">
                  <Label className="mb-2 block" data-oid="f6jsz:-">
                    Tipo de Disponibilidad
                  </Label>
                  <div
                    className="space-y-2 border p-3 rounded-md"
                    data-oid="bddyrov"
                  >
                    {availabilityTypes.map((type) => (
                      <div
                        key={type.id}
                        className="flex items-center"
                        data-oid="-xf54-j"
                      >
                        <input
                          type="checkbox"
                          id={`availability-${type.id}`}
                          checked={formData.availabilityType.includes(type.id)}
                          onChange={() => handleAvailabilityTypeChange(type.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-red-500"
                          data-oid="hausf0e"
                        />

                        <label
                          htmlFor={`availability-${type.id}`}
                          className="ml-2 block text-sm text-gray-900"
                          data-oid="vgz:3am"
                        >
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div data-oid="cukfwpf">
                  <Label htmlFor="availabilityDetails" data-oid="ytb6vt-">
                    Detalles de disponibilidad
                  </Label>
                  <Textarea
                    id="availabilityDetails"
                    name="availabilityDetails"
                    value={formData.availabilityDetails}
                    onChange={handleChange}
                    placeholder="Ej: Disponible para Madrid Capital, Recorrido Aeropuerto-Centro, etc."
                    className="resize-none h-20"
                    data-oid="ya.jqqo"
                  />
                </div>

                <div data-oid="l8:xs.b">
                  <Label htmlFor="insurancePolicyNumber" data-oid="ornt8k_">
                    Número de Póliza de Seguro
                  </Label>
                  <Input
                    id="insurancePolicyNumber"
                    name="insurancePolicyNumber"
                    value={formData.insurancePolicyNumber}
                    onChange={handleChange}
                    placeholder="Ej: POL-12345"
                    data-oid="qsfarpd"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid="tsfge1.">
                  <div data-oid="vohq.:f">
                    <Label htmlFor="lastMaintenanceDate" data-oid="0lfrzby">
                      Último Mantenimiento
                    </Label>
                    <Input
                      id="lastMaintenanceDate"
                      name="lastMaintenanceDate"
                      value={formData.lastMaintenanceDate}
                      onChange={handleChange}
                      type="date"
                      data-oid="_b.s9b9"
                    />
                  </div>

                  <div data-oid="lxcplxf">
                    <Label htmlFor="contractEndDate" data-oid="ub4:h4o">
                      Fin de Contrato
                    </Label>
                    <Input
                      id="contractEndDate"
                      name="contractEndDate"
                      value={formData.contractEndDate}
                      onChange={handleChange}
                      type="date"
                      data-oid="j2.rex1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Precios e imagen */}
            <div className="space-y-4" data-oid="9kp9jmh">
              <h3
                className="text-lg font-medium flex items-center"
                data-oid="oj2qk3a"
              >
                <DollarSign className="mr-2 h-5 w-5" data-oid="e.4wlb5" />
                Precios y Disponibilidad
              </h3>

              <div className="space-y-3" data-oid="l1nmqeo">
                <div className="grid grid-cols-2 gap-4" data-oid="h0jx5_s">
                  <div data-oid="b48cpfs">
                    <Label htmlFor="pricing.base_fare" data-oid="vms32hu">
                      Tarifa Base
                    </Label>
                    <Input
                      id="pricing.base_fare"
                      name="pricing.base_fare"
                      value={formData.pricing.base_fare.toString()}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      step="0.01"
                      data-oid="yrg1rcy"
                    />
                  </div>

                  <div data-oid=".84s3ce">
                    <Label htmlFor="pricing.currency" data-oid="zpss2z7">
                      Moneda
                    </Label>
                    <Select
                      value={formData.pricing.currency}
                      onValueChange={(value) =>
                        handleSelectChange(value, "pricing.currency")
                      }
                      data-oid="7qmu713"
                    >
                      <SelectTrigger data-oid="ut075d:">
                        <SelectValue
                          placeholder="Seleccionar moneda"
                          data-oid="ictuedp"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="xl2n307">
                        <SelectItem value="EUR" data-oid="lfvw3cz">
                          EUR - Euro
                        </SelectItem>
                        <SelectItem value="USD" data-oid="ebde6fj">
                          USD - Dólar
                        </SelectItem>
                        <SelectItem value="GBP" data-oid="5vvhdt0">
                          GBP - Libra
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid="sl0-cq8">
                  <div data-oid="_m6cvg3">
                    <Label htmlFor="pricing.per_km" data-oid="cpuy.ak">
                      Precio por km
                    </Label>
                    <Input
                      id="pricing.per_km"
                      name="pricing.per_km"
                      value={formData.pricing.per_km.toString()}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      step="0.01"
                      data-oid="0jp4_v2"
                    />
                  </div>

                  <div data-oid="pqn..eh">
                    <Label htmlFor="pricing.per_hour" data-oid="7xc.lxq">
                      Precio por hora
                    </Label>
                    <Input
                      id="pricing.per_hour"
                      name="pricing.per_hour"
                      value={formData.pricing.per_hour.toString()}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      step="0.01"
                      data-oid="l4hedm7"
                    />
                  </div>
                </div>

                <div data-oid="n8bbge5">
                  <Label htmlFor="availability_radius" data-oid="554gan_">
                    Radio de disponibilidad (km)
                  </Label>
                  <Input
                    id="availability_radius"
                    name="availability_radius"
                    value={formData.availability_radius.toString()}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    data-oid=":73lz2a"
                  />
                </div>

                <div
                  className="flex items-center space-x-2 pt-2"
                  data-oid="txkoczd"
                >
                  <Switch
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked: boolean) =>
                      handleBooleanChange("available", checked)
                    }
                    data-oid="oat7s4y"
                  />

                  <Label htmlFor="available" data-oid="6occz.5">
                    Vehículo Disponible
                  </Label>
                </div>

                <div className="pt-4" data-oid="9t7ovr2">
                  <Label className="mb-2 block" data-oid="epl4jve">
                    Imagen del Vehículo
                  </Label>
                  <div
                    className="border border-dashed border-gray-300 rounded-lg p-6 text-center"
                    data-oid="ev07fk:"
                  >
                    {imagePreview ? (
                      <div className="relative" data-oid="o-gp6iz">
                        <img
                          src={imagePreview}
                          alt="Vista previa"
                          className="mx-auto max-h-48 rounded-lg object-cover"
                          data-oid="knue.dx"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData({ ...formData, image: "" });
                          }}
                          className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 rounded-full p-1"
                          data-oid="_ror3:v"
                        >
                          <X size={16} data-oid="07:8vtn" />
                        </button>
                      </div>
                    ) : (
                      <div data-oid="tbmc_6j">
                        <Upload
                          className="mx-auto h-12 w-12 text-gray-400"
                          data-oid="-ourh7e"
                        />

                        <label
                          htmlFor="image-upload"
                          className="mt-2 cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-block"
                          data-oid="z803das"
                        >
                          Subir imagen
                        </label>
                        <input
                          id="image-upload"
                          name="image"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                          data-oid="bqc0ckf"
                        />

                        <p
                          className="mt-2 text-xs text-gray-500"
                          data-oid="b9aqg:y"
                        >
                          PNG, JPG, WEBP hasta 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4" data-oid="5361abw">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              data-oid="323n9.d"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} data-oid="3b_t27q">
              {loading
                ? "Guardando..."
                : editMode
                  ? "Actualizar Vehículo"
                  : "Añadir Vehículo"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VehicleForm;
