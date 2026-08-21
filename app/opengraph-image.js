import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#06070A',
          backgroundImage:
            'radial-gradient(circle at 22% 20%, rgba(255,197,49,0.22), transparent 55%), radial-gradient(circle at 78% 15%, rgba(255,70,85,0.16), transparent 50%), radial-gradient(circle at 50% 90%, rgba(95,208,104,0.14), transparent 50%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 108, fontWeight: 800, letterSpacing: -2 }}>
          <span style={{ color: '#F4F5F8' }}>SMURF</span>
          <span style={{ color: '#FFC531' }}>RANK</span>
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 32, color: '#B8BECF', letterSpacing: 2 }}>
          CS2 · VALORANT · GTA V ACCOUNTS
        </div>
        <div style={{ display: 'flex', marginTop: 40, gap: 16 }}>
          <div style={{ display: 'flex', padding: '14px 28px', borderRadius: 10, background: 'rgba(255,197,49,0.1)', border: '2px solid rgba(255,197,49,0.4)', color: '#FFC531', fontSize: 24, fontWeight: 700 }}>
            Instant Delivery
          </div>
          <div style={{ display: 'flex', padding: '14px 28px', borderRadius: 10, background: 'rgba(244,245,248,0.06)', border: '2px solid rgba(244,245,248,0.18)', color: '#F4F5F8', fontSize: 24, fontWeight: 700 }}>
            Money-Back Guarantee
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
