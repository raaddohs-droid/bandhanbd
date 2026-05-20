"use client";
import { useState } from "react";
import FilterPanel from "@/components/profiles/FilterPanel";
import ProfileCard from "@/components/profiles/ProfileCard";

export default function ProfilesPage() {
  const sampleProfiles = [
    {
      id: "1",
      lookingFor: "bride" as const,
      name: "Ayesha Rahman",
      age: 26,
      height: "5'4\"",
      location: "Dhaka, Gulshan",
      education: "MBA",
      profession: "Bank Officer",
      religion: "Islam",
      maritalStatus: "Never married",
      photoUrl: "",
      isVerified: true,
      isPremium: true,
      isPhotoVisible: false,
      lastActive: "Active 2h ago",
      managedBy: "Parents",
      familyType: "Nuclear",
      religiousPractice: "Religious"
    },
    {
      id: "2",
      lookingFor: "bride" as const,
      name: "Fatima Ahmed",
      age: 24,
      height: "5'3\"",
      location: "Chittagong",
      education: "BBA",
      profession: "Teacher",
      religion: "Islam",
      maritalStatus: "Never married",
      photoUrl: "",
      isVerified: true,
      isPremium: false,
      isPhotoVisible: false,
      lastActive: "Active today",
      managedBy: "Self",
      familyType: "Joint",
      religiousPractice: "Very religious"
    },
    {
      id: "3",
      lookingFor: "bride" as const,
      name: "Nusrat Jahan",
      age: 28,
      height: "5'5\"",
      location: "Dhaka, Banani",
      education: "MBBS",
      profession: "Doctor",
      religion: "Islam",
      maritalStatus: "Never married",
      photoUrl: "",
      isVerified: true,
      isPremium: true,
      isPhotoVisible: false,
      lastActive: "Active 1h ago",
      managedBy: "Parents",
      familyType: "Nuclear",
      religiousPractice: "Religious"
    },
    {
      id: "4",
      lookingFor: "bride" as const,
      name: "Tasnuva Islam",
      age: 25,
      height: "5'2\"",
      location: "Sylhet",
      education: "B.Sc Engineering",
      profession: "Software Engineer",
      religion: "Islam",
      maritalStatus: "Never married",
      photoUrl: "",
      isVerified: false,
      isPremium: false,
      isPhotoVisible: false,
      lastActive: "5h ago",
      managedBy: "Sibling",
      familyType: "Nuclear",
      religiousPractice: "Moderate"
    },
    {
      id: "5",
      lookingFor: "bride" as const,
      name: "Sabrina Khan",
      age: 27,
      height: "5'6\"",
      location: "Dhaka, Uttara",
      education: "Masters",
      profession: "Research Analyst",
      religion: "Islam",
      maritalStatus: "Never married",
      photoUrl: "",
      isVerified: true,
      isPremium: true,
      isPhotoVisible: false,
      lastActive: "30m ago",
      managedBy: "Parents",
      familyType: "Joint",
      religiousPractice: "Religious"
    },
    {
      id: "6",
      lookingFor: "bride" as const,
      name: "Anika Hassan",
      age: 23,
      height: "5'1\"",
      location: "Rajshahi",
      education: "BA English",
      profession: "Content Writer",
      religion: "Islam",
      maritalStatus: "Never married",
      photoUrl: "",
      isVerified: false,
      isPremium: false,
      isPhotoVisible: false,
      lastActive: "Yesterday",
      managedBy: "Parents",
      familyType: "Nuclear",
      religiousPractice: "Moderate"
    }
  ];

  const [filteredProfiles, setFilteredProfiles] = useState(sampleProfiles);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (filters: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredProfiles(sampleProfiles);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white border-b-2 border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-black text-gray-900">Find Your Perfect Match</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel 
              onFilterChange={handleFilterChange}
              resultCount={filteredProfiles.length}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-black text-gray-900">
                {filteredProfiles.length} Profiles Found
              </h2>
            </div>

            {isLoading && <div className="text-center py-20">Loading...</div>}
            
            {!isLoading && (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProfiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 text-center">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">You've viewed all profiles!</h3>
                  <p className="text-gray-600 mb-4">Try adjusting filters for more matches</p>
                  <button className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-xl font-bold">
                    🔄 Adjust Filters
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}