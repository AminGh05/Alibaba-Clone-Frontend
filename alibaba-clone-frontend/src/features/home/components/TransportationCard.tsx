import { TransportationSearchResultDto } from "@/shared/models/transportation/TransportationSearchResultDto";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Building, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TransportationCardProps {
  transport: TransportationSearchResultDto;
}

const TransportationCard = ({ transport }: TransportationCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/reserve/${transport.id}`)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-4 flex-1">
            {/* route section */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary">{transport.fromCityTitle}</h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{transport.fromLocationTitle}</span>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary">{transport.toCityTitle}</h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{transport.toLocationTitle}</span>
                </div>
              </div>
            </div>

            {/* time section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Departure</span>
                </div>
                <p className="text-sm">{new Date(transport.startDateTime).toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Arrival</span>
                </div>
                <p className="text-sm">{new Date(transport.endDateTime).toLocaleString()}</p>
              </div>
            </div>

            {/* company section */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span className="text-sm">{transport.companyTitle}</span>
            </div>
          </div>

          {/* price section */}
          <div className="text-right">
            <Badge variant="secondary" className="mb-2">
              Best Price
            </Badge>
            <p className="text-2xl font-bold text-primary">${transport.price.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportationCard;
