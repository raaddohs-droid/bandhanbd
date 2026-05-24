"""
Supabase Profile Data Generator for Bangladeshi Matrimonial Platform
Generates realistic, contextually appropriate data for all profile fields
"""

import os
from supabase import create_client, Client
import random
from datetime import datetime, timedelta

# Supabase credentials
SUPABASE_URL = "https://bwxxctyakpexqfbtoolg.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHhjdHlha3BleHFmYnRvb2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMDY0OTYsImV4cCI6MjA5NDU4MjQ5Nn0.034YBMbkx3Eco-oBPfJDelLjnbOk9uHZJoOPxhogNM4"  # ⚠️ REPLACE THIS!

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Bangladeshi Context Data
BANGLADESHI_CITIES = [
    "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", 
    "Rangpur", "Mymensingh", "Comilla", "Narayanganj", "Gazipur"
]

DHAKA_AREAS = [
    "Gulshan", "Banani", "Dhanmondi", "Uttara", "Mirpur", "Mohammadpur",
    "Bashundhara", "Badda", "Rampura", "Motijheel", "Farmgate", "Kakrail"
]

DISTRICTS = [
    "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur",
    "Mymensingh", "Comilla", "Narayanganj", "Gazipur", "Tangail", "Bogra",
    "Jessore", "Kushtia", "Pabna", "Sirajganj", "Dinajpur", "Faridpur"
]

BANGLADESHI_MALE_NAMES = [
    "Md. Kamal Hossain", "Rahim Ahmed", "Farhan Rahman", "Tanvir Islam",
    "Shakib Al Hasan", "Arif Khan", "Imran Hossain", "Rafiq Uddin",
    "Mahbub Alam", "Sohel Rana", "Jahangir Kabir", "Nasir Uddin",
    "Khalid Mahmud", "Saiful Islam", "Monir Hossain", "Kamrul Hassan"
]

BANGLADESHI_FEMALE_NAMES = [
    "Fatima Khatun", "Ayesha Rahman", "Nusrat Jahan", "Sabina Yasmin",
    "Taslima Akter", "Rozina Begum", "Sharmin Sultana", "Nasrin Akter",
    "Farhana Islam", "Shamima Khatun", "Rubina Ahmed", "Sultana Razia",
    "Mahmuda Begum", "Sadia Rahman", "Rehana Khatun", "Dilruba Yasmin"
]

PROFESSIONS_BD = {
    "Male": [
        "Software Engineer", "Bank Officer", "Government Service (BCS)",
        "Doctor (MBBS)", "Engineer (Civil)", "Business Owner",
        "Teacher/Lecturer", "Pharmacist", "Accountant (CA)",
        "Marketing Manager", "Civil Servant", "NGO Officer"
    ],
    "Female": [
        "Teacher", "Doctor", "Banker", "Government Officer",
        "Homemaker", "NGO Worker", "Pharmacist", "Lecturer",
        "Software Developer", "Marketing Executive", "Nurse",
        "Fashion Designer", "Entrepreneur"
    ]
}

EDUCATION_LEVELS = [
    "SSC", "HSC", "BSc", "BA", "BCom", "MBA", "MSc", "MA",
    "MBBS", "BBA", "Engineering (BSc)", "LLB", "Diploma"
]

INSTITUTIONS_BD = [
    "Dhaka University", "BUET", "Chittagong University", "Rajshahi University",
    "North South University", "BRAC University", "IBA (DU)", "Jahangirnagar University",
    "Bangladesh Agricultural University", "Shahjalal University of Science & Technology",
    "Medical College Dhaka", "Engineering University Dhaka"
]

MONTHLY_INCOMES = [
    "20,000-30,000 BDT", "30,000-50,000 BDT", "50,000-70,000 BDT",
    "70,000-1,00,000 BDT", "1,00,000-1,50,000 BDT", "1,50,000+ BDT"
]

