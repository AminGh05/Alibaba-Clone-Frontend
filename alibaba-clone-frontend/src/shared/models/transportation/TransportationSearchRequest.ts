export interface TransportationSearchRequest {
  vehicleTypeId: number;
  fromCityId?: number;
  toCityId?: number;
  startDate?: Date;
  endDate?: Date;
}
