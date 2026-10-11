"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does it take to set up CareFlow?",
    answer: "Most clinics are up and running within 24 hours. Our automated data migration tools help you import your existing patient records seamlessly."
  },
  {
    question: "Where can i book an appointment?",
    answer: "You can book an appointment at your home page or ask AI chatbot for assistance"
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Absolutely. There are no long-term contracts. If you decide to leave, you can export all your data with a single click."
  },
  {
    question: "Does CareFlow integrate with insurance providers?",
    answer: "Yes! CareFlow integrates with major insurance clearinghouses to provide real-time claims tracking and instant eligibility checks."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-white px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-bold text-[#d96535]">
            <HelpCircle size={16} />
            <span>Support</span>
          </div>
          <h2 className="mb-4 text-3xl font-semibold tracking-[-0.04em] text-[#2b211b] sm:text-4xl">Common questions</h2>
          <p className="text-base text-[#796b61] sm:text-lg">A few useful answers before you get started.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={cn(
                "border rounded-2xl transition-all duration-200",
                activeIndex === index ? "border-[#dca07f] bg-[#fff8f3]" : "border-[#eaded4] bg-white"
              )}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={cn(
                  "text-left text-base font-semibold transition-colors sm:text-lg",
                  activeIndex === index ? "text-[#d96535]" : "text-[#2b211b]"
                )}>
                  {faq.question}
                </span>
                <div className={cn(
                  "p-1 rounded-full transition-transform duration-300",
                  activeIndex === index ? "bg-[#d96535] text-white rotate-180" : "bg-[#f7eee7] text-[#9b8b80]"
                )}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 leading-7 text-[#796b61]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        {/* Bottom Call to Action */}
        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#2b211b] p-7 text-white sm:flex-row sm:items-center">
          <div>
            <h3 className="mb-1 text-lg font-semibold">Ready to make care feel simpler?</h3>
            <p className="text-sm text-white/60">Create a patient or doctor account in a few minutes.</p>
          </div>
          <Link href="/register" className="rounded-xl bg-[#f2b28d] px-5 py-3 text-sm font-semibold text-[#2b211b] transition-colors hover:bg-white">
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}