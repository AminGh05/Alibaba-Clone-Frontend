import Login from "@/features/authentication/pages/Login";
import Register from "@/features/authentication/pages/Register";
import NotFound from "@/features/error/pages/NotFound";
import Home from "@/features/home/pages/Home";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
