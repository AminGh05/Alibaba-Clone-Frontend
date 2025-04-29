import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCities } from "@/api/home/homeApi";
import { CityResult } from "@/shared/models/city/CityResult";

interface CityDropdownProps {
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

const CityDropdown = ({
  placeholder,
  value,
  onChange,
  className,
}: CityDropdownProps) => {
  const [cities, setCities] = useState<CityResult[]>([]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await getCities();
        setCities(response.data);
      } catch (error) {
        console.error("Error loading cities:", error);
        setCities([]);
      }
    };

    loadCities();
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {cities.map((city) => (
          <SelectItem key={city.id} value={city.id.toString()}>
            {city.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CityDropdown;
