import { useState } from "react";
import { loginAdmin } from "../auth/adminAuth";
import { useNavigate } from "@tanstack/react-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const success = loginAdmin(email, password);

    if (success) {
      alert("Admin login successful");
      navigate({ to: "/admin/import" });
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="mx-auto max-w-md py-20">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          placeholder="email"
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="password"
          type="password"
          className="w-full border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-3 rounded">
          Login
        </button>
      </form>

      <p className="text-sm mt-3 text-gray-500">
        Test login: admin / admin
      </p>
    </div>
  );
}