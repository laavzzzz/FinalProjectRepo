"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck, Stethoscope, User } from "lucide-react";
import { apiUrl, saveAuthSession } from "@/lib/api";

type Role = "patient" | "doctor";

const inputClass =
  "w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    phone: "", age: "", dateOfBirth: "", state: "", city: "",
    department: "Dermatology", specialization: "", licenseNumber: "",
  });

  const update = (name: string, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");

    const required =
      role === "patient"
        ? ["name", "email", "phone", "age", "dateOfBirth", "state", "city"]
        : ["name", "email", "department", "specialization", "licenseNumber"];
    if (required.some((field) => !form[field as keyof typeof form].trim())) {
      return setError("Please complete every required field.");
    }

    setLoading(true);
    try {
      const payload =
        role === "patient"
          ? {
              name: form.name.trim(), email: form.email.trim().toLowerCase(),
              password: form.password, phone: form.phone.trim(),
              age: Number(form.age), dateOfBirth: form.dateOfBirth,
              state: form.state.trim(), city: form.city.trim(),
            }
          : {
              name: form.name.trim(), email: form.email.trim().toLowerCase(),
              password: form.password, phone: form.phone.trim(),
              department: form.department.trim(), specialization: form.specialization.trim(),
              licenseNumber: form.licenseNumber.trim(),
            };
      const response = await fetch(apiUrl(`/${role}/register`), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed.");
      saveAuthSession(data.token, data.user);
      router.push(`/${role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <ShieldCheck size={14} className="text-blue-600" /> CareFlow secure onboarding
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Create your account</h1>
          <p className="mt-3 text-sm font-medium text-slate-500">Use the portal that matches your role in the hospital.</p>
        </header>

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3">
          {([
            ["patient", "Patient", "Personal care, appointments and records", User],
            ["doctor", "Doctor", "Clinical workspace and patient care", Stethoscope],
          ] as const).map(([value, title, description, Icon]) => (
            <button
              key={value}
              type="button"
              onClick={() => { setRole(value); setError(""); }}
              className={`rounded-3xl border-2 p-5 text-left transition ${role === value ? "border-blue-600 bg-white shadow-xl" : "border-transparent bg-white/70"}`}
            >
              <Icon className={role === value ? "text-blue-600" : "text-slate-400"} />
              <div className="mt-3 font-black">{title}</div>
              <div className="mt-1 text-xs font-medium text-slate-500">{description}</div>
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mx-auto mt-6 max-w-3xl rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-200/60 sm:p-10">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">{role} registration</p>
            <h2 className="mt-2 text-2xl font-black">Tell us about you</h2>
          </div>
          {error && <div role="alert" className="mb-5 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"><AlertCircle size={18} />{error}</div>}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-slate-600">Full name<input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} required /></label>
            <label className="text-xs font-bold text-slate-600">Email<input className={inputClass} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required /></label>
            <label className="text-xs font-bold text-slate-600">Password<div className="relative"><input className={`${inputClass} pr-12`} type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={8} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
            <label className="text-xs font-bold text-slate-600">Confirm password<input className={inputClass} type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required /></label>
            <label className="text-xs font-bold text-slate-600">Phone number<input className={inputClass} type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required={role === "patient"} /></label>

            {role === "patient" ? <>
              <label className="text-xs font-bold text-slate-600">Age<input className={inputClass} type="number" min="0" max="120" value={form.age} onChange={(e) => update("age", e.target.value)} required /></label>
              <label className="text-xs font-bold text-slate-600">Date of birth<input className={inputClass} type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} required /></label>
              <label className="text-xs font-bold text-slate-600">State<input className={inputClass} value={form.state} onChange={(e) => update("state", e.target.value)} required /></label>
              <label className="text-xs font-bold text-slate-600">City<input className={inputClass} value={form.city} onChange={(e) => update("city", e.target.value)} required /></label>
            </> : <>
              <label className="text-xs font-bold text-slate-600">Department<input className={inputClass} value={form.department} onChange={(e) => update("department", e.target.value)} required /></label>
              <label className="text-xs font-bold text-slate-600">Specialization<input className={inputClass} value={form.specialization} onChange={(e) => update("specialization", e.target.value)} required /></label>
              <label className="text-xs font-bold text-slate-600 sm:col-span-2">Medical license number<input className={inputClass} value={form.licenseNumber} onChange={(e) => update("licenseNumber", e.target.value)} required /></label>
            </>}
          </div>

          <button disabled={loading} className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-60">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account</> : <>Create account <ArrowRight size={18} /></>}
          </button>
          <p className="mt-5 text-center text-sm font-medium text-slate-500">Already registered? <Link href="/login" className="font-black text-blue-600">Sign in</Link></p>
          {role === "doctor" && <p className="mt-3 text-center text-xs font-medium text-slate-400">Administrator accounts are managed by the hospital and use the Admin portal.</p>}
        </form>
      </div>
    </main>
  );
}
