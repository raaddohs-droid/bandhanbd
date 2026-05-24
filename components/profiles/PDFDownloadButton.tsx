"use client";
import { useState } from "react";

interface Profile {
  id: string;
  full_name?: string;
  name?: string;
  age: number;
  height: string;
  gender?: string;
  blood_group?: string;
  marital_status?: string;
  current_city?: string;
  city?: string;
  education_level?: string;
  education?: string;
  profession: string;
  monthly_income?: number;
  religion: string;
  religious_practice?: string;
  namaz_frequency?: string;
  quran_ability?: string;
  hijab_preference?: string;
  beard_preference?: string;
  family_type?: string;
  father_profession?: string;
  mother_profession?: string;
  num_siblings?: number;
  about_me?: string;
  looking_for_partner?: string;
  diet_preference?: string;
  smoking?: string;
  drinking?: string;
  favorite_movie_genre?: string;
  music_preference?: string;
  cooking_interest?: string;
  phone?: string;
  email?: string;
  profile_picture?: string;
  created_at?: string;
}

interface PDFDownloadButtonProps {
  profile: Profile;
  isPremium: boolean;
}

export default function PDFDownloadButton({ profile, isPremium }: PDFDownloadButtonProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleDownload = () => {
    if (!isPremium) {
      setShowPaymentModal(true);
      return;
    }
    generatePDF();
  };

  const generatePDF = () => {
    // Open preview modal
    setShowPreview(true);
  };

  const downloadPDFFile = () => {
    // Create PDF content
    const pdfContent = generatePDFContent();
    
    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Biodata_${profile.full_name || profile.name}_BiyeKori.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // User can then print to PDF from browser
    alert('File downloaded! Open it in your browser and use Print > Save as PDF for best quality.');
  };

  const generatePDFContent = () => {
    const name = profile.full_name || profile.name || "Not specified";
    const city = profile.current_city || profile.city || "Not specified";
    const education = profile.education_level || profile.education || "Not specified";

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Matrimonial Biodata - ${name}</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: white;
      color: #1a1a1a;
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      margin: 0 auto;
      background: white;
      position: relative;
    }
    
    .header {
      text-align: center;
      border-bottom: 3px solid #e91e63;
      padding-bottom: 15px;
      margin-bottom: 25px;
    }
    
    .logo {
      font-size: 32px;
      font-weight: 900;
      background: linear-gradient(135deg, #e91e63, #f06292);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 5px;
    }
    
    .tagline {
      color: #666;
      font-size: 12px;
      font-weight: 600;
    }
    
    .verified-badge {
      display: inline-block;
      background: #4caf50;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: bold;
      margin-top: 8px;
    }
    
    .content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .profile-header {
      text-align: center;
      background: linear-gradient(135deg, #fce4ec, #f8bbd0);
      padding: 25px;
      border-radius: 15px;
      margin-bottom: 20px;
    }
    
    .profile-photo {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      border: 5px solid white;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      font-size: 60px;
    }
    
    .profile-name {
      font-size: 28px;
      font-weight: 900;
      color: #c2185b;
      margin-bottom: 8px;
    }
    
    .profile-tagline {
      color: #666;
      font-size: 14px;
    }
    
    .section {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 12px;
      border-left: 4px solid #e91e63;
      page-break-inside: avoid;
    }
    
    .section-title {
      font-size: 16px;
      font-weight: 800;
      color: #c2185b;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    .info-item {
      background: white;
      padding: 12px;
      border-radius: 8px;
    }
    
    .info-label {
      font-size: 11px;
      color: #666;
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .info-value {
      font-size: 14px;
      color: #1a1a1a;
      font-weight: 600;
    }
    
    .bio-text {
      background: white;
      padding: 15px;
      border-radius: 8px;
      line-height: 1.7;
      color: #333;
      font-size: 13px;
    }
    
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #eee;
      color: #666;
      font-size: 12px;
    }
    
    .profile-id {
      background: #fff3e0;
      display: inline-block;
      padding: 8px 15px;
      border-radius: 20px;
      font-weight: 700;
      color: #e65100;
      margin: 10px 0;
    }
    
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 80px;
      color: rgba(233, 30, 99, 0.05);
      font-weight: 900;
      pointer-events: none;
      z-index: 0;
    }
    
    ${!isPremium ? `
    .watermark-text {
      position: fixed;
      bottom: 40mm;
      left: 50%;
      transform: translateX(-50%) rotate(-45deg);
      font-size: 48px;
      color: rgba(255, 152, 0, 0.3);
      font-weight: 900;
      pointer-events: none;
      z-index: 1000;
    }
    ` : ''}
    
    @media print {
      body {
        background: white;
      }
      
      .page {
        margin: 0;
        border: none;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    ${!isPremium ? '<div class="watermark-text">SAMPLE COPY</div>' : ''}
    <div class="watermark">বিয়ে করি</div>
    
    <!-- Header -->
    <div class="header">
      <div class="logo">বিয়ে করি</div>
      <div class="tagline">AI-Verified Matrimonial Profiles</div>
      <div class="verified-badge">✓ 100% Verified Profile</div>
    </div>
    
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-photo">
        ${profile.gender === 'Female' ? '👰' : '🤵'}
      </div>
      <div class="profile-name">${name}</div>
      <div class="profile-tagline">${profile.age} years • ${profile.height} • ${city}</div>
      <div class="profile-id">Profile ID: BK-${new Date().getFullYear()}-${String(profile.id).padStart(4, '0')}</div>
    </div>
    
    <!-- Personal Information -->
    <div class="section">
      <div class="section-title">
        <span>👤</span>
        Personal Information
      </div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Full Name</div>
          <div class="info-value">${name}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Age</div>
          <div class="info-value">${profile.age} years</div>
        </div>
        <div class="info-item">
          <div class="info-label">Height</div>
          <div class="info-value">${profile.height}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Blood Group</div>
          <div class="info-value">${profile.blood_group || 'Not specified'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Marital Status</div>
          <div class="info-value">${profile.marital_status || 'Not specified'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Current City</div>
          <div class="info-value">${city}</div>
        </div>
      </div>
    </div>
    
    <!-- Education & Career -->
    <div class="section">
      <div class="section-title">
        <span>🎓</span>
        Education & Career
      </div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Education</div>
          <div class="info-value">${education}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Profession</div>
          <div class="info-value">${profile.profession}</div>
        </div>
        ${profile.monthly_income ? `
        <div class="info-item">
          <div class="info-label">Monthly Income</div>
          <div class="info-value">৳${profile.monthly_income.toLocaleString()}</div>
        </div>
        ` : ''}
      </div>
    </div>
    
    <!-- Religious Information -->
    <div class="section">
      <div class="section-title">
        <span>🕌</span>
        Religious Information
      </div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Religion</div>
          <div class="info-value">${profile.religion}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Practice Level</div>
          <div class="info-value">${profile.religious_practice || 'Not specified'}</div>
        </div>
        ${profile.namaz_frequency ? `
        <div class="info-item">
          <div class="info-label">Namaz</div>
          <div class="info-value">${profile.namaz_frequency}</div>
        </div>
        ` : ''}
        ${profile.quran_ability ? `
        <div class="info-item">
          <div class="info-label">Quran Reading</div>
          <div class="info-value">${profile.quran_ability}</div>
        </div>
        ` : ''}
        ${profile.hijab_preference ? `
        <div class="info-item">
          <div class="info-label">Hijab</div>
          <div class="info-value">${profile.hijab_preference}</div>
        </div>
        ` : ''}
        ${profile.beard_preference ? `
        <div class="info-item">
          <div class="info-label">Beard</div>
          <div class="info-value">${profile.beard_preference}</div>
        </div>
        ` : ''}
      </div>
    </div>
    
    <!-- Family Background -->
    <div class="section">
      <div class="section-title">
        <span>👨‍👩‍👧‍👦</span>
        Family Background
      </div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Family Type</div>
          <div class="info-value">${profile.family_type || 'Not specified'}</div>
        </div>
        ${profile.father_profession ? `
        <div class="info-item">
          <div class="info-label">Father's Profession</div>
          <div class="info-value">${profile.father_profession}</div>
        </div>
        ` : ''}
        ${profile.mother_profession ? `
        <div class="info-item">
          <div class="info-label">Mother's Profession</div>
          <div class="info-value">${profile.mother_profession}</div>
        </div>
        ` : ''}
        ${profile.num_siblings !== undefined ? `
        <div class="info-item">
          <div class="info-label">Siblings</div>
          <div class="info-value">${profile.num_siblings}</div>
        </div>
        ` : ''}
      </div>
    </div>
    
    <!-- Lifestyle -->
    <div class="section">
      <div class="section-title">
        <span>🌟</span>
        Lifestyle & Habits
      </div>
      <div class="info-grid">
        ${profile.diet_preference ? `
        <div class="info-item">
          <div class="info-label">Diet</div>
          <div class="info-value">${profile.diet_preference}</div>
        </div>
        ` : ''}
        ${profile.smoking ? `
        <div class="info-item">
          <div class="info-label">Smoking</div>
          <div class="info-value">${profile.smoking}</div>
        </div>
        ` : ''}
        ${profile.drinking ? `
        <div class="info-item">
          <div class="info-label">Drinking</div>
          <div class="info-value">${profile.drinking}</div>
        </div>
        ` : ''}
        ${profile.cooking_interest ? `
        <div class="info-item">
          <div class="info-label">Cooking</div>
          <div class="info-value">${profile.cooking_interest}</div>
        </div>
        ` : ''}
      </div>
    </div>
    
    <!-- About Me -->
    ${profile.about_me ? `
    <div class="section">
      <div class="section-title">
        <span>✍️</span>
        About Me
      </div>
      <div class="bio-text">
        ${profile.about_me}
      </div>
    </div>
    ` : ''}
    
    <!-- Looking For -->
    ${profile.looking_for_partner ? `
    <div class="section">
      <div class="section-title">
        <span>💝</span>
        Looking For in Partner
      </div>
      <div class="bio-text">
        ${profile.looking_for_partner}
      </div>
    </div>
    ` : ''}
    
    <!-- Contact Information -->
    <div class="section">
      <div class="section-title">
        <span>📞</span>
        Contact Information
      </div>
      <div class="bio-text">
        ${isPremium ? `
          ${profile.phone ? `<strong>Phone:</strong> ${profile.phone}<br>` : ''}
          ${profile.email ? `<strong>Email:</strong> ${profile.email}<br>` : ''}
          <strong>Online Profile:</strong> www.biyekori.com/profile/${profile.id}
        ` : `
          <strong style="color: #f57c00;">🔒 Upgrade to Premium to view contact details</strong><br>
          Visit www.biyekori.com to unlock full contact information
        `}
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <strong>বিয়ে করি (Biye Kori)</strong><br>
      AI-Verified Matrimonial Platform<br>
      www.biyekori.com • contact@biyekori.com<br>
      <br>
      Generated on ${new Date().toLocaleDateString('en-GB')}
      ${!isPremium ? '<br><strong style="color: #f57c00;">Sample Copy - Upgrade for Full Access</strong>' : ''}
    </div>
  </div>
</body>
</html>
    `;
  };

  return (
    <>
      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <span>📄</span>
        <span>Download PDF Biodata</span>
        {!isPremium && <span className="text-xs">(৳99)</span>}
      </button>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-6 flex items-center justify-between">
              <h3 className="text-2xl font-black">PDF Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div 
                dangerouslySetInnerHTML={{ __html: generatePDFContent() }}
                className="bg-gray-100 p-4 rounded-lg"
              />
            </div>
            
            <div className="p-6 border-t-2 border-gray-100 flex gap-3">
              <button
                onClick={downloadPDFFile}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                ⬇️ Download PDF
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal for Free Users */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 p-6">
              <h3 className="text-2xl font-black mb-2">Download PDF Biodata</h3>
              <p className="text-sm">Choose your option</p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Option 1: One-time payment */}
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-rose-500 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg">One-Time Download</h4>
                  <span className="text-2xl font-black text-rose-600">৳99</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Download this biodata PDF once
                </p>
                <button className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                  Pay ৳99 via bKash
                </button>
              </div>

              {/* Option 2: Premium */}
              <div className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">⭐</span>
                  <h4 className="font-bold text-lg">Premium Membership</h4>
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2">
                  ৳699<span className="text-sm font-normal text-gray-600">/month</span>
                </div>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Unlimited PDF downloads
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Browse all profiles
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Send unlimited interests
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    View contact details
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    AI compatibility matching
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                  Upgrade to Premium
                </button>
              </div>

              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}