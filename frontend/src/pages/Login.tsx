import { useState } from "react";
import { useLogin } from "../hooks/useAuth";

export default function Login({
  onRegister,
  onSuccess,
}: {
  onRegister: () => void;
  onSuccess: () => void;
}) {
  const { mutate, isPending, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: () => {
          onSuccess(); // 🚀 GO TO DASHBOARD
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

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
          className="w-full bg-green-600 py-2 rounded"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-400 text-sm text-center">
            Login failed
          </p>
        )}

        <button
          type="button"
          onClick={onRegister}
          className="w-full text-blue-400 underline text-sm"
        >
          Don’t have an account? Register
        </button>
      </form>
    </div>
  );
}
