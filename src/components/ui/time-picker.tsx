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
    <Popover data-oid="vd3thrr">
      <PopoverTrigger asChild data-oid=".ib_p0l">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal border rounded-md h-[52px] focus-within:border-gray-400 hover:border-gray-400 bg-gray-50",
            !value && "text-muted-foreground",
            className,
          )}
          data-oid="m29hr0."
        >
          <div className="flex items-center gap-2" data-oid="7fpi4b6">
            <Clock className="h-5 w-5 text-gray-400" data-oid="hbaq7o1" />
            <div className="flex flex-col" data-oid="b87eomc">
              <span className="text-xs text-gray-500" data-oid="vzoc0ll">
                Hora
              </span>
              <span className="text-sm" data-oid="beut:jo">
                {value || "Seleccionar hora"}
              </span>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start" data-oid="mo49k7-">
        <div className="space-y-4" data-oid="ww.:1_1">
          <div className="flex items-center justify-center" data-oid="d965-oz">
            <div
              className="text-center text-sm font-medium text-gray-500"
              data-oid="7oujt-i"
            >
              Seleccionar hora
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4" data-oid="s7q.-rq">
            <div className="space-y-2" data-oid="q1rlml1">
              <div className="text-xs text-gray-500" data-oid="co8.a5x">
                Hora
              </div>
              <Select
                value={hours.toString()}
                onValueChange={handleHourChange}
                data-oid="66v0:1q"
              >
                <SelectTrigger className="w-full" data-oid="o6.y722">
                  <SelectValue placeholder="Hora" data-oid="vecf3.:" />
                </SelectTrigger>
                <SelectContent className="max-h-72" data-oid="he6nb-q">
                  {hoursOptions.map((hour) => (
                    <SelectItem
                      key={hour}
                      value={hour.toString()}
                      className={
                        hour === hours ? "bg-black text-white font-bold" : ""
                      }
                      data-oid="s9ipap8"
                    >
                      {hour.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2" data-oid="4-aa_7v">
              <div className="text-xs text-gray-500" data-oid="mcm7kg3">
                Minutos
              </div>
              <Select
                value={minutes.toString()}
                onValueChange={handleMinuteChange}
                data-oid="5l0ea2:"
              >
                <SelectTrigger className="w-full" data-oid="3uk7:cz">
                  <SelectValue placeholder="Minutos" data-oid=".cqf81f" />
                </SelectTrigger>
                <SelectContent className="max-h-72" data-oid="57w:6qz">
                  {minutesOptions.map((minute) => (
                    <SelectItem
                      key={minute}
                      value={minute.toString()}
                      className={
                        minute === minutes
                          ? "bg-black text-white font-bold"
                          : ""
                      }
                      data-oid="xvz5pxu"
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
