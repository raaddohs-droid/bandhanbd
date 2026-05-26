"use client";
import { useState } from "react";
import Link from "next/link";

interface Profile {
  id: string;
  lookingFor?: "bride" | "groom";
  full_name?: string;
  name?: string;
  age: number;
  height: string;
  location?: string;
  city?: string;
  education: string;
  profession: string;
  monthlyIncome?: number;
  monthly_income?: number;
  religion: string;
  maritalStatus?: string;
  marital_status?: string;
  photoUrl?: string;
  photo_url?: string;
  isVerified?: boolean;
  is_verified?: boolean;
  isPremium?: boolean;
  is_premium?: boolean;
  package?: string;
  phone?: string;
  email?: string;
}

export default function ProfileCard({ profile }: { profile: Profile }) {
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const [interestSent, setInterestSent] = useState(false);

  const name = profile.full_name || profile.name || "Anonymous";
  const location = profile.location || profile.city || "Bangladesh";
  const maritalStatus = profile.maritalStatus || profile.marital_status || "Not specified";
  
  // CRITICAL FIX: Get photo URL with fallback
  const photoUrl = profile.photo_url || profile.photoUrl;
  
  const isVerified = profile.isVerified || profile.is_verified || false;
  const isPremium = profile.isPremium || profile.is_premium || profile.package !== 'prottasha';
  const monthlyIncome = profile.monthlyIncome || profile.monthly_income;

  const isUserFree = true;
  const isUserVerified = false;
  const canViewContact = isUserVerified || !isUserFree;

  const handleSendInterest = () => {
    setInterestSent(true);
    alert('💌 Interest sent successfully!\n\nThey will be notified. If they accept, you can view their full profile and contact details!');
  };

  const handleSendGift = (gift: string, price: number) => {
    alert(`🎁 Send ${gift} for ৳${price}?\n\nThis feature requires premium membership!\n\nUpgrade now to send virtual gifts and stand out!`);
    setShowGiftMenu(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      
      {isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ PREMIUM
          </div>
        </div>
      )}

      {isVerified && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ✓ VERIFIED
          </div>
        </div>
      )}

      {/* Photo Section - FIXED */}
      <div className="relative h-80 bg-gradient-to-br from-rose-50 to-pink-50 overflow-hidden">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+👤PC90ZXh0Pjwvc3ZnPg==';
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-8xl">👤</div>
          </div>
        )}
        
        {isUserFree && (
          <div className="absolute inset-0 backdrop-blur-[2px] bg-white/10 flex items-center justify-center">
            <div className="bg-black/80 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-xl">
              🔒 Send Interest to Unlock
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        
        <div className="mb-4">
          <h3 className="text-2xl font-black text-gray-900 mb-2">
            {isUserFree ? name.charAt(0) + "***" : name}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
            <span className="flex items-center gap-1">🎂 {profile.age} years</span>
            <span className="flex items-center gap-1">📏 {profile.height}</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
              {maritalStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">📍 Location</p>
            <p className="font-bold text-gray-900 text-sm">{location}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">🎓 Education</p>
            <p className="font-bold text-gray-900 text-sm">{profile.education}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">💼 Profession</p>
            <p className="font-bold text-gray-900 text-sm">{profile.profession}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">🕌 Religion</p>
            <p className="font-bold text-gray-900 text-sm">{profile.religion}</p>
          </div>
        </div>

        {monthlyIncome && (
          <div className="bg-green-50 p-4 rounded-xl mb-4 relative overflow-hidden">
            <p className="text-xs text-green-700 mb-1 font-bold">💰 Monthly Income</p>
            <p className="text-lg font-black text-green-900">
              {isUserFree ? '৳ ****' : `৳${monthlyIncome.toLocaleString()}`}
            </p>
            {isUserFree && (
              <div className="absolute inset-0 backdrop-blur-sm bg-white/60 flex items-center justify-center rounded-xl">
                <span className="text-xs font-bold text-gray-700">🔒 Premium Only</span>
              </div>
            )}
          </div>
        )}

        {!canViewContact && (
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-4">
            <p className="text-sm font-bold text-red-900 mb-2">
              🔒 Contact Details Locked
            </p>
            <p className="text-xs text-red-800 mb-3">
              Verify your NID or upgrade to premium to unlock phone & email
            </p>
            <Link 
              href="/verify"
              className="block w-full px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-bold text-center hover:shadow-lg transition text-sm"
            >
              Verify NID to Unlock
            </Link>
          </div>
        )}

        {canViewContact && profile.phone && (
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold text-green-900 mb-2">📞 Contact Details</p>
            <p className="text-sm text-green-800">
              <strong>Phone:</strong> {profile.phone}
            </p>
            {profile.email && (
              <p className="text-sm text-green-800 mt-1">
                <strong>Email:</strong> {profile.email}
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          
          {!interestSent ? (
            <button 
              onClick={handleSendInterest}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 px-4 rounded-xl font-bold text-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              💌 Send Interest
            </button>
          ) : (
            <div className="w-full bg-green-100 border-2 border-green-500 text-green-800 py-4 px-4 rounded-xl font-bold text-sm text-center">
              ✓ Interest Sent! Waiting for response...
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Link 
              href={`/profile/${profile.id}`}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-1"
            >
              👁️ View Full Profile
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setShowGiftMenu(!showGiftMenu)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl font-bold text-sm hover:shadow-lg transition-all"
              >
                🎁 Send Gift
              </button>
              
              {showGiftMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-2xl border-2 border-pink-200 p-3 w-64 z-20">
                  <p className="text-xs font-bold text-gray-900 mb-3">Send Virtual Gift 🎁</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSendGift('Single Rose 🌹', 50)}
                      className="w-full text-left px-3 py-2 hover:bg-pink-50 rounded-lg text-sm flex items-center justify-between"
                    >
                      <span>🌹 Single Rose</span>
                      <span className="font-bold text-rose-600">৳50</span>
                    </button>
                    <button
                      onClick={() => handleSendGift('Bouquet 💐', 150)}
                      className="w-full text-left px-3 py-2 hover:bg-pink-50 rounded-lg text-sm flex items-center justify-between"
                    >
                      <span>💐 Bouquet</span>
                      <span className="font-bold text-rose-600">৳150</span>
                    </button>
                    <button
                      onClick={() => handleSendGift('Love Card 💌', 100)}
                      className="w-full text-left px-3 py-2 hover:bg-pink-50 rounded-lg text-sm flex items-center justify-between"
                    >
                      <span>💌 Love Card</span>
                      <span className="font-bold text-rose-600">৳100</span>
                    </button>
                    <button
                      onClick={() => handleSendGift('Heart Gift 💝', 200)}
                      className="w-full text-left px-3 py-2 hover:bg-pink-50 rounded-lg text-sm flex items-center justify-between"
                    >
                      <span>💝 Heart Gift</span>
                      <span className="font-bold text-rose-600">৳200</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setShowGiftMenu(false)}
                    className="w-full mt-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {isUserFree && !canViewContact && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl">
            <p className="text-xs text-yellow-900 font-bold mb-2">
              🔓 Unlock All Features
            </p>
            <p className="text-xs text-gray-700 mb-3">
              Verify your NID (৳200) or upgrade to premium
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/verify"
                className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-xs font-bold hover:shadow-lg transition text-center"
              >
                Verify NID
              </Link>
              <button className="px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg text-xs font-bold hover:shadow-lg transition">
                Go Premium
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}