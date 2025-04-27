import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlaneTakeoff, Train, Bus } from "lucide-react";

const TransportSearch = () => {
  const [activeTab, setActiveTab] = useState("flight");

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* transportation types */}
      <Tabs
        defaultValue="flight"
        value={activeTab}
        onValueChange={setActiveTab}
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
      <form className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input type="text" placeholder="From" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Input type="text" placeholder="To" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Input type="date" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Input type="date" />
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

        <Button size="lg" className="px-8">
          Search
        </Button>
      </form>
    </div>
  );
};

export default TransportSearch;
