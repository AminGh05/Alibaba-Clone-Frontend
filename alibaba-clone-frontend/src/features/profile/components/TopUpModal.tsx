import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TopUpDto } from "@/shared/models/transaction/TopUpDto";
import { useEffect, useState } from "react";

interface TopUpModalProps {
  open: boolean;
  onClose: () => void;
  topUp: TopUpDto | null;
  onSave: (data: TopUpDto) => void;
}

const TopUpModal = ({ open, onClose, topUp, onSave }: TopUpModalProps) => {
  const [amount, setAmount] = useState(topUp?.amount || 0);

  useEffect(() => {
    setAmount(topUp?.amount || 0);
  }, [topUp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ amount });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Increase Balance</DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Amount ($)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpModal;
