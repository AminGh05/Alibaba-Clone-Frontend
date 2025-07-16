import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="h-[85vh] flex flex-col items-center justify-center text-center bg-muted/30">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl text-muted-foreground mt-4 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Button asChild variant="default">
        <Link to="/">Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
