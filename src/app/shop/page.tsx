import AuthGuard from "@/components/AuthGuard";
import LogoutButton from "@/components/button";

export default function ShopPage() {
  return (
    <AuthGuard>
       <main className="p-6">
      <h1 className="text-3xl font-bold">🛒 Welcome to the Shop!</h1>
      <LogoutButton />
    </main>
    </AuthGuard>
  );
}