FAMILY_TYPES = ["Nuclear Family", "Joint Family", "Extended Family"]
FAMILY_STATUS = ["Middle Class", "Upper Middle Class", "Well-off", "Lower Middle Class"]

COMPLEXIONS = ["Fair", "Wheatish", "Medium", "Dark"]
BODY_TYPES = ["Slim", "Average", "Athletic", "Heavy"]

SECTS = ["Sunni - Hanafi", "Sunni - Ahle Hadith", "Sunni"]
RELIGIOUS_LEVELS = [
    "Very Religious (Practicing)", "Moderately Religious", "Religious",
    "Not Very Religious", "Prefer not to say"
]

PRAYER_HABITS = [
    "5 times daily (Regular)", "Tries to pray 5 times", "Sometimes",
    "Only on Fridays", "Occasionally"
]

QURAN_READING = [
    "Can read fluently with Tajweed", "Can read with some mistakes",
    "Learning to read", "Cannot read Arabic", "Can recite from memory (Hafiz)"
]

# Generate realistic "About Me"
def generate_about_me(gender, profession, education, age):
    templates_male = [
        f"Assalamu Alaikum. I am a {age}-year-old {profession} based in Bangladesh. Completed {education}. I am a practicing Muslim who values family, honesty, and mutual respect. Looking for a life partner who shares similar values and is committed to building a peaceful Islamic household together.",
        
        f"{profession} by profession with {education} qualification. Alhamdulillah, from a well-educated family background. I prioritize my Deen and believe in maintaining a balance between career and family life. Seeking a compatible partner who is understanding, religious, and family-oriented.",
        
        f"Working as {profession} and completed {education}. I am {age} years old, practicing Muslim who prays regularly and follows Islamic values. Family means everything to me. Looking for a pious, educated life partner to complete half of my Deen.",
        
        f"Professionally, I am working as {profession}. Educationally, I have completed {education}. I come from a conservative yet progressive family. I value honesty, trust, and mutual understanding in relationships. Seeking life partner with similar mindset and Islamic values."
    ]
    
    templates_female = [
        f"Assalamu Alaikum. I am {age} years old, working as {profession}. I have completed {education}. I am a practicing Muslimah who wears hijab and values modesty. I am looking for a respectful, religious husband who will support my career goals while building a loving Islamic home together.",
        
        f"Alhamdulillah, I am a {profession} with {education} background. I come from a well-educated, religious family. I pray regularly, observe hijab, and try to live according to Islamic principles. Seeking a practicing Muslim husband who is kind, responsible, and values family.",
        
        f"Working in the field of {profession}, completed {education}. I am a modest, family-oriented person who believes in Islamic values. I maintain balance between career and family responsibilities. Looking for a compatible life partner who respects women and understands the importance of Deen.",
        
        f"I am {age} years old, currently working as {profession}. Completed {education} from a reputable institution. From a conservative family with strong Islamic values. I observe purdah, pray regularly, and seek to marry someone with similar religious commitment."
    ]
    
    if gender == "Male":
        return random.choice(templates_male)
    else:
        return random.choice(templates_female)

