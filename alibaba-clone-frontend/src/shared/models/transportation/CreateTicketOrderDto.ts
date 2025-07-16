import { CreateTravelerTicketDto } from "./CreateTravelerTicketDto";

export interface CreateTicketOrderDto {
  transportationId: number;
  travellers: CreateTravelerTicketDto[];
}
