import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTravelDetails } from "@/api/features/accountApi";
import { TravelerTicketDto } from "@/shared/models/transportation/TravelerTicketDto";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TravelDetails = () => {
  // useParams for getting the id from routing
  const { ticketOrderId } = useParams<{ ticketOrderId: string }>();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TravelerTicketDto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticketOrderId) return;
    setLoading(true);
    // cast the id and use it for api
    getTravelDetails(Number(ticketOrderId))
      .then((res) => setTickets(res.data))
      .catch(() => setError("Failed to load travel details."))
      .finally(() => setLoading(false));
  }, [ticketOrderId]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
          ← Back
        </Button>
        <h1 className="text-2xl font-bold">Travel Details</h1>
      </div>
      {loading && <div className="text-center py-8">Loading...</div>}
      {error && (
        <div className="text-center text-destructive py-8">{error}</div>
      )}
      {tickets && tickets.length > 0 ? (
        <div className="space-y-6">
          {tickets.map((ticket, idx) => (
            <Card
              key={ticket.id || idx}
              className="p-6 flex flex-col md:flex-row items-center gap-6 shadow-md"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-lg">
                    {ticket.travellerName}
                  </span>
                  <Badge variant="secondary">Seat {ticket.seatNumber}</Badge>
                </div>
                <div className="text-sm opacity-80 mb-1">
                  Serial:{" "}
                  <span className="font-mono">{ticket.serialNumber}</span>
                </div>
                <div className="text-sm opacity-80 mb-1">
                  Birth Date:{" "}
                  {ticket.birthDate
                    ? new Date(ticket.birthDate).toLocaleDateString()
                    : "-"}
                </div>
                <div className="text-sm opacity-80 mb-1">
                  Status: <Badge>{ticket.ticketStatus}</Badge>
                </div>
                {ticket.companionName && (
                  <div className="text-xs opacity-60">
                    Companion: {ticket.companionName}
                  </div>
                )}
                {ticket.description && (
                  <div className="text-xs opacity-60">{ticket.description}</div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-8">
            No tickets found for this travel.
          </div>
        )
      )}
    </div>
  );
};

export default TravelDetails;
