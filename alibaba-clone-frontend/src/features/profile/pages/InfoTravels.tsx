import { getMyTravels } from "@/api/features/profileApi";
import { TicketOrderSummaryDto } from "@/shared/models/transaction/TicketOrderSummaryDto";
import { useEffect, useState } from "react";

const InfoTravels = () => {
  const [travels, setTravels] = useState<TicketOrderSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await getMyTravels();
        setTravels(response.data);
      } catch (error) {
        setError("Error fetching travels");
      } finally {
        setLoading(false);
      }
    };
    fetchTravels();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-semibold text-lg mb-4 text-gray-800">My Travels</div>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : travels.length === 0 ? (
        <div className="text-gray-500">No travels found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded-lg overflow-hidden">
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
                <tr key={tx.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-2 py-1">{tx.serialNumber}</td>
                  <td className="px-2 py-1">{new Date(tx.boughtAt).toLocaleDateString()}</td>
                  <td className="px-2 py-1">{tx.price.toLocaleString()}</td>
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
    </div>
  );
};

export default InfoTravels;
