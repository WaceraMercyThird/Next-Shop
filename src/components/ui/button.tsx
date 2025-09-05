"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/"); // back to login
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2 text-red-700 hover:bg-red-100 transition"
    >
      Logout
    </button>
  );
}
