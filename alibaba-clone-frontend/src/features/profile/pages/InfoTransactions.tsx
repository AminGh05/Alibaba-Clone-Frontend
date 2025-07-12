import {
  getMyTransactions,
  getProfile,
  topUp,
} from "@/api/features/accountApi";
import { useEffect, useState } from "react";
import TransactionHistory from "../components/TransactionHistory";
import { Button } from "@/components/ui/button";
import { TransactionDto } from "@/shared/models/transaction/TransactionDto";
import TopUpModal from "../components/TopUpModal";
import { TopUpDto } from "@/shared/models/transaction/TopUpDto";

const InfoTransactions = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [topUpData, setTopUpData] = useState<TopUpDto | null>(null);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  
  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const handleTopUp = async (data: TopUpDto) => {
    try {
      const amount: TopUpDto = {
        amount: data.amount,
      };

      await topUp(amount);
      setTopUpData((prev) => (prev ? { ...prev, ...data } : prev));
      setTopUpOpen(false);
      // refresh the balance and transactions after topping up
      await fetchBalance();
      await fetchTransactions();
    } catch (error) {
      console.error("Error topping up:", error);
      setError("Failed to top up balance.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg shadow px-6 py-4 min-h-[64px] flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800 flex items-center">
          Current Balance:{" "}
          <span className="text-blue-700 ml-1">
            {balance.toLocaleString()} $
          </span>
        </div>
        <Button
          variant="outline"
          className="w-fit flex items-center h-10"
          onClick={() => setTopUpOpen(true)}
        >
          Increase Balance
        </Button>
        <TopUpModal
          open={topUpOpen}
          onClose={() => setTopUpOpen(false)}
          topUp={topUpData}
          onSave={handleTopUp}
        />
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
