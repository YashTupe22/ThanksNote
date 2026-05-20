export const PawIcon = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <ellipse cx="12" cy="16" rx="5" ry="4.2" />
    <ellipse cx="5" cy="11" rx="2" ry="2.6" />
    <ellipse cx="19" cy="11" rx="2" ry="2.6" />
    <ellipse cx="8.5" cy="6.5" rx="1.7" ry="2.2" />
    <ellipse cx="15.5" cy="6.5" rx="1.7" ry="2.2" />
  </svg>
);

export const Heart = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M12 21s-7-4.5-9.5-9C.8 8.5 2.5 4 7 4c2 0 3.5 1.2 5 3 1.5-1.8 3-3 5-3 4.5 0 6.2 4.5 4.5 8-2.5 4.5-9.5 9-9.5 9z" />
  </svg>
);

export const Sparkle = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9 Z" />
  </svg>
);

export const SittingCat = ({ flip = false, className = "" }: { flip?: boolean; className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ transform: flip ? "scaleX(-1)" : undefined }} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M28 80 C 22 50, 32 28, 50 28 C 68 28, 78 50, 72 80 Z" fill="oklch(0.90 0.07 60)" />
    <path d="M30 32 L 22 14 L 38 26 Z" fill="currentColor" />
    <path d="M70 32 L 78 14 L 62 26 Z" fill="currentColor" />
    <circle cx="42" cy="48" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="58" cy="48" r="2.4" fill="currentColor" stroke="none" />
    <path d="M48 56 L 52 56 L 50 59 Z" fill="oklch(0.78 0.10 25)" stroke="none" />
    <path d="M50 59 Q 45 64 42 60" />
    <path d="M50 59 Q 55 64 58 60" />
    <line x1="38" y1="52" x2="28" y2="50" />
    <line x1="38" y1="55" x2="28" y2="57" />
    <line x1="62" y1="52" x2="72" y2="50" />
    <line x1="62" y1="55" x2="72" y2="57" />
    <path d="M72 78 Q 88 72 82 56" />
  </svg>
);

export const BlinkingCat = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 60 C 18 36, 32 22, 50 22 C 68 22, 82 36, 78 60 C 76 76, 64 82, 50 82 C 36 82, 24 76, 22 60 Z" fill="oklch(0.90 0.07 60)" />
    <path d="M26 32 L 18 14 L 36 26 Z" fill="oklch(0.90 0.07 60)" />
    <path d="M74 32 L 82 14 L 64 26 Z" fill="oklch(0.90 0.07 60)" />
    <g className="blink" style={{ transformOrigin: "40px 50px" }}>
      <ellipse cx="40" cy="50" rx="3.5" ry="5" fill="currentColor" stroke="none" />
    </g>
    <g className="blink" style={{ transformOrigin: "62px 50px" }}>
      <ellipse cx="62" cy="50" rx="3.5" ry="5" fill="currentColor" stroke="none" />
    </g>
    <path d="M48 62 L 52 62 L 50 65 Z" fill="oklch(0.78 0.10 25)" stroke="none" />
    <path d="M50 65 Q 45 70 42 67" />
    <path d="M50 65 Q 55 70 58 67" />
    <line x1="30" y1="56" x2="20" y2="54" />
    <line x1="30" y1="60" x2="20" y2="62" />
    <line x1="70" y1="56" x2="80" y2="54" />
    <line x1="70" y1="60" x2="80" y2="62" />
  </svg>
);

export const WalkingCat = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 60" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 45 C 10 30, 25 22, 50 22 L 85 22 C 100 22, 108 30, 108 42" fill="oklch(0.90 0.07 60)" />
    <circle cx="100" cy="30" r="10" fill="oklch(0.90 0.07 60)" />
    <path d="M93 22 L 90 14 L 98 20 Z" fill="currentColor" />
    <path d="M107 22 L 110 14 L 104 20 Z" fill="currentColor" />
    <circle cx="103" cy="29" r="1.6" fill="currentColor" stroke="none" />
    <path d="M105 33 Q 107 35 109 33" />
    <line x1="20" y1="45" x2="20" y2="58" />
    <line x1="35" y1="45" x2="35" y2="58" />
    <line x1="75" y1="45" x2="75" y2="58" />
    <line x1="92" y1="45" x2="92" y2="58" />
    <path d="M10 40 Q -2 30 4 18" />
  </svg>
);
