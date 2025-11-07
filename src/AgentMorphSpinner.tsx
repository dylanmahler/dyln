import { useEffect, useRef } from "react";
import * as flubber from "flubber";

// 1 = idle, 2..6 = thinking variants
const AGENT_PATHS: string[] = [
  // Base (idle)
  "M10.224 4.94935C10.8362 3.67498 12.6869 3.68702 12.6102 4.96487L12.4887 6.98952C12.3987 8.48815 13.3106 9.64483 14.7785 9.89399L21.6989 11.0686C22.2213 11.1573 22.0167 11.9293 21.4477 12.016L13.9917 13.153C12.4067 13.3947 10.8935 14.5302 10.1815 16.0121L9.20213 18.0506C8.594 19.3165 6.75683 19.3165 6.8151 18.0506L6.9152 15.8762C6.98025 14.4628 6.14981 13.3578 4.79335 13.0528L2.69668 12.5813C1.48462 12.3088 1.95864 10.508 3.31418 10.2354L5.65908 9.76396C7.17611 9.45894 8.58832 8.35392 9.26733 6.94058L10.224 4.94935Z",
  // Agent 2–6 (thinking)
  "M6.23928 8.8243L4.60564 7.00554C4.2541 6.61418 4.66769 6.01515 5.15823 6.20519L8.33571 7.43617C9.08135 7.72503 9.92739 7.54199 10.487 6.97075L12.083 5.34134C12.2933 5.1267 12.658 5.27556 12.658 5.57602C12.658 6.52613 13.6185 7.17512 14.5 6.82061L20.502 4.40679C21.0439 4.18885 21.4559 4.91826 20.9896 5.26992L14.4887 10.1716C13.5836 10.8541 13.4261 12.1515 14.1415 13.0308L17.7738 17.4951C18.1258 17.9276 17.6125 18.5245 17.1321 18.2414L12.0062 15.2201C11.0425 14.6522 9.8004 14.9849 9.24976 15.9586L7.16487 19.6451C6.87652 20.155 6.09732 19.8386 6.24603 19.2721L7.45139 14.6796C7.63616 13.9757 7.03097 13.3164 6.31378 13.4404L4.58006 13.7402C4.03672 13.8341 3.76364 13.1084 4.23414 12.8208L5.79434 11.8673C6.86141 11.2151 7.07496 9.75466 6.23928 8.8243Z",
  "M8.73396 12.7649L7.77436 13.8812C7.45783 14.2494 7.79904 14.8072 8.27102 14.6931L10.5701 14.1373C11.4458 13.9256 12.3549 14.3255 12.7906 15.114L15.1628 19.407C15.4353 19.9003 16.1887 19.6358 16.0931 19.0804L15.5669 16.0225C15.386 14.9708 16.0625 13.9623 17.1042 13.7309L19.6098 13.1743C20.0711 13.0718 20.146 12.4458 19.7219 12.2374L17.4238 11.1082C16.3556 10.5833 15.9794 9.24736 16.6168 8.24219L17.5085 6.83585C17.7535 6.44947 17.3939 5.96423 16.9529 6.0862L14.902 6.6535C13.758 6.96996 12.5917 6.22615 12.3961 5.05537L12.3834 4.9793C12.2976 4.46548 11.5814 4.409 11.4161 4.90302L10.616 7.29439C10.4336 7.83926 9.83074 8.1188 9.29708 7.90589L2.76682 5.30066C2.19547 5.07272 1.79683 5.87741 2.32434 6.19384L8.2461 9.74604C9.3091 10.3837 9.542 11.8248 8.73396 12.7649Z",
  "M16.3222 11.1364L20.2133 7.79452C20.6229 7.44269 20.2612 6.78121 19.7439 6.93627L14.2654 8.57858C13.4716 8.81655 12.6132 8.5403 12.1072 7.88401L10.0567 5.2246C9.76053 4.84044 9.1458 5.06072 9.16101 5.54557L9.23881 8.02682C9.26933 8.99976 8.59493 9.85335 7.64134 10.0488L4.51164 10.6902C4.03674 10.7875 3.96434 11.4359 4.40607 11.6356L7.17889 12.8891C8.22779 13.3633 8.66094 14.6227 8.12556 15.6417L7.75894 16.3396C7.57217 16.695 7.85949 17.1145 8.25844 17.0689L10.0165 16.8676C11.019 16.7528 11.9499 17.4027 12.1877 18.3833L12.9758 21.6338C13.1118 22.1949 13.9329 22.117 13.9611 21.5404L14.194 16.7763C14.2241 16.1618 14.7966 15.72 15.3986 15.8465L18.0314 16.4001C18.5792 16.5152 18.8735 15.7808 18.3977 15.4858L16.5714 14.3535C15.4223 13.641 15.2965 12.0174 16.3222 11.1364Z",
  "M15.3219 10.6342L19.122 8.14504C19.6045 7.82901 19.257 7.08222 18.7045 7.24784L13.5714 8.78658C13.1921 8.90029 12.7814 8.77944 12.5241 8.47839L10.6786 6.31912C10.4021 5.99559 9.87361 6.14342 9.80507 6.56346L9.40058 9.0427C9.33476 9.44609 9.03009 9.76882 8.63115 9.85773L3.6105 10.9766C3.05393 11.1007 3.10552 11.9102 3.67333 11.9626L8.18849 12.379C8.84745 12.4398 9.26671 13.1124 9.03113 13.7308L6.85356 19.4469C6.6454 19.9933 7.38379 20.3917 7.72614 19.9176L10.9339 15.4761C11.3958 14.8366 12.3818 14.9587 12.6736 15.6916L12.9253 16.3235C13.1248 16.8247 13.8669 16.6983 13.8894 16.1593L13.9419 14.8973C13.9704 14.2122 14.6643 13.7584 15.3035 14.0069L17.7677 14.9652C18.3362 15.1863 18.7301 14.3906 18.2097 14.0726L15.3483 12.324C14.7219 11.9412 14.7078 11.0364 15.3219 10.6342Z",
  "M6.57508 8.86116L4.24232 5.64564C3.91779 5.19829 4.45179 4.63278 4.91699 4.93117L7.85829 6.81777C8.79694 7.41984 10.0467 7.13795 10.636 6.19123L11.0755 5.48516C11.3412 5.05829 12 5.24657 12 5.74939V8C12 8.55229 12.4477 9 13 9H14.4037C14.9542 9 15.1006 9.75978 14.5894 9.96424L13.4712 10.4115C12.7886 10.6846 12.6241 11.5761 13.1643 12.0748L16.762 15.3957C17.1591 15.7623 16.7729 16.4108 16.2614 16.2363L11.9613 14.7693C10.9904 14.4381 9.9264 14.8952 9.49816 15.8273L9.21865 16.4357C9.00967 16.8906 8.33605 16.7902 8.26883 16.2941L7.98548 14.2032C7.90939 13.6418 7.38248 13.2556 6.82416 13.3522L4.58006 13.7402C4.03672 13.8341 3.76364 13.1084 4.23414 12.8208L5.99918 11.7421C6.99477 11.1336 7.26025 9.80561 6.57508 8.86116Z",
];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function pickNextRandom(current: number, min: number, max: number) {
  // returns an integer in [min, max] not equal to current
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return next;
}


