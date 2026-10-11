"use client";
import React from "react";
import { ArrowUpRight, ClipboardList, HeartPulse, ShieldCheck } from "lucide-react";

const reviews = [
  { name: "Patients", role: "A clearer care journey", text: "Appointments, care plans, and records in one place—without making people work to find what they need.", icon: HeartPulse },
  { name: "Doctors", role: "A focused clinical day", text: "Keep the next patient, the right context, and the important follow-up visible when it matters.", icon: ClipboardList },
  { name: "Hospital teams", role: "Shared visibility", text: "Give operations a dependable view across people, schedules, and the work that keeps care moving.", icon: ShieldCheck },
];

export default function Testimonials() {
  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-3">
      {reviews.map((review) => (
        <ReviewCard key={review.name} {...review} />
      ))}
    </div>
  );
}

function ReviewCard({ name, role, text, icon: Icon }: { name: string, role: string, text: string, icon: typeof HeartPulse }) {
  return (
    <article className="group relative border-t-2 border-[#d96535] bg-white p-6 transition-all duration-200 hover:shadow-[0_16px_36px_rgba(91,55,32,0.08)]">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e8] text-[#d96535]"><Icon size={19} /></div>
        <ArrowUpRight size={18} className="text-[#c8b6aa] transition-colors group-hover:text-[#d96535]" />
      </div>
      <p className="mb-3 text-lg font-semibold tracking-tight text-[#2b211b] whitespace-normal">{role}</p>
      <p className="mb-8 text-sm leading-6 text-[#796b61] whitespace-normal">{text}</p>
      <div className="flex items-center gap-3 border-t border-[#f0e5dc] pt-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8dfd0] text-xs font-bold text-[#a74f2f]">{name.charAt(0)}</div>
        <div>
          <h4 className="text-sm font-semibold text-[#2b211b]">{name}</h4>
          <p className="mt-0.5 text-xs text-[#9b8b80]">CareFlow workspace</p>
        </div>
      </div>
    </article>
  );
}