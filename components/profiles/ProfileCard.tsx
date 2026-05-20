"use client";
import { useState } from "react";

interface Profile {
  id: string;
  lookingFor: "bride" | "groom";
  name: string;
  age: number;
  height: string;
  location: string;
  education: string;
  profession: string;
  monthlyIncome?: number;
  religion: string;
  maritalStatus: string;
  photoUrl?: string;
  isVerified: boolean;
  isPremium: boolean;
  isPhotoVisible: boolean;
  lastActive: string;
  managedBy: string;
  familyType: string;
  religiousPractice: string;
}

export default function ProfileCard({ profile }: { profile: Profile }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 relative group hover:scale-[1.02]">
      
      {/* Badges */}
      {profile.isPremium && (
        <div className="absolute top-2 right-2 z-20">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2.5 py-1 rounded-full text-[10px] font-black shadow-lg">
            ⭐ PREMIUM
          </div>
        </div>
      )}
      {profile.isVerified && (
        <div className="absolute top-2 left-2 z-20">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-black shadow-lg">
            ✓ VERIFIED
          </div>
        </div>
      )}

      {/* Photo Section - More Compact */}
      <div className="relative bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100 h-56 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,#ff69b4,transparent_50%)]"></div>
        
        {profile.isPhotoVisible && profile.photoUrl ? (
          <img 
            src={profile.photoUrl} 
            alt={profile.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mb-2 shadow-lg">
              <span className="text-4xl">{profile.lookingFor === "bride" ? "👰" : "🤵"}</span>
            </div>
            <p className="text-xs font-bold text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
              Photo on request
            </p>
          </div>
        )}
        
        {/* Active - Compact */}
        <div className="absolute bottom-2 left-2">
          <div className="bg-white/95 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold text-gray-700 shadow flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            {profile.lastActive}
          </div>
        </div>
      </div>

      {/* Content - Super Compact */}
      <div className="p-3.5">
        
        {/* Name & Info */}
        <div className="mb-3">
          <h3 className="text-base font-black text-gray-900 mb-0.5 leading-tight">{profile.name}</h3>
          <p className="text-[10px] text-gray-500 font-semibold mb-2">By {profile.managedBy}</p>

          <div className="flex flex-wrap gap-1.5">
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
              {profile.age}y
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
              {profile.height}
            </span>
            <span className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
              {profile.maritalStatus}
            </span>
          </div>
        </div>

        {/* Details - Compact Grid */}
        <div className="space-y-2 mb-3 text-[11px]">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-gray-50 to-white p-2 rounded-lg">
            <span>📍</span>
            <span className="font-bold text-gray-900">{profile.location}</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-2 rounded-lg">
              <p className="text-[9px] text-gray-500 font-bold mb-0.5">🎓 Education</p>
              <p className="font-black text-gray-900 text-[10px] leading-tight">{profile.education}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-2 rounded-lg">
              <p className="text-[9px] text-gray-500 font-bold mb-0.5">💼 Work</p>
              <p className="font-black text-gray-900 text-[10px] leading-tight">{profile.profession}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-2 rounded-lg">
              <p className="text-[9px] text-gray-500 font-bold mb-0.5">👨‍👩‍👧 Family</p>
              <p className="font-black text-gray-900 text-[10px]">{profile.familyType}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-2 rounded-lg">
              <p className="text-[9px] text-gray-500 font-bold mb-0.5">🕌 Religious</p>
              <p className="font-black text-gray-900 text-[10px]">{profile.religiousPractice}</p>
            </div>
          </div>
        </div>

        {/* Buttons - Compact */}
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setShowContact(!showContact)}
            className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white py-2.5 px-3 rounded-xl font-bold text-[11px] hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            💌 Interest
          </button>
          <a 
            href={`/profile/${profile.id}`}
            className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 py-2.5 px-3 rounded-xl font-bold text-[11px] hover:shadow-md transition-all border border-gray-200 flex items-center justify-center"
          >
            👁️ View
          </a>
        </div>

        {/* Contact */}
        {showContact && (
          <div className="mt-2 p-2.5 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-200">
            <p className="text-[10px] font-bold text-red-900 mb-1">📞 Contact Info</p>
            <p className="text-[9px] text-gray-700 leading-relaxed">
              {profile.managedBy.toLowerCase() === 'self' 
                ? 'Details shared after mutual consent.'
                : 'Details shared after family approval.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
