import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UpsertBankAccountDto } from "@/shared/models/account/UpsertBankAccountDto";

interface EditBankAccountModalProps {
  open: boolean;
  onClose: () => void;
  bankAccount: UpsertBankAccountDto | null;
  onSave: (data: UpsertBankAccountDto) => void;
}

const EditBankAccountModal = ({
  open,
  onClose,
  bankAccount,
  onSave,
}: EditBankAccountModalProps) => {
  const [iban, setIban] = useState(bankAccount?.iban || "");
  const [bankAccountNumber, setBankAccountNumber] = useState(bankAccount?.bankAccountNumber || "");
  const [cardNumber, setCardNumber] = useState(bankAccount?.cardNumber || "");

  useEffect(() => {
    setIban(bankAccount?.iban || "");
    setBankAccountNumber(bankAccount?.bankAccountNumber || "");
    setCardNumber(bankAccount?.cardNumber || "");
  }, [bankAccount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ iban, bankAccountNumber, cardNumber });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Bank Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="IBAN"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
          <Input
            placeholder="Bank Account Number"
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
          />
          <Input
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
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

export default EditBankAccountModal;
