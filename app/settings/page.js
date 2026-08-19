"use client";
import SearchBar from "../../components/SearchBar";
import { useUser } from "../UserContext";
import Image from "next/image";
import { useState } from "react";
import AuthModal from "../../components/AuthModal";

export default function SettingsPage() {
  const { user, setUser } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


  if (!user?.loggedIn) {
    return (
      <main className="settings">
        <div className="settings__search">
          <SearchBar />
        </div>

        <h1 className="settings__title">Settings</h1>

        <div className="settings__login">
          <img
            src="/assets/login.png"
            alt="Login required"
            className="w-80 h-auto mb-8"
          />
          <p className="settings__login--text">
            Log in to your account to see your details.
          </p>
                <button 
                className="btn home__cta--btn" 
                onClick={openModal}>
                Login
              </button>
       
        </div>
        {isModalOpen && <AuthModal isOpen={isModalOpen} onClose={closeModal} />}
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="flex w-full justify-end mb-10">
        <SearchBar />
      </div>

      <h1 className="text-4xl font-bold mb-12">Settings</h1>

      <section className="mb-8 border-b pb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Your Subscription plan
        </h2>
        <p className="text-gray-600 font-medium">
          {user.plan === "basic"
            ? "Basic"
            : user.plan === "premium"
              ? "Premium"
              : "Premium Plus"}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Email</h2>
        <p className="text-gray-600">hanna@gmail.com</p>
      </section>
    </main>
  );
}
