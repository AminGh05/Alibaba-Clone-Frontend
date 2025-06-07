import { useState } from "react";
import { useAuthStore } from "@/shared/store/authStore";
import { login as loginReq } from "@/api/authentication/authApi";
import { LoginRequestDto } from "@/shared/models/authentication/LoginRequestDto";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  // use store here
  const login = useAuthStore((state) => state.login);
  // hook to manage the state of form
  const [form, setForm] = useState<LoginRequestDto>({
    phoneNumber: "",
    password: "",
  });
  // hook to manage error if user entered an invalid input
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // validator for credentials
  const validate = () => {
    const phoneRegex = /^(?:\+98|0)?9\d{9}$/;
    if (!phoneRegex.test(form.phoneNumber)) {
      return "Invalid phone number format";
    }
    if (!form.password || form.password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return null;
  };
  // what happens after submit button is pressed
  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    // send request to server and get the response of login token
    try {
      console.log(form);
      const response = await loginReq(form);
      console.log(response);
      login(response.data);
      setError(null);
      // route to home page after successful login
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-lg p-10 relative transition-all duration-300">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600 tracking-tight">
        Login
      </h2>
      {/* Input form for login */}
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          type="text"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          autoComplete="tel"
        />
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          autoComplete="current-password"
        />
        {error && (
          <p className="text-red-500 text-sm font-semibold text-center bg-red-50 rounded-lg py-2 px-4 mt-2">
            {error}
          </p>
        )}
        <Button
          type="submit"
          className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all duration-200"
        >
          Login
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 mt-3 border-2 border-gray-200 hover:border-blue-400 text-gray-700 font-semibold rounded-lg transition-all duration-200"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default LoginModal;