export default function AgentMorphSpinner({
  size = 96,
  speed = 1000,
  fillColor = "#302D2E",
  thinking = false,
}: {
  size?: number;
  speed?: number;
  fillColor?: string;
  thinking?: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef<number>();
  const startRef = useRef<number>(0);
  const fromIdxRef = useRef<number>(1); // start from first thinking variant
  const toIdxRef = useRef<number>(2);
  const rotateRef = useRef<number>(0);


  const startMorph = (fromIdx: number, toIdx: number) => {
    const el = pathRef.current;
    if (!el) return;
    const from = AGENT_PATHS[fromIdx];
    const to = AGENT_PATHS[toIdx];
    const interp = flubber.interpolate(from, to, { maxSegmentLength: 0.5 });
    startRef.current = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startRef.current) / speed);
      el.setAttribute("d", interp(easeInOutCubic(t)));

      // gentle rotation while thinking
      rotateRef.current += 0.05;
      const svg = el.closest("svg");
      if (svg) svg.style.transform = `rotate(${rotateRef.current}deg)`;

      if (t >= 1) {
        // immediately chain to another random target
        fromIdxRef.current = toIdxRef.current;
        toIdxRef.current = pickNextRandom(fromIdxRef.current, 1, AGENT_PATHS.length - 1);
        startMorph(fromIdxRef.current, toIdxRef.current);
      } else {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    cancelAnimationFrame(rafRef.current!);
    rafRef.current = requestAnimationFrame(step);
  };

  // start/stop thinking loop
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;

    if (thinking) {
      // begin with a random target from base thinking index
      fromIdxRef.current = 1;
      toIdxRef.current = pickNextRandom(fromIdxRef.current, 1, AGENT_PATHS.length - 1);
      startMorph(fromIdxRef.current, toIdxRef.current);
      return () => cancelAnimationFrame(rafRef.current!);
    }

    // morph back to base quickly but smoothly
    cancelAnimationFrame(rafRef.current!);

    const currentD = el.getAttribute("d") || AGENT_PATHS[1];
    const back = flubber.interpolate(currentD, AGENT_PATHS[0], { maxSegmentLength: 0.5 });
    const startBack = performance.now();
    const duration = Math.max(180, speed * 0.3);
    const initialRotation = rotateRef.current;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startBack) / duration);
      el.setAttribute("d", back(easeInOutCubic(t)));
      
      // Rotate during the transition, smoothly going from current rotation to 0
      const currentRotation = initialRotation * (1 - t);
      rotateRef.current = currentRotation;
      const svg = el.closest("svg");
      if (svg) svg.style.transform = `rotate(${currentRotation}deg)`;
      
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        rotateRef.current = 0;
        const svg = el.closest("svg");
        if (svg) svg.style.transform = `rotate(0deg)`;
      }
    };

    requestAnimationFrame(tick);
  }, [thinking, speed]);

  return (
    <div style={{ display: "grid", placeItems: "center", gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="-6 -6 36 36"
        shapeRendering="geometricPrecision"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(80,160,255,0.9)" />
            <stop offset="50%" stopColor="rgba(80,230,170,0.85)" />
            <stop offset="100%" stopColor="rgba(255,245,190,0.8)" />
          </linearGradient>
          <filter id="glow-shadow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur1" />
            <feOffset in="blur1" dx="0" dy="0" result="offsetBlur1" />
            <feFlood floodColor="rgba(255, 255, 200, 0.8)" result="glowColor1" />
            <feComposite in="glowColor1" in2="offsetBlur1" operator="in" result="glow1" />

            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur2" />
            <feOffset in="blur2" dx="0" dy="0" result="offsetBlur2" />
            <feFlood floodColor="rgba(255, 255, 200, 0.6)" result="glowColor2" />
            <feComposite in="glowColor2" in2="offsetBlur2" operator="in" result="glow2" />

            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur3" />
            <feOffset in="blur3" dx="0" dy="0" result="offsetBlur3" />
            <feFlood floodColor="rgba(255, 255, 200, 0.4)" result="glowColor3" />
            <feComposite in="glowColor3" in2="offsetBlur3" operator="in" result="glow3" />

            <feMerge>
              <feMergeNode in="glow1" />
              <feMergeNode in="glow2" />
              <feMergeNode in="glow3" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The morphing path with fill and stroke */}
        <path
          ref={pathRef}
          d={AGENT_PATHS[0]}
          fill={fillColor}
          stroke={thinking ? "url(#gradient-stroke)" : "none"}
          strokeWidth="0.25"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#glow-shadow)"
        />
      </svg>
    </div>
  );
}

