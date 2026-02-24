import { motion } from "framer-motion";

export default function LifeScoreRing({ score }) {
  const radius = 90;
  const stroke = 14;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">

      <svg height={radius * 2} width={radius * 2}>
        {/* Background Circle */}
        <circle
          stroke="#F3E8EF"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Animated Progress Circle */}
        <motion.circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          transform={`rotate(-90 ${radius} ${radius})`}
        />

        {/* Gradient */}
        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#D88BA6" />
            <stop offset="100%" stopColor="#8E7CC3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Score Text */}
      <div className="-mt-32 text-center">
        <h2 className="text-5xl font-light text-softRose">
          {score}
        </h2>
        <p className="text-mutedText text-sm mt-1">
          Life Score
        </p>
      </div>
    </div>
  );
}
