"use client";

import { motion } from "framer-motion";

export type AvatarState = "idle" | "thinking" | "responding" | "success";

interface AIAvatarProps {
  state?: AvatarState;
  size?: "sm" | "md" | "lg";
}

export function AIAvatar({ state = "idle", size = "md" }: AIAvatarProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  };

  const sizePx = {
    sm: 48,
    md: 80,
    lg: 112,
  };

  const idleVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        ease: "easeInOut" as const,
        repeat: Infinity,
      },
    },
  };

  const thinkingVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 1.5,
        ease: "easeInOut" as const,
        repeat: Infinity,
      },
    },
  };

  const respondingVariants = {
    animate: {
      scale: [1, 1.02, 1],
      rotateZ: [0, 2, -2, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  const successVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 360, 0],
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const getVariants = () => {
    switch (state) {
      case "thinking":
        return thinkingVariants;
      case "responding":
        return respondingVariants;
      case "success":
        return successVariants;
      case "idle":
      default:
        return idleVariants;
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      className={`${sizeClasses[size]} relative flex items-center justify-center`}
      variants={state === "success" ? variants : undefined}
      initial={state === "success" ? "initial" : undefined}
      animate={state === "success" ? "animate" : undefined}
    >
      {state === "success" ? (
        <SuccessAvatar size={sizePx[size]} />
      ) : (
        <motion.div
          variants={variants}
          animate="animate"
          className={`${sizeClasses[size]} flex items-center justify-center`}
        >
          <AvatarVisual state={state} size={sizePx[size]} />
        </motion.div>
      )}

      {/* Glow effect for thinking state */}
      {state === "thinking" && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-blue-400/20 blur-lg"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      )}
    </motion.div>
  );
}

interface AvatarVisualProps {
  state: AvatarState;
  size: number;
}

function AvatarVisual({ state, size }: AvatarVisualProps) {
  const innerSize = size * 0.6;

  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 shadow-lg"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Main avatar body */}
      <div
        className="rounded-full bg-gradient-to-b from-slate-100 to-slate-200"
        style={{
          width: innerSize,
          height: innerSize,
        }}
      >
        {/* AI symbol - stylized circuit pattern */}
        <div className="flex h-full w-full items-center justify-center">
          <svg
            className="h-3/4 w-3/4"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Circuit board style AI symbol */}
            <circle cx="50" cy="50" r="35" stroke="#64748b" strokeWidth="2" />

            {/* Central node */}
            <circle cx="50" cy="50" r="8" fill="#0f172a" />

            {/* Connection lines */}
            <line x1="50" y1="50" x2="50" y2="20" stroke="#64748b" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="70" y2="35" stroke="#64748b" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="70" y2="65" stroke="#64748b" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="50" y2="80" stroke="#64748b" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="30" y2="35" stroke="#64748b" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="30" y2="65" stroke="#64748b" strokeWidth="1.5" />

            {/* Connection points */}
            <circle cx="50" cy="20" r="3" fill="#0f172a" />
            <circle cx="70" cy="35" r="3" fill="#0f172a" />
            <circle cx="70" cy="65" r="3" fill="#0f172a" />
            <circle cx="50" cy="80" r="3" fill="#0f172a" />
            <circle cx="30" cy="35" r="3" fill="#0f172a" />
            <circle cx="30" cy="65" r="3" fill="#0f172a" />
          </svg>
        </div>
      </div>

      {/* State indicator dots */}
      {state === "thinking" && (
        <div className="absolute bottom-2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-slate-950"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SuccessAvatar({ size }: { size: number }) {
  const innerSize = size * 0.6;

  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg"
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className="rounded-full bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center"
        style={{
          width: innerSize,
          height: innerSize,
        }}
      >
        {/* Checkmark */}
        <svg
          className="h-1/2 w-1/2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
  );
}
