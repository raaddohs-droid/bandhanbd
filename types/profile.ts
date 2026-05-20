// ============================================
// BIYEKORI TYPE DEFINITIONS
// ============================================

export interface Profile {
  id: string;
  email: string;
  
  // Basic Demographics
  full_name: string;
  age: number;
  height: string;
  gender: "Male" | "Female";
  
  // Marital Status & Children
  marital_status: "Never Married" | "Divorced" | "Widowed" | "Awaiting Divorce";
  has_children?: "no" | "yes_with" | "yes_without";
  number_of_children?: number;
  
  // Religion
  religion: string;
  sect?: string;
  
  // Location
  city: string;
  district?: string;
  division?: string;
  country: string;
  nrb: boolean;
  nrb_country?: string;
  willing_to_relocate: boolean;
  
  // Education & Career
  education: string;
  profession: string;
  monthly_income: number;
  employment_status?: string;
  
  // Religious Practice
  prayers?: "5_times_daily" | "regularly" | "sometimes" | "not_particular";
  wears_hijab?: boolean;
  has_beard?: boolean;
  
  // Lifestyle & Habits
  smoking?: "never" | "occasionally" | "regularly";
  drinking?: "never" | "socially" | "regularly";
  diet?: string;
  
  // Physical Appearance
  complexion?: "Very Fair" | "Fair" | "Wheatish" | "Dusky" | "Dark";
  body_type?: "Slim" | "Average" | "Athletic" | "Heavy";
  wears_glasses: boolean;
  has_disability: boolean;
  disability_details?: string;
  blood_group?: string;
  
  // Family Background
  family_type?: "joint" | "nuclear";
  family_status?: string;
  family_values?: "traditional" | "moderate" | "liberal";
  father_alive: boolean;
  mother_alive: boolean;
  siblings_count?: number;
  
  // Profile Management
  photo_url?: string;
  about_me?: string;
  partner_preference?: string;
  is_verified: boolean;
  is_premium: boolean;
  profile_managed_by?: string;
  guardian_name?: string;
  guardian_phone?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  last_active_at: string;
}

export interface FilterState {
  // Basic Demographics
  ageMin: number;
  ageMax: number;
  heightMin: string;
  heightMax: string;
  lookingFor: "bride" | "groom";
  
  // Marital Status
  maritalStatus: string[];
  hasChildren: string;
  
  // Religion
  religion: string[];
  
  // Location
  cities: string[];
  livingStatus: string;
  nrbCountries: string[];
  willingToRelocate: boolean | null;
  
  // Education & Career
  education: string[];
  profession: string[];
  incomeMin: number;
  incomeMax: number;
  
  // Religious Practice
  prayers: string;
  hijab: string;
  beard: string;
  
  // Lifestyle
  smoking: string;
  drinking: string;
  diet: string[];
  
  // Physical Appearance
  complexion: string[];
  bodyType: string[];
  wearsGlasses: string;
  disability: string;
  bloodGroup: string[];
  
  // Family
  familyType: string;
  familyStatus: string[];
  familyValues: string[];
  parentsStatus: string[];
  
  // Bonus Filters
  verifiedOnly: boolean;
  premiumOnly: boolean;
  activeRecently: boolean;
  hasPhoto: boolean;
  newProfiles: boolean;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  profile_id: string;
  search_name: string;
  filters: FilterState;
  created_at: string;
}

// Height conversion utilities
export const heights = [
  "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", 
  "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", 
  "6'0\"", "6'1\"", "6'2\""
];

export function heightToInches(height: string): number {
  const match = height.match(/(\d+)'(\d+)"/);
  if (!match) return 0;
  const feet = parseInt(match[1]);
  const inches = parseInt(match[2]);
  return (feet * 12) + inches;
}

// Bangladesh cities
export const bdCities = [
  "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal",
  "Rangpur", "Mymensingh", "Comilla", "Gazipur", "Narayanganj", "Cox's Bazar",
  "Jessore", "Bogra", "Dinajpur", "Pabna", "Kushtia", "Tangail"
];

// NRB countries
export const nrbCountries = [
  "USA", "UK", "Canada", "Australia", "UAE", "Saudi Arabia",
  "Malaysia", "Singapore", "Qatar", "Kuwait", "Oman", "Bahrain",
  "Italy", "Germany", "France", "Spain", "Japan", "South Korea"
];

// Education levels
export const educationLevels = [
  "SSC/O-Level", "HSC/A-Level", "Diploma", "Bachelor's", 
  "Master's", "PhD", "MBBS/Medical", "Engineering", "MBA"
];

// Professions
export const professions = [
  "Doctor", "Engineer", "Teacher/Professor", "Govt Job", 
  "Private Job", "Business Owner", "IT Professional", "Lawyer",
  "Accountant", "Banker", "Defense Services", "Self-employed",
  "Student", "Homemaker", "Working Abroad"
];

// Religions
export const religions = [
  "Islam - Sunni", "Islam - Shia", "Islam - Ahmadiyya",
  "Hindu", "Christian", "Buddhist", "Other"
];
