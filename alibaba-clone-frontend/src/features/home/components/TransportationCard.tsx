import { TransportationSearchResult } from "@/shared/models/transportation/TransportationSearchResult";

interface TransportationCardProps {
  transport: TransportationSearchResult;
}

const TransportationCard = ({ transport }: TransportationCardProps) => {
  return (
    <div
      key={transport.id}
      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">
            {transport.fromCityTitle} → {transport.toCityTitle}
          </p>
          <p className="text-gray-600">From: {transport.fromLocationTitle}</p>
          <p className="text-gray-600">To: {transport.toLocationTitle}</p>
          <p className="text-gray-600">
            Departure: {new Date(transport.startDateTime).toLocaleString()}
          </p>
          <p className="text-gray-600">
            Arrival: {new Date(transport.endDateTime).toLocaleString()}
          </p>
          <p className="text-gray-500">{transport.companyTitle}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">${transport.price}</p>
        </div>
      </div>
    </div>
  );
};

export default TransportationCard;
