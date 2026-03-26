export default function DryCleaningIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Hanger hook */}
      <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5c0 .5-.2.9-.5 1.2L12 6" />
      {/* Hanger bar */}
      <path d="M4 10l8-4 8 4" />
      {/* Suit jacket body */}
      <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
      {/* Lapels */}
      <path d="M12 10v5" />
      <path d="M10 10l2 3 2-3" />
      {/* Breast pocket */}
      <rect x="13.5" y="14" width="2.5" height="1.5" rx="0.3" />
      {/* Buttons */}
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      <circle cx="12" cy="19.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
