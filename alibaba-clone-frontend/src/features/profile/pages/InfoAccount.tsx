import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BankAccountCard from "../components/BankAccountCard";
import { ProfileDto } from "@/shared/models/account/ProfileDto";
import { UpsertBankAccountDto } from "@/shared/models/account/UpsertBankAccountDto";
import { PersonDto } from "@/shared/models/account/PersonDto";
import EditProfileModal from "../components/EditProfileModal";
import EditEmailModal from "../components/EditEmailModal";
import EditPasswordModal from "../components/EditPasswordModal";
import EditBankAccountModal from "../components/EditBankAccountModal";
import {
  getProfile,
  editEmail,
  editPassword,
  upsertBankAccountDetails,
  upsertAccountPerson,
} from "@/api/features/accountApi";

const InfoAccount = () => {
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [bankAccount, setBankAccount] = useState<UpsertBankAccountDto | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editEmailOpen, setEditEmailOpen] = useState(false);
  const [editPasswordOpen, setEditPasswordOpen] = useState(false);
  const [editBankOpen, setEditBankOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
        setBankAccount({
          iban: response.data.iban,
          bankAccountNumber: response.data.bankAccountNumber,
          cardNumber: response.data.cardNumber,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditProfile = async (data: Partial<ProfileDto>, genderId: number) => {
    setError(null);
    try {
      if (!profile) throw new Error("No profile");
      const person: PersonDto = {
        firstName: data.firstName ?? profile.firstName,
        lastName: data.lastName ?? profile.lastName,
        idNumber: data.idNumber ?? (profile as any).idNumber,
        genderId: genderId ?? 1,
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
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg font-semibold">
        Loading...
      </div>
    )

  if (!profile)
    return (
      <div className="flex justify-center items-center h-64 text-red-500 text-lg font-semibold">
        Profile not found.
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-200 to-blue-400 flex items-center justify-center text-3xl font-bold text-blue-800">
            {profile.firstName?.[0]}
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-800">
              {profile.firstName} {profile.lastName}
            </div>
            <div className="text-gray-500 mt-1">{profile.email}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="font-semibold text-gray-700 mb-1">National ID</div>
            <div>
              {profile.idNumber || <span className="text-gray-400">-</span>}
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">Mobile</div>
            <div>{profile.accountPhoneNumber}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">Birth Date</div>
            <div>
              {profile.birthDate ? (
                String(profile.birthDate).slice(0, 10)
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">
              Emergency Contact
            </div>
            <div>
              {profile.personPhoneNumber || (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
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
      <BankAccountCard
        bankAccount={bankAccount}
        onEdit={() => setEditBankOpen(true)}
      />
    </div>
  );
};

export default InfoAccount;
