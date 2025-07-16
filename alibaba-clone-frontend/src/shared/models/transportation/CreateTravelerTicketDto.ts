export interface CreateTravelerTicketDto {
  id: number;
  creatorId: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  genderId: number;
  phoneNumber: string;
  birthDate: Date | string;
  seatId?: number;
  isVIP: boolean;
  description?: string;
}
