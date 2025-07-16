export interface TransportationSeatDto {
  id: number;
  row: number;
  column: number;
  isVIP: boolean;
  isAvailable: boolean;
  description?: string;
  isReserved: boolean;
  genderId?: number;
}
