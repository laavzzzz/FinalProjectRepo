"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "Patients", value: "One clear home" },
  { label: "Doctors", value: "Less admin" },
  { label: "Hospitals", value: "Shared visibility" },
  { label: "Care", value: "Always human" },
];

export default function Stats() {
  return (
    <section className="border-b border-[#eaded4] bg-[#2b211b] py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-[#e6c9b8]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}