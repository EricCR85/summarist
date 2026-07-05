"use client";
import SearchBar from "../../components/SearchBar";
export default function SettingsPage() {
  return (
    <main className="p-8">
      <div className="flex w-full justify-end mb-10">
        <div className="w-full max-w-sm">
          <SearchBar />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <section className="mb-8 border-b pb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Your Subscription plan
        </h2>
        <p className="text-gray-600 font-medium">Premium</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Email</h2>
        <p className="text-gray-600">hanna@gmail.com</p>
      </section>
    </main>
  );
}


