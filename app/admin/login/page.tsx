"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setE] = useState("");
  const [pass, setP] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const next = useSearchParams().get("next") || "/admin/bookings";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass }),
    });
    if (r.ok) router.replace(next);
    else setErr("Wrong email or password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={submit} className="bg-gray-900 p-8 rounded-lg w-80">
        <h1 className="text-xl font-bold mb-6">Admin Login</h1>
        {err && <p className="text-red-400 mb-4">{err}</p>}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setE(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setP(e.target.value)}
          className="w-full mb-6 p-2 rounded bg-gray-800 border border-gray-700"
        />
        <button className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg">
          Sign In
        </button>
      </form>
    </div>
  );
}
