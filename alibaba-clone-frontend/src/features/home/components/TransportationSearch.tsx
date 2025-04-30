import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlaneTakeoff, Train, Bus } from "lucide-react";
import CityDropdown from "./CityDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { searchTransportations } from "@/api/home/homeApi";
import { TransportationSearchResult } from "@/shared/models/transportation/TransportationSearchResult";
import { TransportationSearchRequest } from "@/shared/models/transportation/TransportationSearchRequest";
import TransportationCard from "./TransportationCard";

const TransportationSearch = () => {
  const [activeTab, setActiveTab] = useState("flight");
  const [searchRes, setSearchRes] = useState<TransportationSearchResult[]>([]);
  const [searchReq, setSearchReq] = useState<TransportationSearchRequest>({
    vehicleTypeId: 1,
    fromCityId: undefined,
    toCityId: undefined,
    startDate: undefined,
    endDate: undefined,
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await searchTransportations(searchReq);
      setSearchRes(response.data);
    } catch (err) {
      console.log("Search Failed:", err);
      setSearchRes([])
    }
  };

  // update vehicleTypeId based on activeTab
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const vehicleTypeId = value === "flight" ? 1 : value === "train" ? 2 : 3;
    setSearchReq((prev) => ({ ...prev, vehicleTypeId }));
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow"
      style={{ marginBottom: "5vh" }}
    >
      {/* transportation types */}
      <Tabs
        defaultValue="flight"
        value={activeTab}
        onValueChange={handleTabChange}
        className="mb-6"
      >
        <TabsList className="w-full">
          <TabsTrigger value="flight" className="flex items-center gap-2">
            <PlaneTakeoff className="h-4 w-4" />
            Flight
          </TabsTrigger>
          <TabsTrigger value="train" className="flex items-center gap-2">
            <Train className="h-4 w-4" />
            Train
          </TabsTrigger>
          <TabsTrigger value="bus" className="flex items-center gap-2">
            <Bus className="h-4 w-4" />
            Bus
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* search form */}
      <form className="flex flex-wrap gap-4" onSubmit={handleSearch}>
        <div className="flex-1 min-w-[250px]">
          <CityDropdown
            placeholder="From"
            value={searchReq.fromCityId?.toString()}
            onChange={(value) =>
              setSearchReq({ ...searchReq, fromCityId: parseInt(value) })
            }
            className="w-full"
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <CityDropdown
            placeholder="To"
            value={searchReq.toCityId?.toString()}
            onChange={(value) =>
              setSearchReq({ ...searchReq, toCityId: parseInt(value) })
            }
            className="w-full"
          />
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col">
          <DatePicker
            selected={searchReq.startDate}
            onChange={(date: Date | null) =>
              setSearchReq((prev) => ({
                ...prev,
                startDate: date ?? undefined,
              }))
            }
            placeholderText="Start"
            className="w-full h-9 rounded-md border px-3 py-1 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col">
          <DatePicker
            selected={searchReq.endDate}
            onChange={(date: Date | null) =>
              setSearchReq((prev) => ({ ...prev, endDate: date ?? undefined }))
            }
            placeholderText="End"
            className="w-full h-9 rounded-md border px-3 py-1 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            dateFormat="MM/dd/yyyy"
          />
        </div>

        {/* number of passengers */}
        <Select defaultValue="1">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Passengers" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n} Passenger{n > 1 ? "s" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button size="lg" className="px-8" type="submit">
          Search
        </Button>
      </form>

      {/* search results */}
      {searchRes.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Available Transportations
          </h3>
          <div className="space-y-4">
            {searchRes.map((transport) => (
              <TransportationCard transport={transport} />
            ))}
          </div>
        </div>
      ) : (
        searchRes.length === 0 && <div></div>
      )}
    </div>
  );
};

export default TransportationSearch;
