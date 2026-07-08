"use client";
import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineMinus } from "react-icons/ai";
import { useUser } from "../UserContext";
import Footer from "../../components/Footer";

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const { setUser } = useUser();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-white pb-20">
      <section className="choose-plan__hero">
        <h1>Get unlimited access to many amazing books to read</h1>
        <p>Turn ordinary moments into amazing learning opportunities</p>
        <img src="/assets/pricing-top.png" alt="Pricing" />
      </section>
      <section className="plan-wrapper py-12">
        <div className="icons-container">
          <div className="icon-item">
            <div className="text-3xl mb-2">📄</div>
            <p className="text-sm font-bold">
              Key ideas in few min with many books to read
            </p>
          </div>
          <div className="icon-item">
            <div className="text-3xl mb-2">🌱</div>
            <p className="text-sm font-bold">
              3 million people growing with Summarist everyday
            </p>
          </div>
          <div className="icon-item">
            <div className="text-3xl mb-2">🤝</div>
            <p className="text-sm font-bold">
              Precise recommendations collections curated by experts
            </p>
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold mb-8">
          Choose the plan that fits you
        </h2>

        <div
          className={`plan-container ${selectedPlan === "yearly" ? "selected" : ""}`}
          onClick={() => setSelectedPlan("yearly")}
        >
          <input type="radio" checked={selectedPlan === "yearly"} readOnly />
          <h3 className="font-bold">Premium Plus Yearly</h3>
          <p className="text-xl font-bold">$99.99/year</p>
          <p className="text-sm text-gray-500">7-day free trial included</p>
        </div>

        <div
          className={`plan-container ${selectedPlan === "monthly" ? "selected" : ""}`}
          onClick={() => setSelectedPlan("monthly")}
        >
          <input type="radio" checked={selectedPlan === "monthly"} readOnly />
          <h3 className="font-bold">Premium Monthly</h3>
          <p className="text-xl font-bold">$9.99/month</p>
          <p className="text-sm text-gray-500">No trial included</p>
        </div>

        <button
          className="start-button"
          onClick={() =>
            setUser((prev) => ({ ...prev, plan: selectedPlan, loggedIn: true }))
          }
        >
          Start your {selectedPlan === "yearly" ? "7-day" : ""} trial
        </button>
        <p className="text-center text-xs mt-2 text-gray-500">
          Cancel your trial at any time before it ends, and you won't be
          charged.
        </p>
      </section>
      <section className="fap-wrapper">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <FAQItem question="How does the free 7-day trial work?"
                 answer="You can enjoy full access to all features during your 7-day trial. you won't be charged until the trial period ends."
                  />

        <FAQItem question="Can I switch subscriptions from monthly to yearly?"
                 answer="Yes, you can easily change your subscription plan at any time through your account settings."
                  />
        <FAQItem question="What's included in the Premium plan?"
                 answer="The Premium plan includes unlimited access to all book summaries, offline reading, and exlusive audio content." />

        <FAQItem question="Can I cancel during my trial or subscription?"
                 answer="Absolutely. you can cancel your trial or subscribtion at any time, and you will retain access until the end of your billing cycle." 
                 />
      </section>
      <Footer />{" "}
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b py-4">
      <div 
          className="flex justify-between items-center font-bold cursor-pointer hover:text-green-600 transition"
          onClick={() => setIsOpen(!isOpen)}
          >
        <span>{question}</span>
        <AiOutlineMinus  className={`transition-transform duration-300${isOpen ? `rotate-180` : ``}`}/>
      </div>
      {isOpen && (
        <div className="mt-4 faq-answer animate-fade-in pb-4">
          {answer}
        </div>
      )}
    </div>
  );
}
