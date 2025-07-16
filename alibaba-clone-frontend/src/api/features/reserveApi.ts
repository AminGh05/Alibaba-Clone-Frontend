import { CreateTicketOrderDto } from "@/shared/models/transportation/CreateTicketOrderDto";
import agent from "../agent";
import { TransportationSeatDto } from "@/shared/models/transportation/TransportationSeatDto";
import { TransportationSearchResultDto } from "@/shared/models/transportation/TransportationSearchResultDto";

export const createOrder = async (data: CreateTicketOrderDto) => {
  return await agent.post<number>("/TicketOrder/create-order", data);
};

export const getSeats = async (transportationId: number) => {
  return await agent.get<TransportationSeatDto[]>(`/Transportation/${transportationId}/seats`);
};

export const getTransportation = async (transportationId: number) => {
  return await agent.get<TransportationSearchResultDto>(`/Transportation/search/${transportationId}`);
};