# Generate partner preferences
def generate_partner_preference(gender, age, education):
    if gender == "Male":
        templates = [
            f"Looking for an educated, religious woman aged {age-5}-{age-2} who observes hijab and is committed to Islamic values. Should be family-oriented, respectful, and willing to maintain balan
            ce between career (if any) and family life. Education level: minimum {education}. Must pray 5 times daily.",
            
            f"Seeking a practicing Muslimah who wears hijab, prays regularly, and has good Islamic knowledge. Age {age-7}-{age-2}. Should be from good family background with similar values. Education and profession not mandatory but preferred. Most importantly, she should be kind, honest, and committed to Deen.",
            
            f"I am looking for a life partner who is religious, modest, and family-oriented. Age range {age-5}-{age-1}. Should have at least {education} level education. Must observe Islamic principles, pray regularly, and be willing to build a peaceful Muslim household. Compatibility in values is more important than physical attributes.",
            
            f"Seeking educated, practicing Muslim woman from respectable family. Age {age-6}-{age-2}. Should wear hijab, maintain purdah, and have strong commitment to Islam. Willingness to relocate if needed. Family values and religious practice are most important criteria."
        ]
    else:
        templates = [
            f"Looking for educated, practicing Muslim man aged {age+2}-{age+8} who prays regularly and has stable career. Should be from good family, respectful towards women, and supportive of my career goals. Must have minimum {education} level education. Financial stability important.",
            
            f"Seeking a practicing Muslim husband who values both Deen and family. Age range {age+3}-{age+10}. Should be educated, employed, and from decent family background. Must pray 5 times, have good Islamic knowledge, and treat wife with respect and kindness according to Sunnah.",
            
            f"I am looking for a life partner who is religious, responsible, and understanding. Age {age+2}-{age+7}. Should have stable profession and income. Must respect women's rights in Islam, support family, and be willing to build loving household together. Character more important than wealth.",
            
            f"Seeking educated Muslim man with good job and family values. Age range {age+4}-{age+9}. Should pray regularly, have Islamic knowledge, and be kind and supportive. Must be from respectable family. Willing to support my career if needed. Looking for genuine partnership based on mutual respect."
        ]
    
    return random.choice(templates)

