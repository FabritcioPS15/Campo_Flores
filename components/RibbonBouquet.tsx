'use client'

import React from 'react'

interface RibbonBouquetProps {
  className?: string
}

export default function RibbonBouquet({ className = '' }: RibbonBouquetProps) {
  // Generate 16 outer sunflower petals
  const outerPetalCount = 18
  const innerPetalCount = 16

  return (
    <div className={`ribbon-bouquet-container ${className}`}>
      <svg
        viewBox="0 0 520 780"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)]"
        aria-hidden="true"
      >
        <defs>
          {/* Polka dot pattern for wrapping paper */}
          <pattern
            id="dots-pattern"
            x="0"
            y="0"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(12)"
          >
            <rect width="26" height="26" fill="#fcfbf9" />
            <circle cx="6" cy="6" r="2.1" fill="#1e1e24" />
            <circle cx="19" cy="19" r="2.1" fill="#1e1e24" />
          </pattern>

          {/* Lower wrap polka pattern */}
          <pattern
            id="dots-pattern-bottom"
            x="0"
            y="0"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-8)"
          >
            <rect width="22" height="22" fill="#fcfbf9" />
            <circle cx="5" cy="5" r="1.8" fill="#1e1e24" />
            <circle cx="16" cy="16" r="1.8" fill="#1e1e24" />
          </pattern>

          {/* Gradients */}
          {/* Yellow Ribbon Satin Gradient */}
          <linearGradient id="satin-yellow-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff385" />
            <stop offset="35%" stopColor="#ffc814" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="satin-yellow-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb703" />
            <stop offset="50%" stopColor="#e87902" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="satin-petal-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd000" />
            <stop offset="55%" stopColor="#ffe66d" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <linearGradient id="satin-petal-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e58905" />
            <stop offset="45%" stopColor="#ffd633" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Metallic Silver/Gold Collar Gradient */}
          <linearGradient id="metallic-silver" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="75%" stopColor="#f3f4f6" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>

          <linearGradient id="metallic-gold-foil" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2d4b7" />
            <stop offset="30%" stopColor="#c5a880" />
            <stop offset="60%" stopColor="#e8dcbe" />
            <stop offset="100%" stopColor="#9f8059" />
          </linearGradient>

          {/* Green Satin Ribbon Gradient */}
          <linearGradient id="green-satin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="40%" stopColor="#059669" />
            <stop offset="80%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>

          {/* Bow Yellow Ribbon Gradient */}
          <linearGradient id="bow-grad" x1="0%" y1="0%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#fff066" />
            <stop offset="25%" stopColor="#ffc700" />
            <stop offset="65%" stopColor="#ea8c00" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="bow-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Gold filigree butterfly gradient */}
          <linearGradient id="gold-butterfly" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8db" />
            <stop offset="35%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          {/* Paper Folds Shadows */}
          <linearGradient id="paper-shade-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
          </linearGradient>

          <linearGradient id="paper-shade-right" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
          </linearGradient>

          {/* Rose Petal Radial Shader */}
          <radialGradient id="rose-depth" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe169" />
            <stop offset="45%" stopColor="#ffb703" />
            <stop offset="85%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </radialGradient>

          {/* Spiral Dark Center Radial */}
          <radialGradient id="center-spiral" cx="48%" cy="46%" r="50%">
            <stop offset="0%" stopColor="#2c2a29" />
            <stop offset="65%" stopColor="#171515" />
            <stop offset="90%" stopColor="#0c0b0b" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>

          {/* Satin Petal Clip & Form reusable */}
          <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. BACK WRAPPING PAPER & POLKA DOT CONES                 */}
        {/* ======================================================== */}

        {/* Center Back Backing Sheet */}
        <path
          d="M 175 105 C 175 88, 345 88, 345 105 L 340 450 C 340 450, 260 480, 180 450 Z"
          fill="url(#dots-pattern)"
          stroke="#e5e7eb"
          strokeWidth="1.5"
        />

        {/* Top-Left Tall Rolled Paper Flap */}
        <g>
          {/* Main Cone Wing */}
          <path
            d="M 80 85 C 100 65, 140 70, 150 160 L 195 440 L 140 440 L 75 180 C 65 130, 68 95, 80 85 Z"
            fill="url(#dots-pattern)"
            stroke="#e2e8f0"
            strokeWidth="1.2"
          />
          {/* Rolled paper rim curve */}
          <path
            d="M 80 85 C 95 65, 140 70, 148 130 C 135 140, 100 135, 80 85 Z"
            fill="#f3f4f6"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          {/* Shading overlay */}
          <path
            d="M 80 85 L 150 160 L 195 440 L 140 440 L 75 180 Z"
            fill="url(#paper-shade-left)"
            opacity="0.6"
          />
        </g>

        {/* Top-Right Tall Rolled Paper Flap */}
        <g>
          <path
            d="M 440 85 C 420 65, 380 70, 370 160 L 325 440 L 380 440 L 445 180 C 455 130, 452 95, 440 85 Z"
            fill="url(#dots-pattern)"
            stroke="#e2e8f0"
            strokeWidth="1.2"
          />
          <path
            d="M 440 85 C 425 65, 380 70, 372 130 C 385 140, 420 135, 440 85 Z"
            fill="#f3f4f6"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          <path
            d="M 440 85 L 370 160 L 325 440 L 380 440 L 445 180 Z"
            fill="url(#paper-shade-right)"
            opacity="0.6"
          />
        </g>

        {/* Mid-Left Side Accordion Wrap Flaps */}
        <g>
          {/* Middle tier left */}
          <path
            d="M 22 280 C 15 260, 45 235, 105 270 L 210 450 L 160 460 L 30 330 C 18 305, 20 290, 22 280 Z"
            fill="url(#dots-pattern)"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          <path
            d="M 22 280 C 25 255, 65 240, 105 270 C 85 285, 45 295, 22 280 Z"
            fill="#f1f5f9"
          />
          <path
            d="M 22 280 L 105 270 L 210 450 L 160 460 L 30 330 Z"
            fill="url(#paper-shade-left)"
            opacity="0.7"
          />

          {/* Lower tier left */}
          <path
            d="M 50 420 C 38 400, 75 380, 130 405 L 220 465 L 180 475 L 60 455 C 48 440, 48 430, 50 420 Z"
            fill="url(#dots-pattern)"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
        </g>

        {/* Mid-Right Side Accordion Wrap Flaps */}
        <g>
          {/* Middle tier right */}
          <path
            d="M 498 280 C 505 260, 475 235, 415 270 L 310 450 L 360 460 L 490 330 C 502 305, 500 290, 498 280 Z"
            fill="url(#dots-pattern)"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          <path
            d="M 498 280 C 495 255, 455 240, 415 270 C 435 285, 475 295, 498 280 Z"
            fill="#f1f5f9"
          />
          <path
            d="M 498 280 L 415 270 L 310 450 L 360 460 L 490 330 Z"
            fill="url(#paper-shade-right)"
            opacity="0.7"
          />

          {/* Lower tier right */}
          <path
            d="M 470 420 C 482 400, 445 380, 390 405 L 300 465 L 340 475 L 460 455 C 472 440, 472 430, 470 420 Z"
            fill="url(#dots-pattern)"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
        </g>

        {/* ======================================================== */}
        {/* 2. LOWER WRAP (SKIRT/HANDLE)                             */}
        {/* ======================================================== */}
        <g id="lower-wrap">
          {/* Bottom wrap pleated silhouette with polka dots */}
          <path
            d="M 215 540 
               L 165 710 C 180 735, 210 745, 230 720
               L 250 748 C 260 755, 275 750, 280 730
               L 295 748 C 315 755, 345 730, 355 710
               L 305 540 Z"
            fill="url(#dots-pattern-bottom)"
            stroke="#d1d5db"
            strokeWidth="1.2"
          />
          {/* Vertical shadow pleats in bottom wrap */}
          <path d="M 215 540 L 195 725 L 218 732 L 235 545 Z" fill="rgba(0,0,0,0.06)" />
          <path d="M 260 540 L 265 745 L 280 730 L 268 540 Z" fill="rgba(0,0,0,0.08)" />
          <path d="M 285 540 L 315 742 L 340 720 L 305 540 Z" fill="rgba(0,0,0,0.07)" />
        </g>

        {/* ======================================================== */}
        {/* 3. FOLIAGE / GREEN FERNS & BRANCHES                      */}
        {/* ======================================================== */}
        {/* Top-Left Fern Leaf (Helecho Verde) */}
        <g id="fern-top-left" transform="translate(180, 160) rotate(-22)">
          {/* Main stem */}
          <path d="M 0 100 Q -5 40 -12 0" stroke="#15803d" strokeWidth="2.5" fill="none" />
          {/* Fern leaflets */}
          {[-10, 5, 20, 35, 50, 65, 80].map((y, i) => (
            <g key={i}>
              <path
                d={`M -7 ${y} Q -30 ${y - 8} -40 ${y - 12} Q -25 ${y + 2} -7 ${y + 5}`}
                fill="#22c55e"
                stroke="#15803d"
                strokeWidth="0.8"
              />
              <path
                d={`M -7 ${y} Q 15 ${y - 8} 25 ${y - 12} Q 12 ${y + 2} -7 ${y + 5}`}
                fill="#16a34a"
                stroke="#15803d"
                strokeWidth="0.8"
              />
            </g>
          ))}
        </g>

        {/* Delicate leafy branches in background */}
        {/* Left branch */}
        <g id="branch-left" transform="translate(145, 340) rotate(-28)">
          <path d="M 0 60 Q 10 20 5 0" stroke="#166534" strokeWidth="2" fill="none" />
          <path d="M 5 15 Q -15 5 -18 -8 Q -4 0 5 15" fill="#4ade80" stroke="#15803d" />
          <path d="M 6 35 Q 24 25 28 12 Q 15 24 6 35" fill="#22c55e" stroke="#15803d" />
          <path d="M 4 48 Q -14 40 -16 28 Q -2 36 4 48" fill="#16a34a" stroke="#14532d" />
        </g>

        {/* Right branch */}
        <g id="branch-right" transform="translate(375, 340) rotate(28) scale(-1, 1)">
          <path d="M 0 60 Q 10 20 5 0" stroke="#166534" strokeWidth="2" fill="none" />
          <path d="M 5 15 Q -15 5 -18 -8 Q -4 0 5 15" fill="#4ade80" stroke="#15803d" />
          <path d="M 6 35 Q 24 25 28 12 Q 15 24 6 35" fill="#22c55e" stroke="#15803d" />
          <path d="M 4 48 Q -14 40 -16 28 Q -2 36 4 48" fill="#16a34a" stroke="#14532d" />
        </g>

        {/* ======================================================== */}
        {/* 4. GOLDEN FILIGREE BUTTERFLY (ON LEFT WING)              */}
        {/* ======================================================== */}
        <g id="gold-butterfly" transform="translate(90, 395) rotate(-18) scale(0.92)">
          {/* Glow filter behind butterfly */}
          <ellipse cx="25" cy="20" rx="35" ry="30" fill="rgba(245, 158, 11, 0.18)" filter="blur(8px)" />
          
          {/* Upper Left Wing */}
          <path
            d="M 22 22 C 10 8, -15 -10, -25 5 C -35 20, -20 38, 15 28 Z"
            fill="url(#gold-butterfly)"
            stroke="#a16207"
            strokeWidth="1.2"
          />
          {/* Filigree cutouts in upper wing */}
          <path d="M 12 18 C 0 8, -15 0, -18 8 C -22 18, -8 26, 10 22" fill="#fffbeb" opacity="0.6" />
          <circle cx="-10" cy="10" r="3" fill="#fef08a" />
          <circle cx="-16" cy="18" r="2.5" fill="#fef08a" />
          <circle cx="-6" cy="18" r="2" fill="#fef08a" />

          {/* Lower Left Wing */}
          <path
            d="M 18 25 C 2 30, -18 36, -20 50 C -22 62, -5 65, 15 35 Z"
            fill="url(#gold-butterfly)"
            stroke="#a16207"
            strokeWidth="1.2"
          />
          {/* Filigree in lower wing */}
          <path d="M 12 28 C 0 35, -10 42, -12 50 C -10 56, 0 54, 12 34" fill="#fffbeb" opacity="0.6" />
          <circle cx="-6" cy="46" r="2.2" fill="#fef08a" />

          {/* Upper Right Wing (fore-shortened) */}
          <path
            d="M 25 20 C 35 6, 60 -5, 68 8 C 74 22, 55 35, 28 26 Z"
            fill="url(#gold-butterfly)"
            stroke="#a16207"
            strokeWidth="1.2"
          />
          <path d="M 30 18 C 40 10, 52 5, 56 12 C 58 20, 48 26, 32 23" fill="#fffbeb" opacity="0.6" />
          <circle cx="46" cy="12" r="2.8" fill="#fef08a" />
          <circle cx="50" cy="20" r="2.2" fill="#fef08a" />

          {/* Lower Right Wing */}
          <path
            d="M 26 24 C 38 28, 55 35, 54 48 C 52 58, 38 60, 24 32 Z"
            fill="url(#gold-butterfly)"
            stroke="#a16207"
            strokeWidth="1.2"
          />
          <path d="M 28 27 C 36 32, 45 38, 44 46 C 42 52, 34 50, 26 33" fill="#fffbeb" opacity="0.6" />

          {/* Butterfly Body & Antennae */}
          <path d="M 21 12 C 20 18, 20 28, 23 38" stroke="#713f12" strokeWidth="3" strokeLinecap="round" />
          <circle cx="21" cy="10" r="2.5" fill="#713f12" />
          {/* Antennae */}
          <path d="M 20 8 Q 12 0 6 2" stroke="#a16207" strokeWidth="1.2" fill="none" />
          <path d="M 22 8 Q 28 0 34 2" stroke="#a16207" strokeWidth="1.2" fill="none" />
          <circle cx="6" cy="2" r="1.2" fill="#eab308" />
          <circle cx="34" cy="2" r="1.2" fill="#eab308" />
        </g>

        {/* ======================================================== */}
        {/* 5. MAIN SUNFLOWER (GIRASOL DE CINTA DE RASO)             */}
        {/* ======================================================== */}
        <g id="main-sunflower" transform="translate(260, 270)">
          {/* Ambient glow */}
          <circle cx="0" cy="0" r="140" fill="rgba(251, 191, 36, 0.12)" filter="blur(16px)" />

          {/* Outer Petals Layer (18 sharp ribbon-folded satin petals) */}
          <g id="outer-petals">
            {Array.from({ length: outerPetalCount }).map((_, i) => {
              const angle = (i * 360) / outerPetalCount
              return (
                <g key={`outer-${i}`} transform={`rotate(${angle})`}>
                  {/* Left half of ribbon petal */}
                  <path
                    d="M 0 -45 C -16 -65, -28 -95, 0 -132 C -5 -95, 0 -65, 0 -45 Z"
                    fill="url(#satin-petal-left)"
                  />
                  {/* Right half of ribbon petal */}
                  <path
                    d="M 0 -45 C 16 -65, 28 -95, 0 -132 C 5 -95, 0 -65, 0 -45 Z"
                    fill="url(#satin-petal-right)"
                  />
                  {/* Center spine highlight crease */}
                  <path d="M 0 -45 L 0 -130" stroke="#fff385" strokeWidth="1.5" opacity="0.8" />
                  {/* Outer edge crisp line */}
                  <path
                    d="M 0 -45 C -16 -65, -28 -95, 0 -132 C 28 -95, 16 -65, 0 -45"
                    stroke="#d97706"
                    strokeWidth="0.8"
                    fill="none"
                  />
                </g>
              )
            })}
          </g>

          {/* Inner Petals Layer (16 offset ribbon-folded petals for lush fullness) */}
          <g id="inner-petals">
            {Array.from({ length: innerPetalCount }).map((_, i) => {
              const angle = (i * 360) / innerPetalCount + 180 / innerPetalCount
              return (
                <g key={`inner-${i}`} transform={`rotate(${angle})`}>
                  {/* Left half */}
                  <path
                    d="M 0 -38 C -14 -55, -24 -82, 0 -115 C -4 -82, 0 -55, 0 -38 Z"
                    fill="url(#satin-petal-left)"
                  />
                  {/* Right half */}
                  <path
                    d="M 0 -38 C 14 -55, 24 -82, 0 -115 C 4 -82, 0 -55, 0 -38 Z"
                    fill="url(#satin-petal-right)"
                  />
                  {/* Center spine highlight */}
                  <path d="M 0 -38 L 0 -113" stroke="#fffbeb" strokeWidth="1.6" opacity="0.9" />
                  {/* Border stroke */}
                  <path
                    d="M 0 -38 C -14 -55, -24 -82, 0 -115 C 24 -82, 14 -55, 0 -38"
                    stroke="#b45309"
                    strokeWidth="0.9"
                    fill="none"
                  />
                </g>
              )
            })}
          </g>

          {/* Center Dark Cord Woven Disk (Cordón negro en espiral) */}
          <g id="sunflower-center">
            {/* Outer braided rim */}
            <circle cx="0" cy="0" r="48" fill="#18181b" stroke="#78350f" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="46" fill="url(#center-spiral)" />

            {/* Concentric spiral thread ridges simulating coiled black satin cord */}
            {[42, 37, 32, 27, 22, 17, 12, 7, 3].map((r, idx) => (
              <circle
                key={idx}
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke={idx % 2 === 0 ? '#27272a' : '#121214'}
                strokeWidth="2.2"
                strokeDasharray={idx % 2 === 0 ? '4 2' : '3 1.5'}
              />
            ))}
            {/* Fine texture dot details */}
            <circle cx="0" cy="0" r="46" fill="url(#center-spiral)" opacity="0.25" />
            <circle cx="-10" cy="-12" r="14" fill="#ffffff" opacity="0.04" filter="blur(4px)" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* 6. THREE YELLOW SATIN ROSES (3 ROSAS DE RASO)            */}
        {/* ======================================================== */}
        {/* Emerald green leaves under the 3 roses */}
        <g id="rose-leaves">
          {/* Left leaf */}
          <path
            d="M 170 410 C 140 430, 160 470, 205 450 C 185 435, 180 420, 170 410 Z"
            fill="url(#green-satin)"
            stroke="#064e3b"
            strokeWidth="1"
          />
          {/* Center-left leaf */}
          <path
            d="M 215 440 C 200 475, 240 480, 255 450 C 240 445, 225 442, 215 440 Z"
            fill="url(#green-satin)"
            stroke="#064e3b"
            strokeWidth="1"
          />
          {/* Center-right leaf */}
          <path
            d="M 270 450 C 285 480, 325 475, 310 440 C 300 442, 285 445, 270 450 Z"
            fill="url(#green-satin)"
            stroke="#064e3b"
            strokeWidth="1"
          />
          {/* Right leaf */}
          <path
            d="M 350 410 C 380 430, 360 470, 315 450 C 335 435, 340 420, 350 410 Z"
            fill="url(#green-satin)"
            stroke="#064e3b"
            strokeWidth="1"
          />
        </g>

        {/* Rose 1: Left Yellow Satin Rose */}
        <g id="rose-left" transform="translate(195, 415) rotate(-12) scale(0.95)">
          {/* Outer petal swirl base */}
          <ellipse cx="0" cy="0" rx="38" ry="26" fill="url(#satin-yellow-dark)" />
          {/* Swirled ribbon petal layers */}
          <path
            d="M -34 2 C -30 -18, 10 -25, 32 -10 C 36 12, 10 25, -20 22 C -32 20, -36 12, -34 2 Z"
            fill="url(#satin-yellow-light)"
            stroke="#d97706"
            strokeWidth="1"
          />
          <path
            d="M -26 -6 C -18 -20, 18 -18, 26 -2 C 24 14, -2 20, -18 14 C -26 10, -28 4, -26 -6 Z"
            fill="url(#satin-yellow-dark)"
            stroke="#b45309"
            strokeWidth="0.9"
          />
          <path
            d="M -18 -2 C -12 -14, 12 -12, 18 0 C 16 10, -2 14, -12 8 Z"
            fill="url(#satin-yellow-light)"
            stroke="#d97706"
            strokeWidth="0.8"
          />
          {/* Center satin swirl core */}
          <path
            d="M -8 0 C -4 -8, 8 -6, 8 2 C 6 6, -2 7, -6 4 C -8 2, -6 -2, 0 -2 C 4 -2, 4 2, 2 2"
            stroke="#b45309"
            strokeWidth="2"
            fill="none"
          />
          {/* Ribbon shine highlights */}
          <path d="M -24 -10 Q 0 -18 20 -8" stroke="#fffbeb" strokeWidth="1.5" fill="none" opacity="0.75" />
        </g>

        {/* Rose 2: Center Yellow Satin Rose (Slightly larger) */}
        <g id="rose-center" transform="translate(260, 422) scale(1.08)">
          <ellipse cx="0" cy="0" rx="42" ry="28" fill="url(#satin-yellow-dark)" />
          {/* Swirled ribbon petal layers */}
          <path
            d="M -38 2 C -34 -20, 12 -28, 36 -12 C 40 14, 12 28, -22 24 C -36 22, -40 14, -38 2 Z"
            fill="url(#satin-yellow-light)"
            stroke="#d97706"
            strokeWidth="1.1"
          />
          <path
            d="M -29 -7 C -20 -22, 20 -20, 29 -2 C 27 16, -2 22, -20 16 C -29 11, -31 4, -29 -7 Z"
            fill="url(#satin-yellow-dark)"
            stroke="#b45309"
            strokeWidth="1"
          />
          <path
            d="M -20 -2 C -13 -15, 13 -13, 20 0 C 18 11, -2 15, -13 9 Z"
            fill="url(#satin-yellow-light)"
            stroke="#d97706"
            strokeWidth="0.9"
          />
          {/* Center core */}
          <path
            d="M -9 0 C -4 -9, 9 -7, 9 2 C 7 7, -2 8, -7 4 C -9 2, -7 -2, 0 -2 C 5 -2, 5 2, 2 2"
            stroke="#92400e"
            strokeWidth="2.2"
            fill="none"
          />
          <path d="M -28 -12 Q 0 -20 24 -10" stroke="#fffbeb" strokeWidth="1.8" fill="none" opacity="0.8" />
        </g>

        {/* Rose 3: Right Yellow Satin Rose */}
        <g id="rose-right" transform="translate(325, 415) rotate(12) scale(0.95)">
          <ellipse cx="0" cy="0" rx="38" ry="26" fill="url(#satin-yellow-dark)" />
          <path
            d="M 34 2 C 30 -18, -10 -25, -32 -10 C -36 12, -10 25, 20 22 C 32 20, 36 12, 34 2 Z"
            fill="url(#satin-yellow-light)"
            stroke="#d97706"
            strokeWidth="1"
          />
          <path
            d="M 26 -6 C 18 -20, -18 -18, -26 -2 C -24 14, 2 20, 18 14 C 26 10, 28 4, 26 -6 Z"
            fill="url(#satin-yellow-dark)"
            stroke="#b45309"
            strokeWidth="0.9"
          />
          <path
            d="M 18 -2 C 12 -14, -12 -12, -18 0 C -16 10, 2 14, 12 8 Z"
            fill="url(#satin-yellow-light)"
            stroke="#d97706"
            strokeWidth="0.8"
          />
          <path
            d="M 8 0 C 4 -8, -8 -6, -8 2 C -6 6, 2 7, 6 4 C 8 2, 6 -2, 0 -2 C -4 -2, -4 2, -2 2"
            stroke="#b45309"
            strokeWidth="2"
            fill="none"
          />
          <path d="M 24 -10 Q 0 -18 -20 -8" stroke="#fffbeb" strokeWidth="1.5" fill="none" opacity="0.75" />
        </g>

        {/* ======================================================== */}
        {/* 7. METALLIC SILVER & GOLD PLEATED RUFF / COLLAR          */}
        {/* ======================================================== */}
        <g id="metallic-ruff" transform="translate(260, 470)">
          {/* Fan/Pleated Foil collar */}
          <path
            d="M -140 -20 
               Q -70 5 0 8 
               Q 70 5 140 -20 
               L 115 55 
               Q 60 75 0 80 
               Q -60 75 -115 55 Z"
            fill="url(#metallic-gold-foil)"
            stroke="#9ca3af"
            strokeWidth="1"
          />

          {/* Silver foil pleated frills along the top edge */}
          {[-120, -100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100, 120].map((x, idx) => {
            const yOffset = Math.sin(((x + 120) / 240) * Math.PI) * 15
            return (
              <g key={idx}>
                {/* Silver reflective top ruffle */}
                <path
                  d={`M ${x - 12} ${-15 + yOffset} Q ${x} ${-30 + yOffset} ${x + 12} ${-15 + yOffset} L ${x * 0.75} ${45 + yOffset * 0.7} Z`}
                  fill="url(#metallic-silver)"
                  opacity="0.85"
                  stroke="#e5e7eb"
                  strokeWidth="0.8"
                />
                {/* Pleat fold crease */}
                <line
                  x1={x}
                  y1={-25 + yOffset}
                  x2={x * 0.55}
                  y2={65 + yOffset * 0.4}
                  stroke={idx % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.35)'}
                  strokeWidth="1.2"
                />
              </g>
            )
          })}
        </g>

        {/* ======================================================== */}
        {/* 8. SATIN YELLOW RIBBON BOW & FLOWING TAILS               */}
        {/* ======================================================== */}
        <g id="yellow-bow" transform="translate(260, 550)">
          {/* Bow shadow */}
          <ellipse cx="0" cy="10" rx="60" ry="18" fill="rgba(0,0,0,0.3)" filter="blur(6px)" />

          {/* Flowing Ribbon Tails */}
          {/* Left ribbon tail */}
          <path
            d="M -15 15 
               C -35 50, -65 105, -70 165
               C -55 170, -45 150, -42 135
               L -28 175
               C -15 120, -5 65, -5 15 Z"
            fill="url(#bow-grad)"
            stroke="#b45309"
            strokeWidth="1.2"
          />
          {/* Ribbon tail shine */}
          <path
            d="M -15 20 C -32 55, -55 105, -58 155"
            stroke="#fffbeb"
            strokeWidth="2.5"
            fill="none"
            opacity="0.75"
          />

          {/* Right ribbon tail */}
          <path
            d="M 12 15 
               C 35 45, 80 100, 115 150
               C 100 155, 90 140, 85 125
               L 70 160
               C 50 115, 25 65, 5 15 Z"
            fill="url(#bow-grad)"
            stroke="#b45309"
            strokeWidth="1.2"
          />
          <path
            d="M 12 20 C 35 50, 70 95, 95 138"
            stroke="#fffbeb"
            strokeWidth="2.5"
            fill="none"
            opacity="0.75"
          />

          {/* Left Bow Loop */}
          <g transform="rotate(-15)">
            <path
              d="M -10 5 C -45 5, -80 -25, -70 -50 C -60 -70, -25 -55, -5 -10 Z"
              fill="url(#bow-grad)"
              stroke="#b45309"
              strokeWidth="1.4"
            />
            {/* Inner fold hole of left loop */}
            <path
              d="M -30 -22 C -48 -32, -52 -45, -42 -48 C -32 -50, -20 -38, -15 -20 Z"
              fill="url(#bow-shadow)"
            />
            {/* Satin highlight on loop fold */}
            <path
              d="M -10 -5 C -35 -40, -55 -55, -65 -45"
              stroke="#fffde7"
              strokeWidth="3"
              fill="none"
              opacity="0.85"
            />
          </g>

          {/* Right Bow Loop */}
          <g transform="rotate(15)">
            <path
              d="M 10 5 C 45 5, 80 -25, 70 -50 C 60 -70, 25 -55, 5 -10 Z"
              fill="url(#bow-grad)"
              stroke="#b45309"
              strokeWidth="1.4"
            />
            {/* Inner fold hole of right loop */}
            <path
              d="M 30 -22 C 48 -32, 52 -45, 42 -48 C 32 -50, 20 -38, 15 -20 Z"
              fill="url(#bow-shadow)"
            />
            {/* Satin highlight */}
            <path
              d="M 10 -5 C 35 -40, 55 -55, 65 -45"
              stroke="#fffde7"
              strokeWidth="3"
              fill="none"
              opacity="0.85"
            />
          </g>

          {/* Center Bow Knot */}
          <ellipse cx="0" cy="0" rx="18" ry="15" fill="url(#bow-grad)" stroke="#b45309" strokeWidth="1.5" />
          {/* Knot wrinkles */}
          <path d="M -8 -8 Q 0 0 -6 8" stroke="#78350f" strokeWidth="1.5" fill="none" />
          <path d="M 6 -8 Q 0 0 6 8" stroke="#78350f" strokeWidth="1.5" fill="none" />
          <ellipse cx="-3" cy="-4" rx="8" ry="4" fill="#fffde7" opacity="0.85" />
        </g>
      </svg>
    </div>
  )
}
