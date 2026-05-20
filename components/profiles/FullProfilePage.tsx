"use client";
import { useState } from "react";

interface FullProfile {
  // Basic Info
  id: string;
  lookingFor: "bride" | "groom";
  name: string;
  age: number;
  dateOfBirth: string;
  height: string;
  weight: string;
  bodyType: string;
  complexion: string;
  bloodGroup: string;
  
  // Location
  currentlyLivesIn: string;
  dhakaArea?: string;
  familyHomeDistrict: string;
  nrbCountry?: string;
  willingToRelocate: string;
  
  // Education & Career
  education: string;
  institutionName: string;
  workSector: string;
  profession: string;
  monthlyIncome: number;
  workAfterMarriage: string;
  
  // Religion
  religion: string;
  religiousPractice: string;
  namaz: string;
  quranReading: string;
  hijab?: string;
  beard?: string;
  
  // Family
  maritalStatus: string;
  hasChildren?: string;
  childrenDetails?: string;
  profileManagedBy: string;
  candidateApproved: boolean;
  familyType: string;
  familyValues: string;
  fatherProfession: string;
  motherProfession: string;
  siblings: string;
  homeStatus: string;
  livingArrangement: string;
  
  // Lifestyle
  motherTongue: string;
  englishSpeaking: string;
  diet: string;
  smoking: string;
  drinking: string;
  
  // Marriage Plan
  whenToMarry: string;
  howToCommunicate: string;
  
  // Verification
  isVerified: boolean;
  isPremium: boolean;
  photoUrl?: string;
  photoGallery?: string[];
  lastActive: string;
  
  // About
  aboutMe: string;
  lookingForInPartner: string;
}

