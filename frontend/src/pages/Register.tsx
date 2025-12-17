import { useState } from "react";
import { useRegister } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { mutate: register, isLoading, isError } = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    register(
      { name, email, password },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded bg-white p-6 shadow"
      >
        <h1 className="text-xl font-bold text-center">Register</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {isError && (
          <p className="text-center text-sm text-red-600">
            Registration failed
          </p>
        )}
      </form>
    </div>
  );
}
