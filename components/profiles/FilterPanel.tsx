"use client";
import { useState } from "react";

interface FilterState {
  // Basic Info
  lookingFor: "bride" | "groom" | null;
  ageMin: number | null;
  ageMax: number | null;
  heightMin: string;
  heightMax: string;
  maritalStatus: string[];
  hasChildren: string;
  profileManagedBy: string;
  
  // Where They Live
  currentlyLivesIn: string[];
  dhakaArea: string[];
  familyHomeDistrict: string[];
  nrbCountry: string[];
  movingAfterMarriage: string;
  
  // Study & Work
  institutionType: string[];
  workSector: string[];
  monthlyIncome: number;
  workAfterMarriage: string;
  
  // Religion
  religion: string[];
  religiousPractice: string;
  namaz: string;
  quranReading: string;
  hijab: string;
  beard: string;
  
  // Family
  candidateApprovedOnly: boolean;
  familyType: string;
  familyValues: string[];
  fatherJob: string;
  motherJob: string;
  parentsStatus: string;
  homeStatus: string;
  whereToLiveAfterMarriage: string;
  
  // Lifestyle
  motherTongue: string[];
  englishSpeaking: string;
  foodPreference: string;
  healthNotes: string;
  bloodGroup: string;
  
  // Marriage Plan
  whenToMarry: string;
  howToCommunicate: string;
  
  // Trust & Safety
  trustChecks: string[];
  photoVisibility: string;
  photoAdded: boolean;
  recentlyActive: boolean;
  premiumOnly: boolean;
  okayWithPartnersChildren: string;
}

const initialFilters: FilterState = {
  lookingFor: null,
  ageMin: null,
  ageMax: null,
  heightMin: "4'10\"",
  heightMax: "6'2\"",
  maritalStatus: [],
  hasChildren: "any",
  profileManagedBy: "any",
  currentlyLivesIn: [],
  dhakaArea: [],
  familyHomeDistrict: [],
  nrbCountry: [],
  movingAfterMarriage: "any",
  institutionType: [],
  workSector: [],
  monthlyIncome: 500000,
  workAfterMarriage: "any",
  religion: [],
  religiousPractice: "any",
  namaz: "any",
  quranReading: "any",
  hijab: "any",
  beard: "any",
  candidateApprovedOnly: false,
  familyType: "any",
  familyValues: [],
  fatherJob: "any",
  motherJob: "any",
  parentsStatus: "any",
  homeStatus: "any",
  whereToLiveAfterMarriage: "any",
  motherTongue: [],
  englishSpeaking: "any",
  foodPreference: "any",
  healthNotes: "any",
  bloodGroup: "any",
  whenToMarry: "any",
  howToCommunicate: "any",
  trustChecks: [],
  photoVisibility: "any",
  photoAdded: false,
  recentlyActive: false,
  premiumOnly: false,
  okayWithPartnersChildren: "any",
};

