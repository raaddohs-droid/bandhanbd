export default function Home() {
  return (
    <div className="min-h-screen bg-red-50 font-sans">
      {/* Header */}
      <header className="bg-red-700 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">💍 BandhanBD</h1>
        <nav className="flex gap-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Profiles</a>
          <a href="#" className="hover:underline">Login</a>
          <a href="#" className="hover:underline">Register</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-20 px-8 bg-red-700 text-white">
        <h2 className="text-4xl font-bold mb-4">Find Your Life Partner</h2>
        <p className="text-lg mb-8">Bangladesh's trusted matrimony platform</p>
        <a href="#" className="bg-white text-red-700 font-bold px-8 py-3 rounded-full hover:bg-red-100">
          Get Started
        </a>
      </section>

      {/* Features */}
      <section className="py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-xl font-bold mb-2">Create Profile</h3>
          <p className="text-gray-600">Set up your profile and find matches</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">Search Profiles</h3>
          <p className="text-gray-600">Filter by age, location and more</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-4xl mb-4">💌</div>
          <h3 className="text-xl font-bold mb-2">Send Interest</h3>
          <p className="text-gray-600">Connect with your perfect match</p>
        </div>
      </section>
    </div>
  );
}