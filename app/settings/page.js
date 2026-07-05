"use client";

import SearchBar from "../../components/SearchBar";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
        </div>
        <div className="mb-8 border-b pb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Your Subscription Plan
          </h2>
          <p className="text-gray-600 font-medium"> Premium</p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Email</h2>
          <p className="text-gray-600 font-medium">john.doe@example.com</p>
        </div>
      </div>
    </div>
  );
}
