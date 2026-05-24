import { getProfiles } from '@/lib/supabase-server'
import ProfileCard from '@/components/profiles/ProfileCard'

// Force dynamic rendering - no caching
export const revalidate = 0
export const dynamic = 'force-dynamic'

const PROFILES_PER_PAGE = 12

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProfilesPage({ searchParams }: PageProps) {
  // FIX: Await the searchParams Promise (Next.js 15+ requirement)
  const params = await searchParams
  
  // Get all profiles from database
  const allProfiles = await getProfiles()
  
  // Parse search params
  const genderFilter = typeof params.gender === 'string' ? params.gender : ''
  const pageParam = typeof params.page === 'string' ? params.page : '1'
  const currentPage = parseInt(pageParam, 10) || 1
  
  // Apply gender filter
  let filteredProfiles = allProfiles
  if (genderFilter && genderFilter !== '') {
    filteredProfiles = allProfiles.filter(profile => profile.gender === genderFilter)
  }
  
  // Calculate gender counts for buttons
  const genderCounts = allProfiles.reduce((acc, p) => {
    const g = p.gender || 'NULL'
    acc[g] = (acc[g] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  // Apply pagination
  const totalFilteredProfiles = filteredProfiles.length
  const totalPages = Math.ceil(totalFilteredProfiles / PROFILES_PER_PAGE)
  const startIndex = (currentPage - 1) * PROFILES_PER_PAGE
  const endIndex = startIndex + PROFILES_PER_PAGE
  const paginatedProfiles = filteredProfiles.slice(startIndex, endIndex)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Filter Buttons */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-rose-600">Browse Profiles</h1>
              <p className="text-sm text-gray-500">Find your perfect match from {allProfiles.length} verified profiles</p>
            </div>
            
            <div className="flex gap-2">
              <a 
                href="/profiles"
                className={`px-6 py-2 rounded-full font-medium transition ${
                  !genderFilter 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({allProfiles.length})
              </a>
              <a 
                href="/profiles?gender=Female"
                className={`px-6 py-2 rounded-full font-medium transition ${
                  genderFilter === 'Female' 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                👰 Brides ({genderCounts['Female'] || 0})
              </a>
              <a 
                href="/profiles?gender=Male"
                className={`px-6 py-2 rounded-full font-medium transition ${
                  genderFilter === 'Male' 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🤵 Grooms ({genderCounts['Male'] || 0})
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-gray-600 text-lg">
          <strong>{totalFilteredProfiles}</strong> Profile{totalFilteredProfiles !== 1 ? 's' : ''} Found
          {genderFilter && (
            <span className="text-rose-600 ml-2">
              ({genderFilter === 'Female' ? '👰 Brides' : '🤵 Grooms'})
            </span>
          )}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Profile Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        {paginatedProfiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No profiles found matching your criteria.</p>
            <a 
              href="/profiles" 
              className="mt-4 inline-block text-rose-600 hover:text-rose-700 font-medium"
            >
              ← View all profiles
            </a>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {/* Previous Button */}
            {currentPage > 1 && (
              <a
                href={`/profiles?${new URLSearchParams({
                  ...(genderFilter && { gender: genderFilter }),
                  page: (currentPage - 1).toString()
                }).toString()}`}
                className="px-4 py-2 rounded font-medium bg-white text-gray-700 hover:bg-gray-100 border"
              >
                ← Previous
              </a>
            )}

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const params = new URLSearchParams()
              if (genderFilter) params.set('gender', genderFilter)
              params.set('page', page.toString())
              const href = `/profiles?${params.toString()}`
              
              return (
                <a
                  key={page}
                  href={href}
                  className={`px-4 py-2 rounded font-medium transition ${
                    page === currentPage
                      ? 'bg-rose-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border'
                  }`}
                >
                  {page}
                </a>
              )
            })}

            {/* Next Button */}
            {currentPage < totalPages && (
              <a
                href={`/profiles?${new URLSearchParams({
                  ...(genderFilter && { gender: genderFilter }),
                  page: (currentPage + 1).toString()
                }).toString()}`}
                className="px-4 py-2 rounded font-medium bg-white text-gray-700 hover:bg-gray-100 border"
              >
                Next →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
