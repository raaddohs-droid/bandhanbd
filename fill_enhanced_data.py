from supabase import create_client
import random

# CONFIGURATION
SUPABASE_URL = "https://bwxxctyakpexqfbtoolg.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHhjdHlha3BleHFmYnRvb2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMDY0OTYsImV4cCI6MjA5NDU4MjQ5Nn0.034YBMbkx3Eco-oBPfJDelLjnbOk9uHZJoOPxhogNM4"  # ⚠️ REPLACE THIS!

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Bangladeshi data
CITIES = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"]
MALE_NAMES = ["Md. Kamal Hossain", "Rahim Ahmed", "Farhan Rahman", "Tanvir Islam"]
FEMALE_NAMES = ["Fatima Khatun", "Ayesha Rahman", "Nusrat Jahan", "Sabina Yasmin"]
PROFESSIONS_MALE = ["Software Engineer", "Doctor", "Banker", "Government Officer"]
PROFESSIONS_FEMALE = ["Teacher", "Doctor", "Banker", "Homemaker"]
EDUCATION = ["BSc", "MBA", "MBBS", "HSC", "SSC"]
INSTITUTIONS = ["Dhaka University", "BUET", "NSU", "BRAC University"]

def generate_about_me(gender, profession, age):
    if gender == "Male":
        return f"Assalamu Alaikum. I am a {age}-year-old {profession}. I am a practicing Muslim who values family and honesty. Looking for a life partner who shares similar values and is committed to building a peaceful Islamic household together. I pray regularly and believe in maintaining balance between career and family life."
    else:
        return f"Assalamu Alaikum. I am {age} years old, working as {profession}. I am a practicing Muslimah who wears hijab and values modesty. Looking for a respectful, religious husband who will support my goals while building a loving Islamic home together. Family and Deen are very important to me."

def generate_partner_pref(gender, age):
    if gender == "Male":
        return f"Looking for educated, religious woman aged {age-5}-{age-2} who observes hijab and is committed to Islamic values. Should be family-oriented and respectful. Education level: minimum HSC. Must pray regularly."
    else:
        return f"Looking for educated, practicing Muslim man aged {age+2}-{age+8} who prays regularly and has stable career. Should be from good family and respectful. Minimum education: Graduate. Financial stability important."

print("🚀 Filling database...")

# Get all profiles
response = supabase.table('profiles').select('*').execute()
profiles = response.data
print(f"Found {len(profiles)} profiles")

for idx, profile in enumerate(profiles, 1):
    try:
        gender = profile.get('gender') or random.choice(["Male", "Female"])
        age = profile.get('age') or random.randint(24, 35)
        
        # Generate name
        if gender == "Male":
            full_name = random.choice(MALE_NAMES)
            profession = random.choice(PROFESSIONS_MALE)
        else:
            full_name = random.choice(FEMALE_NAMES)
            profession = random.choice(PROFESSIONS_FEMALE)
        
        # Update data
        data = {
            "full_name": full_name,
            "gender": gender,
            "age": age,
            "profession": profession,
            "education": random.choice(EDUCATION),
            "institution": random.choice(INSTITUTIONS),
            "city": random.choice(CITIES),
            "religious_level": random.choice(["Very Religious", "Moderately Religious", "Religious"]),
            "prayer_habit": random.choice(["5 times daily", "Tries to pray 5 times", "Regular"]),
            "hobbies": "Reading, traveling, cooking",
            "about_me": generate_about_me(gender, profession, age),
            "partner_preference": generate_partner_pref(gender, age)
        }
        
        supabase.table('profiles').update(data).eq('id', profile['id']).execute()
        print(f"✅ [{idx}/{len(profiles)}] Updated {full_name}")
        
    except Exception as e:
        print(f"❌ Error on profile {profile['id']}: {e}")

print("\n✅ Done!")