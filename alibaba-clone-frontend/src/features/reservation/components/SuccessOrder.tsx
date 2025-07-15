import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SuccessOrderProps {
  onClose?: () => void;
}

const SuccessOrder = ({ onClose }: SuccessOrderProps) => {
  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg border-green-500">
      <CardHeader>
        <CardTitle className="text-green-600 text-2xl font-bold">Order Successful!</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-green-700 text-lg">Your travel reservation has been placed successfully.</div>
        <Button variant="default" onClick={onClose} className="mt-2">
          OK
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuccessOrder;
