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

interface EditEmailModalProps {
  open: boolean;
  onClose: () => void;
  currentEmail: string;
  onSave: (email: string) => void;
}

const EditEmailModal = ({
  open,
  onClose,
  currentEmail,
  onSave,
}: EditEmailModalProps) => {
  const [email, setEmail] = useState(currentEmail);

  useEffect(() => {
    setEmail(currentEmail);
  }, [currentEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(email);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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

export default EditEmailModal;
