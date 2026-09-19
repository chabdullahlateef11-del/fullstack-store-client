import StarField from "./StarField";
export default function StoreIllustration() {
  return (
    <div className="hidden lg:flex relative w-[300px] h-[420px] items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-100 via-[#e5e9ef] to-purple-100 shadow-[8px_8px_16px_#c8ccd2,-8px_-8px_16px_#ffffff] overflow-hidden">
      <StarField />
      {/* Shopping bag */}
      <div className="float-slow z-10">
        <svg width="140" height="140" viewBox="0 0 100 100">
          <rect x="20" y="35" width="60" height="50" rx="6" fill="#6366f1" />
          <rect x="20" y="35" width="60" height="14" rx="6" fill="#818cf8" />
          <path d="M35 35 V25 a15 15 0 0 1 30 0 V35" stroke="#4338ca" strokeWidth="4" fill="none" />
          <circle cx="50" cy="60" r="8" fill="#fbbf24" />
        </svg>
      </div>
      {/* Floating product boxes */}
      <div className="absolute top-16 left-10 float-fast">
        <svg width="46" height="46" viewBox="0 0 40 40">
          <rect x="4" y="10" width="32" height="26" rx="3" fill="#a855f7" />
          <rect x="4" y="10" width="32" height="8" fill="#c084fc" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 float-slow">
        <svg width="38" height="38" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="#34d399" />
          <text x="20" y="25" fontSize="16" textAnchor="middle" fill="#fff">%</text>
        </svg>
      </div>
      <div className="absolute top-24 right-16 float-fast">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 0 L14 9 L24 12 L14 15 L12 24 L10 15 L0 12 L10 9 Z" fill="#fbbf24" />
        </svg>
      </div>
      <p className="absolute bottom-6 text-slate-500 text-xs font-medium z-10">Your trusted store</p>
    </div>
  );
}