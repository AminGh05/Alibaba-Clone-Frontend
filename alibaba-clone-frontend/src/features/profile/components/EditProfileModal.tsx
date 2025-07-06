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
import { ProfileDto } from "@/shared/models/account/ProfileDto";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  profile: ProfileDto | null;
  onSave: (data: Partial<ProfileDto>) => void;
}

const EditProfileModal = ({
  open,
  onClose,
  profile,
  onSave,
}: EditProfileModalProps) => {
  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [lastName, setLastName] = useState(profile?.lastName || "");
  const [personPhoneNumber, setPersonPhoneNumber] = useState(
    profile?.personPhoneNumber || ""
  );
  const [birthDate, setBirthDate] = useState(
    profile?.birthDate ? String(profile.birthDate).slice(0, 10) : ""
  );
  const [idNumber, setIdNumber] = useState(
    profile && (profile as any).idNumber ? (profile as any).idNumber : ""
  );

  useEffect(() => {
    setFirstName(profile?.firstName || "");
    setLastName(profile?.lastName || "");
    setPersonPhoneNumber(profile?.personPhoneNumber || "");
    setBirthDate(profile?.birthDate ? String(profile.birthDate).slice(0, 10) : "");
    setIdNumber(profile && (profile as any).idNumber ? (profile as any).idNumber : "");
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      firstName,
      lastName,
      personPhoneNumber,
      birthDate,
      idNumber,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            placeholder="Phone Number"
            value={personPhoneNumber}
            onChange={(e) => setPersonPhoneNumber(e.target.value)}
            required
          />
          <Input
            type="date"
            placeholder="Birth Date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Input
            placeholder="ID Number"
            value={idNumber}
            maxLength={10}
            minLength={10}
            onChange={(e) => setIdNumber(e.target.value)}
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

export default EditProfileModal;
