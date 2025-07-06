export interface TicketOrderSummaryDto {
    id: number;
    serialNumber: string;
    boughtAt: Date | string;

    price: number;

    travelStartDate: Date | string;
    travelEndDate: Date | string;

    fromCity: string;
    toCity: string;

    companyName: string;

    vehicleTypeId: number;
    vehicleName: string;
}
