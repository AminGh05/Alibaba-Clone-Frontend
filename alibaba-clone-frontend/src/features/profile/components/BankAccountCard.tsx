import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UpsertBankAccountDto } from "@/shared/models/account/UpsertBankAccountDto";

interface BankAccountCardProps {
  bankAccount: UpsertBankAccountDto | null;
  onEdit: () => void;
}

const BankAccountCard = ({ bankAccount, onEdit }: BankAccountCardProps) => {
  return (
    <Card className="mb-6 p-4 flex flex-col gap-2">
      <div className="font-semibold text-lg">Bank Account</div>
      {bankAccount ? (
        <div>
          {bankAccount.bankAccountNumber && (
            <div className="text-gray-700">
              Account Number: {bankAccount.bankAccountNumber}
            </div>
          )}
          {bankAccount.iban && (
            <div className="text-gray-700">IBAN: {bankAccount.iban}</div>
          )}
          {bankAccount.cardNumber && (
            <div className="text-gray-700">
              Card Number: {bankAccount.cardNumber}
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-500">No bank account added.</div>
      )}
      <Button className="mt-2 w-fit" variant="outline" onClick={onEdit}>
        {bankAccount ? "Edit Bank Account" : "Add Bank Account"}
      </Button>
    </Card>
  );
};

export default BankAccountCard;
