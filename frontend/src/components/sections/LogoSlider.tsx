"use client";

const roles = ["Patients", "Doctors", "Care coordinators", "Hospital teams", "Specialists"];

export default function LogoSlider() {
  return (
    <div className="w-full overflow-hidden border-y border-[#eaded4] bg-[#fffaf5] py-8">
      <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#9b8b80]">
        One platform, every care role
      </p>
      
      <div className="relative flex overflow-x-hidden">
        {/* First set of logos */}
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {roles.map((role, i) => (
            <div key={i} className="mx-8 flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-[#796b61] sm:mx-12">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d96535]" />
              <span>{role}</span>
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless looping */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
          {roles.map((role, i) => (
            <div key={i} className="mx-8 flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-[#796b61] sm:mx-12">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d96535]" />
              <span>{role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}