"use client";
import { useState } from "react";
import AIPhotoCropper from "./AIPhotoCropper";

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
  mainPhoto: string;
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
  communicationPreference: "",
  mainPhoto: ""
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

  const handlePhotoCrop = (croppedImageBase64: string) => {
    updateField("mainPhoto", croppedImageBase64);
  };

  const handleSubmit = () => {
    console.log("Profile Data:", formData);
    alert("Profile created successfully! 🎉");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold text-gray-700">Step {step} of {totalSteps}</span>
            <span className="text-sm font-bold text-pink-600">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">👤 Basic Information</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">This profile is managed by *</label>
                <select
                  value={formData.profileManagedBy}
                  onChange={(e) => updateField("profileManagedBy", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Self">Self</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Relative">Relative</option>
                  <option value="Friend">Friend</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">I am looking for *</label>
                <select
                  value={formData.lookingFor}
                  onChange={(e) => updateField("lookingFor", e.target.value as "bride" | "groom")}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="bride">Bride</option>
                  <option value="groom">Groom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date of birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField("dateOfBirth", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Height *</label>
                  <select
                    value={formData.height}
                    onChange={(e) => updateField("height", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="4ft 6in">4ft 6in</option>
                    <option value="4ft 7in">4ft 7in</option>
                    <option value="4ft 8in">4ft 8in</option>
                    <option value="4ft 9in">4ft 9in</option>
                    <option value="4ft 10in">4ft 10in</option>
                    <option value="4ft 11in">4ft 11in</option>
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
                    <option value="6ft 1in">6ft 1in</option>
                    <option value="6ft 2in">6ft 2in</option>
                    <option value="6ft 3in">6ft 3in</option>
                    <option value="6ft 4in">6ft 4in</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => updateField("weight", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    placeholder="Weight"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Blood group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => updateField("bloodGroup", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
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
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Marital status *</label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => updateField("maritalStatus", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Never married">Never married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>

              {(formData.maritalStatus === "Divorced" || formData.maritalStatus === "Widowed") && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Do you have children? *</label>
                    <select
                      value={formData.hasChildren}
                      onChange={(e) => updateField("hasChildren", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    >
                      <option value="">Select</option>
                      <option value="No">No</option>
                      <option value="Yes, 1 child">Yes, 1 child</option>
                      <option value="Yes, 2 children">Yes, 2 children</option>
                      <option value="Yes, 3+ children">Yes, 3+ children</option>
                    </select>
                  </div>

                  {formData.hasChildren.startsWith("Yes") && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Children stay with *</label>
                      <select
                        value={formData.childrenStayWith}
                        onChange={(e) => updateField("childrenStayWith", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="Me">Me</option>
                        <option value="Ex-spouse">Ex-spouse</option>
                        <option value="Shared custody">Shared custody</option>
                        <option value="Other guardian">Other guardian</option>
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Step 8: Photos & Privacy - WITH AI PHOTO CROPPER */}
          {step === 8 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-6">📸 Photos & Privacy</h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📸 AI Photo Cropper</h3>
                <p className="text-sm text-gray-700 mb-4">Upload your photo and our AI will automatically crop it to professional passport style!</p>
                
                <AIPhotoCropper onPhotoCropped={handlePhotoCrop} />
                
                {formData.mainPhoto && (
                  <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                    <p className="text-sm font-bold text-green-700">✅ Photo cropped successfully!</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Photo visibility</label>
                <select
                  value={formData.photoVisibility}
                  onChange={(e) => updateField("photoVisibility", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
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
            
            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg"
              >
                🎉 Create Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}