// Add this script component to your page.tsx or layout.tsx

export function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Biye Kori",
    "alternateName": "বিয়ে করি",
    "url": "https://www.biyekori.com",
    "logo": "https://www.biyekori.com/logo.png",
    "description": "Bangladesh's most trusted matrimonial service with 100% verified profiles. No ghotok fees, completely free Muslim marriage site.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressCountry": "BD"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "Bengali"]
    },
    "sameAs": [
      "https://www.facebook.com/biyekori",
      "https://www.instagram.com/biyekori"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Biye Kori",
    "url": "https://www.biyekori.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.biyekori.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["en", "bn"]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Biye Kori Matrimony",
    "image": "https://www.biyekori.com/logo.png",
    "priceRange": "Free",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressRegion": "Dhaka Division",
      "addressCountry": "BD"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "url": "https://www.biyekori.com",
    "telephone": "+880-XXX-XXXXXX",
    "servesCuisine": "N/A",
    "areaServed": [
      "Dhaka",
      "Chittagong",
      "Sylhet",
      "Rajshahi",
      "Khulna",
      "Barishal",
      "Rangpur",
      "Mymensingh"
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.biyekori.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Browse Profiles",
        "item": "https://www.biyekori.com/profiles"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

// USAGE: Add this to your page component:
// import { SchemaMarkup } from './schema-markup'
//
// Then inside your return statement, add:
// <SchemaMarkup />
