"use client";
import { useState } from "react";

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
  religion: string;
  maritalStatus?: string;
  marital_status?: string;
  photoUrl?: string;
  photo_url?: string;
  isVerified?: boolean;
  is_verified?: boolean;
  isPremium?: boolean;
  is_premium?: boolean;
  isPhotoVisible?: boolean;
  photo_visible?: boolean;
  lastActive?: string;
  last_active?: string;
  managedBy?: string;
  managed_by?: string;
  familyType?: string;
  family_type?: string;
  religiousPractice?: string;
  religious_practice?: string;
}

export default function ProfileCard({ profile }: { profile: Profile }) {
  const [showContact, setShowContact] = useState(false);

  // Handle different field naming conventions (camelCase vs snake_case)
  const name = profile.full_name || profile.name || "Anonymous";
  const location = profile.location || profile.city || "Not specified";
  const maritalStatus = profile.maritalStatus || profile.marital_status || "Not specified";
  const photoUrl = profile.photoUrl || profile.photo_url;
  const isVerified = profile.isVerified || profile.is_verified || false;
  const isPremium = profile.isPremium || profile.is_premium || false;
  const isPhotoVisible = profile.isPhotoVisible || profile.photo_visible || false;
  const lastActive = profile.lastActive || profile.last_active || "Recently";
  const managedBy = profile.managedBy || profile.managed_by || "Self";
  const familyType = profile.familyType || profile.family_type || "Not specified";
  const religiousPractice = profile.religiousPractice || profile.religious_practice || "Not specified";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative group">
      
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <span>⭐</span>
            <span>PREMIUM</span>
          </div>
        </div>
      )}

      {/* Verification Badge */}
      {isVerified && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <span>✓</span>
            <span>VERIFIED</span>
          </div>
        </div>
      )}

      {/* Photo Section */}
      <div className="relative bg-gradient-to-br from-red-50 to-rose-50 h-80">
        {isPhotoVisible && photoUrl ? (
          <img 
            src={photoUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-3">
              <span className="text-5xl">
                {profile.lookingFor === "bride" ? "👰" : "🤵"}
              </span>
            </div>
            <p className="text-sm font-medium">Photo on request</p>
          </div>
        )}
        
        {/* Active Status */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-lg flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>{lastActive}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        
        {/* Name & Basic Info */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">By {managedBy}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
              {profile.age} years
            </span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              {profile.height}
            </span>
            <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
              {maritalStatus}
            </span>
          </div>
        </div>

        {/* Key Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">📍 Location</p>
            <p className="text-sm font-semibold text-gray-900">{location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">🎓 Education</p>
            <p className="text-sm font-semibold text-gray-900">{profile.education}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">💼 Profession</p>
            <p className="text-sm font-semibold text-gray-900">{profile.profession}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">🕌 Religion</p>
            <p className="text-sm font-semibold text-gray-900">{profile.religion}</p>
          </div>
        </div>

        {/* Family & Religious Info */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div className="bg-gray-50 p-2.5 rounded-lg">
            <p className="text-gray-600 mb-1">Family</p>
            <p className="font-semibold text-gray-900">{familyType}</p>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-lg">
            <p className="text-gray-600 mb-1">Religious</p>
            <p className="font-semibold text-gray-900">{religiousPractice}</p>
          </div>
        </div>

        {/* Income (if available) */}
        {profile.monthlyIncome && (
          <div className="bg-green-50 p-3 rounded-lg mb-4">
            <p className="text-xs text-green-700 mb-1">💰 Monthly Income</p>
            <p className="text-sm font-bold text-green-900">৳{profile.monthlyIncome.toLocaleString()}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => alert('Please login first to send interest!\n\nAuthentication system coming soon.')}
            className="bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 px-4 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            💌 Send Interest
          </button>
          <a 
            href={`/profile/${profile.id}`}
            className="bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
          >
            👁️ View Profile
          </a>
        </div>

        {/* Contact Info placeholder */}
        {showContact && (
          <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 animate-fadeIn">
            <p className="text-xs font-semibold text-red-900 mb-2">📞 Contact Information</p>
            <p className="text-sm text-gray-700">Please login to view contact details.</p>
          </div>
        )}
      </div>
    </div>
  );
}