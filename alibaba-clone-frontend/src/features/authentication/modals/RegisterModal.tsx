import { useAuthStore } from "@/shared/store/authStore";
import { register as registerReq } from "@/api/authentication/authApi";
import { RegisterRequestDto } from "@/shared/models/authentication/RegisterRequestDto";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  const [form, setForm] = useState<RegisterRequestDto>({
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const login = useAuthStore((state) => state.login);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Use the form as RegisterRequestDto explicitly
      const requestData: RegisterRequestDto = {
        phoneNumber: form.phoneNumber,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const response = await registerReq(requestData);

      login(response.data);
      setForm({
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full max-w-md p-8 relative">
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full"
            autoComplete="tel"
          />
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full"
            autoComplete="email"
          />
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full"
            autoComplete="new-password"
          />
          <Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full"
            autoComplete="new-password"
          />
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full mt-2">
            Register
          </Button>
        </form>
        <Button variant="outline" onClick={onClose} className="w-full mt-4">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RegisterModal;
