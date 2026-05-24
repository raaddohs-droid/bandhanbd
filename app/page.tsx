'use client'

import { SchemaMarkup } from './schema-markup'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'bn'>('en')
  const [showChatbot, setShowChatbot] = useState(false)
  const [showEngagementPopup, setShowEngagementPopup] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{type: 'bot' | 'user', text: string}>>([])
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [headlineIndex, setHeadlineIndex] = useState(0)

  // Rotating headlines - trust & verification focused
  const headlines = {
    en: [
      "100% NID Verified Profiles • Trusted by 10,000+ Families",
      "Better Than Traditional Ghotok • No Fees, Direct Contact", 
      "Free Forever • Dhaka, Chittagong, Sylhet & All Districts",
      "Family-Approved Matching • পরিবার দ্বারা অনুমোদিত"
    ],
    bn: [
      "১০০% এনআইডি যাচাইকৃত • ১০,০০০+ পরিবার বিশ্বাস করে",
      "ঘটকের চেয়ে ভাল • কোন ফি নেই, সরাসরি যোগাযোগ",
      "চিরকাল বিনামূল্যে • ঢাকা, চট্টগ্রাম, সিলেট সব জেলায়",
      "পরিবার অনুমোদিত ম্যাচিং • Family-Approved"
    ]
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines[lang].length)
    }, 4000)
    return () => clearInterval(interval)
  }, [lang])

  // Exit intent - only once per session
  useEffect(() => {
    let hasShown = sessionStorage.getItem('exitShown')
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && !showExitIntent) {
        setShowExitIntent(true)
        sessionStorage.setItem('exitShown', 'true')
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [showExitIntent])

  // Engagement popup - 2 minutes delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showChatbot && !showExitIntent && !sessionStorage.getItem('engagementShown')) {
        setShowEngagementPopup(true)
        sessionStorage.setItem('engagementShown', 'true')
      }
    }, 120000)
    return () => clearTimeout(timer)
  }, [showChatbot, showExitIntent])

  const handleQuickAnswer = (question: string) => {
    setChatMessages([...chatMessages, 
      { type: 'user', text: question },
      { type: 'bot', text: getQuickAnswer(question) }
    ])
  }

  const getQuickAnswer = (question: string) => {
    const answers: {[key: string]: string} = {
      'How are profiles verified?': 'Every profile undergoes Phone OTP, NID verification, and Education/Profession checks. We manually review all documents to ensure 100% authenticity.',
      'Is it really free?': 'Yes! Creating a profile and browsing matches is 100% free forever. No hidden charges, no premium fees.',
      'How does matching work?': 'We analyze personality traits, values, education, profession, and family background to suggest compatible matches from your preferred location.',
      'Can I hide my profile?': 'Absolutely! You control who sees your profile and photos. Enable privacy mode anytime from settings.',
      'প্রোফাইল কিভাবে যাচাই করা হয়?': 'প্রতিটি প্রোফাইল ফোন OTP, এনআইডি যাচাইকরণ এবং শিক্ষা/পেশা চেক করা হয়। আমরা ১০০% সত্যতা নিশ্চিত করতে সব নথি ম্যানুয়ালি পর্যালোচনা করি।',
      'এটা কি সত্যিই বিনামূল্যে?': 'হ্যাঁ! প্রোফাইল তৈরি এবং ম্যাচ দেখা চিরকাল ১০০% বিনামূল্যে। কোন লুকানো চার্জ নেই।',
      'ম্যাচিং কিভাবে কাজ করে?': 'আমরা ব্যক্তিত্ব, মূল্যবোধ, শিক্ষা, পেশা এবং পারিবারিক পটভূমি বিশ্লেষণ করে আপনার পছন্দের এলাকা থেকে সামঞ্জস্যপূর্ণ ম্যাচ সুপারিশ করি।',
      'আমি কি প্রোফাইল লুকাতে পারি?': 'অবশ্যই! আপনি নিয়ন্ত্রণ করেন কে আপনার প্রোফাইল এবং ফটো দেখবে। সেটিংস থেকে যেকোনো সময় গোপনীয়তা মোড সক্ষম করুন।'
    }
    return answers[question] || "Great question! Our support team can help. Click 'Get Started' to register and chat with us directly."
  }

  const content = {
    en: {
      hero: {
        title: "Find Your Perfect Life Partner",
        cta1: "Get Started Free",
        cta2: "Browse Profiles",
        trust: "100% Verified • No Ghotok Fees • 10,000+ Active Users • All Districts"
      },
      features: [
        {
          title: "100% Verified Profiles",
          desc: "Every profile verified with NID, phone, and family details. Zero fake accounts, complete safety guaranteed"
        },
        {
          title: "Better Than Traditional Ghotok",
          desc: "No ghotok fees, no middleman costs. Direct contact with verified families - modern, safe, and completely free"
        },
        {
          title: "Trusted by 10,000+ Families",
          desc: "Join thousands of Muslim families who found their life partners through verified, safe matching"
        },
        {
          title: "All Bangladesh Districts",
          desc: "Dhaka, Chittagong, Sylhet, Rajshahi, Khulna - verified profiles from every district and division"
        }
      ],
      verification: [
        {
          title: "Phone & NID Verified",
          desc: "Every profile verified with SMS OTP and National ID. Zero fake accounts guaranteed.",
          checks: ["Phone OTP", "National ID", "Face Verification"]
        },
        {
          title: "Education & Career Verified",
          desc: "Degree certificates and employment status confirmed before approval.",
          checks: ["Degree Verified", "Employment Confirmed", "Income Validated"]
        }
      ],
      privacy: {
        title: "Bank-Level Privacy Protection",
        desc: "256-bit encryption. Control who sees your profile and photos. Delete data anytime."
      },
      stats: [
        { number: "10,000+", label: "Active Profiles" },
        { number: "100%", label: "Verified Users" },
        { number: "2,400+", label: "Married in 2024" },
        { number: "4.8/5", label: "Average Rating" }
      ],
      howItWorks: {
        title: "How It Works",
        steps: [
          { num: "1", title: "Create Your Profile", desc: "Sign up in 2 minutes with verification" },
          { num: "2", title: "Browse Verified Matches", desc: "Find compatible profiles from your district" },
          { num: "3", title: "Connect & Meet", desc: "Chat, video call, and meet your match" }
        ]
      },
      testimonials: [
        { name: "Rahul & Priya", location: "Dhaka", text: "Found perfect compatibility we never knew existed. Married June 2024!", rating: 5 },
        { name: "Amit & Sneha", location: "Chittagong", text: "AI matching was incredibly accurate. We're so grateful!", rating: 5 },
        { name: "Kabir & Nisha", location: "Sylhet", text: "Better than any matchmaker we tried. Highly recommend!", rating: 5 }
      ],
      finalCta: {
        title: "Ready to Find Your Perfect Match?",
        subtitle: "Join thousands of verified users finding love through AI-powered matching",
        cta: "Start Free Today"
      },
      chatbot: {
        quickQuestions: [
          "How are profiles verified?",
          "Is it really free?",
          "How does matching work?",
          "Can I hide my profile?"
        ]
      }
    },
    bn: {
      hero: {
        title: "আপনার পারফেক্ট জীবনসঙ্গী খুঁজুন",
        cta1: "বিনামূল্যে শুরু করুন",
        cta2: "প্রোফাইল দেখুন",
        trust: "১০০% যাচাইকৃত • কোন ঘটক ফি নেই • ১০,০০০+ ব্যবহারকারী • সব জেলা"
      },
      features: [
        {
          title: "১০০% যাচাইকৃত প্রোফাইল",
          desc: "প্রতিটি প্রোফাইল এনআইডি, ফোন এবং পরিবার দিয়ে যাচাই। সম্পূর্ণ নিরাপদ, কোন নকল নেই"
        },
        {
          title: "ঐতিহ্যবাহী ঘটকের চেয়ে ভাল",
          desc: "কোন ঘটক ফি নেই, কোন মধ্যস্থতাকারী খরচ নেই। যাচাইকৃত পরিবারের সাথে সরাসরি যোগাযোগ - আধুনিক, নিরাপদ এবং সম্পূর্ণ বিনামূল্যে"
        },
        {
          title: "১০,০০০+ পরিবার বিশ্বাস করে",
          desc: "হাজারো মুসলিম পরিবার যারা যাচাইকৃত ম্যাচিং এর মাধ্যমে জীবনসঙ্গী পেয়েছেন"
        },
        {
          title: "সব জেলা ও বিভাগ",
          desc: "ঢাকা, চট্টগ্রাম, সিলেট, রাজশাহী, খুলনা - প্রতিটি জেলা থেকে যাচাইকৃত প্রোফাইল"
        }
      ],
      verification: [
        {
          title: "ফোন এবং এনআইডি যাচাইকৃত",
          desc: "প্রতিটি প্রোফাইল SMS OTP এবং জাতীয় পরিচয়পত্র দিয়ে যাচাই করা",
          checks: ["ফোন OTP", "জাতীয় আইডি", "মুখ যাচাইকরণ"]
        },
        {
          title: "শিক্ষা এবং ক্যারিয়ার যাচাইকৃত",
          desc: "অনুমোদনের আগে ডিগ্রি এবং চাকরির স্থিতি নিশ্চিত করা হয়",
          checks: ["ডিগ্রি যাচাই", "চাকরি নিশ্চিত", "আয় যাচাই"]
        }
      ],
      privacy: {
        title: "ব্যাংক-স্তরের গোপনীয়তা সুরক্ষা",
        desc: "২৫৬-বিট এনক্রিপশন। আপনার প্রোফাইল কে দেখবে তা নিয়ন্ত্রণ করুন।"
      },
      stats: [
        { number: "১০,০০০+", label: "সক্রিয় প্রোফাইল" },
        { number: "১০০%", label: "যাচাইকৃত ব্যবহারকারী" },
        { number: "২,৪০০+", label: "২০২৪ সালে বিবাহিত" },
        { number: "৪.৮/৫", label: "গড় রেটিং" }
      ],
      howItWorks: {
        title: "এটি কিভাবে কাজ করে",
        steps: [
          { num: "১", title: "প্রোফাইল তৈরি করুন", desc: "২ মিনিটে সাইন আপ করুন" },
          { num: "২", title: "যাচাইকৃত ম্যাচ দেখুন", desc: "আপনার জেলা থেকে সামঞ্জস্যপূর্ণ প্রোফাইল খুঁজুন" },
          { num: "৩", title: "সংযোগ করুন", desc: "চ্যাট করুন এবং দেখা করুন" }
        ]
      },
      testimonials: [
        { name: "রাহুল ও প্রিয়া", location: "ঢাকা", text: "নিখুঁত সামঞ্জস্যতা পেয়েছি। জুন ২০২৪ তে বিয়ে হয়েছে!", rating: 5 },
        { name: "অমিত ও স্নেহা", location: "চট্টগ্রাম", text: "এআই ম্যাচিং অবিশ্বাস্যভাবে সঠিক ছিল!", rating: 5 },
        { name: "কবির ও নিশা", location: "সিলেট", text: "যে কোনো ঘটকের চেয়ে ভাল। সুপারিশ করি!", rating: 5 }
      ],
      finalCta: {
        title: "আপনার পারফেক্ট ম্যাচ খুঁজতে প্রস্তুত?",
        subtitle: "হাজারো যাচাইকৃত ব্যবহারকারী এআই-চালিত ম্যাচিং এর মাধ্যমে ভালোবাসা খুঁজছেন",
        cta: "আজই বিনামূল্যে শুরু করুন"
      },
      chatbot: {
        quickQuestions: [
          "প্রোফাইল কিভাবে যাচাই করা হয়?",
          "এটা কি সত্যিই বিনামূল্যে?",
          "ম্যাচিং কিভাবে কাজ করে?",
          "আমি কি প্রোফাইল লুকাতে পারি?"
        ]
      }
    }
  }

  const t = content[lang]

  return (
    <>
      <SchemaMarkup />
      <Navbar lang={lang} setLang={setLang} />
      
      <div className="min-h-screen bg-white">
        
        {/* HERO SECTION - WEDDING COLORS */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 via-rose-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Brand Name - Clear and Prominent */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                Biye Kori
              </h2>
              <p className="text-xl text-amber-700 font-bold tracking-wide">MATRIMONY</p>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
              {t.hero.title}
            </h1>

            {/* Rotating Subheading - Subtle */}
            <div className="relative h-16 mb-10 overflow-hidden">
              {headlines[lang].map((headline, idx) => (
                <p
                  key={idx}
                  className={`absolute inset-0 text-xl sm:text-2xl text-gray-700 transition-all duration-700 ${
                    idx === headlineIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {headline}
                </p>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/register"
                className="px-10 py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-bold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl"
              >
                {t.hero.cta1}
              </Link>
              <Link 
                href="/profiles"
                className="px-10 py-5 bg-white text-rose-600 text-lg font-bold rounded-lg border-2 border-rose-500 hover:bg-pink-50 transition-colors shadow-lg"
              >
                {t.hero.cta2}
              </Link>
            </div>

            {/* Trust Line */}
            <p className="text-sm text-gray-600">{t.hero.trust}</p>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.features.map((feature, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                    {['🧠', '💰', '📈', '⚡'][idx]}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VERIFICATION SECTION */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50/50 to-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">
              {lang === 'en' ? 'Triple Verification System' : 'ট্রিপল যাচাইকরণ সিস্টেম'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {t.verification.map((verify, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                      {idx === 0 ? '🛡️' : '🎓'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{verify.title}</h3>
                      <p className="text-gray-700">{verify.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {verify.checks.map((check, cidx) => (
                      <span key={cidx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                        ✓ {check}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy - Centered */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-pink-100 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-4xl">
                🔐
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.privacy.title}</h3>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">{t.privacy.desc}</p>
            </div>

            {/* Free Identity Hidden Communication - Centered */}
            <div className="mt-8 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-2xl p-10 shadow-lg border border-pink-100 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-xl flex items-center justify-center text-4xl">
                🎭
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'en' ? 'Free Identity-Hidden Communication' : 'বিনামূল্যে পরিচয়-গোপন যোগাযোগ'}
              </h3>
              <p className="text-gray-800 text-lg max-w-2xl mx-auto mb-6">
                {lang === 'en' 
                  ? 'Talk freely before revealing your identity. Voice & video calls with complete privacy until you\'re ready.' 
                  : 'আপনার পরিচয় প্রকাশের আগে স্বাধীনভাবে কথা বলুন। সম্পূর্ণ গোপনীয়তা সহ ভয়েস এবং ভিডিও কল।'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-5 py-2 bg-white text-purple-700 rounded-full text-sm font-bold border-2 border-purple-200 shadow-sm">
                  🎤 {lang === 'en' ? 'Voice Calls' : 'ভয়েস কল'}
                </span>
                <span className="px-5 py-2 bg-white text-purple-700 rounded-full text-sm font-bold border-2 border-purple-200 shadow-sm">
                  📹 {lang === 'en' ? 'Video Calls' : 'ভিডিও কল'}
                </span>
                <span className="px-5 py-2 bg-white text-purple-700 rounded-full text-sm font-bold border-2 border-purple-200 shadow-sm">
                  🆓 {lang === 'en' ? '100% Free' : '১০০% বিনামূল্যে'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {t.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-5xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-pink-100 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">{t.howItWorks.title}</h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              {t.howItWorks.steps.map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    {/* Blink animation ring - sequential delays */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 rounded-full animate-blink-ring"
                      style={{ animationDelay: `${idx * 1.5}s` }}
                    ></div>
                    {/* Main circle */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-xl">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-700">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50/50 to-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">
              {lang === 'en' ? 'Success Stories' : 'সফলতার গল্প'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {t.testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-800 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-extrabold text-white mb-6">{t.finalCta.title}</h2>
            <p className="text-xl text-pink-100 mb-10">{t.finalCta.subtitle}</p>
            <Link 
              href="/register"
              className="inline-block px-12 py-6 bg-white text-rose-600 text-xl font-bold rounded-lg hover:bg-pink-50 transition-colors shadow-2xl"
            >
              {t.finalCta.cta}
            </Link>
          </div>
        </section>
      </div>

      {/* CHATBOT - MINIMAL */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full shadow-2xl hover:from-pink-600 hover:to-rose-600 transition-all z-50 flex items-center justify-center text-2xl"
      >
        {showChatbot ? '✕' : '💬'}
      </button>

      {showChatbot && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-pink-200 z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 text-white">
            <h3 className="font-bold text-lg">{lang === 'en' ? 'How can we help?' : 'কিভাবে সাহায্য করতে পারি?'}</h3>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : 'bg-gray-100 text-gray-900'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {chatMessages.length === 0 && (
              <div className="space-y-2">
                {t.chatbot.quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAnswer(q)}
                    className="w-full text-left p-3 bg-pink-50 hover:bg-pink-100 rounded-lg text-sm text-gray-800 transition-colors border border-pink-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <Link
              href="/register"
              className="block w-full text-center py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all"
            >
              {lang === 'en' ? 'Get Started' : 'শুরু করুন'}
            </Link>
          </div>
        </div>
      )}

      {/* EXIT POPUP - CLEAN */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                {lang === 'en' ? 'Before you go...' : 'যাওয়ার আগে...'}
              </h3>
              <p className="text-gray-600 mb-6">
                {lang === 'en' ? 'Take our free compatibility quiz!' : 'বিনামূল্যে কুইজ নিন!'}
              </p>
              <Link
                href="/quiz"
                className="block w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all mb-3"
              >
                {lang === 'en' ? 'Start Quiz' : 'কুইজ শুরু করুন'}
              </Link>
              <button
                onClick={() => setShowExitIntent(false)}
                className="block w-full py-3 text-gray-500 hover:text-gray-700"
              >
                {lang === 'en' ? 'No thanks' : 'না ধন্যবাদ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ENGAGEMENT POPUP - CLEAN */}
      {showEngagementPopup && (
        <div className="fixed bottom-6 left-6 bg-white rounded-2xl shadow-2xl border border-pink-200 p-6 max-w-sm z-40">
          <button
            onClick={() => setShowEngagementPopup(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              👋
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">
                {lang === 'en' ? 'Still browsing?' : 'এখনও ব্রাউজ করছেন?'}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {lang === 'en' ? 'Create your profile and start matching today!' : 'আজই প্রোফাইল তৈরি করুন!'}
              </p>
              <Link
                href="/register"
                className="block text-center py-2 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg text-sm hover:from-pink-600 hover:to-rose-600 transition-all"
              >
                {lang === 'en' ? 'Get Started' : 'শুরু করুন'}
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blink-ring {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-blink-ring {
          animation: blink-ring 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
