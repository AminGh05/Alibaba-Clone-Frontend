import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FailureOrderProps {
  message?: string;
  onClose?: () => void;
}

const FailureOrder = ({ message, onClose }: FailureOrderProps) => {
  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg border-red-500">
      <CardHeader>
        <CardTitle className="text-red-600 text-2xl font-bold">Order Failed</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-red-700 text-lg">
          {message || "There was a problem placing your order. Please try again."}
        </div>
        <Button variant="destructive" onClick={onClose} className="mt-2">
          Close
        </Button>
      </CardContent>
    </Card>
  );
};

export default FailureOrder;
