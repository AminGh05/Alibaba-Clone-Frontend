export interface TravelerTicketDto {
    id: number;
    serialNumber: string;
    travellerName: string;
    birthDate: Date | string;
    seatNumber: string;
    ticketStatus: string;
    companionName?: string;
    description?: string;
}
