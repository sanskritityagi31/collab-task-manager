import { ReactNode } from "react";
import { useMe } from "../hooks/useMe";
import api from "../lib/api";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: user } = useMe();

  const logout = async () => {
    await api.post("/api/auth/logout");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-400">
          Collab Task Manager
        </h1>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
