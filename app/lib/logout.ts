"use client";
import { useRouter } from "next/navigation";

export function useAdminLogout() {
  const router = useRouter();

  return async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login"); // back to sign-in
  };
}
