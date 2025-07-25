import { Card } from "@/components/ui/card";
import { TicketOrderSummaryDto } from "@/shared/models/transaction/TicketOrderSummaryDto";

interface TravelHistoryProps {
  travels: TicketOrderSummaryDto[];
}

const TravelHistory = ({ travels }: TravelHistoryProps) => {
  return (
    <Card className="p-4">
      <div className="font-semibold text-lg mb-2">Travel History</div>
      {travels.length === 0 ? (
        <div className="text-gray-500">No travels found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 text-left">Serial Number</th>
                <th className="px-2 py-1 text-left">Bought At</th>
                <th className="px-2 py-1 text-left">Price</th>
                <th className="px-2 py-1 text-left">From</th>
                <th className="px-2 py-1 text-left">To</th>
                <th className="px-2 py-1 text-left">Company</th>
                <th className="px-2 py-1 text-left">Vehicle</th>
              </tr>
            </thead>
            <tbody>
              {travels.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="px-2 py-1">{tx.serialNumber}</td>
                  <td className="px-2 py-1">{new Date(tx.boughtAt).toLocaleDateString()}</td>
                  <td className="px-2 py-1">{tx.price}</td>
                  <td className="px-2 py-1">{tx.fromCity}</td>
                  <td className="px-2 py-1">{tx.toCity}</td>
                  <td className="px-2 py-1">{tx.companyName}</td>
                  <td className="px-2 py-1">{tx.vehicleName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default TravelHistory;
