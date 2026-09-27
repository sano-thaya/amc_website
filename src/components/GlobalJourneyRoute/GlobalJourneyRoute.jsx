import { useEffect, useRef, useState, useCallback } from 'react';
import './GlobalJourneyRoute.css';

/* ----------------------------------------------------------------
   Section waypoint configuration
   xRatio: horizontal position as fraction of container width
   yRatio: vertical position as fraction of that section's height
---------------------------------------------------------------- */
const WAYPOINT_CONFIGS = [
  { id: 'home-start',   sectionId: 'home',         label: '01', xRatio: 0.12, yRatio: 0.60 },
  { id: 'about',        sectionId: 'about',         label: '02', xRatio: 0.80, yRatio: 0.50 },
  { id: 'services',     sectionId: 'services',      label: '03', xRatio: 0.18, yRatio: 0.50 },
  { id: 'packages',     sectionId: 'packages',      label: '04', xRatio: 0.82, yRatio: 0.50 },
  { id: 'destinations', sectionId: 'destinations',  label: '05', xRatio: 0.18, yRatio: 0.50 },
  { id: 'insurance',    sectionId: 'insurance',     label: '06', xRatio: 0.80, yRatio: 0.45 },
  { id: 'contact',      sectionId: 'contact',       label: '07', xRatio: 0.50, yRatio: 0.40 },
];

