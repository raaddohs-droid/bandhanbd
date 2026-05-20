"use client";
import { useState } from "react";

interface ProfileData {
  // Step 1: Basic Info
  profileManagedBy: string;
  lookingFor: "bride" | "groom" | "";
  name: string;
  age: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  bloodGroup: string;
  maritalStatus: string;
  hasChildren: string;
  childrenStayWith: string;
  
  // Step 2: Location
  currentlyLivesIn: string;
  dhakaArea: string;
  nrbCountry: string;
  familyHomeDistrict: string;
  willingToRelocate: string;
  
  // Step 3: Education & Career
  education: string;
  institutionType: string;
  studiedAbroadCountry: string;
  institutionName: string;
  workSector: string;
  profession: string;
  monthlyIncome: string;
  workAfterMarriage: string;
  
  // Step 4: Religion
  religion: string;
  religiousPractice: string;
  namaz: string;
  quranReading: string;
  hijab: string;
  beard: string;
  
  // Step 5: Family
  familyType: string;
  familyValues: string;
  fatherProfession: string;
  motherProfession: string;
  siblings: string;
  homeOwnership: string;
  livingAfterMarriage: string;
  
  // Step 6: Lifestyle
  motherTongue: string;
  englishSpeaking: string;
  diet: string;
  health: string;
  smoke: string;
  drink: string;
  
  // Step 7: About & Preferences
  aboutMe: string;
  lookingForInPartner: string;
  favoriteSong: string;
  favoriteMovie: string;
  hobbies: string;
  
  // Step 8: Photos & Privacy
  photoVisibility: string;
  wantVerification: string;
  communicationPreference: string;
}

const initialData: ProfileData = {
  profileManagedBy: "",
  lookingFor: "",
  name: "",
  age: "",
  dateOfBirth: "",
  height: "",
  weight: "",
  bloodGroup: "",
  maritalStatus: "",
  hasChildren: "",
  childrenStayWith: "",
  currentlyLivesIn: "",
  dhakaArea: "",
  nrbCountry: "",
  familyHomeDistrict: "",
  willingToRelocate: "",
  education: "",
  institutionType: "",
  studiedAbroadCountry: "",
  institutionName: "",
  workSector: "",
  profession: "",
  monthlyIncome: "",
  workAfterMarriage: "",
  religion: "",
  religiousPractice: "",
  namaz: "",
  quranReading: "",
  hijab: "",
  beard: "",
  familyType: "",
  familyValues: "",
  fatherProfession: "",
  motherProfession: "",
  siblings: "",
  homeOwnership: "",
  livingAfterMarriage: "",
  motherTongue: "",
  englishSpeaking: "",
  diet: "",
  health: "",
  smoke: "",
  drink: "",
  aboutMe: "",
  lookingForInPartner: "",
  favoriteSong: "",
  favoriteMovie: "",
  hobbies: "",
  photoVisibility: "",
  wantVerification: "",
  communicationPreference: ""
};

