import { CityResult } from "@/shared/models/city/CityResult";
import agent from "../agent";
import { TransportationSearchRequest } from "@/shared/models/transportation/TransportationSearchRequest";
import { TransportationSearchResult } from "@/shared/models/transportation/TransportationSearchResult";

export const getCities = async () => {
  return await agent.get<CityResult[]>("/City");
};

export const searchTransportations = async (
  tsr: TransportationSearchRequest
) => {
  return await agent.post<TransportationSearchResult[]>(
    "/Transportation/search",
    tsr
  );
};
