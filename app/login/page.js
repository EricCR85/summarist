"use client";

import { useState } from "react";
import AuthModal from "../../components/AuthModal";

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="text center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Summarist</h1>
        <p className="text-gray-600 mb-8">
          Please log in to access your personalized book summaries and
        </p>
      {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
      </div>
      </div>
  )}