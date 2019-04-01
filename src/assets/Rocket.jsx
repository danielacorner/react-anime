import React from 'react';
export default ({ className, x, y, width, height }) => (
  <g
    id="rocket"
    className={className}
    width={width}
    height={height}
    transform={`translate(${x},${y})`}
  >
    <path
      d="M32,3c-4.971,0-8,8-8,12V40H40V15C40,11,36.971,3,32,3Z"
      style={{ fill: '#394d5c' }}
    />
    <path
      d="M32,3c-4.291,0-7.318,6.071-7.945,11a16.673,16.673,0,0,1,15.891,0C39.318,9.024,36.279,3,32,3Z"
      style={{ fill: '#7d8d9c' }}
    />
    <circle cx="32" cy="22" r="4" style={{ fill: '#cfdfe8' }} />
    <circle cx="32" cy="33" r="3" style={{ fill: '#cfdfe8' }} />
    <rect x="24" y="40" width="16" height="4" style={{ fill: '#7d8d9c' }} />
    <path
      d="M38,50c0,3.314-6,11-6,11s-6-7.686-6-11a6,6,0,0,1,12,0Z"
      style={{ fill: '#dd3e46' }}
    />
    <path
      d="M35.176,47.176C35.176,48.931,32,54,32,54s-3.176-5.069-3.176-6.824a3.176,3.176,0,0,1,6.352,0Z"
      style={{ fill: '#f3bb59' }}
    />
    <path d="M24,34l-8,6V22a2,2,0,0,1,2-2h6Z" style={{ fill: '#7d8d9c' }} />
    <path d="M40,34l8,6V22a2,2,0,0,0-2-2H40Z" style={{ fill: '#7d8d9c' }} />
    <rect x="19" y="29" width="2" height="8" style={{ fill: '#394d5c' }} />
    <rect x="43" y="29" width="2" height="8" style={{ fill: '#394d5c' }} />
    <rect x="19" y="42" width="2" height="12" style={{ fill: '#cfdfe8' }} />
    <rect x="15" y="44" width="2" height="12" style={{ fill: '#cfdfe8' }} />
    <rect x="43" y="42" width="2" height="12" style={{ fill: '#cfdfe8' }} />
    <rect x="47" y="44" width="2" height="12" style={{ fill: '#cfdfe8' }} />
    <path
      d="M59,8a4,4,0,0,1-4-4,1,1,0,0,0-2,0,4,4,0,0,1-4,4,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0,4,4,0,0,1,4-4,1,1,0,0,0,0-2Zm-5,2.69A6.044,6.044,0,0,0,52.31,9,6.044,6.044,0,0,0,54,7.31,6.044,6.044,0,0,0,55.69,9,6.044,6.044,0,0,0,54,10.69Z"
      style={{ fill: '#73cac2' }}
    />
    <path
      d="M13,14a4,4,0,0,1-4-4,1,1,0,0,0-2,0,4,4,0,0,1-4,4,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0,4,4,0,0,1,4-4,1,1,0,0,0,0-2ZM8,16.69A6.044,6.044,0,0,0,6.31,15,6.044,6.044,0,0,0,8,13.31,6.044,6.044,0,0,0,9.69,15,6.044,6.044,0,0,0,8,16.69Z"
      style={{ fill: '#73cac2' }}
    />
  </g>
);