export default function FilterPanel({ onFilterChange, resultCount }: { 
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
}) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showValidation, setShowValidation] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setShowValidation(false);
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  const clearAllFilters = () => {
    setFilters(initialFilters);
    setShowValidation(false);
  };

  const isValid = () => {
    return filters.lookingFor !== null && 
           filters.ageMin !== null && 
           filters.ageMax !== null;
  };

  const handleApply = () => {
    if (!isValid()) {
      setShowValidation(true);
      return;
    }
    onFilterChange(filters);
  };

  const heights = ["4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\""];
  
  const allDistricts = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh", "Comilla", "Gazipur", "Narayanganj", "Narsingdi", "Tangail", "Jamalpur", "Sherpur", "Netrokona", "Brahmanbaria", "Chandpur", "Lakshmipur", "Noakhali", "Feni", "Cox's Bazar", "Bandarban", "Rangamati", "Khagrachhari", "Bogra", "Chapainawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Sirajganj", "Jessore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Chuadanga", "Satkhira", "Bagerhat", "Barguna", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon", "Habiganj", "Moulvibazar", "Sunamganj", "Faridpur", "Gopalganj", "Madaripur", "Rajbari", "Shariatpur", "Kishoreganj", "Manikganj", "Munshiganj"];
  
  const dhakaAreas = ["Dhanmondi", "Gulshan", "Banani", "Uttara", "Mirpur", "Mohammadpur", "Bashundhara", "Baridhara", "Old Dhaka", "Tejgaon", "Farmgate", "Malibagh", "Rampura", "Badda", "Khilgaon", "Mogbazar", "Lalmatia", "Jigatola", "Shyamoli", "Adabor", "Shahbagh", "Motijheel", "Paltan", "Jatrabari", "Sayedabad"];
  
  const nrbCountries = ["USA", "UK", "Canada", "Australia", "UAE", "Saudi Arabia", "Malaysia", "Singapore", "Qatar", "Kuwait", "Oman", "Bahrain", "Germany", "France", "Italy", "Spain", "Japan", "South Korea"];
  
  const institutionTypes = ["Medical College", "Engineering College", "Madrasa", "Cadet College", "English Medium", "Bangla Medium", "Public University", "Private University", "Studied abroad"];
  
  const workSectors = ["Government", "Private Company", "Business Owner", "NGO", "Bank", "Medical", "Engineering", "Teaching", "IT/Software", "Media", "Army/Navy/Air Force", "Police", "Civil Service", "Not Working"];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 sticky top-4 overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            <h2 className="text-lg font-bold">Find Your Match</h2>
          </div>
          <button type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/90 hover:text-white text-sm font-medium bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all"
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto">

          {/* Validation */}
          {showValidation && !isValid() && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-sm">
              <p className="font-semibold text-red-800">⚠️ Please fill required fields</p>
              <p className="text-red-600 text-xs mt-1">
                Required: {!filters.lookingFor && "Looking for, "}
                {(filters.ageMin === null || filters.ageMax === null) && "Age"}
              </p>
            </div>
          )}

          {/* BASIC INFO */}
          <section className="pb-5 border-b border-gray-200">
            <div className="bg-red-50 -mx-5 px-5 py-3 mb-4 border-y border-red-100">
              <h3 className="text-sm font-bold text-red-800 flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded">REQUIRED</span>
                Basic Info
              </h3>
            </div>

            <div className="space-y-4">
              {/* Looking For */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  I am looking for <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "bride", label: "👰 Bride" },
                    { value: "groom", label: "🤵 Groom" }
                  ].map(option => (
                    <button type="button" key={option.value}
                      onClick={() => updateFilter("lookingFor", option.value)}
                      className={`py-3 px-3 rounded-lg text-sm font-medium transition-all ${
                        filters.lookingFor === option.value
                          ? "bg-red-600 text-white shadow-md ring-2 ring-red-300"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Age <span className="text-red-600">*</span>
                  {filters.ageMin && filters.ageMax && (
                    <span className="ml-2 text-gray-500 font-normal">({filters.ageMin} - {filters.ageMax} years)</span>
                  )}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filters.ageMin || ""}
                    onChange={(e) => updateFilter("ageMin", e.target.value ? parseInt(e.target.value) : null)}
                    className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Min age</option>
                    {Array.from({length: 43}, (_, i) => i + 18).map(age => (
                      <option key={age} value={age}>{age} years</option>
                    ))}
                  </select>
                  <select
                    value={filters.ageMax || ""}
                    onChange={(e) => updateFilter("ageMax", e.target.value ? parseInt(e.target.value) : null)}
                    className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Max age</option>
                    {Array.from({length: 43}, (_, i) => i + 18).map(age => (
                      <option key={age} value={age}>{age} years</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Height</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filters.heightMin}
                    onChange={(e) => updateFilter("heightMin", e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                  >
                    {heights.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  <select
                    value={filters.heightMax}
                    onChange={(e) => updateFilter("heightMax", e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                  >
                    {heights.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              {/* Marital Status */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Marital status</label>
                <div className="flex flex-wrap gap-2">
                  {["Never married", "Divorced", "Widowed"].map(status => (
                    <button type="button" key={status}
                      onClick={() => toggleArrayFilter("maritalStatus", status)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        filters.maritalStatus.includes(status)
                          ? "bg-red-600 text-white shadow-sm"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Children Questions - Only if Divorced or Widowed */}
              {(filters.maritalStatus.includes("Divorced") || filters.maritalStatus.includes("Widowed")) && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-2">Has children</label>
                    <select
                      value={filters.hasChildren}
                      onChange={(e) => updateFilter("hasChildren", e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                    >
                      <option value="any">Doesn't matter</option>
                      <option value="no">No children</option>
                      <option value="yes">Has children</option>
                    </select>
                  </div>

                  {/* If Has Children - Show More Details */}
                  {filters.hasChildren === "yes" && (
                    <>
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-2">Children staying where?</label>
                        <select
                          value={filters.profileManagedBy}
                          onChange={(e) => updateFilter("profileManagedBy", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                        >
                          <option value="any">Doesn't matter</option>
                          <option value="with_self">Living with them</option>
                          <option value="with_ex">Living with ex-spouse</option>
                          <option value="with_family">Living with family</option>
                          <option value="independent">Independent/Grown up</option>
                        </select>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Profile Managed By - Only if NOT divorced/widowed */}
              {!filters.maritalStatus.includes("Divorced") && !filters.maritalStatus.includes("Widowed") && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Profile managed by</label>
                  <select
                    value={filters.profileManagedBy}
                    onChange={(e) => updateFilter("profileManagedBy", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                  >
                    <option value="any">Anyone</option>
                    <option value="self">Self</option>
                    <option value="parents">Parents</option>
                    <option value="sibling">Brother/Sister</option>
                    <option value="relative">Relative</option>
                  </select>
                </div>
              )}
            </div>
          </section>

          {/* WHERE THEY LIVE */}
          <section className="pb-5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
              Where They Live
            </h3>

            <div className="space-y-4">
              {/* Currently Lives In */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Currently lives in</label>
                <select
                  multiple
                  size={3}
                  value={filters.currentlyLivesIn}
                  onChange={(e) => updateFilter("currentlyLivesIn", Array.from(e.target.selectedOptions, option => option.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="bangladesh">🇧🇩 Bangladesh</option>
                  <option value="dhaka">📍 Dhaka</option>
                  <option value="abroad">✈️ Living abroad (NRB)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
              </div>

              {/* Dhaka Area */}
              {filters.currentlyLivesIn.includes("dhaka") && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Dhaka area</label>
                  <select
                    value={filters.dhakaArea[0] || ""}
                    onChange={(e) => updateFilter("dhakaArea", e.target.value ? [e.target.value] : [])}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                  >
                    <option value="">Any area in Dhaka</option>
                    {dhakaAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Family Home District */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Family home district</label>
                <select
                  value={filters.familyHomeDistrict[0] || ""}
                  onChange={(e) => updateFilter("familyHomeDistrict", e.target.value ? [e.target.value] : [])}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="">Any district</option>
                  {allDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* NRB Country */}
              {filters.currentlyLivesIn.includes("abroad") && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Country abroad</label>
                  <select
                    value={filters.nrbCountry[0] || ""}
                    onChange={(e) => updateFilter("nrbCountry", e.target.value ? [e.target.value] : [])}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                  >
                    <option value="">Any country</option>
                    {nrbCountries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Moving After Marriage */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Moving after marriage</label>
                <select
                  value={filters.movingAfterMarriage}
                  onChange={(e) => updateFilter("movingAfterMarriage", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="willing">Willing to move</option>
                  <option value="not_willing">Not willing to move</option>
                  <option value="depends">Depends on situation</option>
                </select>
              </div>
            </div>
          </section>

          {/* STUDY & WORK */}
          <section className="pb-5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
              Study & Work
            </h3>

            <div className="space-y-4">
              {/* Institution Type */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Institution type</label>
                <select
                  value={filters.institutionType[0] || ""}
                  onChange={(e) => updateFilter("institutionType", e.target.value ? [e.target.value] : [])}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="">Any institution</option>
                  {institutionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* If Studied Abroad - Show Country */}
              {filters.institutionType.includes("Studied abroad") && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Which country?</label>
                  <select
                    value={filters.nrbCountry[0] || ""}
                    onChange={(e) => updateFilter("nrbCountry", e.target.value ? [e.target.value] : [])}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                  >
                    <option value="">Select country</option>
                    {nrbCountries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Work Sector */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Work sector</label>
                <select
                  value={filters.workSector[0] || ""}
                  onChange={(e) => updateFilter("workSector", e.target.value ? [e.target.value] : [])}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="">Any sector</option>
                  {workSectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Monthly income: Up to ৳{filters.monthlyIncome.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={filters.monthlyIncome}
                  onChange={(e) => updateFilter("monthlyIncome", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Work After Marriage */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Work after marriage</label>
                <select
                  value={filters.workAfterMarriage}
                  onChange={(e) => updateFilter("workAfterMarriage", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="continue">Will continue working</option>
                  <option value="stop">Will stop working</option>
                  <option value="depends">Depends on family decision</option>
                </select>
              </div>
            </div>
          </section>

          {/* RELIGION */}
          <section className="pb-5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-green-500 rounded-full"></span>
              Religion
            </h3>

            <div className="space-y-4">
              {/* Religion */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Religion</label>
                <div className="flex flex-wrap gap-2">
                  {["Islam - Sunni", "Islam - Shia", "Hindu", "Christian", "Buddhist"].map(rel => (
                    <button type="button" key={rel}
                      onClick={() => toggleArrayFilter("religion", rel)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        filters.religion.includes(rel)
                          ? "bg-green-600 text-white shadow-sm"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Religious Practice */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Religious practice</label>
                <select
                  value={filters.religiousPractice}
                  onChange={(e) => updateFilter("religiousPractice", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="very_religious">Very religious</option>
                  <option value="religious">Religious</option>
                  <option value="moderate">Moderate</option>
                  <option value="not_much">Not very religious</option>
                </select>
              </div>

              {/* Namaz */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Namaz</label>
                <select
                  value={filters.namaz}
                  onChange={(e) => updateFilter("namaz", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="five_times">5 times daily</option>
                  <option value="regularly">Regularly</option>
                  <option value="sometimes">Sometimes</option>
                </select>
              </div>

              {/* Quran Reading */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Quran reading</label>
                <select
                  value={filters.quranReading}
                  onChange={(e) => updateFilter("quranReading", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="can_read">Can read Quran</option>
                  <option value="learning">Learning</option>
                  <option value="cannot">Cannot read</option>
                </select>
              </div>

              {/* Hijab */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Hijab</label>
                <select
                  value={filters.hijab}
                  onChange={(e) => updateFilter("hijab", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="yes">Wears hijab</option>
                  <option value="no">Doesn't wear hijab</option>
                </select>
              </div>

              {/* Beard */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Beard</label>
                <select
                  value={filters.beard}
                  onChange={(e) => updateFilter("beard", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="yes">Has beard</option>
                  <option value="no">No beard</option>
                </select>
              </div>
            </div>
          </section>

          {/* FAMILY */}
          <section className="pb-5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
              Family
            </h3>

            <div className="space-y-4">
              {/* Candidate Approved Only */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={filters.candidateApprovedOnly}
                    onChange={(e) => updateFilter("candidateApprovedOnly", e.target.checked)}
                    className="w-4 h-4 accent-orange-600 rounded"
                  />
                  <span className="text-xs font-semibold">Candidate approved only</span>
                </label>
              </div>

              {/* Family Type */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Family type</label>
                <select
                  value={filters.familyType}
                  onChange={(e) => updateFilter("familyType", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="nuclear">Nuclear family</option>
                  <option value="joint">Joint family</option>
                </select>
              </div>

              {/* Family Values */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Family values</label>
                <div className="flex flex-wrap gap-2">
                  {["Traditional", "Moderate", "Liberal"].map(value => (
                    <button type="button" key={value}
                      onClick={() => toggleArrayFilter("familyValues", value)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        filters.familyValues.includes(value)
                          ? "bg-orange-600 text-white shadow-sm"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Father's Job */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Father's job</label>
                <select
                  value={filters.fatherJob}
                  onChange={(e) => updateFilter("fatherJob", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="govt">Government job</option>
                  <option value="business">Business</option>
                  <option value="private">Private job</option>
                  <option value="retired">Retired</option>
                  <option value="passed_away">Passed away</option>
                </select>
              </div>

              {/* Mother's Job */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Mother's job</label>
                <select
                  value={filters.motherJob}
                  onChange={(e) => updateFilter("motherJob", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="homemaker">Homemaker</option>
                  <option value="working">Working</option>
                  <option value="retired">Retired</option>
                  <option value="passed_away">Passed away</option>
                </select>
              </div>

              {/* Parents Status */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Parents</label>
                <select
                  value={filters.parentsStatus}
                  onChange={(e) => updateFilter("parentsStatus", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="both_alive">Both alive</option>
                  <option value="father_alive">Only father alive</option>
                  <option value="mother_alive">Only mother alive</option>
                </select>
              </div>

              {/* Home Status */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Home</label>
                <select
                  value={filters.homeStatus}
                  onChange={(e) => updateFilter("homeStatus", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="own">Own house</option>
                  <option value="rented">Rented</option>
                </select>
              </div>

              {/* Where to Live After Marriage */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Where to live after marriage</label>
                <select
                  value={filters.whereToLiveAfterMarriage}
                  onChange={(e) => updateFilter("whereToLiveAfterMarriage", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="with_family">With family</option>
                  <option value="separate">Separate house</option>
                  <option value="depends">Depends on discussion</option>
                </select>
              </div>
            </div>
          </section>

          {/* LIFESTYLE */}
          <section className="pb-5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-teal-500 rounded-full"></span>
              Lifestyle
            </h3>

            <div className="space-y-4">
              {/* Mother Tongue */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Mother tongue</label>
                <select
                  value={filters.motherTongue[0] || ""}
                  onChange={(e) => updateFilter("motherTongue", e.target.value ? [e.target.value] : [])}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="">Any language</option>
                  <option value="bangla">Bangla</option>
                  <option value="english">English</option>
                  <option value="urdu">Urdu</option>
                  <option value="arabic">Arabic</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>

              {/* English Speaking */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">English speaking</label>
                <select
                  value={filters.englishSpeaking}
                  onChange={(e) => updateFilter("englishSpeaking", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="fluent">Fluent</option>
                  <option value="moderate">Moderate</option>
                  <option value="basic">Basic</option>
                </select>
              </div>

              {/* Food Preference */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Food preference</label>
                <select
                  value={filters.foodPreference}
                  onChange={(e) => updateFilter("foodPreference", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="non_veg">Non-vegetarian</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>

              {/* Health Notes */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Health notes</label>
                <select
                  value={filters.healthNotes}
                  onChange={(e) => updateFilter("healthNotes", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="no_issues">No health issues</option>
                  <option value="minor">Minor health consideration</option>
                  <option value="disclosed">Will be disclosed</option>
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Blood group</label>
                <select
                  value={filters.bloodGroup}
                  onChange={(e) => updateFilter("bloodGroup", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
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
          </section>

          {/* MARRIAGE PLAN */}
          <section className="pb-5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-pink-500 rounded-full"></span>
              Marriage Plan
            </h3>

            <div className="space-y-4">
              {/* When to Marry */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">When to marry</label>
                <select
                  value={filters.whenToMarry}
                  onChange={(e) => updateFilter("whenToMarry", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Flexible</option>
                  <option value="soon">Within 3 months</option>
                  <option value="6months">Within 6 months</option>
                  <option value="year">Within a year</option>
                  <option value="later">After a year</option>
                </select>
              </div>

              {/* How to Communicate */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">How to communicate</label>
                <select
                  value={filters.howToCommunicate}
                  onChange={(e) => updateFilter("howToCommunicate", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Any method</option>
                  <option value="phone">Phone call</option>
                  <option value="message">Text message</option>
                  <option value="guardian">Through guardian</option>
                  <option value="meeting">Direct meeting</option>
                </select>
              </div>
            </div>
          </section>

          {/* TRUST & SAFETY */}
          <section className="pb-3">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-yellow-500 rounded-full"></span>
              Trust & Safety
            </h3>

            <div className="space-y-4">
              {/* Trust Checks */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Trust checks</label>
                <div className="space-y-2">
                  {[
                    { key: "verified", label: "✅ Verified profiles" },
                    { key: "id_verified", label: "🆔 ID verified" },
                    { key: "phone_verified", label: "📱 Phone verified" }
                  ].map(item => (
                    <label key={item.key} className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={filters.trustChecks.includes(item.key)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFilter("trustChecks", [...filters.trustChecks, item.key]);
                          } else {
                            updateFilter("trustChecks", filters.trustChecks.filter(v => v !== item.key));
                          }
                        }}
                        className="w-4 h-4 accent-yellow-600 rounded"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Photo Visibility */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Photo visibility</label>
                <select
                  value={filters.photoVisibility}
                  onChange={(e) => updateFilter("photoVisibility", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Any</option>
                  <option value="public">Public photo</option>
                  <option value="members">Visible to members</option>
                  <option value="request">On request</option>
                </select>
              </div>

              {/* Quick Filters */}
              <div className="space-y-2">
                {[
                  { key: "photoAdded", label: "📸 Photo added" },
                  { key: "recentlyActive", label: "🟢 Recently active" },
                  { key: "premiumOnly", label: "⭐ Premium only" }
                ].map(item => (
                  <label key={item.key} className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={filters[item.key as keyof FilterState] as boolean}
                      onChange={(e) => updateFilter(item.key as keyof FilterState, e.target.checked)}
                      className="w-4 h-4 accent-yellow-600 rounded"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Okay With Partner's Children */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Okay with partner's children?</label>
                <select
                  value={filters.okayWithPartnersChildren}
                  onChange={(e) => updateFilter("okayWithPartnersChildren", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="any">Doesn't matter</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="depends">Depends</option>
                </select>
              </div>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="space-y-3 pt-4 border-t-2 border-gray-200">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-4 text-center border border-red-100">
              <p className="text-3xl font-bold text-red-600">{resultCount}</p>
              <p className="text-xs text-gray-600 font-medium mt-1">profiles found</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button"
                onClick={clearAllFilters}
                className="py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-700 text-sm font-bold hover:bg-gray-50 transition-all"
              >
                Clear All
              </button>
              <button type="button"
                onClick={handleApply}
                disabled={!isValid()}
                className={`py-3 px-4 rounded-lg text-sm font-bold transition-all ${
                  isValid()
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isValid() ? "Search Profiles" : "Fill Required Fields"}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
