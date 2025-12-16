import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState<
    "login" | "register" | "dashboard"
  >("login");

  return (
    <>
      {page === "login" && (
        <Login
          onRegister={() => setPage("register")}
          onSuccess={() => setPage("dashboard")}
        />
      )}

      {page === "register" && (
        <Register
          onLogin={() => setPage("login")}
        />
      )}

      {page === "dashboard" && <Dashboard />}
    </>
  );
}

export default App;
