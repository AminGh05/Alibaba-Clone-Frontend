export interface TransportationSearchResultDto {
  id: number;
  companyTitle: string;
  fromLocationTitle: string;
  toLocationTitle: string;
  fromCityTitle: string;
  toCityTitle: string;
  startDateTime: Date;
  endDateTime: Date;
  price: number;
}
