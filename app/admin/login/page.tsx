import { Suspense } from "react";
import LoginFormClient from "./LoginFormClient";

export const dynamic = "force-dynamic"; // ⬅ disables prerendering

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <LoginFormClient />
    </Suspense>
  );
}
