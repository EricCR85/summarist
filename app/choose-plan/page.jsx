"use client";
import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineMinus } from "react-icons/ai";
import { useUser } from "../UserContext";

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const { setUser } = useUser();

  return (
    <div className="min-h-screen bg-white pb-20">
      <section className="bg-[#042330] text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Get unlimited access to many amazing books to read
        </h1>
        <p className="text-lg">
          Turn ordinary moments into amazing learning opportunities
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-8 py-12">
        <div
          className={`border-2 p-6 mb-4 cursor-pointer rounded-lg ${selectedPlan === "yearly" ? "border-green-500" : "border-gray-200"}`}
          onClick={() => setSelectedPlan("yearly")}
        >
          <div className="flex items-center gap-4">
            <input type="radio" checked={selectedPlan === "yearly"} readOnly />
            <div>
              <p className="font-bold">Premium Plus Yearly</p>
              <p className="text-xl font-bold">$99.99/year</p>
              <p className="text-sm text-gray-500">7-day free trial included</p>
            </div>
          </div>
        </div>

        <div
          className={`border-2 p-6 cursor-pointer rounded-lg ${selectedPlan === "monthly" ? "border-green-500" : "border-gray-200"}`}
          onClick={() => setSelectedPlan("monthly")}
        >
          <div className="flex items-center gap-4">
            <input type="radio" checked={selectedPlan === "monthly"} readOnly />
            <div>
              <p className="font-bold">Premium Monthly</p>
              <p className="text-xl font-bold">$9.99/month</p>
              <p className="text-sm text-gray-500">No trial included</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-green-500 text-white py-4 mt-8 rounded font-bold hover:bg-green-600"
          onClick={() => setUser(prev => ({ ...prev, plan: selectedPlan, LoggedIn: true }))}
          >
          Start your {selectedPlan === "yearly" ? "7-day" : ""} trial
        </button>
      </section>

      <section className="max-w-3xl mx-auto px-8">
        <h2 className="text-2xl font-bold mb-8">
          How does the free 7-day trial work?
        </h2>
        <FAQItem question="Can I switch subscriptions from monthly to yearly?" />
        <FAQItem question="What's included in the Premium plan?" />
        <FAQItem question="Can I cancel during my trial or subscription?" />
      </section>
    </div>
  );
}

function FAQItem({ question }) {
  return (
    <div className="border-b py-4">
      <div className="flex justify-between items-center font-bold cursor-pointer">
        {question}
        <AiOutlineMinus />
      </div>
    </div>
  );
}
