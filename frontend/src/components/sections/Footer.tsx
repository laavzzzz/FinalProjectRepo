import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#eaded4] bg-[#fffaf5] px-5 pb-8 pt-16 sm:px-8">
      <div className="mx-auto mb-14 grid max-w-6xl gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-xl font-bold tracking-[-0.04em] text-[#2b211b]">Care<span className="text-[#d96535]">Flow</span></Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#796b61]">
            A thoughtful workspace for patients, doctors, and the teams who keep care moving.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#9b8b80]">Platform</h4>
          <ul className="space-y-3 text-sm text-[#5c4a3e]">
            <li><a href="#features" className="transition-colors hover:text-[#d96535]">Features</a></li>
            <li><Link href="/register" className="transition-colors hover:text-[#d96535]">Create account</Link></li>
            <li><Link href="/login" className="transition-colors hover:text-[#d96535]">Sign in</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#9b8b80]">For care teams</h4>
          <ul className="space-y-3 text-sm text-[#5c4a3e]">
            <li>Patients</li>
            <li>Doctors</li>
            <li>Hospital operations</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#9b8b80]">Support</h4>
          <ul className="space-y-3 text-sm text-[#5c4a3e]">
            <li><a href="#faq" className="transition-colors hover:text-[#d96535]">FAQs</a></li>
            <li>Privacy first</li>
            <li>Built for clarity</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-[#eaded4] pt-6 text-xs text-[#9b8b80] sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 CareFlow. All rights reserved.</span>
        <span>Designed for more human healthcare.</span>
      </div>
    </footer>
  );
}