export default function GlobalJourneyRoute({ containerRef }) {
  const svgRef          = useRef(null);
  const basePathRef     = useRef(null);   // solid ghost / guide path (always visible, dim)
  const activePathRef   = useRef(null);   // scroll-drawn solid stroke
  const planeRef        = useRef(null);
  const pathLengthRef   = useRef(0);
  const rafIdRef        = useRef(null);

  const [waypoints,        setWaypoints]        = useState([]);
  const [pathData,         setPathData]         = useState('');
  const [activeSectionId,  setActiveSectionId]  = useState('home');
  const [isReducedMotion,  setIsReducedMotion]  = useState(false);

  /* ── reduced-motion ──────────────────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const onChange = (e) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* ── route computation ───────────────────────────────────────── */
  const calculateRoute = useCallback(() => {
    if (!containerRef?.current || !svgRef.current) return;

    const container     = containerRef.current;
    const containerTop  = container.getBoundingClientRect().top + window.scrollY;
    const cw            = container.offsetWidth;
    const ch            = container.offsetHeight;

    if (ch === 0 || cw === 0) return;

    const isMobile = cw < 768;

    const pts = [];

    WAYPOINT_CONFIGS.forEach((cfg) => {
      const el = document.getElementById(cfg.sectionId);
      if (!el) return;

      const rect      = el.getBoundingClientRect();
      const elTop     = rect.top + window.scrollY - containerTop;
      const elHeight  = rect.height;

      const y = Math.max(40, Math.min(elTop + elHeight * cfg.yRatio, ch - 40));

      let xRatio = cfg.xRatio;
      if (isMobile) {
        if (cfg.id === 'contact') xRatio = 0.50;
        else xRatio = cfg.xRatio < 0.5 ? 0.14 : 0.86;
      }

      pts.push({
        id:        cfg.id,
        sectionId: cfg.sectionId,
        label:     cfg.label,
        x:         Math.round(cw * xRatio),
        y,
      });
    });

    if (pts.length < 2) return;

    /* Smooth cubic Bézier spline through all waypoints */
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const dy = p1.y - p0.y;
      d += ` C ${p0.x} ${p0.y + dy * 0.5}, ${p1.x} ${p1.y - dy * 0.5}, ${p1.x} ${p1.y}`;
    }

    setPathData(d);
    setWaypoints(pts);
  }, [containerRef]);

  /* ── recalculate on resize / layout-shift ────────────────────── */
  useEffect(() => {
    calculateRoute();

    window.addEventListener('resize', calculateRoute, { passive: true });

    const ro = new ResizeObserver(calculateRoute);
    if (containerRef?.current) ro.observe(containerRef.current);

    const t1 = setTimeout(calculateRoute, 400);
    const t2 = setTimeout(calculateRoute, 1400);

    return () => {
      window.removeEventListener('resize', calculateRoute);
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [calculateRoute, containerRef]);

  /* ── measure total path length after path renders ────────────── */
  useEffect(() => {
    if (!activePathRef.current || !pathData) return;

    const len = activePathRef.current.getTotalLength();
    pathLengthRef.current = len;
    activePathRef.current.style.strokeDasharray  = `${len}`;
    activePathRef.current.style.strokeDashoffset = isReducedMotion ? '0' : `${len}`;
  }, [pathData, isReducedMotion]);

  /* ── scroll → draw route + move plane ───────────────────────── */
  useEffect(() => {
    if (isReducedMotion) return;

    let busy = false;

    const update = () => {
      if (!containerRef?.current || !activePathRef.current) { busy = false; return; }

      const container    = containerRef.current;
      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const ch           = container.offsetHeight;
      const vh           = window.innerHeight;
      const sy           = window.scrollY;

      const maxScroll  = Math.max(ch - vh, 1);
      const scrolled   = Math.max(0, sy - containerTop);
      const progress   = Math.min(scrolled / maxScroll, 1);
      const totalLen   = pathLengthRef.current;

      if (totalLen > 0) {
        /* Solid line draws progressively */
        activePathRef.current.style.strokeDashoffset = `${totalLen * (1 - progress)}`;

        /* Airplane */
        if (planeRef.current) {
          const dist     = progress * totalLen;
          const pt       = activePathRef.current.getPointAtLength(dist);
          const ptAhead  = activePathRef.current.getPointAtLength(Math.min(dist + 5, totalLen));
          const ptBehind = activePathRef.current.getPointAtLength(Math.max(dist - 5, 0));
          const angle    = Math.atan2(ptAhead.y - ptBehind.y, ptAhead.x - ptBehind.x) * (180 / Math.PI);

          planeRef.current.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) rotate(${angle + 90}deg)`;
          planeRef.current.style.opacity   = '1';
        }
      }

      /* Active section detection */
      const focusY = sy + vh * 0.42;
      let   active = waypoints[0]?.sectionId ?? 'home';
      for (const wp of waypoints) {
        const el = document.getElementById(wp.sectionId);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (sy + rect.top + window.scrollY - containerTop <= focusY) active = wp.sectionId;
      }
      setActiveSectionId(active);

      busy = false;
    };

    const onScroll = () => {
      if (!busy) { busy = true; rafIdRef.current = requestAnimationFrame(update); }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial paint

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [containerRef, isReducedMotion, waypoints]);

  if (!pathData) return null;

  const cw = containerRef?.current?.offsetWidth ?? 1280;

  return (
    <div className="global-journey" aria-hidden="true">
      <svg ref={svgRef} className="global-journey__svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gjGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#2985D8" stopOpacity="1" />
            <stop offset="50%"  stopColor="#1A6DC0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0D3B6E" stopOpacity="0.85" />
          </linearGradient>

          <filter id="gjGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite   in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="mjGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite   in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. Ghost / guide path (solid, very dim) ─────────── */}
        <path
          ref={basePathRef}
          d={pathData}
          fill="none"
          stroke="rgba(26, 109, 192, 0.15)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="global-journey__base-path"
        />

        {/* ── 2. Scroll-drawn solid animated route ─────────────── */}
        <path
          ref={activePathRef}
          d={pathData}
          fill="none"
          stroke="url(#gjGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#gjGlow)"
          className="global-journey__active-path"
        />

        {/* ── 3. Waypoint markers ───────────────────────────────── */}
        {waypoints.map((wp) => {
          const isActive    = activeSectionId === wp.sectionId;
          const isRightSide = wp.x > cw * 0.5;

          return (
            <g
              key={wp.id}
              className={`global-journey__waypoint${isActive ? ' is-active' : ''}`}
              transform={`translate(${wp.x}, ${wp.y})`}
            >
              {/* pulsing ring */}
              {isActive && !isReducedMotion && (
                <circle
                  r="14"
                  fill="none"
                  stroke="rgba(26,109,192,0.45)"
                  strokeWidth="1.5"
                  className="global-journey__pulse-ring"
                />
              )}

              {/* outer dot */}
              <circle
                r={isActive ? 8 : 4.5}
                fill={isActive ? '#1A6DC0' : 'rgba(255,255,255,0.95)'}
                stroke={isActive ? '#ffffff' : 'rgba(26,109,192,0.6)'}
                strokeWidth={isActive ? '2' : '1.5'}
                filter={isActive ? 'url(#mjGlow)' : undefined}
                className="global-journey__dot"
              />

              {/* inner core */}
              <circle r={isActive ? 3.5 : 2} fill={isActive ? '#ffffff' : '#1A6DC0'} />

              {/* label */}
              <text
                x={isRightSide ? -14 : 14}
                y="4"
                textAnchor={isRightSide ? 'end' : 'start'}
                className={`global-journey__label${isActive ? ' is-active' : ''}`}
              >
                {wp.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ── 4. Animated airplane ─────────────────────────────────── */}
      {!isReducedMotion && (
        <div ref={planeRef} className="global-journey__plane-container" aria-hidden="true">
          <div className="global-journey__plane-wrapper">
            <svg className="global-journey__plane-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="#1A6DC0"
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </svg>
            <div className="global-journey__plane-trail" />
          </div>
        </div>
      )}
    </div>
  );
}
