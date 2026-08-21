import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#06070A',
          borderRadius: 7,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
          <path
            d="M32 5 L38 24 L58 24 L42 36 L48 55 L32 43 L16 55 L22 36 L6 24 L26 24 Z"
            fill="#FFC531"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
