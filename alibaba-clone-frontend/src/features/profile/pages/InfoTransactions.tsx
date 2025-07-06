import { getMyTransactions, getProfile } from "@/api/features/profileApi";
import { useEffect, useState } from "react";
import TransactionHistory from "../components/TransactionHistory";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TransactionDto } from "@/shared/models/transaction/TransactionDto";

const InfoTransactions = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // fetch balance when the component mounts
    const fetchBalance = async () => {
      try {
        const response = await getProfile();
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setError("Failed to fetch balance and transactions.");
      }
    };
    // fetch transactions
    const fetchTransactions = async () => {
      try {
        const transactions = await getMyTransactions();
        setTransactions(transactions.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch balance and transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div className="text-lg font-semibold text-gray-800">
            Current Balance:{" "}
            <span className="text-blue-700">{balance.toLocaleString()} $</span>
          </div>
          <Button variant="outline" className="w-fit">
            <Link to={"top-up"} className="text-blue-700 font-medium">
              Increase Balance
            </Link>
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <TransactionHistory transactions={transactions} />
      )}
    </div>
  );
};

export default InfoTransactions;