# Generate profile data
def generate_profile_data(profile_id):
    gender = random.choice(["Male", "Female"])
    age = random.randint(22, 38)
    
    current_year = 2026
    birth_year = current_year - age
    dob = f"{random.randint(1, 28)}/{random.randint(1, 12)}/{birth_year}"
    
    if gender == "Male":
        full_name = random.choice(BANGLADESHI_MALE_NAMES)
        height = f"{random.randint(5, 6)}'{random.randint(4, 11)}\""
        weight = f"{random.randint(60, 85)}kg"
    else:
        full_name = random.choice(BANGLADESHI_FEMALE_NAMES)
        height = f"{random.randint(4, 5)}'{random.randint(8, 11)}\""
        weight = f"{random.randint(45, 65)}kg"
    
    education = random.choice(EDUCATION_LEVELS)
    profession = random.choice(PROFESSIONS_BD[gender])
    institution = random.choice(INSTITUTIONS_BD)
    
    city = random.choice(BANGLADESHI_CITIES)
    district = random.choice(DISTRICTS)
    area = random.choice(DHAKA_AREAS) if city == "Dhaka" else None
    
    sect = random.choice(SECTS)
    religious_level = random.choice(RELIGIOUS_LEVELS)
    prayers = random.choice(PRAYER_HABITS)
    read_quran = random.choice(QURAN_READING)
    
    family_type = random.choice(FAMILY_TYPES)
    family_status = random.choice(FAMILY_STATUS)
    brothers = random.randint(0, 3)
    sisters = random.randint(0, 3)
    
    father_professions = ["Businessman", "Government Officer", "Teacher", "Doctor", "Retired", "Farmer", "Engineer"]
    mother_professions = ["Homemaker", "Teacher", "Retired Teacher", "Homemaker", "Doctor", "Homemaker"]
    
    about_me = generate_about_me(gender, profession, education, age)
    partner_preference = generate_partner_preference(gender, age, education)
    
    update_data = {
        "full_name": full_name,
        "gender": gender,
        "age": age,
        "date_of_birth": dob,
        "height": height,
        "weight": weight,
        "blood_group": random.choice(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
        "marital_status": random.choice(["Never married", "Divorced", "Widowed"]) if age > 28 else "Never married",
        "complexion": random.choice(COMPLEXIONS),
        "body_type": random.choice(BODY_TYPES),
        
        "city": city,
        "district": district,
        "area": area,
        "country": "Bangladesh",
        "grew_up_in": random.choice(DISTRICTS),
        
        "education": education,
        "education_detail": f"{education} from {institution}",
        "institution": institution,
        "degree": education,
        
        "profession": profession,
        "profession_detail": f"Currently working as {profession}",
        "occupation": profession,
        "monthly_income": random.choice(MONTHLY_INCOMES),
        "employment_status": random.choice(["Employed", "Self-employed", "Government Service"]),
        
        "religion": "Islam",
        "sect": sect,
        "religious_level": religious_level,
        "prayers": prayers,
        "read_quran": read_quran,
        
        "wears_hijab": random.choice(["Yes, always", "Yes, outside home", "Sometimes", "No"]) if gender == "Female" else None,
        "wears_niqab": random.choice(["Yes", "No", "Sometimes"]) if gender == "Female" else None,
        "has_beard": random.choice(["Yes", "No", "Trimmed"]) if gender == "Male" else None,
        
        "family_type": family_type,
        "family_status": family_status,
        "family_values": random.choice(["Traditional", "Moderate", "Liberal", "Conservative"]),
        "father_profession": random.choice(father_professions),
        "mother_profession": random.choice(mother_professions),
        "brothers": brothers,
        "sisters": sisters,
        "siblings": brothers + sisters,
        
        "diet": random.choice(["Non-vegetarian", "Vegetarian", "Occasionally non-veg"]),
        "smoking": "No",
        "drinking": "No",
        
        "mother_tongue": "Bengali",
        "languages": "Bengali, English, " + random.choice(["Hindi", "Urdu", "Arabic"]),
        "english_level": random.choice(["Fluent", "Good", "Average", "Basic"]),
        
        "about_me": about_me,
        "partner_preference": partner_preference,
        
        "hobbies": random.choice([
            "Reading Islamic books, traveling, cooking",
            "Sports, reading, learning Quran",
            "Photography, gardening, spending time with family",
            "Watching cricket, traveling, social work"
        ]),
        
        "living_status": random.choice(["With family", "With parents", "Shared apartment"]),
        "relocation": random.choice(["Yes", "No", "Depends on job", "Open to discussion"]),
        
        "managed_by": random.choice(["Self", "Parent", "Brother/Sister", "Family"]),
        
        "is_verified": random.choice([True, True, False]),
        "phone_verified": random.choice([True, True, False]),
        "nid_verified": random.choice([True, False, False]),
        "is_premium": random.choice([True, False, False, False]),
        
        "last_active_at": (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat(),
    }
    
    return update_data

def fill_database():
    print("🚀 Starting Supabase Database Fill...")
    print(f"📊 Target: Fill all existing profiles with realistic Bangladeshi context data\n")
    
    response = supabase.table('profiles').select('id').execute()
    profiles = response.data
    
    print(f"Found {len(profiles)} profiles to update\n")
    
    success_count = 0
    error_count = 0
    
    for idx, profile in enumerate(profiles, 1):
        profile_id = profile['id']
        
        try:
            data = generate_profile_data(profile_id)
            result = supabase.table('profiles').update(data).eq('id', profile_id).execute()
            
            success_count += 1
            print(f"✅ [{idx}/{len(profiles)}] Updated Profile ID {profile_id} - {data['full_name']}")
            
        except Exception as e:
            error_count += 1
            print(f"❌ [{idx}/{len(profiles)}] Error updating Profile ID {profile_id}: {str(e)}")
    
    print(f"\n{'='*60}")
    print(f"📊 SUMMARY")
    print(f"{'='*60}")
    print(f"✅ Successfully updated: {success_count} profiles")
    print(f"❌ Errors: {error_count} profiles")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    print("""
    ╔══════════════════════════════════════════════════════════╗
    ║   Biye Kori - Supabase Profile Data Generator           ║
    ║   Fills database with realistic Bangladeshi data        ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    confirm = input("⚠️  This will UPDATE ALL existing profiles. Continue? (yes/no): ")
    
    if confirm.lower() == 'yes':
        fill_database()
        print("\n✨ Database fill complete! Check your Supabase dashboard.")
    else:
        print("❌ Operation cancelled.")