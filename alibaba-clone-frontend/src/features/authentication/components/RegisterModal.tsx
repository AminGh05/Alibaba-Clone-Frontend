import { useAuthStore } from "@/shared/store/authStore";
import { register as registerReq } from "@/api/features/authApi";
import { RegisterRequestDto } from "@/shared/models/authentication/RegisterRequestDto";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RegisterModal = () => {
  // here we use store
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState<RegisterRequestDto>({
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // state management
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // input validator
  const validate = () => {
    const { phoneNumber, password, confirmPassword } = form;
    if (!phoneNumber || !password || !confirmPassword) {
      return "All fields are required.";
    }
    if (!/^\d{11}$/.test(phoneNumber)) {
      return "Phone number must be 11 digits.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };
  // everytime an input is changed
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // what happens when submit button is pressed
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // use the form as RegisterRequestDto explicitly
      const requestData: RegisterRequestDto = {
        phoneNumber: form.phoneNumber,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const response = await registerReq(requestData);
      // login after register (no need to send more requests)
      login(response.data);
      setForm({
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      // route to home page after successful login
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-lg p-10 relative transition-all duration-300">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600 tracking-tight">
        Register
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          autoComplete="tel"
        />
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          autoComplete="email"
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          autoComplete="new-password"
        />
        <Input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          autoComplete="new-password"
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
          Register
        </Button>
        <Button
          variant="outline"
          className="w-full h-12 mt-3 border-2 border-gray-200 hover:border-blue-400 text-gray-700 font-semibold rounded-lg transition-all duration-200"
          type="button"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default RegisterModal;
