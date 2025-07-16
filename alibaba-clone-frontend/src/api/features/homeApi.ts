import { CityResultDto } from "@/shared/models/city/CityResultDto";
import agent from "../agent";
import { TransportationSearchRequestDto } from "@/shared/models/transportation/TransportationSearchRequestDto";
import { TransportationSearchResultDto } from "@/shared/models/transportation/TransportationSearchResultDto";

export const getCities = async () => {
  return await agent.get<CityResultDto[]>("/City");
};

export const searchTransportations = async (
  tsr: TransportationSearchRequestDto
) => {
  return await agent.post<TransportationSearchResultDto[]>(
    "/Transportation/search",
    tsr
  );
};