export default function CreateProfileForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProfileData>(initialData);
  const totalSteps = 8;

  const updateField = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAIAssist = async (field: "aboutMe" | "lookingForInPartner") => {
    alert("AI assistance coming soon! Will help you write compelling profile text.");
  };

  const handleSubmit = () => {
    console.log("Profile Data:", formData);
    alert("Profile created successfully! 🎉");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Create Your Profile</h1>
          <p className="text-gray-600">Find your perfect match on Biyekori</p>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-gray-600">Step {step} of {totalSteps}</span>
            <span className="text-sm font-bold text-red-600">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">📋 Basic Information</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">This profile is for *</label>
                <select
                  value={formData.profileManagedBy}
                  onChange={(e) => updateField("profileManagedBy", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Myself">Myself</option>
                  <option value="My son">My son</option>
                  <option value="My daughter">My daughter</option>
                  <option value="My brother">My brother</option>
                  <option value="My sister">My sister</option>
                  <option value="My friend">My friend</option>
                  <option value="Other relative">Other relative</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Looking for *</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "bride", label: "👰 Bride" },
                    { value: "groom", label: "🤵 Groom" }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("lookingFor", option.value as "bride" | "groom")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.lookingFor === option.value
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-bold text-lg">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="Enter full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateField("age", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField("dateOfBirth", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Height *</label>
                  <select
                    value={formData.height}
                    onChange={(e) => updateField("height", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="5ft 0in">5ft 0in</option>
                    <option value="5ft 1in">5ft 1in</option>
                    <option value="5ft 2in">5ft 2in</option>
                    <option value="5ft 3in">5ft 3in</option>
                    <option value="5ft 4in">5ft 4in</option>
                    <option value="5ft 5in">5ft 5in</option>
                    <option value="5ft 6in">5ft 6in</option>
                    <option value="5ft 7in">5ft 7in</option>
                    <option value="5ft 8in">5ft 8in</option>
                    <option value="5ft 9in">5ft 9in</option>
                    <option value="5ft 10in">5ft 10in</option>
                    <option value="5ft 11in">5ft 11in</option>
                    <option value="6ft 0in">6ft 0in</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => updateField("weight", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="65 kg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => updateField("bloodGroup", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Marital Status *</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => updateField("maritalStatus", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Never married">Never married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              {(formData.maritalStatus === "Divorced" || formData.maritalStatus === "Widowed") && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Have children?</label>
                    <select
                      value={formData.hasChildren}
                      onChange={(e) => updateField("hasChildren", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {formData.hasChildren === "Yes" && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Children stay with?</label>
                      <select
                        value={formData.childrenStayWith}
                        onChange={(e) => updateField("childrenStayWith", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="With me">With me</option>
                        <option value="With ex-spouse">With ex-spouse</option>
                        <option value="With relatives">With relatives</option>
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">📍 Location Details</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Currently lives in *</label>
                <select
                  value={formData.currentlyLivesIn}
                  onChange={(e) => updateField("currentlyLivesIn", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Abroad">Living abroad (NRB)</option>
                </select>
              </div>

              {formData.currentlyLivesIn === "Dhaka" && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dhaka area</label>
                  <input
                    type="text"
                    value={formData.dhakaArea}
                    onChange={(e) => updateField("dhakaArea", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="e.g. Gulshan, Banani, Uttara"
                  />
                </div>
              )}

              {formData.currentlyLivesIn === "Abroad" && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Which country? *</label>
                  <select
                    value={formData.nrbCountry}
                    onChange={(e) => updateField("nrbCountry", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="UAE">UAE</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Family home district *</label>
                <input
                  type="text"
                  value={formData.familyHomeDistrict}
                  onChange={(e) => updateField("familyHomeDistrict", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="e.g. Chittagong, Sylhet"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Willing to relocate after marriage?</label>
                <select
                  value={formData.willingToRelocate}
                  onChange={(e) => updateField("willingToRelocate", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes, willing to relocate</option>
                  <option value="No">No, prefer to stay</option>
                  <option value="Depends">Depends on situation</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Education & Career */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">🎓 Education & Career</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Highest education *</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => updateField("education", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="e.g. MBA, MBBS, B.Sc Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Institution type</label>
                <select
                  value={formData.institutionType}
                  onChange={(e) => updateField("institutionType", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Public University">Public University</option>
                  <option value="Private University">Private University</option>
                  <option value="Medical College">Medical College</option>
                  <option value="Engineering College">Engineering College</option>
                  <option value="Madrasa">Madrasa</option>
                  <option value="Studied abroad">Studied abroad</option>
                </select>
              </div>

              {formData.institutionType === "Studied abroad" && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Which country? *</label>
                  <select
                    value={formData.studiedAbroadCountry}
                    onChange={(e) => updateField("studiedAbroadCountry", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Institution name</label>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={(e) => updateField("institutionName", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="e.g. Dhaka University, NSU"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Work sector</label>
                <select
                  value={formData.workSector}
                  onChange={(e) => updateField("workSector", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private Company</option>
                  <option value="Business">Business Owner</option>
                  <option value="NGO">NGO</option>
                  <option value="Not Working">Not Working</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Profession</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => updateField("profession", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="e.g. Software Engineer, Doctor, Teacher"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Monthly income (optional)</label>
                <input
                  type="text"
                  value={formData.monthlyIncome}
                  onChange={(e) => updateField("monthlyIncome", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="e.g. 50000"
                />
              </div>

              {formData.lookingFor === "bride" && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Will work after marriage?</label>
                  <select
                    value={formData.workAfterMarriage}
                    onChange={(e) => updateField("workAfterMarriage", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes, plan to work</option>
                    <option value="No">No, prefer to stay home</option>
                    <option value="Depends">Depends on situation</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Religion */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">🕌 Religious Information</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Religion *</label>
                <select
                  value={formData.religion}
                  onChange={(e) => updateField("religion", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Islam - Sunni">Islam - Sunni</option>
                  <option value="Islam - Shia">Islam - Shia</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Christian">Christian</option>
                  <option value="Buddhist">Buddhist</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Religious practice</label>
                <select
                  value={formData.religiousPractice}
                  onChange={(e) => updateField("religiousPractice", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Very religious">Very religious</option>
                  <option value="Religious">Religious</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Not very religious">Not very religious</option>
                </select>
              </div>

              {formData.religion.includes("Islam") && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Namaz</label>
                    <select
                      value={formData.namaz}
                      onChange={(e) => updateField("namaz", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    >
                      <option value="">Select</option>
                      <option value="5 times daily">5 times daily</option>
                      <option value="Regularly">Regularly</option>
                      <option value="Sometimes">Sometimes</option>
                      <option value="Rarely">Rarely</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Quran reading</label>
                    <select
                      value={formData.quranReading}
                      onChange={(e) => updateField("quranReading", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    >
                      <option value="">Select</option>
                      <option value="Can read fluently">Can read fluently</option>
                      <option value="Can read with help">Can read with help</option>
                      <option value="Learning">Learning</option>
                      <option value="Cannot read">Cannot read</option>
                    </select>
                  </div>

                  {formData.lookingFor === "bride" && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Wears hijab?</label>
                      <select
                        value={formData.hijab}
                        onChange={(e) => updateField("hijab", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Sometimes">Sometimes</option>
                      </select>
                    </div>
                  )}

                  {formData.lookingFor === "groom" && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Has beard?</label>
                      <select
                        value={formData.beard}
                        onChange={(e) => updateField("beard", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Step 5: Family */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">👨‍👩‍👧 Family Background</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Family type</label>
                <select
                  value={formData.familyType}
                  onChange={(e) => updateField("familyType", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Nuclear">Nuclear family</option>
                  <option value="Joint">Joint family</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Family values</label>
                <select
                  value={formData.familyValues}
                  onChange={(e) => updateField("familyValues", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Modern">Modern</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Liberal">Liberal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Father's profession</label>
                <input
                  type="text"
                  value={formData.fatherProfession}
                  onChange={(e) => updateField("fatherProfession", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="e.g. Businessman, Government officer"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mother's profession</label>
                <input
                  type="text"
                  value={formData.motherProfession}
                  onChange={(e) => updateField("motherProfession", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="e.g. Homemaker, Teacher"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Number of siblings</label>
                <input
                  type="text"
                  value={formData.siblings}
                  onChange={(e) => updateField("siblings", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="e.g. 2 brothers, 1 sister"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Home ownership</label>
                <select
                  value={formData.homeOwnership}
                  onChange={(e) => updateField("homeOwnership", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Own home">Own home</option>
                  <option value="Rented">Rented</option>
                  <option value="Ancestral property">Ancestral property</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Living arrangement after marriage</label>
                <select
                  value={formData.livingAfterMarriage}
                  onChange={(e) => updateField("livingAfterMarriage", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Separate">Will live separately</option>
                  <option value="With parents">Will live with parents</option>
                  <option value="Flexible">Open to discussion</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 6: Lifestyle */}
          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">🌟 Lifestyle</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mother tongue</label>
                <input
                  type="text"
                  value={formData.motherTongue}
                  onChange={(e) => updateField("motherTongue", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="e.g. Bengali, English"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">English speaking</label>
                <select
                  value={formData.englishSpeaking}
                  onChange={(e) => updateField("englishSpeaking", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Diet preference</label>
                <select
                  value={formData.diet}
                  onChange={(e) => updateField("diet", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Non-vegetarian">Non-vegetarian</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Eggetarian">Eggetarian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Health status</label>
                <select
                  value={formData.health}
                  onChange={(e) => updateField("health", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Smoke</label>
                <select
                  value={formData.smoke}
                  onChange={(e) => updateField("smoke", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="No">No</option>
                  <option value="Occasionally">Occasionally</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Drink alcohol</label>
                <select
                  value={formData.drink}
                  onChange={(e) => updateField("drink", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="No">No</option>
                  <option value="Socially">Socially</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 7: About & Preferences */}
          {step === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">✍️ About Me & Preferences</h2>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-gray-700">About me *</label>
                  <button
                    type="button"
                    onClick={() => handleAIAssist("aboutMe")}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:shadow-lg"
                  >
                    🤖 AI Help
                  </button>
                </div>
                <textarea
                  value={formData.aboutMe}
                  onChange={(e) => updateField("aboutMe", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none min-h-32"
                  placeholder="Write about yourself, your personality, interests, goals..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.aboutMe.length}/500 characters</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-gray-700">Looking for in partner *</label>
                  <button
                    type="button"
                    onClick={() => handleAIAssist("lookingForInPartner")}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:shadow-lg"
                  >
                    🤖 AI Help
                  </button>
                </div>
                <textarea
                  value={formData.lookingForInPartner}
                  onChange={(e) => updateField("lookingForInPartner", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none min-h-32"
                  placeholder="Describe your ideal partner, qualities you're looking for..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.lookingForInPartner.length}/500 characters</p>
              </div>

              <div className="border-t-2 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Optional: Help AI find better matches!</h3>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Favorite song (YouTube link)</label>
                  <input
                    type="url"
                    value={formData.favoriteSong}
                    onChange={(e) => updateField("favoriteSong", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="https://youtube.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 mt-4">Favorite movie (IMDb link)</label>
                  <input
                    type="url"
                    value={formData.favoriteMovie}
                    onChange={(e) => updateField("favoriteMovie", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="https://imdb.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 mt-4">Hobbies & interests</label>
                  <input
                    type="text"
                    value={formData.hobbies}
                    onChange={(e) => updateField("hobbies", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="e.g. Reading, traveling, photography"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Photos & Privacy */}
          {step === 8 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">📸 Photos & Privacy</h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Photo Upload</h3>
                <p className="text-sm text-gray-700 mb-4">Upload 1 main photo (required unless you prefer privacy) + up to 7 additional photos</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Main photo *</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Additional photos (optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">You can upload up to 7 more photos</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Photo visibility</label>
                <select
                  value={formData.photoVisibility}
                  onChange={(e) => updateField("photoVisibility", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Visible to all">Visible to all verified users</option>
                  <option value="On request">Only after I approve request</option>
                  <option value="Private">Keep private (conservative/privacy)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Want profile verification?</label>
                <select
                  value={formData.wantVerification}
                  onChange={(e) => updateField("wantVerification", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes, verify my profile</option>
                  <option value="No">No, not now</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">How to communicate</label>
                <select
                  value={formData.communicationPreference}
                  onChange={(e) => updateField("communicationPreference", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Direct">Direct messages welcome</option>
                  <option value="After interest">After sending interest</option>
                  <option value="Through guardian">Through guardian only</option>
                </select>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t-2">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
              >
                ← Previous
              </button>
            )}
            
            {step < totalSteps && (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg"
              >
                Next →
              </button>
            )}

            {step === totalSteps && (
              <button
                type="button"
                onClick={handleSubmit}
                className="ml-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg"
              >
                ✓ Create Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}