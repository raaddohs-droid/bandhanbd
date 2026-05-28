import Link from "next/link"
import LogoWrapper from "@/components/LogoWrapper"

export default function Home() {
  return (
    <main style={{ fontFamily: "'Georgia', serif", background: '#080604', color: '#FDF6EE', overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', height: '60px',
        background: 'rgba(8,6,4,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(240,192,64,0.08)'
      }}>
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#F0C040', letterSpacing: '3px' }}>BIYEKORI</span>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          {['Profiles', 'Pricing', 'About'].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} style={{ color: 'rgba(253,246,238,0.45)', fontSize: '13px', textDecoration: 'none', letterSpacing: '1.5px' }}>
              {l.toUpperCase()}
            </Link>
          ))}
          <Link href="/register" style={{ padding: '8px 24px', border: '1px solid rgba(240,192,64,0.5)', borderRadius: '4px', color: '#F0C040', fontSize: '13px', textDecoration: 'none', letterSpacing: '1.5px' }}>
            JOIN
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 80px', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        {/* ambient glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(192,120,0,0.07) 0%,transparent 65%)', pointerEvents: 'none' }}/>

        {/* BIG single-line headline */}
        <h1 style={{
          fontSize: 'clamp(36px, 5.5vw, 80px)', fontWeight: 700,
          color: '#FDF6EE', margin: '0 0 64px', lineHeight: 1,
          letterSpacing: '-2px', position: 'relative', zIndex: 2,
          whiteSpace: 'nowrap'
        }}>
          Your person is out there.
        </h1>

        {/* animated rings */}
        <div style={{ width: '100%', minHeight: '280px', marginBottom: '64px', position: 'relative', zIndex: 2, overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LogoWrapper />
        </div>

        {/* Bangla pair — bright gold, same weight */}
        <p style={{
          fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: 700,
          color: '#F0C040', margin: '0 0 10px',
          letterSpacing: '3px', position: 'relative', zIndex: 2
        }}>
          বিয়ে করি ম্যাট্রিমনি
        </p>
        <p style={{
          fontSize: 'clamp(15px, 1.6vw, 20px)',
          color: '#F0C040', margin: '0 0 64px',
          fontStyle: 'italic', letterSpacing: '2px',
          position: 'relative', zIndex: 2
        }}>
          মনের মানুষ পাবেই তুমি
        </p>

        {/* CTA */}
        <Link href="/register" style={{
          display: 'inline-block', padding: '18px 64px',
          background: 'linear-gradient(135deg, #F0C040, #C07800)',
          color: '#080604', fontSize: '14px', fontWeight: 700,
          textDecoration: 'none', borderRadius: '4px',
          letterSpacing: '3px', position: 'relative', zIndex: 2,
          marginBottom: '24px'
        }}>
          JOIN FREE
        </Link>

        <p style={{ fontSize: '11px', color: 'rgba(253,246,238,0.15)', letterSpacing: '2.5px', margin: 0, position: 'relative', zIndex: 2 }}>
          570+ PROFILES · AI MATCHMAKING · NO CREDIT CARD
        </p>

        {/* scroll hint */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.25 }}>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, transparent, #F0C040)' }}/>
          <span style={{ fontSize: '10px', letterSpacing: '3px', color: '#F0C040' }}>SCROLL</span>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section style={{ padding: '120px 80px', textAlign: 'center', borderTop: '1px solid rgba(240,192,64,0.06)' }}>
        <p style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, color: '#FDF6EE', lineHeight: 1.3, maxWidth: '900px', margin: '0 auto', letterSpacing: '-0.5px' }}>
          Not just a matrimony site.<br/>
          <span style={{ color: '#F0C040' }}>Bangladesh's first AI-powered</span><br/>
          match engine.
        </p>
      </section>

      {/* ── FEATURES ── */}
      {[
        { num: '01', title: 'AI Match Score', sub: 'Compatibility, calculated.', body: 'Our algorithm analyses religion, education, location, personality, family values and 3 more factors — giving every pair a score out of 100. No guessing. No bias.' },
        { num: '02', title: 'Predictability Score', sub: 'Know before you reach out.', body: 'Every profile gets a trust score based on completeness, NID verification, photo quality and more. You see exactly how reliable a profile is before sending interest.' },
        { num: '03', title: 'Who Viewed Me', sub: 'Full visibility.', body: 'See every person who visited your profile — with photo, name and city. Premium members get the full list. Free members see a blurred preview.' },
        { num: '04', title: 'PDF Biodata', sub: 'Share with family instantly.', body: 'Generate a beautifully designed biodata PDF in one click. Perfect for sharing with parents, relatives or community elders the traditional way.' },
      ].map(({ num, title, sub, body }) => (
        <section key={num} style={{
          padding: '100px 120px',
          display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px',
          alignItems: 'center', maxWidth: '1200px', margin: '0 auto',
          borderTop: '1px solid rgba(240,192,64,0.06)'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(240,192,64,0.3)', letterSpacing: '3px', marginBottom: '20px' }}>{num}</div>
            <h2 style={{ fontSize: 'clamp(26px, 2.5vw, 40px)', fontWeight: 700, color: '#FDF6EE', margin: '0 0 10px', lineHeight: 1.1 }}>{title}</h2>
            <p style={{ fontSize: '17px', color: '#F0C040', margin: 0, fontStyle: 'italic' }}>{sub}</p>
          </div>
          <p style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', color: 'rgba(253,246,238,0.4)', lineHeight: 1.9, margin: 0 }}>{body}</p>
        </section>
      ))}

      {/* ── FINAL CTA ── */}
      <section style={{
        height: '80vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        borderTop: '1px solid rgba(240,192,64,0.06)',
        textAlign: 'center', padding: '0 24px', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(192,120,0,0.07) 0%,transparent 70%)', pointerEvents: 'none' }}/>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(240,192,64,0.35)', marginBottom: '32px' }}>START YOUR JOURNEY</p>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700, color: '#FDF6EE', margin: '0 0 16px', lineHeight: 1.15, letterSpacing: '-0.5px' }}>
          বিয়ে করি ম্যাট্রিমনি
        </h2>
        <p style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', color: '#F0C040', fontStyle: 'italic', margin: '0 0 56px', letterSpacing: '1px' }}>
          মনের মানুষ পাবেই তুমি
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/register" style={{ padding: '18px 56px', background: 'linear-gradient(135deg,#F0C040,#C07800)', color: '#080604', fontSize: '14px', fontWeight: 700, textDecoration: 'none', borderRadius: '4px', letterSpacing: '2px' }}>
            JOIN FREE
          </Link>
          <Link href="/profiles" style={{ padding: '18px 56px', border: '1px solid rgba(240,192,64,0.3)', color: 'rgba(253,246,238,0.5)', fontSize: '14px', textDecoration: 'none', borderRadius: '4px', letterSpacing: '2px' }}>
            BROWSE
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '40px 60px', borderTop: '1px solid rgba(240,192,64,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#F0C040', letterSpacing: '3px' }}>BIYEKORI</span>
        <span style={{ fontSize: '12px', color: 'rgba(253,246,238,0.2)', letterSpacing: '1px' }}>© 2026 BIYEKORI · BANGLADESH'S AI MATRIMONY</span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Pricing', 'Profiles', 'Register', 'Login'].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: '12px', color: 'rgba(253,246,238,0.25)', textDecoration: 'none', letterSpacing: '1px' }}>
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </footer>

    </main>
  )
}
