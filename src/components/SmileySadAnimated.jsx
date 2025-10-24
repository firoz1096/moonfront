

/**
 * Props:
 * - size: number (px) default 64
 */
export default function SmileySadAnimated({ size = 64 }) {
  const s = size;
  return (
    <div className="smiley-wrapper" style={{ width: s, height: s }}>
      <svg
        className="smiley sad"
        viewBox="0 0 100 100"
        width={s}
        height={s}
        role="img"
        aria-label="Animated sad face"
      >
        {/* face */}
        <circle className="smile-face" cx="50" cy="50" r="44" />

        {/* left eye */}
        <circle className="eye left" cx="36" cy="40" r="5.5" />

        {/* right eye */}
        <circle className="eye right" cx="64" cy="40" r="5.5" />

        {/* mouth (sad curve) */}
        <path
          className="mouth-sad"
          d="M30 66 Q50 50 70 66"
          fill="transparent"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* tear drop under right eye */}
        <ellipse className="tear" cx="64" cy="50" rx="3" ry="5" />
      </svg>
    </div>
  );
}
