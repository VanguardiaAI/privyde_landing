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
    <Card className="w-full" data-oid="qxtduv1">
      <CardHeader data-oid="qcylgza">
        <CardTitle data-oid="t649uf0">
          {editMode ? "Editar Vehículo" : "Añadir Nuevo Vehículo"}
        </CardTitle>
        <CardDescription data-oid="1b6qv2p">
          {editMode
            ? "Actualice los detalles del vehículo seleccionado"
            : "Complete el formulario para añadir un nuevo vehículo al sistema"}
        </CardDescription>
      </CardHeader>

      <CardContent data-oid="_-:_4wc">
        <form onSubmit={handleSubmit} className="space-y-6" data-oid="eazk6c3">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="r5r94h3"
          >
            {/* Información básica */}
            <div className="space-y-4" data-oid="ed:bhxu">
              <h3
                className="text-lg font-medium flex items-center"
                data-oid="qok3e2s"
              >
                <Car className="mr-2 h-5 w-5" data-oid="7f-:e54" />
                Información Básica
              </h3>

              <div className="space-y-3" data-oid="d2-mp-l">
                <div data-oid="x8ul.6_">
                  <Label htmlFor="name" data-oid="a3p3t67">
                    Nombre del Vehículo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Mercedes-Benz Clase S"
                    required
                    data-oid="bawxno6"
                  />
                </div>

                <div data-oid="rtkcx0w">
                  <Label htmlFor="licensePlate" data-oid="1cpuxto">
                    Matrícula
                  </Label>
                  <Input
                    id="licensePlate"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    placeholder="1234ABC"
                    required
                    data-oid="7kn-ibi"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid="qbwyphw">
                  <div data-oid="6ur7_15">
                    <Label htmlFor="type" data-oid="g05wo7c">
                      Tipo
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        handleSelectChange(value, "type")
                      }
                      data-oid="s3_g8dr"
                    >
                      <SelectTrigger data-oid="yit_sq2">
                        <SelectValue
                          placeholder="Seleccionar tipo"
                          data-oid="cka0i45"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="7bzkjnz">
                        <SelectItem value="sedan" data-oid="6hj3b3z">
                          Sedán
                        </SelectItem>
                        <SelectItem value="suv" data-oid="f4neo4-">
                          SUV
                        </SelectItem>
                        <SelectItem value="van" data-oid="okcg-0q">
                          Van/Minivan
                        </SelectItem>
                        <SelectItem value="limousine" data-oid="2c915l_">
                          Limusina
                        </SelectItem>
                        <SelectItem value="helicopter" data-oid="vpmbgjz">
                          Helicóptero
                        </SelectItem>
                        <SelectItem value="jet" data-oid="i2o0z-z">
                          Jet
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div data-oid="olfi2k8">
                    <Label htmlFor="category" data-oid="-aqbn4k">
                      Categoría
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleSelectChange(value, "category")
                      }
                      data-oid="vxr86wu"
                    >
                      <SelectTrigger data-oid="9wgbq0i">
                        <SelectValue
                          placeholder="Seleccionar categoría"
                          data-oid="q-k6zyz"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="98wq7xu">
                        <SelectItem value="business_class" data-oid="bqh84o-">
                          Business Class
                        </SelectItem>
                        <SelectItem value="first_class" data-oid="x5kjkqm">
                          First Class
                        </SelectItem>
                        <SelectItem value="business_van" data-oid="l2b-0q8">
                          Business Van
                        </SelectItem>
                        <SelectItem value="armored_class" data-oid="pvlzvs_">
                          Blindado
                        </SelectItem>
                        <SelectItem value="limousine_class" data-oid="qod7.4y">
                          Limusina
                        </SelectItem>
                        <SelectItem value="air_transfer" data-oid="9z:l98r">
                          Transporte Aéreo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div data-oid="vp:vx08">
                  <Label htmlFor="notes" data-oid="2.1a7xx">
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
                    data-oid="abn1v9r"
                  />
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-oid="lujjp1v"
                >
                  <div data-oid="dvzi2qe">
                    <Label htmlFor="details.brand" data-oid="1r1ttbn">
                      Marca
                    </Label>
                    <Input
                      id="details.brand"
                      name="details.brand"
                      value={formData.details.brand}
                      onChange={handleChange}
                      placeholder="Mercedes-Benz"
                      data-oid=":c:-j-u"
                    />
                  </div>

                  <div data-oid="dp7kiss">
                    <Label htmlFor="details.model" data-oid="uh6azyb">
                      Modelo
                    </Label>
                    <Input
                      id="details.model"
                      name="details.model"
                      value={formData.details.model}
                      onChange={handleChange}
                      placeholder="Clase S"
                      data-oid="vruo.o-"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4" data-oid="9y0nl5m">
                  <div data-oid="i7jt978">
                    <Label htmlFor="details.year" data-oid="oah-jk3">
                      Año
                    </Label>
                    <Input
                      id="details.year"
                      name="details.year"
                      value={formData.details.year}
                      onChange={handleChange}
                      placeholder="2023"
                      type="number"
                      data-oid=".qttqop"
                    />
                  </div>

                  <div data-oid="p9gljl7">
                    <Label htmlFor="details.color" data-oid=":d44s8:">
                      Color
                    </Label>
                    <Input
                      id="details.color"
                      name="details.color"
                      value={formData.details.color}
                      onChange={handleChange}
                      placeholder="Negro"
                      data-oid="mssp.nr"
                    />
                  </div>

                  <div data-oid="7j_q5_r">
                    <Label htmlFor="capacity.passengers" data-oid="-gk:4rz">
                      Capacidad Pasajeros
                    </Label>
                    <Input
                      id="capacity.passengers"
                      name="capacity.passengers"
                      value={formData.capacity.passengers.toString()}
                      onChange={handleChange}
                      type="number"
                      data-oid="ugoan6n"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid="ebx2-ks">
                  <div data-oid="fk6c5.n">
                    <Label htmlFor="capacity.luggage" data-oid="n7d7603">
                      Capacidad Equipaje
                    </Label>
                    <Input
                      id="capacity.luggage"
                      name="capacity.luggage"
                      value={formData.capacity.luggage.toString()}
                      onChange={handleChange}
                      type="number"
                      data-oid="plc6-5p"
                    />
                  </div>

                  <div data-oid="2d6nins">
                    <div
                      className="flex items-center space-x-2 pt-2"
                      data-oid="94-wbss"
                    >
                      <Switch
                        id="details.armored"
                        checked={formData.details.armored}
                        onCheckedChange={(checked: boolean) =>
                          handleBooleanChange("details.armored", checked)
                        }
                        data-oid="5iqca9m"
                      />

                      <Label htmlFor="details.armored" data-oid="q5lobgk">
                        Blindado
                      </Label>
                    </div>
                  </div>
                </div>

                {formData.details.armored && (
                  <div data-oid="l_2gc9k">
                    <Label htmlFor="details.armor_level" data-oid="kl2g15h">
                      Nivel de Blindaje
                    </Label>
                    <Input
                      id="details.armor_level"
                      name="details.armor_level"
                      value={formData.details.armor_level}
                      onChange={handleChange}
                      placeholder="VR9"
                      data-oid="c:t:z8q"
                    />
                  </div>
                )}

                <div className="space-y-3" data-oid="3xlb9u6">
                  <Label htmlFor="features" data-oid="jkjl4lz">
                    Características/Amenidades
                  </Label>
                  <div className="flex gap-2" data-oid="k5yi:e9">
                    <Input
                      id="features-input"
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      placeholder="Añadir característica"
                      className="flex-1"
                      data-oid="ims2xsl"
                    />

                    <Button
                      type="button"
                      onClick={handleAddFeature}
                      variant="outline"
                      data-oid="wb:vbc2"
                    >
                      <PlusCircle size={18} data-oid="9k.f.o2" />
                    </Button>
                  </div>

                  {formData.details.features.length > 0 && (
                    <div
                      className="mt-2 flex flex-wrap gap-2"
                      data-oid="s3ab0ya"
                    >
                      {formData.details.features.map(
                        (feature: string, index: number) => (
                          <div
                            key={index}
                            className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"
                            data-oid="omql0lb"
                          >
                            {feature}
                            <button
                              type="button"
                              className="ml-2 text-gray-600 hover:text-gray-600"
                              onClick={() => handleRemoveFeature(index)}
                              data-oid="i1j:me9"
                            >
                              <X size={14} data-oid="9v62opu" />
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
            <div className="space-y-4" data-oid="oi2.7k6">
              <h3
                className="text-lg font-medium flex items-center"
                data-oid="_gy8007"
              >
                <User className="mr-2 h-5 w-5" data-oid="esu66dg" />
                Propietario y Disponibilidad
              </h3>

              <div className="space-y-3" data-oid="cz5b201">
                <div data-oid="ml_45q-">
                  <Label htmlFor="ownerType" data-oid="5929adc">
                    Tipo de Propietario
                  </Label>
                  <Select
                    value={formData.ownerType}
                    onValueChange={(value) =>
                      handleSelectChange(value, "ownerType")
                    }
                    data-oid="iilm9cp"
                  >
                    <SelectTrigger data-oid="ym1p84r">
                      <SelectValue
                        placeholder="Seleccionar tipo de propietario"
                        data-oid="whdbhp:"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="t3ow4_w">
                      <SelectItem value="company" data-oid="wc3jlrx">
                        Empresa
                      </SelectItem>
                      <SelectItem value="private_driver" data-oid="fqhabcg">
                        Chófer Privado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div data-oid=":i8uf-9">
                  <Label htmlFor="collaboratorId" data-oid="wpdn2_l">
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
                    data-oid="vldxz0o"
                  >
                    <SelectTrigger data-oid="-v:9:im">
                      <SelectValue
                        placeholder={
                          loadingCollaborators
                            ? "Cargando colaboradores..."
                            : "Seleccionar colaborador"
                        }
                        data-oid="sm:rv_e"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="g46-00v">
                      {collaborators.length > 0 ? (
                        collaborators.map((collaborator) => (
                          <SelectItem
                            key={collaborator.id}
                            value={collaborator.id}
                            data-oid="kx_iub_"
                          >
                            {collaborator.name} ({collaborator.type})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem
                          value="no_collaborators"
                          disabled
                          data-oid="2e-iv4p"
                        >
                          No hay colaboradores disponibles
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div data-oid="k03qiy-">
                  <Label className="mb-2 block" data-oid="zfripa4">
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
                    data-oid="x7p1qc8"
                  >
                    <PopoverTrigger asChild data-oid="4vnwssi">
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !formData.collaboratorId &&
                            "opacity-50 cursor-not-allowed",
                        )}
                        disabled={!formData.collaboratorId || loadingDrivers}
                        data-oid="bt6dl8a"
                      >
                        {formData.associatedDrivers.length > 0
                          ? `${formData.associatedDrivers.length} chofer(es) seleccionado(s)`
                          : "Seleccionar choferes"}
                        <ChevronsUpDown
                          className="ml-2 h-4 w-4 shrink-0 opacity-50"
                          data-oid="_cdbaqk"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" data-oid="t1__z8_">
                      {loadingDrivers ? (
                        <div className="p-4 text-center" data-oid="99o2gve">
                          <span
                            className="animate-spin inline-block mr-2"
                            data-oid=".c0d7pd"
                          >
                            ⏳
                          </span>
                          Cargando choferes...
                        </div>
                      ) : (
                        <div className="p-1" data-oid="0qgm0bs">
                          <div
                            className="border-b px-3 py-2"
                            data-oid="js39ycb"
                          >
                            <input
                              className="w-full border-none bg-transparent outline-none placeholder:text-gray-400"
                              placeholder="Buscar chofer..."
                              value={searchDriverQuery}
                              onChange={(e) => {
                                setSearchDriverQuery(e.target.value);
                              }}
                              data-oid="1c85l28"
                            />
                          </div>
                          <ScrollArea className="h-60 py-2" data-oid=":rdtmmx">
                            {filteredDrivers.length === 0 ? (
                              <div
                                className="py-6 text-center text-sm"
                                data-oid=":dnaoyz"
                              >
                                {drivers.length === 0
                                  ? "No hay choferes disponibles para este colaborador."
                                  : "No se encontraron choferes con esa búsqueda."}
                              </div>
                            ) : (
                              <div className="px-1" data-oid="97d341l">
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
                                      data-oid="5_6o-so"
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          isSelected
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                        data-oid="j6os6:s"
                                      />

                                      <span data-oid="z4gysmm">
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
                      data-oid="qvu.-2k"
                    >
                      {formData.associatedDrivers.map((driverId) => {
                        const driverInfo = drivers.find(
                          (d) => d.id === driverId,
                        );
                        return driverInfo ? (
                          <Badge
                            key={driverId}
                            className="py-1.5 pl-2 pr-1 flex items-center bg-gray-200 text-blue-800 hover:bg-blue-200"
                            data-oid="gdqtx8f"
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
                              data-oid="wg:qixt"
                            >
                              <X className="h-3 w-3" data-oid=".dbvdg_" />
                            </button>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

                <div data-oid="2-h9mgq">
                  <Label htmlFor="ownerCountry" data-oid="9flitce">
                    País del Propietario
                  </Label>
                  <Select
                    value={formData.ownerCountry}
                    onValueChange={(value) =>
                      handleSelectChange(value, "ownerCountry")
                    }
                    data-oid="nstiw1t"
                  >
                    <SelectTrigger data-oid="x-a-ji8">
                      <SelectValue
                        placeholder="Seleccionar país"
                        data-oid="bewsk2:"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="6:wci9q">
                      <SelectItem value="ES" data-oid=":adp:ub">
                        🇪🇸 España
                      </SelectItem>
                      <SelectItem value="PT" data-oid="cxrtef3">
                        🇵🇹 Portugal
                      </SelectItem>
                      <SelectItem value="FR" data-oid="-8v2ua0">
                        🇫🇷 Francia
                      </SelectItem>
                      <SelectItem value="IT" data-oid=".phkdt.">
                        🇮🇹 Italia
                      </SelectItem>
                      <SelectItem value="DE" data-oid="h24oexj">
                        🇩🇪 Alemania
                      </SelectItem>
                      <SelectItem value="GB" data-oid="52l-x:a">
                        🇬🇧 Reino Unido
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div data-oid="mkygycd">
                  <Label className="mb-2 block" data-oid="t4x4cvw">
                    Tipo de Disponibilidad
                  </Label>
                  <div
                    className="space-y-2 border p-3 rounded-md"
                    data-oid="a8f0ea."
                  >
                    {availabilityTypes.map((type) => (
                      <div
                        key={type.id}
                        className="flex items-center"
                        data-oid="sf9_-3j"
                      >
                        <input
                          type="checkbox"
                          id={`availability-${type.id}`}
                          checked={formData.availabilityType.includes(type.id)}
                          onChange={() => handleAvailabilityTypeChange(type.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-red-500"
                          data-oid="5-5jpu-"
                        />

                        <label
                          htmlFor={`availability-${type.id}`}
                          className="ml-2 block text-sm text-gray-900"
                          data-oid="dudvjge"
                        >
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div data-oid="5_kedxu">
                  <Label htmlFor="availabilityDetails" data-oid="uja7_sg">
                    Detalles de disponibilidad
                  </Label>
                  <Textarea
                    id="availabilityDetails"
                    name="availabilityDetails"
                    value={formData.availabilityDetails}
                    onChange={handleChange}
                    placeholder="Ej: Disponible para Madrid Capital, Recorrido Aeropuerto-Centro, etc."
                    className="resize-none h-20"
                    data-oid="ndkswc0"
                  />
                </div>

                <div data-oid="csa.s_y">
                  <Label htmlFor="insurancePolicyNumber" data-oid="-n8yjau">
                    Número de Póliza de Seguro
                  </Label>
                  <Input
                    id="insurancePolicyNumber"
                    name="insurancePolicyNumber"
                    value={formData.insurancePolicyNumber}
                    onChange={handleChange}
                    placeholder="Ej: POL-12345"
                    data-oid="uc3:yv5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid=".h2rof5">
                  <div data-oid="zw75zms">
                    <Label htmlFor="lastMaintenanceDate" data-oid="0o-wtwo">
                      Último Mantenimiento
                    </Label>
                    <Input
                      id="lastMaintenanceDate"
                      name="lastMaintenanceDate"
                      value={formData.lastMaintenanceDate}
                      onChange={handleChange}
                      type="date"
                      data-oid="j.nv96b"
                    />
                  </div>

                  <div data-oid="lcb9tyf">
                    <Label htmlFor="contractEndDate" data-oid="bmg6qb1">
                      Fin de Contrato
                    </Label>
                    <Input
                      id="contractEndDate"
                      name="contractEndDate"
                      value={formData.contractEndDate}
                      onChange={handleChange}
                      type="date"
                      data-oid="7q31:x_"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Precios e imagen */}
            <div className="space-y-4" data-oid="tap4d86">
              <h3
                className="text-lg font-medium flex items-center"
                data-oid="rqy--xp"
              >
                <DollarSign className="mr-2 h-5 w-5" data-oid="3hc-72m" />
                Precios y Disponibilidad
              </h3>

              <div className="space-y-3" data-oid="u6pk509">
                <div className="grid grid-cols-2 gap-4" data-oid="aq3at:h">
                  <div data-oid="cesxj8l">
                    <Label htmlFor="pricing.base_fare" data-oid="i3kek0r">
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
                      data-oid="fznzg7j"
                    />
                  </div>

                  <div data-oid="z5dgvla">
                    <Label htmlFor="pricing.currency" data-oid=".ceyjjs">
                      Moneda
                    </Label>
                    <Select
                      value={formData.pricing.currency}
                      onValueChange={(value) =>
                        handleSelectChange(value, "pricing.currency")
                      }
                      data-oid="f5i0a0h"
                    >
                      <SelectTrigger data-oid="ghx_y02">
                        <SelectValue
                          placeholder="Seleccionar moneda"
                          data-oid="0bok8j2"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="3m6fy:2">
                        <SelectItem value="EUR" data-oid="7sptn76">
                          EUR - Euro
                        </SelectItem>
                        <SelectItem value="USD" data-oid="2r-ndns">
                          USD - Dólar
                        </SelectItem>
                        <SelectItem value="GBP" data-oid="4mn.urf">
                          GBP - Libra
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid="i0ol9.a">
                  <div data-oid="vg_s5ej">
                    <Label htmlFor="pricing.per_km" data-oid="bsi6dyf">
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
                      data-oid="-rniv2:"
                    />
                  </div>

                  <div data-oid="ki7o-bx">
                    <Label htmlFor="pricing.per_hour" data-oid="hmwx9wa">
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
                      data-oid="nfzl_b3"
                    />
                  </div>
                </div>

                <div data-oid="jrmd8-v">
                  <Label htmlFor="availability_radius" data-oid="mpqpjlb">
                    Radio de disponibilidad (km)
                  </Label>
                  <Input
                    id="availability_radius"
                    name="availability_radius"
                    value={formData.availability_radius.toString()}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    data-oid="dkx7e6u"
                  />
                </div>

                <div
                  className="flex items-center space-x-2 pt-2"
                  data-oid="t7bykb:"
                >
                  <Switch
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked: boolean) =>
                      handleBooleanChange("available", checked)
                    }
                    data-oid="a1dgv:t"
                  />

                  <Label htmlFor="available" data-oid="jlshe-1">
                    Vehículo Disponible
                  </Label>
                </div>

                <div className="pt-4" data-oid="_swxj-4">
                  <Label className="mb-2 block" data-oid=":ebx80g">
                    Imagen del Vehículo
                  </Label>
                  <div
                    className="border border-dashed border-gray-300 rounded-lg p-6 text-center"
                    data-oid="6gnw5f4"
                  >
                    {imagePreview ? (
                      <div className="relative" data-oid="1axm1.o">
                        <img
                          src={imagePreview}
                          alt="Vista previa"
                          className="mx-auto max-h-48 rounded-lg object-cover"
                          data-oid="k.goiao"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData({ ...formData, image: "" });
                          }}
                          className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 rounded-full p-1"
                          data-oid="f4___aq"
                        >
                          <X size={16} data-oid="_r.j371" />
                        </button>
                      </div>
                    ) : (
                      <div data-oid="d.8pnr-">
                        <Upload
                          className="mx-auto h-12 w-12 text-gray-400"
                          data-oid="79d4a9j"
                        />

                        <label
                          htmlFor="image-upload"
                          className="mt-2 cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-block"
                          data-oid="eak813p"
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
                          data-oid="sgpw_of"
                        />

                        <p
                          className="mt-2 text-xs text-gray-500"
                          data-oid="g7x52x:"
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

          <div className="flex justify-end space-x-3 pt-4" data-oid="vqkx7yf">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              data-oid="jjmr0_l"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} data-oid="sg-kmu-">
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
