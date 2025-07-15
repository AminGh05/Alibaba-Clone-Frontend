import { CreateTicketOrderDto } from "@/shared/models/transportation/CreateTicketOrderDto";
import agent from "../agent";
import { TransportationSeatDto } from "@/shared/models/transportation/TransportationSeatDto";
import { TransportationSearchResult } from "@/shared/models/transportation/TransportationSearchResult";

export const createOrder = async (data: CreateTicketOrderDto) => {
  return await agent.post<number>("/TicketOrder/create-order", data);
};

export const getSeats = async (transportationId: number) => {
  return await agent.get<TransportationSeatDto[]>(`/Transportation/${transportationId}/seats`);
};

export const getTransportation = async (transportationId: number) => {
  return await agent.get<TransportationSearchResult>(`/Transportation/search/${transportationId}`);
};
