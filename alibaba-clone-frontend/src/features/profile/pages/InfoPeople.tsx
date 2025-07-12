import { getMyPeople, upsertPerson } from "@/api/features/accountApi";
import { Button } from "@/components/ui/button";
import { ProfileDto } from "@/shared/models/account/ProfileDto";
import { useEffect, useState } from "react";
import PeopleList from "../components/PeopleList";
import EditProfileModal from "../components/EditProfileModal";
import { PersonDto } from "@/shared/models/account/PersonDto";

const InfoPeople = () => {
  const [people, setPeople] = useState<ProfileDto[]>([]);
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [addPersonOpen, setAddPersonOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetchPeople outside useEffect so it can be reused
  const fetchPeople = async () => {
    try {
      const response = await getMyPeople();
      setPeople(response.data);
    } catch (error) {
      console.error("Error fetching people:", error);
      setError("Failed to fetch people.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleAddPerson = async (data: Partial<ProfileDto>) => {
    setError(null);
    try {
      const person: PersonDto = {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phoneNumber: data.personPhoneNumber || "",
        birthDate: data.birthDate ? String(data.birthDate) : "",
        idNumber: data.idNumber || "",
        genderId: 1,
      };

      await upsertPerson(person);
      setProfile((prev) => (prev ? { ...prev, ...data } : prev));
      setAddPersonOpen(false);
      // fetch people again after adding
      fetchPeople();
    } catch (error) {
      console.error("Error adding person:", error);
      setError("Failed to add person.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg shadow px-6 py-4 min-h-[64px] flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800 flex items-center">
          Your People:
          <span className="text-blue-700 ml-1">{people.length}</span>
        </div>
        <Button
          variant="outline"
          className="w-fit flex items-center h-10"
          onClick={() => setAddPersonOpen(true)}
        >
          Add New Person
        </Button>
        <EditProfileModal
          open={addPersonOpen}
          onClose={() => setAddPersonOpen(false)}
          profile={profile}
          onSave={handleAddPerson}
        />
      </div>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <PeopleList people={people} />
      )}
    </div>
  );
};

export default InfoPeople;
