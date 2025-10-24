

/**
 * Props:
 * - size: number (px) default 64
 */
export default function SmileyWarningAnimated({ size = 64 }) {
  const s = size;
  return (
    <div className="smiley-wrapper" style={{ width: s, height: s }}>
      <svg
        className="smiley warning"
        viewBox="0 0 100 100"
        width={s}
        height={s}
        role="img"
        aria-label="Animated warning face"
      >
        {/* face */}
        <circle className="smile-face" cx="50" cy="50" r="44" />

        {/* eyebrows */}
        <rect className="brow left" x="28" y="30" width="14" height="3" rx="2" />
        <rect className="brow right" x="58" y="30" width="14" height="3" rx="2" />

        {/* eyes */}
        <circle className="eye left" cx="36" cy="42" r="5.5" />
        <circle className="eye right" cx="64" cy="42" r="5.5" />

        {/* mouth - straight line */}
        <line
          className="mouth-warning"
          x1="35"
          y1="66"
          x2="65"
          y2="66"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* exclamation mark effect (small dot + line) */}
        <line
          className="exclamation-line"
          x1="50"
          y1="20"
          x2="50"
          y2="30"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle className="exclamation-dot" cx="50" cy="36" r="3" />
      </svg>
    </div>
  );
}
