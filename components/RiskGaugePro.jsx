// components/RiskGaugePro.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

/**
 * RiskGaugePro
 * Props:
 *  - score: number (0..1)  // required
 *  - size: number (px) optional, default 160 (controls svg box)
 *  - thickness: number optional, default 12 (arc thickness)
 *  - showLabel: boolean optional, default true
 *
 * Usage:
 *  <RiskGaugePro score={0.59} size={180} />
 */

function clamp(v, a = 0, b = 1) {
  return Math.max(a, Math.min(b, v));
}

function interpolateColor(percent) {
  // percent: 0..100
  // returns hex color by segments green -> yellow -> orange -> red
  const p = clamp(percent / 100, 0, 1);
  if (p < 0.4) {
    // green (#16a34a) -> lime (#84cc16)
    const t = p / 0.4;
    return lerpColor("#16a34a", "#84cc16", t);
  } else if (p < 0.7) {
    // lime -> amber
    const t = (p - 0.4) / 0.3;
    return lerpColor("#84cc16", "#f59e0b", t);
  } else {
    // amber -> red
    const t = (p - 0.7) / 0.3;
    return lerpColor("#f59e0b", "#ef4444", clamp(t, 0, 1));
  }
}

// simple hex color lerp
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}
function rgbToHex({ r, g, b }) {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(Math.round(r))}${toHex(Math.round(g))}${toHex(
    Math.round(b)
  )}`;
}
function lerpColor(a, b, t) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgbToHex({
    r: A.r + (B.r - A.r) * t,
    g: A.g + (B.g - A.g) * t,
    b: A.b + (B.b - A.b) * t,
  });
}

// describe arc from angleStart to angleEnd (degrees), used for semicircle (180 -> 0)
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}
function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

export default function RiskGaugePro({
  score = 0,
  size = 160,
  thickness = 12,
  showLabel = true,
}) {
  const pct = Math.round(clamp(Number(score) || 0, 0, 1) * 100);
  const svgSize = size;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const radius = svgSize / 2 - thickness - 4; // padding
  const bgStart = 180;
  const bgEnd = 0;
  const bgPath = describeArc(cx, cy, radius, bgStart, bgEnd);

  // motion values for animated progress and percent
  const progress = useMotionValue(0); // 0..1
  const spring = useSpring(progress, { stiffness: 160, damping: 24 });
  const percent = useTransform(spring, (v) => Math.round(v * 100));

  // animated color from percent
  const colorRef = useRef(interpolateColor(pct));
  useEffect(() => {
    // animate progress to score
    const controls = animate(progress, clamp(score, 0, 1), {
      duration: 0.9,
      ease: "easeOut",
    });
    // update colorRef on percent change using subscription
    const unsub = percent.onChange((val) => {
      colorRef.current = interpolateColor(val);
    });
    return () => {
      controls.stop();
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  // stroke-dash array approach isn't needed because we animate pathLength with motion.path
  // but we use same path for foreground and animate its pathLength.
  const fgPathD = bgPath;

  const strokeLinecap = "round";
  const arcColor = colorRef.current;

  return (
    <div className="w-full flex flex-col items-center justify-center select-none">
      <div
        className="relative"
        style={{ width: svgSize, height: svgSize / 2 }}
        aria-hidden={false}
        role="img"
        aria-label={`Risk gauge ${pct} percent`}
      >
        {/* subtle glow behind gauge */}
        <div
          className="absolute inset-0 rounded-t-full"
          style={{
            filter: `drop-shadow(0 6px 18px ${interpolateColor(pct)}55)`,
            WebkitFilter: `drop-shadow(0 6px 18px ${interpolateColor(pct)}55)`,
          }}
        />
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize / 2}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* background arc */}
          <path
            d={bgPath}
            fill="none"
            stroke="#eef2ff"
            strokeWidth={thickness}
            strokeLinecap={strokeLinecap}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ opacity: 1 }}
          />

          {/* foreground animated arc using motion.path pathLength */}
          <motion.path
            d={fgPathD}
            fill="none"
            strokeLinecap={strokeLinecap}
            strokeLinejoin="round"
            strokeWidth={thickness}
            vectorEffect="non-scaling-stroke"
            stroke={arcColor}
            style={{ stroke: arcColor }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: clamp(score, 0, 1) }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            strokeOpacity={1}
          />

          {/* ticks / baseline markers along bottom (0% and 100%) */}
          {/* left label 0% and right label 100% */}
          {/* <text
            x={12}
            y={svgSize / 2 - 4}
            fontSize="10"
            fill="#475569"
            style={{ fontWeight: 600 }}
          >
            0%
          </text> */}
          <text
            x={svgSize - 28}
            y={svgSize / 2 - 4}
            fontSize="10"
            fill="#475569"
            style={{ fontWeight: 600 }}
          >
            {Math.max(100, 100)}%
          </text>
        </svg>
      </div>

      {/* Percentage + small legend */}
      <div className="mt-2 flex items-center gap-3">
        <div
          className="text-lg font-semibold"
          style={{ color: interpolateColor(pct) }}
          aria-hidden
        >
          {/* use percent motion value for smoother animation */}
          <AnimatedPercent value={score} />
        </div>
        {showLabel && (
          <div className="text-sm text-slate-600">
            {pct < 40 ? "Low risk" : pct < 70 ? "Medium risk" : "High risk"}
          </div>
        )}
      </div>
      {/* optional short explanation */}
      <div className="mt-1 text-xs text-slate-500 text-center max-w-[220px]">
        {pct < 40
          ? "Low estimated default risk."
          : pct < 70
          ? "Moderate risk — review contributing factors."
          : "High risk — consider reducing requested amount."}
      </div>
    </div>
  );
}

/* Animated percent (0..1 score) -> number animation using motion springs */
function AnimatedPercent({ value = 0 }) {
  const motionVal = useMotionValue(clamp(Number(value) || 0, 0, 1));
  const spring = useSpring(motionVal, { stiffness: 160, damping: 28 });
  const rounded = useTransform(spring, (v) => Math.round(v * 100));

  useEffect(() => {
    // animate to new value when prop changes
    const controls = animate(motionVal, clamp(Number(value) || 0, 0, 1), {
      duration: 0.9,
      ease: "easeOut",
    });
    return () => {
      controls.stop();
    };
  }, [value, motionVal]);

  // subscribe to spring and render text via ref-free approach using useState-like trick
  const ref = useRef();
  const [display, setDisplay] = useState(
    Math.round(clamp(Number(value) || 0, 0, 1) * 100)
  );
  useEffect(() => {
    const unsub = rounded.onChange((v) => setDisplay(Number(v)));
    return () => unsub();
  }, [rounded]);

  return <span ref={ref}>{display}%</span>;
}
