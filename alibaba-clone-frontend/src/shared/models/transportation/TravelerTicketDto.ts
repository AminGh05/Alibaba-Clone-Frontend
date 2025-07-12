export interface TravelerTicketDto {
    id: number;
    serialNumber: string;
    travelerName: string;
    birthDate: Date | string;
    seatNumber: string;
    ticketStatus: string;
    companionName?: string;
    description?: string;
}
