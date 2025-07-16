export interface TransportationSearchRequestDto {
  vehicleTypeId: number;
  fromCityId?: number;
  toCityId?: number;
  startDate?: Date;
  endDate?: Date;
}