export default function FullProfilePage({ profile }: { profile: FullProfile }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showContactRequest, setShowContactRequest] = useState(false);

  const photos = profile.photoGallery || [profile.photoUrl || ""];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold">
            <span>←</span>
            <span>Back to Search</span>
          </button>
          <div className="flex items-center gap-3">
            {profile.isVerified && (
              <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold">
                ✓ Verified
              </div>
            )}
            {profile.isPremium && (
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold">
                ⭐ Premium
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN - Photos & Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Photo Gallery */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-gray-100">
              <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 aspect-[3/4]">
                {photos[currentPhotoIndex] ? (
                  <img 
                    src={photos[currentPhotoIndex]} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-4 shadow-xl">
                      <span className="text-7xl">
                        {profile.lookingFor === "bride" ? "👰" : "🤵"}
                      </span>
                    </div>
                    <p className="text-gray-500 font-semibold">Photo on request</p>
                  </div>
                )}
                
                {/* Photo Navigation */}
                {photos.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          index === currentPhotoIndex 
                            ? "bg-white w-8" 
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Active Status */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-gray-700">{profile.lastActive}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-100 space-y-4">
              <button 
                onClick={() => setShowContactRequest(true)}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                💌 Send Interest
              </button>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all">
                💬 Start Chat
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all text-sm">
                  ⭐ Shortlist
                </button>
                <button className="bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all text-sm">
                  🔗 Share
                </button>
              </div>
            </div>

            {/* Profile Managed By */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-5 border-2 border-blue-100">
              <p className="text-xs text-blue-700 font-bold uppercase tracking-wide mb-2">Profile Managed By</p>
              <p className="text-lg font-black text-blue-900">{profile.profileManagedBy}</p>
              {profile.candidateApproved && (
                <p className="text-xs text-green-700 font-semibold mt-2 flex items-center gap-1">
                  <span>✓</span>
                  <span>Candidate approved</span>
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Name & Basic Info */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
              <h1 className="text-4xl font-black text-gray-900 mb-3">{profile.name}</h1>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-5 py-2 rounded-xl font-bold text-sm">
                  {profile.age} Years
                </span>
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2 rounded-xl font-bold text-sm">
                  {profile.height}
                </span>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-xl font-bold text-sm">
                  {profile.maritalStatus}
                </span>
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2 rounded-xl font-bold text-sm">
                  {profile.religion}
                </span>
              </div>

              {/* About Me */}
              {profile.aboutMe && (
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">About Me</h3>
                  <p className="text-gray-700 leading-relaxed">{profile.aboutMe}</p>
                </div>
              )}
            </div>

            {/* Personal Details */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-red-500 rounded-full"></span>
                Personal Details
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <DetailItem icon="📅" label="Date of Birth" value={profile.dateOfBirth} />
                <DetailItem icon="📏" label="Height" value={profile.height} />
                <DetailItem icon="⚖️" label="Weight" value={profile.weight} />
                <DetailItem icon="💪" label="Body Type" value={profile.bodyType} />
                <DetailItem icon="🎨" label="Complexion" value={profile.complexion} />
                <DetailItem icon="🩸" label="Blood Group" value={profile.bloodGroup} />
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-blue-500 rounded-full"></span>
                Location
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <DetailItem icon="📍" label="Currently Lives In" value={profile.currentlyLivesIn} />
                {profile.dhakaArea && <DetailItem icon="🏙️" label="Dhaka Area" value={profile.dhakaArea} />}
                <DetailItem icon="🏠" label="Family Home District" value={profile.familyHomeDistrict} />
                {profile.nrbCountry && <DetailItem icon="✈️" label="NRB Country" value={profile.nrbCountry} />}
                <DetailItem icon="🚚" label="Willing to Relocate" value={profile.willingToRelocate} />
              </div>
            </div>

            {/* Education & Career */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-purple-500 rounded-full"></span>
                Education & Career
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <DetailItem icon="🎓" label="Education" value={profile.education} />
                <DetailItem icon="🏫" label="Institution" value={profile.institutionName} />
                <DetailItem icon="💼" label="Work Sector" value={profile.workSector} />
                <DetailItem icon="👔" label="Profession" value={profile.profession} />
                <DetailItem icon="💰" label="Monthly Income" value={`৳${profile.monthlyIncome.toLocaleString()}`} />
                <DetailItem icon="💍" label="Work After Marriage" value={profile.workAfterMarriage} />
              </div>
            </div>

            {/* Religious Information */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-green-500 rounded-full"></span>
                Religious Information
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <DetailItem icon="🕌" label="Religion" value={profile.religion} />
                <DetailItem icon="📿" label="Religious Practice" value={profile.religiousPractice} />
                <DetailItem icon="🤲" label="Namaz" value={profile.namaz} />
                <DetailItem icon="📖" label="Quran Reading" value={profile.quranReading} />
                {profile.hijab && <DetailItem icon="🧕" label="Hijab" value={profile.hijab} />}
                {profile.beard && <DetailItem icon="🧔" label="Beard" value={profile.beard} />}
              </div>
            </div>

            {/* Family Background */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-orange-500 rounded-full"></span>
                Family Background
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <DetailItem icon="👨‍👩‍👧‍👦" label="Family Type" value={profile.familyType} />
                <DetailItem icon="❤️" label="Family Values" value={profile.familyValues} />
                <DetailItem icon="👨" label="Father's Profession" value={profile.fatherProfession} />
                <DetailItem icon="👩" label="Mother's Profession" value={profile.motherProfession} />
                <DetailItem icon="👫" label="Siblings" value={profile.siblings} />
                <DetailItem icon="🏡" label="Home Status" value={profile.homeStatus} />
                <DetailItem icon="🏠" label="Living Arrangement" value={profile.livingArrangement} />
              </div>
            </div>

            {/* Lifestyle */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-teal-500 rounded-full"></span>
                Lifestyle
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <DetailItem icon="🗣️" label="Mother Tongue" value={profile.motherTongue} />
                <DetailItem icon="🇬🇧" label="English Speaking" value={profile.englishSpeaking} />
                <DetailItem icon="🍽️" label="Diet" value={profile.diet} />
                <DetailItem icon="🚭" label="Smoking" value={profile.smoking} />
                <DetailItem icon="🍺" label="Drinking" value={profile.drinking} />
              </div>
            </div>

            {/* Marriage Plan */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-pink-500 rounded-full"></span>
                Marriage Plan
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <DetailItem icon="📅" label="When to Marry" value={profile.whenToMarry} />
                <DetailItem icon="💬" label="How to Communicate" value={profile.howToCommunicate} />
              </div>
            </div>

            {/* Looking For */}
            {profile.lookingForInPartner && (
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-lg p-8 border-2 border-rose-100">
                <h2 className="text-2xl font-black text-gray-900 mb-4">💝 Looking For in Partner</h2>
                <p className="text-gray-700 leading-relaxed">{profile.lookingForInPartner}</p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Contact Request Modal */}
      {showContactRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-black text-gray-900 mb-4">💌 Send Interest</h3>
            <p className="text-gray-600 mb-6">
              Your contact information will be shared with {profile.name}'s family after they accept your interest.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowContactRequest(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200"
              >
                Cancel
              </button>
              <button className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl font-bold hover:shadow-lg">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</p>
      </div>
      <p className="text-base font-black text-gray-900">{value}</p>
    </div>
  );
}
