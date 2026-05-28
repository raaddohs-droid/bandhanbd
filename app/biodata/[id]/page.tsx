import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function BiodataPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !profile) notFound()

  const hasValue = (value: any) => {
    if (value === null || value === undefined) return false
    if (typeof value === 'string') return value.trim() !== '' && value.trim().toLowerCase() !== 'not specified'
    return true
  }

  const showDegree = hasValue(profile.degree) &&
    profile.degree !== profile.education &&
    !['SSC', 'HSC'].includes(profile.education)

  return (
    <html>
      <head>
        <title>Biodata - {profile.full_name}</title>
        <meta charSet="UTF-8" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Arial', sans-serif; background: #fff; color: #1a1a1a; }
          
          .page { max-width: 800px; margin: 0 auto; padding: 40px; }
          
          /* Header */
          .header { background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; padding: 30px; border-radius: 16px; margin-bottom: 24px; display: flex; align-items: center; gap: 24px; }
          .header-photo { width: 120px; height: 120px; border-radius: 12px; border: 4px solid white; object-fit: cover; flex-shrink: 0; }
          .header-photo-placeholder { width: 120px; height: 120px; border-radius: 12px; border: 4px solid white; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 48px; flex-shrink: 0; }
          .header-info h1 { font-size: 28px; font-weight: 900; margin-bottom: 8px; }
          .badges { display: flex; flex-wrap: wrap; gap: 8px; }
          .badge { background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
          
          /* Logo */
          .logo { text-align: center; margin-bottom: 8px; }
          .logo-text { font-size: 14px; color: #7c3aed; font-weight: 700; letter-spacing: 2px; }
          
          /* Watermark */
          .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 80px; color: rgba(124, 58, 237, 0.05); font-weight: 900; pointer-events: none; z-index: 0; white-space: nowrap; }
          
          /* Sections */
          .section { background: #f8f7ff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #7c3aed; }
          .section h2 { font-size: 16px; font-weight: 800; color: #7c3aed; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 1px; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .field { padding: 8px 0; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
          .field:last-child { border-bottom: none; }
          .field-label { color: #6b7280; font-size: 13px; }
          .field-value { font-weight: 600; font-size: 14px; color: #1f2937; text-align: right; }
          .field-full { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .field-full:last-child { border-bottom: none; }
          .field-full .field-label { color: #6b7280; font-size: 13px; margin-bottom: 4px; }
          .field-full .field-value { font-weight: 600; font-size: 14px; color: #1f2937; }
          
          /* About */
          .about-text { font-size: 14px; line-height: 1.7; color: #374151; }
          
          /* Footer */
          .footer { text-align: center; margin-top: 24px; padding: 16px; border-top: 2px solid #e5e7eb; }
          .footer p { font-size: 12px; color: #9ca3af; margin-bottom: 4px; }
          .footer .brand { font-size: 14px; font-weight: 800; color: #7c3aed; }
          
          /* Print button */
          .print-bar { position: fixed; bottom: 20px; right: 20px; z-index: 100; display: flex; gap: 10px; }
          .print-btn { background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(124,58,237,0.4); }
          .back-btn { background: white; color: #7c3aed; border: 2px solid #7c3aed; padding: 12px 24px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; }
          
          @media print {
            .print-bar { display: none !important; }
            .watermark { display: block; }
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          }
        `}</style>
      </head>
      <body>
        <div className="watermark">BIYEKORI.COM</div>

        <div className="print-bar">
          <button className="back-btn" onClick={() => window.history.back()}>← Back</button>
          <button className="print-btn" onClick={() => window.print()}>📥 Save as PDF</button>
        </div>

        <div className="page">

          {/* Logo */}
          <div className="logo">
            <div className="logo-text">✦ BIYEKORI.COM ✦</div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Bangladesh's AI Matrimony Platform</p>
          </div>

          {/* Header */}
          <div className="header">
            {profile.photo_url ? (
              <img src={profile.photo_url} alt={profile.full_name} className="header-photo" />
            ) : (
              <div className="header-photo-placeholder">
                {profile.gender === 'male' ? '👨' : '👩'}
              </div>
            )}
            <div className="header-info">
              <h1>{profile.full_name || 'Anonymous'}</h1>
              <div className="badges">
                {hasValue(profile.age) && <span className="badge">🎂 {profile.age} years</span>}
                {hasValue(profile.religion) && <span className="badge">🕌 {profile.religion}</span>}
                {hasValue(profile.city) && <span className="badge">📍 {profile.city}</span>}
                {hasValue(profile.profession) && <span className="badge">💼 {profile.profession}</span>}
                {profile.nid_verified && <span className="badge">✓ Verified</span>}
              </div>
            </div>
          </div>

          {/* About Me */}
          {hasValue(profile.about_me) && (
            <div className="section">
              <h2>📝 About Me</h2>
              <p className="about-text">{profile.about_me}</p>
            </div>
          )}

          {/* Personal Info */}
          <div className="section">
            <h2>👤 Personal Information</h2>
            <div className="grid-2">
              <div>
                {hasValue(profile.age) && <div className="field"><span className="field-label">Age</span><span className="field-value">{profile.age} years</span></div>}
                {hasValue(profile.height) && <div className="field"><span className="field-label">Height</span><span className="field-value">{profile.height}</span></div>}
                {hasValue(profile.weight) && <div className="field"><span className="field-label">Weight</span><span className="field-value">{profile.weight} kg</span></div>}
                {hasValue(profile.blood_group) && <div className="field"><span className="field-label">Blood Group</span><span className="field-value">{profile.blood_group}</span></div>}
                {hasValue(profile.complexion) && <div className="field"><span className="field-label">Complexion</span><span className="field-value">{profile.complexion}</span></div>}
              </div>
              <div>
                {hasValue(profile.marital_status) && <div className="field"><span className="field-label">Marital Status</span><span className="field-value">{profile.marital_status}</span></div>}
                {hasValue(profile.religion) && <div className="field"><span className="field-label">Religion</span><span className="field-value">{profile.religion}</span></div>}
                {hasValue(profile.sect) && <div className="field"><span className="field-label">Sect</span><span className="field-value">{profile.sect}</span></div>}
                {hasValue(profile.nationality) && <div className="field"><span className="field-label">Nationality</span><span className="field-value">{profile.nationality}</span></div>}
                {hasValue(profile.body_type) && <div className="field"><span className="field-label">Body Type</span><span className="field-value">{profile.body_type}</span></div>}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="section">
            <h2>📍 Location</h2>
            <div className="grid-2">
              <div>
                {hasValue(profile.city) && <div className="field"><span className="field-label">City</span><span className="field-value">{profile.city}</span></div>}
                {hasValue(profile.district) && <div className="field"><span className="field-label">District</span><span className="field-value">{profile.district}</span></div>}
              </div>
              <div>
                {hasValue(profile.country) && <div className="field"><span className="field-label">Country</span><span className="field-value">{profile.country}</span></div>}
                {hasValue(profile.willing_to_relocate) && <div className="field"><span className="field-label">Willing to Relocate</span><span className="field-value">{profile.willing_to_relocate ? 'Yes' : 'No'}</span></div>}
              </div>
            </div>
          </div>

          {/* Education & Career */}
          <div className="section">
            <h2>🎓 Education & Career</h2>
            <div className="grid-2">
              <div>
                {hasValue(profile.education) && <div className="field"><span className="field-label">Education</span><span className="field-value">{profile.education}</span></div>}
                {showDegree && <div className="field"><span className="field-label">Degree</span><span className="field-value">{profile.degree}</span></div>}
                {hasValue(profile.institution) && <div className="field"><span className="field-label">Institution</span><span className="field-value">{profile.institution}</span></div>}
              </div>
              <div>
                {hasValue(profile.profession) && <div className="field"><span className="field-label">Profession</span><span className="field-value">{profile.profession}</span></div>}
                {hasValue(profile.monthly_income) && profile.monthly_income > 0 && <div className="field"><span className="field-label">Monthly Income</span><span className="field-value">৳{Number(profile.monthly_income).toLocaleString()}</span></div>}
              </div>
            </div>
          </div>

          {/* Religious Background */}
          <div className="section">
            <h2>🕌 Religious Background</h2>
            <div className="grid-2">
              <div>
                {hasValue(profile.religious_level) && <div className="field"><span className="field-label">Religious Level</span><span className="field-value">{profile.religious_level}</span></div>}
                {hasValue(profile.prayer_habit) && <div className="field"><span className="field-label">Prayer Habit</span><span className="field-value">{profile.prayer_habit}</span></div>}
              </div>
              <div>
                {hasValue(profile.diet) && <div className="field"><span className="field-label">Diet</span><span className="field-value">{profile.diet}</span></div>}
                {profile.gender === 'female' && <div className="field"><span className="field-label">Wears Hijab</span><span className="field-value">{profile.wears_hijab ? 'Yes' : 'No'}</span></div>}
              </div>
            </div>
          </div>

          {/* Family Background */}
          <div className="section">
            <h2>👨‍👩‍👧‍👦 Family Background</h2>
            <div className="grid-2">
              <div>
                {hasValue(profile.father_profession) && <div className="field"><span className="field-label">Father's Profession</span><span className="field-value">{profile.father_profession}</span></div>}
                {hasValue(profile.mother_profession) && <div className="field"><span className="field-label">Mother's Profession</span><span className="field-value">{profile.mother_profession}</span></div>}
                {hasValue(profile.total_siblings) && <div className="field"><span className="field-label">Total Siblings</span><span className="field-value">{profile.total_siblings}</span></div>}
              </div>
              <div>
                {hasValue(profile.family_type) && <div className="field"><span className="field-label">Family Type</span><span className="field-value">{profile.family_type}</span></div>}
                {hasValue(profile.family_values) && <div className="field"><span className="field-label">Family Values</span><span className="field-value">{profile.family_values}</span></div>}
                {hasValue(profile.family_status) && <div className="field"><span className="field-label">Family Status</span><span className="field-value">{profile.family_status}</span></div>}
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          {(hasValue(profile.hobbies) || hasValue(profile.interests) || hasValue(profile.personality_type)) && (
            <div className="section">
              <h2>🎨 Lifestyle & Personality</h2>
              <div className="grid-2">
                <div>
                  {hasValue(profile.personality_type) && <div className="field"><span className="field-label">Personality</span><span className="field-value">{profile.personality_type}</span></div>}
                  {hasValue(profile.smoking) && <div className="field"><span className="field-label">Smoking</span><span className="field-value">{profile.smoking ? 'Yes' : 'No'}</span></div>}
                </div>
                <div>
                  {hasValue(profile.drinking) && <div className="field"><span className="field-label">Drinking</span><span className="field-value">{profile.drinking ? 'Yes' : 'No'}</span></div>}
                </div>
              </div>
              {hasValue(profile.hobbies) && (
                <div className="field-full" style={{ marginTop: '8px' }}>
                  <div className="field-label">Hobbies</div>
                  <div className="field-value" style={{ textAlign: 'left' }}>{profile.hobbies}</div>
                </div>
              )}
            </div>
          )}

          {/* Partner Expectations */}
          {hasValue(profile.expected_age_min) && (
            <div className="section">
              <h2>💕 Partner Expectations</h2>
              <div className="grid-2">
                <div>
                  <div className="field"><span className="field-label">Expected Age</span><span className="field-value">{profile.expected_age_min} - {profile.expected_age_max} years</span></div>
                  {hasValue(profile.expected_education) && <div className="field"><span className="field-label">Expected Education</span><span className="field-value">{profile.expected_education}</span></div>}
                </div>
                <div>
                  {hasValue(profile.expected_religious_level) && <div className="field"><span className="field-label">Religious Level</span><span className="field-value">{profile.expected_religious_level}</span></div>}
                  {hasValue(profile.expected_family_type) && <div className="field"><span className="field-label">Family Type</span><span className="field-value">{profile.expected_family_type}</span></div>}
                </div>
              </div>
              {hasValue(profile.partner_preference) && (
                <div className="field-full" style={{ marginTop: '8px' }}>
                  <div className="field-label">Partner Preference Details</div>
                  <div className="about-text" style={{ marginTop: '4px' }}>{profile.partner_preference}</div>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="footer">
            <div className="brand">BIYEKORI.COM</div>
            <p>Bangladesh's AI-Powered Matrimony Platform</p>
            <p>This biodata was generated on {new Date().toLocaleDateString('en-BD')} • Profile ID: {profile.id}</p>
            <p style={{ marginTop: '8px', fontSize: '11px' }}>This document is confidential and intended for matrimonial purposes only.</p>
          </div>

        </div>
      </body>
    </html>
  )
}
