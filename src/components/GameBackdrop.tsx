import { useId } from 'react';

/** A decorative, CSS-animated level behind the shared page content. */
export function GameBackdrop() {
  const id = useId();

  return <div className="game-backdrop" aria-hidden="true">
    <div className="game-backdrop-grid" />
    <svg className="game-backdrop-world" viewBox="0 0 1600 700" fill="none" focusable="false">
      <defs>
        <pattern id={`${id}-tiles`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" stroke="#71856b" strokeOpacity=".14" />
          <path d="M5 6h5M6 5v5" stroke="#71856b" strokeOpacity=".12" />
        </pattern>
        <g id={`${id}-pine`}>
          <path d="M24 0h8v16h8v16h8v16h8v8H0v-8h8V32h8V16h8Z" fill="currentColor" />
          <path d="M24 56h8v16h-8Z" fill="currentColor" />
          <path d="M24 16h8v16h8v16h8v8H24Z" fill="#f5f3ec" opacity=".22" />
        </g>
        <g id={`${id}-cloud`}>
          <path d="M0 24h16V8h24V0h32v8h16v16h24v16H0Z" fill="currentColor" />
          <path d="M16 40h80v8H16Z" fill="currentColor" opacity=".45" />
        </g>
      </defs>

      {/* Stepped sun and clouds keep the original warm paper palette. */}
      <g className="game-world-sun" fill="#c98a63">
        <path d="M1360 64h64v8h16v16h8v64h-8v16h-16v8h-64v-8h-16v-16h-8V88h8V72h16Z" opacity=".16" />
        <path d="M1376 88h32v8h16v16h8v24h-8v16h-16v8h-32v-8h-16v-16h-8v-24h8V96h16Z" opacity=".12" />
      </g>
      <g color="#d1d8c8" opacity=".52">
        <use href={`#${id}-cloud`} x="64" y="116" />
        <use href={`#${id}-cloud`} x="1160" y="56" />
        <use href={`#${id}-cloud`} x="1464" y="228" />
      </g>

      {/* Three terrain depths: distant peaks, foothills, and tiled platforms. */}
      <path d="M0 428h48v-32h32v-48h32v-32h32v-48h32v-32h32v48h32v32h32v48h48v32h48v48h64v32h96v-32h64v-32h64v-32h48v32h48v32h64v-48h48v-48h32v-48h32v-32h32v-48h32v48h32v32h32v48h48v48h64v32h64v-48h48v-48h32v-48h32v-48h32v-32h32v-32h32v48h32v32h32v48h32v48h48v32h64v-32h64v-32h64v332H0Z" fill="#dfe4d7" opacity=".68" />
      <path d="M0 516h64v-32h64v32h64v32h96v32h112v32h160v-16h96v-32h112v-32h96v32h96v32h112v-32h64v-32h64v-48h64v-32h64v32h64v32h64v32h80v-32h64v-32h80v216H0Z" fill="#c9d4c0" opacity=".48" />

      <g className="game-world-platforms">
        <path d="M0 572h96v16h64v32h64v80H0Z M1296 620h64v-32h96v-32h80v16h64v128h-304Z" fill="#c2ceb7" opacity=".7" />
        <path d="M0 572h96v16h64v32h64v80H0Z M1296 620h64v-32h96v-32h80v16h64v128h-304Z" fill={`url(#${id}-tiles)`} />
        <path d="M0 572h96v16h64v32h64 M1296 620h64v-32h96v-32h80v16h64" stroke="#9fae91" strokeOpacity=".5" strokeWidth="4" />
        <g color="#a7b69a" opacity=".63">
          <use href={`#${id}-pine`} x="16" y="500" />
          <use href={`#${id}-pine`} x="1472" y="484" />
          <use href={`#${id}-pine`} x="1536" y="500" />
        </g>
        <path d="M1392 588v-88" stroke="#a58a71" strokeOpacity=".62" strokeWidth="4" />
        <path d="M1394 500h40v8h-8v8h-8v8h-24Z" fill="#b96b53" opacity=".6" />
      </g>

      {/* An optional route: floating tiles, a collectible, and a save flag. */}
      <g className="game-world-island" opacity=".58">
        <path d="M1280 352h96v16h-16v16h-16v16h-32v-16h-16v-16h-16Z" fill="#b4c2a7" />
        <path d="M1280 352h96v8h-96Z" fill="#8d9f7d" />
        <path d="M1320 284h16v8h8v16h-8v8h-16v-8h-8v-16h8Z" fill="#c19555" />
        <path d="M1324 292h8v16h-8Z" fill="#f5f3ec" opacity=".7" />
        <path d="M1456 416h64v8h-8v16h-16v8h-16v-8h-16v-16h-8Z" fill="#bdc9b2" />
        <path d="M1456 416h64v8h-64Z" fill="#9aaa8c" />
      </g>
    </svg>
    <div className="game-backdrop-wash" />
    <span className="game-spark game-spark-one" />
    <span className="game-spark game-spark-two" />
    <span className="game-spark game-spark-three" />
    <span className="game-spark game-spark-four" />
    <span className="game-corner game-corner-top" />
    <span className="game-corner game-corner-bottom" />
  </div>;
}
