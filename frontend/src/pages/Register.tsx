import { useState } from "react";
import { useRegister } from "../hooks/useAuth";

export default function Register({
  onLogin,
}: {
  onLogin: () => void;
}) {
  const { mutate, isPending, error } = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 py-2 rounded"
        >
          {isPending ? "Registering..." : "Register"}
        </button>

        {error && (
          <p className="text-red-400 text-sm text-center">
            Registration failed
          </p>
        )}

        <button
          type="button"
          onClick={onLogin}
          className="w-full text-blue-400 underline text-sm"
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}
