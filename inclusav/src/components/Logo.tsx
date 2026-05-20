import _React from 'react'

interface LogoProps {
  size?: number
  color?: string
}

export function InclusaVLogo({ size = 80, color = '#5B21FF' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="InclusaV logo"
      role="img"
    >
      {/* V shape background */}
      <path
        d="M8 8 L40 72 L72 8 L60 8 L40 50 L20 8 Z"
        fill={color}
        opacity="0.15"
      />
      {/* V shape main */}
      <path
        d="M12 10 L40 68 L68 10 L57 10 L40 52 L23 10 Z"
        fill={color}
      />
      {/* Eye / signal icon in center */}
      <ellipse cx="40" cy="34" rx="12" ry="8" fill="white" opacity="0.9" />
      <circle cx="40" cy="34" r="4.5" fill={color} />
      <circle cx="40" cy="34" r="2" fill="white" />
      {/* Signal waves */}
      <path
        d="M24 28 Q32 20 40 20 Q48 20 56 28"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M18 23 Q29 12 40 12 Q51 12 62 23"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  )
}
