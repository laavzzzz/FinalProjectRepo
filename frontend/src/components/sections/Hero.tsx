"use client";
import { motion } from 'framer-motion';
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ClipboardCheck, HeartPulse } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[linear-gradient(180deg,#fffaf5_0%,#fffaf5_72%,rgba(255,250,245,0)_100%)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#eaded4] bg-white px-3.5 py-2 text-xs font-semibold text-[#796b61] shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-[#d96535]" />
          One connected workspace for modern care teams
        </motion.div>
        
        <h1 className="mb-6 text-5xl font-semibold leading-[1.02] tracking-[-0.06em] text-[#2b211b] sm:text-6xl">
          Care that feels <span className="text-[#d96535]">connected.</span>
        </h1>

        <p className="mb-9 max-w-lg text-base leading-7 text-[#796b61] sm:text-lg">
          CareFlow brings patients, doctors, and hospital operations into one calm, reliable experience—from first appointment to follow-up.
        </p>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-[#d96535] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#d96535]/20 transition-all hover:-translate-y-0.5 hover:bg-[#bd542b]">
            Create your account <ArrowUpRight size={17} />
          </Link>
          <Link href="/login" className="inline-flex items-center rounded-xl px-4 py-3.5 text-sm font-semibold text-[#2b211b] transition-colors hover:bg-white">
            Sign in to CareFlow
          </Link>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-[#9b8b80]">
          <span className="flex items-center gap-2"><ClipboardCheck size={15} className="text-[#d96535]" /> Clear workflows</span>
          <span className="flex items-center gap-2"><HeartPulse size={15} className="text-[#d96535]" /> Human-centered care</span>
        </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#eaded4] bg-white p-4 shadow-[0_20px_55px_rgba(91,55,32,0.10)] sm:p-5">
            <div className="flex items-center justify-between border-b border-[#f0e5dc] pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9b8b80]">Today, 14 June</p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-[#2b211b]">Good morning, Alex</p>
              </div>
              <div className="rounded-xl bg-[#fff3ec] p-2.5 text-[#d96535]"><CalendarDays size={19} /></div>
            </div>
            <div className="grid gap-3 py-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-xl bg-[#fff8f3] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#796b61]">Next appointment</span>
                  <span className="rounded-full bg-[#f8dfd0] px-2 py-1 text-[10px] font-bold text-[#9e4b2c]">Confirmed</span>
                </div>
                <p className="mt-7 text-2xl font-semibold tracking-tight text-[#2b211b]">10:30 AM</p>
                <p className="mt-1 text-sm text-[#796b61]">Dr. Maya Shah · Dermatology</p>
              </div>
              <div className="rounded-xl bg-[#2b211b] p-4 text-white">
                <p className="text-xs font-semibold text-white/60">Care plan</p>
                <p className="mt-4 text-3xl font-semibold">84%</p>
                <div className="mt-3 h-1.5 rounded-full bg-white/15"><div className="h-full w-[84%] rounded-full bg-[#f2b28d]" /></div>
                <p className="mt-3 text-xs text-white/60">On track this month</p>
              </div>
            </div>
            <div className="rounded-xl border border-[#f0e5dc] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#2b211b]">Your care team</p>
                <span className="text-xs font-semibold text-[#d96535]">View all</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {["MS", "AR", "NP"].map((initials, index) => <div key={initials} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold ${index === 0 ? "bg-[#f2b28d] text-[#7e3d27]" : index === 1 ? "bg-[#e8d8ce] text-[#6f5d51]" : "bg-[#f8dfd0] text-[#9e4b2c]"}`}>{initials}</div>)}
                </div>
                <span className="flex items-center gap-1.5 text-xs text-[#796b61]"><span className="h-2 w-2 rounded-full bg-[#70a77a]" /> Available now</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}