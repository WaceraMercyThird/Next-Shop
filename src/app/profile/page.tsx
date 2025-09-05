"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import LogoutButton from "@/components/ui/button";
import { auth } from "@/lib/firebase"; // your initialized auth
import { updateProfile, User as FirebaseUser } from "firebase/auth"; // ✅ import updateProfile from 'firebase/auth'

export default function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName }); // ✅ correct usage
        setEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <Navbar searchQuery="" setSearchQuery={() => {}} />
        <p className="text-gray-700 text-lg mt-10">You are not logged in.</p>
      </div>
    );
  }

  return (
     <div className="bg-gray-100 min-h-screen">
      <Navbar searchQuery="" setSearchQuery={() => {}} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Profile</h1>

        <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8">
          {/* Profile Picture */}
          <img
            src={`https://i.pravatar.cc/150?u=${user.uid}`}
            alt={user.displayName || "User Avatar"}
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover shadow-lg"
          />

          {/* User Info */}
          <div className="flex-1 flex flex-col gap-2">
            {editing ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900">{user.displayName || "Anonymous User"}</h2>
                <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
                <button
                  onClick={() => setEditing(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition font-semibold mt-4"
                >
                  Edit Display Name
                </button>
              </>
            )}

            <div className="mt-6">
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Orders</h3>
            <p className="text-gray-700">You have 3 previous orders.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-700">Manage your account preferences and notifications.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
