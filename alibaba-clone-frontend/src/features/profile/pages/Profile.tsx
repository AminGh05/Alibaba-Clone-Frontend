import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BankAccountCard from "../components/BankAccountCard";
import TransactionHistory from "../components/TransactionHistory";
import { ProfileDto } from "@/shared/models/account/ProfileDto";
import { UpsertBankAccountDto } from "@/shared/models/account/UpsertBankAccountDto";
import { TicketOrderSummaryDto } from "@/shared/models/transaction/TicketOrderSummaryDto";
import { PersonDto } from "@/shared/models/account/PersonDto";
import EditProfileModal from "../components/EditProfileModal";
import EditEmailModal from "../components/EditEmailModal";
import EditPasswordModal from "../components/EditPasswordModal";
import EditBankAccountModal from "../components/EditBankAccountModal";
import {
  getMyTravels,
  getProfile,
  editEmail,
  editPassword,
  upsertBankAccountDetails,
  upsertAccountPerson,
} from "@/api/features/profileApi";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [bankAccount, setBankAccount] = useState<UpsertBankAccountDto | null>(null);
  const [transactions, setTransactions] = useState<TicketOrderSummaryDto[]>([]);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editEmailOpen, setEditEmailOpen] = useState(false);
  const [editPasswordOpen, setEditPasswordOpen] = useState(false);
  const [editBankOpen, setEditBankOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getProfile();
        setProfile(response.data);
        setBankAccount({
          iban: response.data.iban,
          bankAccountNumber: response.data.bankAccountNumber,
          cardNumber: response.data.cardNumber,
        });
        const travels = await getMyTravels();
        setTransactions(travels.data);
      } catch (error) {
        // handle error
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    // fetch profile and transactions on component mount
    fetchProfile();
  }, []);

  const handleEditProfile = async (data: Partial<ProfileDto>) => {
    setError(null);
    try {
      if (!profile) throw new Error("No profile");
      // map ProfileDto to PersonDto
      const person: PersonDto = {
        firstName: data.firstName ?? profile.firstName,
        lastName: data.lastName ?? profile.lastName,
        idNumber: (profile as any).idNumber ?? "",
        genderId: (profile as any).genderId ?? 1, // default for now
        phoneNumber: data.personPhoneNumber ?? (profile as any).phoneNumber ?? "",
        birthDate: data.birthDate ? String(data.birthDate) : (profile as any).birthDate ?? "",
      };

      await upsertAccountPerson(person);
      setProfile((prev) => (prev ? { ...prev, ...data } : prev));
      setEditProfileOpen(false);
    } catch (e) {
      setError("Failed to update profile");
    }
  };
  // function to handle email update
  const handleEditEmail = async (email: string) => {
    setError(null);
    try {
      await editEmail({ newEmail: email });
      setProfile((prev) => (prev ? { ...prev, email } : prev));
      setEditEmailOpen(false);
    } catch (e) {
      setError("Failed to update email");
    }
  };
  // function to handle password update
  const handleEditPassword = async (
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => {
    setError(null);
    try {
      await editPassword({
        oldPassword,
        newPassword,
        confirmNewPassword,
      });
      setEditPasswordOpen(false);
    } catch (e) {
      setError("Failed to update password");
    }
  };
  // function to handle bank account update
  const handleEditBank = async (data: UpsertBankAccountDto) => {
    setError(null);

    const iban =
      data.iban && data.iban.trim().length === 0 ? null : data.iban?.trim();
    const cardNumber =
      data.cardNumber && data.cardNumber.trim().length === 0
        ? null
        : data.cardNumber?.trim();
    const bankAccountNumber =
      data.bankAccountNumber && data.bankAccountNumber.trim().length === 0
        ? null
        : data.bankAccountNumber?.trim();

    // validate and normalize fields
    const normalized: UpsertBankAccountDto = {
      iban: iban || undefined,
      cardNumber: cardNumber || undefined,
      bankAccountNumber: bankAccountNumber || undefined,
    };

    try {
      await upsertBankAccountDetails(normalized);
      setBankAccount(normalized);
      setEditBankOpen(false);
    } catch (e) {
      setError("Failed to update bank account");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (!profile)
    return <div className="text-center text-red-500">Profile not found.</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card className="mb-6 p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
            {profile.firstName?.[0]}
          </div>
          <div>
            <div className="text-xl font-semibold">
              {profile.firstName} {profile.lastName}
            </div>
            <div className="text-gray-500">{profile.email}</div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={() => setEditProfileOpen(true)}>
            Edit Profile
          </Button>
          <Button variant="outline" onClick={() => setEditEmailOpen(true)}>
            Change Email
          </Button>
          <Button variant="outline" onClick={() => setEditPasswordOpen(true)}>
            Change Password
          </Button>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </Card>
      <BankAccountCard
        bankAccount={bankAccount}
        onEdit={() => setEditBankOpen(true)}
      />
      <TransactionHistory transactions={transactions} />
      <EditProfileModal
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        profile={profile}
        onSave={handleEditProfile}
      />
      <EditEmailModal
        open={editEmailOpen}
        onClose={() => setEditEmailOpen(false)}
        currentEmail={profile.email}
        onSave={handleEditEmail}
      />
      <EditPasswordModal
        open={editPasswordOpen}
        onClose={() => setEditPasswordOpen(false)}
        onSave={handleEditPassword}
      />
      <EditBankAccountModal
        open={editBankOpen}
        onClose={() => setEditBankOpen(false)}
        bankAccount={bankAccount}
        onSave={handleEditBank}
      />
    </div>
  );
};

export default Profile;
