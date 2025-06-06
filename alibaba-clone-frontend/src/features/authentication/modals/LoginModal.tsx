import { useState } from "react";
import { useAuthStore } from "@/shared/store/authStore";
import { login as loginReq } from "@/api/authentication/authApi";
import { LoginRequestDto } from "@/shared/models/authentication/LoginRequestDto";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  // use store here
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState<LoginRequestDto>({
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await loginReq(form);
      // fill the data of store with the login function
      login(response.data);
      setError(null);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">
          Login
        </h2>
        <Input
          type="text"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          className="w-full"
        />
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full"
        />
        <Button
          onClick={handleSubmit}
          className="w-full bg-primary text-white hover:bg-primary/90"
        >
          Login
        </Button>
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        <Button variant="secondary" onClick={onClose} className="w-full mt-2">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default LoginModal;
