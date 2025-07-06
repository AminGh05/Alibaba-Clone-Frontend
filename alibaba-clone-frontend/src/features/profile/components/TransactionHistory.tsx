import { Card } from '@/components/ui/card';
import { TransactionDto } from '@/shared/models/transaction/TransactionDto';

interface TransactionHistoryProps {
  transactions: TransactionDto[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <Card className="p-4">
      <div className="font-semibold text-lg mb-2">Transaction History</div>
      {transactions.length === 0 ? (
        <div className="text-gray-500">No transactions found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 text-left">Serial Number</th>
                <th className="px-2 py-1 text-left">Created At</th>
                <th className="px-2 py-1 text-left">Final Amount</th>
                <th className="px-2 py-1 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="px-2 py-1">{tx.serialNumber}</td>
                  <td className="px-2 py-1">{new Date(tx.createdAt).toLocaleDateString()}</td>
                  <td className="px-2 py-1">{tx.finalAmount}</td>
                  <td className="px-2 py-1">{tx.transactionType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default TransactionHistory;
