import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/shared/store/authStore";
import { getTransportation, getSeats, createOrder } from "@/api/features/reserveApi";
import { getMyPeople } from "@/api/features/accountApi";
import SuccessOrder from "../components/SuccessOrder";
import FailureOrder from "../components/FailureOrder";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TransportationSeatDto } from "@/shared/models/transportation/TransportationSeatDto";
import { PersonDto } from "@/shared/models/account/PersonDto";
import { TransportationSearchResultDto } from "@/shared/models/transportation/TransportationSearchResultDto";
import { CreateTravelerTicketDto } from "@/shared/models/transportation/CreateTravelerTicketDto";
import { CreateTicketOrderDto } from "@/shared/models/transportation/CreateTicketOrderDto";

const ReserveTravel = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { transportationId } = useParams<{ transportationId: string }>();
  const [details, setDetails] = useState<TransportationSearchResultDto | null>(null);
  const [seats, setSeats] = useState<TransportationSeatDto[]>([]);
  const [people, setPeople] = useState<PersonDto[]>([]);
  const [passengers, setPassengers] = useState<any[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user == null) {
      navigate("/login");
      return;
    }
    setIsDone(false);
    setSuccess(false);
    setLoading(true);

    // load all from server and make sure all of them are loaded
    Promise.all([getTransportation(Number(transportationId)), getSeats(Number(transportationId)), getMyPeople()])
      .then(([transportRes, seatsRes, peopleRes]) => {
        setDetails(transportRes.data);
        setSeats(seatsRes.data);
        setPeople(peopleRes.data);
      })
      .finally(() => setLoading(false));
  }, [transportationId, user, navigate]);

  // automatically choose an available seat
  const getNextAvailableSeat = () => {
    return seats.find((seat) => seat.isAvailable && !passengers.some((p) => p.seatId === seat.id));
  };

  const handleAddPassenger = () => {
    if (!selectedPersonId) return;

    // Check if the person is already in passengers
    const person = people.find((p) => p.idNumber === selectedPersonId);
    if (passengers.some((p) => p.person.idNumber === selectedPersonId)) {
      return;
    }

    const seat = getNextAvailableSeat();
    if (!person || !seat) return;

    setPassengers([
      ...passengers,
      {
        person,
        seatId: seat.id,
        seatNumber: `${seat.row}-${seat.column}`,
      },
    ]);
    setSelectedPersonId("");
  };

  const handleRemovePassenger = (idx: number) => {
    setPassengers(passengers.filter((_, i) => i !== idx));
  };

  const handlePlaceOrder = async () => {
    console.log("handlePlaceOrder called");
    const travelers: CreateTravelerTicketDto[] = passengers.map((p) => {
      const traveler: CreateTravelerTicketDto = {
        id: p.person.id,
        idNumber: p.person.idNumber,
        creatorId: p.person.creatorAccountId,
        firstName: p.person.firstName,
        lastName: p.person.lastName,
        genderId: p.person.genderId,
        phoneNumber: p.person.phoneNumber,
        birthDate: p.person.birthDate,
        isVIP: false,
      };
      return traveler;
    });

    const order: CreateTicketOrderDto = {
      transportationId: Number(transportationId),
      travellers: travelers,
    };

    try {
      const orderId = (await createOrder(order)).data;
      setIsDone(true);
      setSuccess(typeof orderId === "number" && orderId > 0);
      console.log("setIsDone(true) and setSuccess called");
    } catch (err) {
      console.error("Error in createOrder:", err);
      setIsDone(true);
      setSuccess(false);
    }
  };

  if (loading || !details) {
    return <div className="flex justify-center items-center h-96 text-lg">Loading...</div>;
  }

  if (isDone) {
    if (success) {
      return <SuccessOrder onClose={() => navigate("/profile")} />;
    } else {
      return <FailureOrder onClose={() => setIsDone(false)} />;
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 flex flex-col gap-8">
      {/* Travel Info Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Travel Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>From</Label>
            <div>
              {details.fromCityTitle} ({details.fromLocationTitle})
            </div>
          </div>
          <div>
            <Label>To</Label>
            <div>
              {details.toCityTitle} ({details.toLocationTitle})
            </div>
          </div>
          <div>
            <Label>Company</Label>
            <div className="font-semibold">{details.companyTitle}</div>
          </div>
          <div>
            <Label>Date & Time</Label>
            <div>
              {new Date(details.startDateTime).toLocaleString()} - {new Date(details.endDateTime).toLocaleString()}
            </div>
          </div>
          <div>
            <Label>Price</Label>
            <div className="text-primary font-semibold">{details.price} $</div>
          </div>
        </CardContent>
      </Card>

      {/* Passenger Form Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Add Passenger</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Label htmlFor="person">Select Person</Label>
          <Select value={selectedPersonId} onValueChange={setSelectedPersonId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose from your people" />
            </SelectTrigger>
            <SelectContent>
              {people.map((person) => (
                <SelectItem key={person.idNumber} value={person.idNumber}>
                  {person.firstName} {person.lastName} ({person.idNumber})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddPassenger}
            disabled={!selectedPersonId || !getNextAvailableSeat()}
            className="mt-2 w-full"
          >
            Add Passenger
          </Button>

          {/* List of Added Passengers */}
          {passengers.length > 0 && (
            <>
              <h3 className="text-xl font-bold">Passengers</h3>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1 text-left">Name</th>
                    <th className="px-2 py-1 text-left">ID Number</th>
                    <th className="px-2 py-1 text-left">Seat</th>
                    <th className="px-2 py-1 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {passengers.map((p, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-2 py-1">
                        {p.person.firstName} {p.person.lastName}
                      </td>
                      <td className="px-2 py-1">{p.person.idNumber}</td>
                      <td className="px-2 py-1">{p.seatNumber}</td>
                      <td
                        className="px-2 py-1 cursor-pointer hover:underline"
                        onClick={() => handleRemovePassenger(idx)}
                      >
                        Remove
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </CardContent>
      </Card>
      <div className="flex items-center justify-between bg-gray-50 rounded-lg px-6 py-4 mt-6 shadow">
        <span className="text-lg font-semibold">
          Total Price: <span className="text-primary">{details.price * passengers.length} $</span>
        </span>
        <Button onClick={async () => handlePlaceOrder()} className="ml-4">
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default ReserveTravel;
