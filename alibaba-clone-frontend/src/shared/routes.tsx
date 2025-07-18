import Login from "@/features/authentication/pages/Login";
import Register from "@/features/authentication/pages/Register";
import NotFound from "@/features/error/pages/NotFound";
import Home from "@/features/home/pages/Home";
import Profile from "@/features/account/pages/Profile";
import TravelDetails from "@/features/account/pages/TravelDetails";
import ReserveTravel from "@/features/reservation/pages/ReserveTravel";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/travel/:ticketOrderId" element={<TravelDetails />} />
      <Route path="/reserve/:transportationId" element={<ReserveTravel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
