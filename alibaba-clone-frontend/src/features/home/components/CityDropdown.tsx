import { useEffect, useState } from "react";
import { getCities } from "@/api/features/homeApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CityResultDto } from "@/shared/models/city/CityResultDto";

interface CityDropdownProps {
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

const CityDropdown = ({ placeholder, value, onChange, className }: CityDropdownProps) => {
  const [cities, setCities] = useState<CityResultDto[]>([]);

  {
    /* load cities */
  }
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
        <SelectItem key={null} value="null">
          *
        </SelectItem>
        {/* map cities from api */}
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
