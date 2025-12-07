import { useId } from "react";

const Logo = ({ size = 40 }) => {
  // Generate unique ID for each logo instance
  const gradientId = useId();

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definition with unique ID */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* Main Circle Background */}
        <circle cx="100" cy="100" r="90" fill={`url(#${gradientId})`} />

        {/* Camera Lens */}
        <circle cx="100" cy="100" r="45" fill="white" fillOpacity="0.2" />
        <circle
          cx="100"
          cy="100"
          r="35"
          stroke="white"
          strokeWidth="4"
          fill="none"
        />

        {/* Lens Reflection */}
        <path
          d="M 85 85 Q 90 80 95 85"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Code Brackets */}
        <path
          d="M 60 80 L 50 100 L 60 120"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 140 80 L 150 100 L 140 120"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Small Dots for Camera Detail */}
        <circle cx="130" cy="70" r="6" fill="white" opacity="0.8" />
      </svg>
    </div>
  );
};

export default Logo;
