"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  // Parse the time value
  const timeParts = value ? value.split(":") : [];
  let hours = parseInt(timeParts[0], 10);
  let minutes = parseInt(timeParts[1], 10);

  if (isNaN(hours)) {
    hours = 12;
  }
  if (isNaN(minutes)) {
    minutes = 0;
  }

  // Handles
  const handleHourChange = (hour: string) => {
    const newHour = hour.padStart(2, "0");
    const newMinute = minutes.toString().padStart(2, "0");
    onChange(`${newHour}:${newMinute}`);
  };

  const handleMinuteChange = (minute: string) => {
    const newHour = hours.toString().padStart(2, "0");
    const newMinute = minute.padStart(2, "0");
    onChange(`${newHour}:${newMinute}`);
  };

  // Generate hours and minutes options
  const hoursOptions = Array.from({ length: 24 }, (_, i) => i);
  const minutesOptions = Array.from({ length: 4 }, (_, i) => i * 15);

  return (
    <Popover data-oid="hj2if-w">
      <PopoverTrigger asChild data-oid="236otcg">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal border rounded-md h-[52px] focus-within:border-gray-400 hover:border-gray-400 bg-gray-50",
            !value && "text-muted-foreground",
            className,
          )}
          data-oid="86ub7bb"
        >
          <div className="flex items-center gap-2" data-oid="igtk5x5">
            <Clock className="h-5 w-5 text-gray-400" data-oid="fl6ioux" />
            <div className="flex flex-col" data-oid="criul1:">
              <span className="text-xs text-gray-500" data-oid="8sff6h5">
                Hora
              </span>
              <span className="text-sm" data-oid="s:.75lt">
                {value || "Seleccionar hora"}
              </span>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start" data-oid="md8lj4n">
        <div className="space-y-4" data-oid="7hdqbln">
          <div className="flex items-center justify-center" data-oid="afdz5:i">
            <div
              className="text-center text-sm font-medium text-gray-500"
              data-oid="ydsqpnc"
            >
              Seleccionar hora
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4" data-oid="go1ji77">
            <div className="space-y-2" data-oid="9vtewet">
              <div className="text-xs text-gray-500" data-oid="72ua9ks">
                Hora
              </div>
              <Select
                value={hours.toString()}
                onValueChange={handleHourChange}
                data-oid="12l_f.s"
              >
                <SelectTrigger className="w-full" data-oid="nqp44wy">
                  <SelectValue placeholder="Hora" data-oid="br01p54" />
                </SelectTrigger>
                <SelectContent className="max-h-72" data-oid="30_of2m">
                  {hoursOptions.map((hour) => (
                    <SelectItem
                      key={hour}
                      value={hour.toString()}
                      className={
                        hour === hours ? "bg-black text-white font-bold" : ""
                      }
                      data-oid="9er_fga"
                    >
                      {hour.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2" data-oid="6tm_oxv">
              <div className="text-xs text-gray-500" data-oid="fa4yr-u">
                Minutos
              </div>
              <Select
                value={minutes.toString()}
                onValueChange={handleMinuteChange}
                data-oid="1tdojkm"
              >
                <SelectTrigger className="w-full" data-oid="hcxzvh_">
                  <SelectValue placeholder="Minutos" data-oid="21dve2a" />
                </SelectTrigger>
                <SelectContent className="max-h-72" data-oid="rl5o8o_">
                  {minutesOptions.map((minute) => (
                    <SelectItem
                      key={minute}
                      value={minute.toString()}
                      className={
                        minute === minutes
                          ? "bg-black text-white font-bold"
                          : ""
                      }
                      data-oid="i1z8_0k"
                    >
                      {minute.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
