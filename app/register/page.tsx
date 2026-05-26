"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AIPhotoCropper from '@/components/profiles/AIPhotoCropper';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // Step 1: Photo + Looking For
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [lookingFor, setLookingFor] = useState<'bride' | 'groom' | ''>('');
  
  // Step 2: Basic Info
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [education, setEducation] = useState('');
  const [profession, setProfession] = useState('');
  
  // Step 3: Contact + OTP
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhotoSelect = (file: File) => {
    setSelectedPhoto(file);
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length !== 11) {
      alert('Please enter a valid 11-digit phone number');
      return;
    }

    setLoading(true);
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(generatedOtp);

    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.startsWith('0') ? `+880${phone.substring(1)}` : `+880${phone}`,
          message: `Your Biyekori OTP is: ${generatedOtp}`
        })
      });

      const data = await response.json();
      if (data.success) {
        alert(`OTP sent to ${phone}! Check your SMS.`);
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      alert('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === sentOtp) {
      setOtpVerified(true);
      alert('✅ Phone verified successfully!');
    } else {
      alert('❌ Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!otpVerified) {
      alert('Please verify your phone number first');
      return;
    }

    setLoading(true);

    try {
      // Upload photo to Supabase storage
      let photoUrl = '';
      if (selectedPhoto) {
        const formData = new FormData();
        formData.append('file', selectedPhoto);

        const uploadResponse = await fetch('/api/upload-photo', {
          method: 'POST',
          body: formData
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          photoUrl = uploadData.url;
        }
      }

      // Register user
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          age: parseInt(age),
          city,
          education,
          profession,
          phone,
          email,
          password,
          looking_for: lookingFor,
          gender: lookingFor === 'bride' ? 'male' : 'female',
          photo_url: photoUrl,
          package: 'prottasha',
          phone_verified: true
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('🎉 Registration successful! Please login.');
        router.push('/login');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      alert('Registration error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-24 h-1 mx-2 ${step > s ? 'bg-rose-500' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-bold text-gray-600">
            <span>Photo & Preference</span>
            <span>Basic Info</span>
            <span>Contact & Verify</span>
          </div>
        </div>

        {/* Step 1: Photo + Looking For */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Upload Your Photo</h2>
            
            <div className="mb-6">
              <AIPhotoCropper 
                onPhotoSelect={handlePhotoSelect}
                uploadCount={0}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3">
                আপনি খুঁজছেন / You are looking for:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setLookingFor('bride')}
                  className={`py-4 px-6 rounded-xl font-bold transition ${
                    lookingFor === 'bride'
                      ? 'bg-rose-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  পাত্রী (Bride)
                </button>
                <button
                  onClick={() => setLookingFor('groom')}
                  className={`py-4 px-6 rounded-xl font-bold transition ${
                    lookingFor === 'groom'
                      ? 'bg-rose-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  পাত্র (Groom)
                </button>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedPhoto || !lookingFor}
              className={`w-full py-4 rounded-xl font-bold transition ${
                selectedPhoto && lookingFor
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2: Basic Info */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="18"
                    max="80"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
                    placeholder="Age"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
                    placeholder="Your city"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Education</label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none bg-white text-gray-900"
                  required
                >
                  <option value="">Select Education</option>
                  <option value="SSC">SSC</option>
                  <option value="HSC">HSC</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                  <option value="MBBS/Medical">MBBS/Medical</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Profession</label>
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none bg-white text-gray-900"
                  required
                >
                  <option value="">Select Profession</option>
                  <option value="Student">Student</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Business">Business</option>
                  <option value="Banker">Banker</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Government Job">Government Job</option>
                  <option value="Private Job">Private Job</option>
                  <option value="Homemaker">Homemaker</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!fullName || !age || !city || !education || !profession}
                className={`flex-1 py-4 rounded-xl font-bold ${
                  fullName && age && city && education && profession
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact + OTP */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Contact & Verification</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01733577215"
                    maxLength={11}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
                    required
                  />
                  <button
                    onClick={handleSendOtp}
                    disabled={loading || otpVerified}
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 disabled:bg-gray-300"
                  >
                    {loading ? '...' : 'Send OTP'}
                  </button>
                </div>
              </div>

              {sentOtp && !otpVerified && (
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Enter OTP</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit OTP"
                      maxLength={6}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
                    />
                    <button
                      onClick={handleVerifyOtp}
                      className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              {otpVerified && (
                <div className="p-4 bg-green-50 border-2 border-green-500 rounded-xl">
                  <p className="text-green-900 font-bold">✅ Phone verified!</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!otpVerified || !email || !password || loading}
                className={`flex-1 py-4 rounded-xl font-bold ${
                  otpVerified && email && password && !loading
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}