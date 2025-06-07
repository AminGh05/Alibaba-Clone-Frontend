import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/shared/store/authStore";

const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Alibaba Logo" className="h-8 w-8" />
          <span className="ml-2 text-xl font-semibold text-primary">
            Alibaba
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        {!user && (
          <>
            <Button asChild variant="outline">
              <Link to="/register">Register</Link>
            </Button>
            <Button asChild variant="default">
              <Link to="/login">Login</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
