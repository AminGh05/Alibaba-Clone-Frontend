import { Card } from "@/components/ui/card";
import { PersonDto } from "@/shared/models/account/PersonDto";

interface PeopleListProps {
  people: PersonDto[];
}

const PeopleList = ({ people }: PeopleListProps) => {
  return (
    <Card className="p-4">
      <div className="font-semibold text-lg mb-2">People List</div>
      {people.length === 0 ? (
        <div className="text-gray-500">No people found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 text-left">Name</th>
                <th className="px-2 py-1 text-left">Id Number</th>
                <th className="px-2 py-1 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person.idNumber} className="border-b">
                  <td className="px-2 py-1">{person.firstName + " " + person.lastName}</td>
                  <td className="px-2 py-1">{person.idNumber}</td>
                  <td className="px-2 py-1">{person.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default PeopleList;
