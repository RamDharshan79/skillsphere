export default function LogoSphere({ size = 40, className = '' }) {
  const s = size
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`logo-sphere ${className}`}
    >
      <defs>
        <radialGradient id="gsphere" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f7f5ef" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#c8a96a" />
          <stop offset="100%" stopColor="#203a5c" />
        </radialGradient>
        <linearGradient id="glow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#c8a96a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#203a5c" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#gsphere)" />
      <circle cx="32" cy="32" r="28" fill="none" stroke="#c8a96a" strokeOpacity="0.35" strokeWidth="1" />
      <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="#c8a96a" strokeOpacity="0.25" strokeWidth="0.8" />
      <ellipse cx="32" cy="32" rx="24" ry="12" fill="none" stroke="#c8a96a" strokeOpacity="0.2" strokeWidth="0.8" />
      <path d="M32 4 C 44 18, 44 46, 32 60" fill="none" stroke="#c8a96a" strokeOpacity="0.2" strokeWidth="0.9" />
      <path d="M32 4 C 20 18, 20 46, 32 60" fill="none" stroke="#c8a96a" strokeOpacity="0.2" strokeWidth="0.9" />
      <circle cx="24" cy="20" r="6" fill="url(#glow)" opacity="0.35" />
    </svg>
  )
}
