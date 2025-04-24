import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Alibaba Logo" className="h-8 w-8" />
          <span className="ml-2 text-xl font-semibold text-primary">
            Alibaba
          </span>
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="font-medium text-primary hover:text-primary/80"
            >
              HOME
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
