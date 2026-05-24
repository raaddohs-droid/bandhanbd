"use client";
import { useState } from "react";

interface FilterState {
  // Basic
  gender?: string;
  minAge?: number;
  maxAge?: number;
  minHeight?: number;
  maxHeight?: number;
  maritalStatus?: string;
  
  // Location
  currentCity?: string;
  dhakaArea?: string;
  familyHomeDistrict?: string;
  relocationPreference?: string;
  
  // Education & Career
  educationLevel?: string;
  workSector?: string;
  profession?: string;
  minIncome?: number;
  maxIncome?: number;
  
  // Religious
  religion?: string;
  religiousPractice?: string;
  namazFrequency?: string;
  quranAbility?: string;
  hijabPreference?: string;
  beardPreference?: string;
  
  // Family
  familyType?: string;
  familyValues?: string;
  
  // Lifestyle
  dietPreference?: string;
  smoking?: string;
  drinking?: string;
  
  // Personality & Habits
  morningOrNight?: string;
  cookingInterest?: string;
  communicationStyle?: string;
  conflictResolution?: string;
  loveLanguage?: string;
  genderRolesView?: string;
  weekendPreference?: string;
}

interface MegaFilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
  isPremium?: boolean;
}

export default function MegaFilterPanel({ 
  onFilterChange, 
  resultCount,
  isPremium = false 
}: MegaFilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({});
  const [expandedSections, setExpandedSections] = useState<string[]>(['basic']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== undefined && v !== '').length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden sticky top-4">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-black">🔍 Smart Filters</h2>
          {!isPremium && (
            <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
              FREE
            </span>
          )}
        </div>
        <p className="text-sm text-rose-100">
          {resultCount} profiles found
        </p>
        {activeFilterCount > 0 && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold">
              {activeFilterCount} filters active
            </span>
            <button
              onClick={clearFilters}
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className="p-5 max-h-[calc(100vh-200px)] overflow-y-auto">

        {/* BASIC FILTERS - Always visible for FREE users */}
        <FilterSection
          title="Basic Info"
          icon="👤"
          isExpanded={expandedSections.includes('basic')}
          onToggle={() => toggleSection('basic')}
          isFree={true}
        >
          <div className="space-y-4">
            {/* Gender */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Looking For
              </label>
              <select
                value={filters.gender || ''}
                onChange={(e) => updateFilter('gender', e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
              >
                <option value="">All</option>
                <option value="Female">Bride</option>
                <option value="Male">Groom</option>
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Age Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minAge || ''}
                  onChange={(e) => updateFilter('minAge', parseInt(e.target.value))}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxAge || ''}
                  onChange={(e) => updateFilter('maxAge', parseInt(e.target.value))}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none"
                />
              </div>
            </div>

            {/* Height Range */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Height (feet)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={filters.minHeight || ''}
                  onChange={(e) => updateFilter('minHeight', parseInt(e.target.value))}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none"
                >
                  <option value="">Min</option>
                  {[4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0, 6.1, 6.2].map(h => (
                    <option key={h} value={h}>{h}'</option>
                  ))}
                </select>
                <select
                  value={filters.maxHeight || ''}
                  onChange={(e) => updateFilter('maxHeight', parseInt(e.target.value))}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none"
                >
                  <option value="">Max</option>
                  {[4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0, 6.1, 6.2].map(h => (
                    <option key={h} value={h}>{h}'</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Marital Status
              </label>
              <select
                value={filters.maritalStatus || ''}
                onChange={(e) => updateFilter('maritalStatus', e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none"
              >
                <option value="">All</option>
                <option value="Never married">Never Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Current City
              </label>
              <select
                value={filters.currentCity || ''}
                onChange={(e) => updateFilter('currentCity', e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none"
              >
                <option value="">All Cities</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Barishal">Barishal</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>
            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Education Level
              </label>
              <select
                value={filters.educationLevel || ''}
                onChange={(e) => updateFilter('educationLevel', e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none"
              >
                <option value="">All</option>
                <option value="HSC">HSC</option>
                <option value="Bachelor">Bachelor's</option>
                <option value="Masters">Master's</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
              </select>
            </div>
          </div>
        </FilterSection>

        {/* LOCATION FILTERS - Premium */}
        <FilterSection
          title="Location Preferences"
          icon="📍"
          isExpanded={expandedSections.includes('location')}
          onToggle={() => toggleSection('location')}
          isPremium={true}
          isLocked={!isPremium}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Dhaka Area
              </label>
              <select
                value={filters.dhakaArea || ''}
                onChange={(e) => updateFilter('dhakaArea', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">All Areas</option>
                <option value="Gulshan">Gulshan</option>
                <option value="Banani">Banani</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Uttara">Uttara</option>
                <option value="Mirpur">Mirpur</option>
                <option value="Mohammadpur">Mohammadpur</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Family Home District
              </label>
              <input
                type="text"
                placeholder="e.g., Comilla, Noakhali"
                value={filters.familyHomeDistrict || ''}
                onChange={(e) => updateFilter('familyHomeDistrict', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Willing to Relocate
              </label>
              <select
                value={filters.relocationPreference || ''}
                onChange={(e) => updateFilter('relocationPreference', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>
          </div>
        </FilterSection>

        {/* CAREER FILTERS - Premium */}
        <FilterSection
          title="Career & Income"
          icon="💼"
          isExpanded={expandedSections.includes('career')}
          onToggle={() => toggleSection('career')}
          isPremium={true}
          isLocked={!isPremium}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Work Sector
              </label>
              <select
                value={filters.workSector || ''}
                onChange={(e) => updateFilter('workSector', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">All</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Business">Business</option>
                <option value="NGO">NGO</option>
                <option value="Self-employed">Self-employed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Profession
              </label>
              <input
                type="text"
                placeholder="e.g., Doctor, Engineer, Teacher"
                value={filters.profession || ''}
                onChange={(e) => updateFilter('profession', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Monthly Income (৳)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minIncome || ''}
                  onChange={(e) => updateFilter('minIncome', parseInt(e.target.value))}
                  disabled={!isPremium}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxIncome || ''}
                  onChange={(e) => updateFilter('maxIncome', parseInt(e.target.value))}
                  disabled={!isPremium}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </FilterSection>

        {/* RELIGIOUS FILTERS - Premium */}
        <FilterSection
          title="Religious Practice"
          icon="🕌"
          isExpanded={expandedSections.includes('religious')}
          onToggle={() => toggleSection('religious')}
          isPremium={true}
          isLocked={!isPremium}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Practice Level
              </label>
              <select
                value={filters.religiousPractice || ''}
                onChange={(e) => updateFilter('religiousPractice', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">All</option>
                <option value="Very religious">Very Religious</option>
                <option value="Religious">Religious</option>
                <option value="Moderate">Moderate</option>
                <option value="Liberal">Liberal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Namaz Frequency
              </label>
              <select
                value={filters.namazFrequency || ''}
                onChange={(e) => updateFilter('namazFrequency', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="5 times daily">5 Times Daily</option>
                <option value="Regularly">Regularly</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Rarely">Rarely</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Quran Reading
              </label>
              <select
                value={filters.quranAbility || ''}
                onChange={(e) => updateFilter('quranAbility', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Can read fluently">Fluent</option>
                <option value="Can read with mistakes">Can Read</option>
                <option value="Learning">Learning</option>
                <option value="Cannot read">Cannot Read</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Hijab Preference (for Bride)
              </label>
              <select
                value={filters.hijabPreference || ''}
                onChange={(e) => updateFilter('hijabPreference', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Always">Always Wears</option>
                <option value="Sometimes">Sometimes</option>
                <option value="No">Doesn't Wear</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Beard Preference (for Groom)
              </label>
              <select
                value={filters.beardPreference || ''}
                onChange={(e) => updateFilter('beardPreference', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Full beard">Full Beard</option>
                <option value="Trimmed">Trimmed</option>
                <option value="No beard">Clean Shaven</option>
              </select>
            </div>
          </div>
        </FilterSection>

        {/* FAMILY FILTERS - Premium */}
        <FilterSection
          title="Family Background"
          icon="👨‍👩‍👧‍👦"
          isExpanded={expandedSections.includes('family')}
          onToggle={() => toggleSection('family')}
          isPremium={true}
          isLocked={!isPremium}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Family Type
              </label>
              <select
                value={filters.familyType || ''}
                onChange={(e) => updateFilter('familyType', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Nuclear">Nuclear</option>
                <option value="Joint">Joint</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Family Values
              </label>
              <select
                value={filters.familyValues || ''}
                onChange={(e) => updateFilter('familyValues', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Traditional">Traditional</option>
                <option value="Moderate">Moderate</option>
                <option value="Liberal">Liberal</option>
              </select>
            </div>
          </div>
        </FilterSection>

        {/* LIFESTYLE FILTERS - Premium */}
        <FilterSection
          title="Lifestyle & Habits"
          icon="🌟"
          isExpanded={expandedSections.includes('lifestyle')}
          onToggle={() => toggleSection('lifestyle')}
          isPremium={true}
          isLocked={!isPremium}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Diet Preference
              </label>
              <select
                value={filters.dietPreference || ''}
                onChange={(e) => updateFilter('dietPreference', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-vegetarian">Non-vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Smoking
              </label>
              <select
                value={filters.smoking || ''}
                onChange={(e) => updateFilter('smoking', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Never">Never</option>
                <option value="Occasionally">Occasionally</option>
                <option value="Regularly">Regularly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Drinking
              </label>
              <select
                value={filters.drinking || ''}
                onChange={(e) => updateFilter('drinking', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Never">Never</option>
                <option value="Socially">Socially</option>
                <option value="Regularly">Regularly</option>
              </select>
            </div>
          </div>
        </FilterSection>

        {/* PERSONALITY FILTERS - Premium */}
        <FilterSection
          title="Personality & Values"
          icon="💭"
          isExpanded={expandedSections.includes('personality')}
          onToggle={() => toggleSection('personality')}
          isPremium={true}
          isLocked={!isPremium}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Morning/Night Person
              </label>
              <select
                value={filters.morningOrNight || ''}
                onChange={(e) => updateFilter('morningOrNight', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Morning person">Morning Person</option>
                <option value="Night owl">Night Owl</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Cooking Interest
              </label>
              <select
                value={filters.cookingInterest || ''}
                onChange={(e) => updateFilter('cookingInterest', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Loves cooking">Loves Cooking</option>
                <option value="Enjoys sometimes">Enjoys Sometimes</option>
                <option value="Can cook basics">Can Cook Basics</option>
                <option value="Cannot cook">Cannot Cook</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Communication Style
              </label>
              <select
                value={filters.communicationStyle || ''}
                onChange={(e) => updateFilter('communicationStyle', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Direct">Direct & Open</option>
                <option value="Diplomatic">Diplomatic</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Conflict Resolution
              </label>
              <select
                value={filters.conflictResolution || ''}
                onChange={(e) => updateFilter('conflictResolution', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Discuss calmly">Discuss Calmly</option>
                <option value="Need time">Need Time to Think</option>
                <option value="Seek mediation">Seek Mediation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Gender Roles View
              </label>
              <select
                value={filters.genderRolesView || ''}
                onChange={(e) => updateFilter('genderRolesView', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Traditional">Traditional</option>
                <option value="Moderate">Moderate</option>
                <option value="Equal partnership">Equal Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Weekend Preference
              </label>
              <select
                value={filters.weekendPreference || ''}
                onChange={(e) => updateFilter('weekendPreference', e.target.value)}
                disabled={!isPremium}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none disabled:opacity-50"
              >
                <option value="">Any</option>
                <option value="Adventure">Adventure & Outings</option>
                <option value="Home">Stay Home & Relax</option>
                <option value="Social">Social Gatherings</option>
                <option value="Mixed">Mix of Both</option>
              </select>
            </div>
          </div>
        </FilterSection>

        {/* Premium Upgrade CTA */}
        {!isPremium && (
          <div className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Unlock All Filters
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Get access to 40+ advanced filters including personality matching, lifestyle preferences, and AI compatibility scoring
              </p>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all w-full">
                Upgrade to Premium - ৳699/month
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Filter Section Component
interface FilterSectionProps {
  title: string;
  icon: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isPremium?: boolean;
  isFree?: boolean;
  isLocked?: boolean;
}

function FilterSection({ 
  title, 
  icon, 
  isExpanded, 
  onToggle, 
  children,
  isPremium = false,
  isFree = false,
  isLocked = false
}: FilterSectionProps) {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
          isExpanded 
            ? 'bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200' 
            : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="font-bold text-gray-900">{title}</span>
          {isPremium && !isFree && (
            <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
              PRO
            </span>
          )}
        </div>
        <span className="text-gray-400">
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>
      
      {isExpanded && (
        <div className={`mt-3 p-4 bg-white rounded-xl border-2 border-gray-100 ${isLocked ? 'relative' : ''}`}>
          {isLocked && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔒</span>
                </div>
                <p className="text-sm font-bold text-gray-900 mb-1">Premium Only</p>
                <p className="text-xs text-gray-600">Upgrade to unlock</p>
              </div>
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
}