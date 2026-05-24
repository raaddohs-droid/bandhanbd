"""
BIYE KORI - ENHANCED DATABASE FILL SCRIPT
Version: 2.0
Fills all 30+ new fields with realistic Bangladeshi matrimonial data
Generates rich 300-word About Me and 200-word Partner Preferences
"""

from supabase import create_client, Client
import random
from datetime import datetime, timedelta

# ================================================================
# CONFIGURATION
# ================================================================

SUPABASE_URL = "https://bwxxctyakpexqfbtoolg.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHhjdHlha3BleHFmYnRvb2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMDY0OTYsImV4cCI6MjA5NDU4MjQ5Nn0.034YBMbkx3Eco-oBPfJDelLjnbOk9uHZJoOPxhogNM4"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ================================================================
# BANGLADESHI CONTEXT DATA
# ================================================================

BANGLADESHI_CITIES = [
    "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal",
    "Rangpur", "Mymensingh", "Comilla", "Narayanganj", "Gazipur", "Tangail"
]

DHAKA_AREAS = [
    "Gulshan", "Banani", "Dhanmondi", "Uttara", "Mirpur", "Mohammadpur",
    "Bashundhara", "Badda", "Rampura", "Motijheel", "Farmgate", "Kakrail",
    "Khilgaon", "Shantinagar", "Maghbazar"
]

DISTRICTS = [
    "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal",
    "Rangpur", "Mymensingh", "Comilla", "Narayanganj", "Gazipur", "Tangail",
    "Bogra", "Jessore", "Kushtia", "Pabna", "Sirajganj", "Dinajpur", "Faridpur",
    "Brahmanbaria", "Noakhali", "Feni"
]

MALE_FIRST_NAMES = [
    "Md. Kamal", "Rahim", "Farhan", "Tanvir", "Shakib", "Arif", "Imran",
    "Rafiq", "Mahbub", "Sohel", "Jahangir", "Nasir", "Khalid", "Saiful",
    "Monir", "Kamrul", "Habib", "Tareq", "Ashraf", "Iqbal"
]

MALE_LAST_NAMES = [
    "Hossain", "Ahmed", "Rahman", "Islam", "Khan", "Uddin", "Alam",
    "Rana", "Kabir", "Mahmud", "Hassan", "Ali"
]

FEMALE_FIRST_NAMES = [
    "Fatima", "Ayesha", "Nusrat", "Sabina", "Taslima", "Rozina", "Sharmin",
    "Nasrin", "Farhana", "Shamima", "Rubina", "Sultana", "Mahmuda", "Sadia",
    "Rehana", "Dilruba", "Tahsina", "Umme", "Israt"
]

FEMALE_LAST_NAMES = [
    "Khatun", "Rahman", "Jahan", "Yasmin", "Akter", "Begum", "Sultana",
    "Islam", "Ahmed", "Razia"
]

PROFESSIONS_MALE = [
    "Software Engineer", "Bank Officer", "Government Service (BCS)",
    "Doctor (MBBS)", "Engineer (Civil)", "Business Owner",
    "Teacher/Lecturer", "Pharmacist", "Chartered Accountant",
    "Marketing Manager", "Civil Servant", "NGO Officer",
    "IT Professional", "Architect", "Lawyer"
]

PROFESSIONS_FEMALE = [
    "Teacher", "Doctor", "Banker", "Government Officer", "Homemaker",
    "NGO Worker", "Pharmacist", "Lecturer", "Software Developer",
    "Marketing Executive", "Nurse", "Fashion Designer", "Entrepreneur",
    "HR Manager", "Nutritionist"
]

EDUCATION_LEVELS = [
    "SSC", "HSC", "BSc", "BA", "BCom", "MBA", "MSc", "MA",
    "MBBS", "BBA", "Engineering (BSc)", "LLB", "Diploma"
]

INSTITUTIONS_BD = [
    "Dhaka University", "BUET", "Chittagong University", "Rajshahi University",
    "North South University", "BRAC University", "IBA (DU)", "Jahangirnagar University",
    "Bangladesh Agricultural University", "SUST", "Medical College Dhaka",
    "Engineering University", "IUT", "East West University", "United International University"
]

COMPLEXIONS = ["Fair", "Wheatish", "Medium", "Olive"]
BODY_TYPES = ["Slim", "Average", "Athletic", "Heavy"]

RELIGIOUS_LEVELS = [
    "Very Religious (Practicing)", "Moderately Religious", "Religious",
    "Practicing Muslim", "Moderately Practicing"
]

PRAYER_HABITS = [
    "5 times daily (Regular)", "Tries to pray 5 times", "Prays regularly",
    "Sometimes", "Friday prayers regular"
]

QURAN_READING = [
    "Can read fluently with Tajweed", "Can read with some mistakes",
    "Learning to read", "Can recite from memory", "Basic reading ability"
]

ISLAMIC_KNOWLEDGE = ["Basic", "Good", "Advanced", "Moderate", "Learning"]

FATHER_PROFESSIONS = [
    "Businessman", "Government Officer", "Teacher", "Doctor", "Retired",
    "Farmer", "Engineer", "Bank Officer", "Private Service", "Self-employed"
]

MOTHER_PROFESSIONS = [
    "Homemaker", "Teacher", "Retired Teacher", "Doctor", "Social Worker"
]

FAMILY_VALUES_OPTIONS = ["Traditional", "Moderate", "Liberal", "Conservative", "Progressive"]
HOME_OWNERSHIP = ["Own house", "Rented", "Family property", "Apartment owner"]

DIET_OPTIONS = ["Non-vegetarian", "Vegetarian", "Occasionally non-veg", "Halal only"]
PERSONALITY_TYPES = ["Introvert", "Extrovert", "Ambivert", "Reserved", "Outgoing"]
SOCIAL_LEVELS = ["Very social", "Moderately social", "Private", "Selective", "Family-oriented"]
HEALTH_STATUS = ["Excellent", "Good", "Average", "Very good"]

RELOCATE_OPTIONS = ["Yes", "No", "Depends on job", "Open to discussion", "Within Bangladesh only"]

# ================================================================
# TEXT GENERATION FUNCTIONS
# ================================================================

def generate_about_me(gender, profession, education, age, city, religious_level, personality):
    """Generate realistic 300-word About Me section"""
    
    if gender == "Male":
        templates = [
            f"Assalamu Alaikum. I am a {age}-year-old {profession} currently based in {city}, Bangladesh. I completed my {education} from a reputable institution. Alhamdulillah, I come from a well-educated, {religious_level.lower()} family that values both Deen and Duniya.\n\nProfessionally, I am dedicated to my career and take my responsibilities seriously. At the same time, I believe in maintaining a healthy work-life balance and spending quality time with family. I am a {personality.lower()} person who values honesty, integrity, and mutual respect in all relationships.\n\nIn terms of religious practice, I am {religious_level.lower()} and strive to follow Islamic principles in my daily life. I pray regularly, try to increase my Islamic knowledge, and believe that a strong foundation in faith is essential for a successful marriage. I am looking for a life partner who shares similar values and is committed to building a peaceful, loving household together.\n\nFamily is very important to me, and I maintain close relationships with my parents and siblings. I believe in the importance of respecting elders and maintaining strong family bonds. In my free time, I enjoy reading, spending time with family and friends, and engaging in activities that help me grow both personally and spiritually.\n\nI am looking for a compatible partner to complete half of my Deen. Someone who is understanding, respectful, educated, and shares my values regarding family and religion. Together, I hope we can build a beautiful life based on mutual love, respect, and understanding, while always keeping Allah at the center of our marriage.",
            
            f"Bismillah. I am {age} years old, working as a {profession} in {city}. I have completed {education} and Alhamdulillah, I am settled in my career. I come from a conservative yet progressive family background where Islamic values are highly respected.\n\nI would describe myself as a {personality.lower()} individual who is {religious_level.lower()}. I believe in following the Sunnah and incorporating Islamic teachings into everyday life. Prayer is an integral part of my routine, and I strive to be a better Muslim each day. Education and continuous learning are important to me, both in worldly knowledge and Deen.\n\nMy family has always been supportive of my decisions while ensuring I stay grounded in our cultural and religious values. I have a close-knit relationship with my parents and siblings, and I believe family should be a priority in life. After marriage, I hope to maintain these strong family ties while building a new home with my spouse.\n\nI am seeking a life partner who is modest, educated, and has strong Islamic values. Someone who understands the importance of both career and family, and is willing to support each other's growth. I believe marriage is a partnership based on trust, communication, and mutual respect, with the ultimate goal of pleasing Allah.\n\nIn my leisure time, I enjoy meaningful conversations, traveling to explore new places, and spending quality time with loved ones. I am looking forward to finding someone with whom I can share life's journey, support each other through challenges, and celebrate successes together, all while strengthening our Imaan.",
        ]
    else:  # Female
        templates = [
            f"Assalamu Alaikum. I am {age} years old and currently working as a {profession}. I have completed my {education} and Alhamdulillah, I am from a well-educated, {religious_level.lower()} family in {city}. My family has always emphasized the importance of education alongside religious values.\n\nI am a {personality.lower()} person who believes in maintaining modesty and dignity in all aspects of life. I observe hijab and try to live according to Islamic principles while also pursuing my personal and professional growth. I pray regularly, have a basic understanding of Quran, and continuously try to improve my knowledge of Islam.\n\nFamily means everything to me. I have been raised with traditional values where respect for elders, maintaining family bonds, and caring for loved ones are paramount. After marriage, I envision a household where Islamic values are practiced, children are raised with good character, and there is mutual respect and understanding between spouses.\n\nRegarding work after marriage, I am open to discussion with my future husband. I believe in flexibility and understanding each other's preferences while making decisions that are best for the family. What matters most is creating a peaceful, loving home where we can support each other's goals and grow together spiritually.\n\nI am looking for a practicing Muslim husband who is kind, respectful, responsible, and values family. Someone who will treat me with dignity according to the Sunnah, support my personal growth, and together we can build a home filled with love, faith, and mutual respect. My hope is to find a partner with whom I can complete half of my Deen and walk the path of life with trust in Allah.",
            
            f"Bismillah. I am a {age}-year-old {profession} from {city}, Bangladesh. I completed my {education} and come from a family that values both education and Islamic teachings. I am {religious_level.lower()} and try to maintain a balance between my professional life and spiritual growth.\n\nI wear hijab and believe in living modestly while actively contributing to society through my work. My faith is very important to me, and I strive to pray five times daily, read Quran regularly, and continuously learn more about Islam. I believe that a strong foundation in Deen is essential for a successful and blessed marriage.\n\nAs a {personality.lower()} person, I value meaningful relationships over superficial connections. I am close to my family and believe that maintaining strong family ties is a crucial part of our culture and religion. I respect my parents deeply and seek their guidance in important life decisions, including choosing my life partner.\n\nAfter marriage, my priorities would be to create a peaceful Islamic home, support my husband in his endeavors, and together raise children with strong moral and religious values. I am flexible regarding work after marriage and believe this decision should be made jointly with my spouse, considering what's best for our family.\n\nI am seeking a husband who is practicing, understanding, and respectful of women's rights in Islam. Someone who values family, has good character, and is committed to growing together both spiritually and as life partners. I pray to Allah to grant me a spouse with whom I can find peace, love, and mutual respect.",
        ]
    
    return random.choice(templates)

def generate_partner_preference(gender, age, education, religious_level):
    """Generate realistic 200-word Partner Preference"""
    
    if gender == "Male":
        min_age = max(18, age - 7)
        max_age = age - 1
        templates = [
            f"I am looking for an educated, practicing Muslimah aged {min_age}-{max_age} who observes hijab and is committed to Islamic values. She should be from a good family background with similar religious and cultural values. Education level: minimum {education} or equivalent. Must pray regularly and have knowledge of basic Islamic teachings.\n\nI prefer someone who is modest, respectful, family-oriented, and willing to maintain a balance between career (if any) and family life. Character and Deen are more important to me than physical appearance, though mutual attraction is also important for a healthy marriage.\n\nMy ideal partner would be understanding, supportive, and someone I can communicate openly with. She should value family relationships and be respectful towards elders. Financial status is not a primary concern, but she should come from a respectable family.\n\nI am open to someone who wants to continue her career after marriage, but this can be discussed and decided mutually based on family circumstances. What matters most is that we share the same vision for our future, prioritize our Deen, and work together to build a peaceful Islamic household. May Allah guide us both to what is best.",
            
            f"Seeking a practicing Muslim woman aged {min_age}-{max_age} who wears hijab, prays regularly, and has good Islamic knowledge. Should be from a good family background with similar values. Education and profession are preferred but not mandatory - what's most important is her character, religious commitment, and compatibility in values.\n\nI value honesty, modesty, and kindness above all else. My ideal life partner would be someone who is understanding, emotionally mature, and ready for the responsibilities of marriage. She should respect family values and be willing to maintain good relationships with both families after marriage.\n\nPhysical attributes are secondary to character, but there should be mutual respect and compatibility. I am looking for someone who can be my friend, my support system, and my partner in both worldly matters and spiritual growth.\n\nWillingness to relocate may be required depending on job circumstances, so flexibility and open communication are important. Together, I hope we can create a home based on Islamic principles, mutual love, and respect, where we support each other's growth and raise righteous children. May Allah bless us with a spouse who will be the coolness of our eyes.",
        ]
    else:  # Female
        min_age = age + 1
        max_age = age + 10
        templates = [
            f"I am looking for an educated, practicing Muslim man aged {min_age}-{max_age} who prays regularly and has a stable career. He should be from a good family, respectful towards women, and understanding of women's rights in Islam. Minimum education level: {education} or equivalent. Financial stability is important as it's a basic requirement for marriage.\n\nMy ideal husband would be someone who is kind, responsible, supportive, and treats his wife with respect and dignity according to the Sunnah of Prophet Muhammad (PBUH). He should value family, have good character, and be committed to building an Islamic household together.\n\nI am looking for a partner who will support my personal and professional growth while understanding that family comes first. Someone who believes in partnership and shared decision-making rather than one-sided authority. Good communication skills and emotional maturity are very important to me.\n\nI prefer someone who prays five times daily, has Islamic knowledge, and continuously strives to improve his Deen. Character and religious practice are more important than wealth, though he should be financially responsible and capable of supporting a family.\n\nPhysical compatibility is also important for a healthy marriage. I am looking for genuine partnership based on mutual respect, love, understanding, and fear of Allah. Together, I hope we can grow spiritually and build a blessed family.",
            
            f"Seeking an educated Muslim man aged {min_age}-{max_age} with a good job and strong Islamic values. He should pray regularly, have knowledge of Islam, and be kind and supportive. Must be from a respectable family with good character and reputation.\n\nI value honesty, integrity, and emotional intelligence in a life partner. Someone who understands that marriage is about companionship, mutual respect, and growing together. He should be understanding of my career aspirations if I choose to work, and willing to have open discussions about our future together.\n\nMy ideal husband would treat me with kindness and respect as taught in Islam, value my opinions, involve me in important decisions, and create a peaceful home environment. He should have good relationships with his family while also being able to establish healthy boundaries for our new family.\n\nFinancial stability matters, but character is more important than wealth. I am looking for someone who is responsible, mature, and ready for the commitment of marriage. Someone who will be my best friend, my protector (in the Islamic sense), and my partner in both happiness and challenges.\n\nMay Allah grant us both a spouse who will be a source of comfort, help us grow in faith, and with whom we can build a beautiful life together while always keeping Allah at the center of our relationship.",
        ]
    
    return random.choice(templates)

def generate_hobbies(gender, profession, personality):
    """Generate realistic hobbies based on profile"""
    
    hobby_pools = {
        "Introvert": [
            "Reading Islamic books and novels",
            "Learning Quran with Tajweed",
            "Watching documentaries and educational content",
            "Gardening and indoor plants",
            "Cooking and trying new recipes",
            "Writing and journaling",
            "Learning new languages",
        ],
        "Extrovert": [
            "Traveling and exploring new places",
            "Social work and community service",
            "Organizing family gatherings",
            "Playing cricket or badminton",
            "Attending Islamic lectures and events",
            "Photography and videography",
            "Meeting new people and networking",
        ],
        "Ambivert": [
            "Reading books and traveling",
            "Cooking traditional Bangladeshi dishes",
            "Spending quality time with family",
            "Watching movies and series",
            "Learning new skills online",
            "Occasional hiking and outdoor activities",
            "Listening to Islamic lectures and nasheeds",
        ]
    }
    
    base_hobbies = hobby_pools.get(personality, hobby_pools["Ambivert"])
    selected = random.sample(base_hobbies, k=random.randint(3, 5))
    return ", ".join(selected)

# ================================================================
# MAIN DATA GENERATION FUNCTION
# ================================================================

def generate_enhanced_profile_data(profile_id, existing_profile):
    """Generate all new field data for a profile"""
    
    # Use existing data where available
    gender = existing_profile.get('gender') or random.choice(["Male", "Female"])
    age = existing_profile.get('age') or random.randint(23, 37)
    
    # Generate name if not exists
    if not existing_profile.get('full_name'):
        if gender == "Male":
            first = random.choice(MALE_FIRST_NAMES)
            last = random.choice(MALE_LAST_NAMES)
            full_name = f"{first} {last}"
        else:
            first = random.choice(FEMALE_FIRST_NAMES)
            last = random.choice(FEMALE_LAST_NAMES)
            full_name = f"{first} {last}"
    else:
        full_name = existing_profile['full_name']
    
    # Calculate birth date
    current_year = 2026
    birth_year = current_year - age
    birth_month = random.randint(1, 12)
    birth_day = random.randint(1, 28)
    date_of_birth = f"{birth_year}-{birth_month:02d}-{birth_day:02d}"
    
    # Physical attributes
    if gender == "Male":
        height_feet = random.randint(5, 6)
        height_inches = random.randint(4, 11) if height_feet == 5 else random.randint(0, 3)
        height = f"{height_feet}'{height_inches}\""
        weight = f"{random.randint(60, 85)}kg"
    else:
        height_feet = random.choice([4, 5])
        height_inches = random.randint(8, 11) if height_feet == 4 else random.randint(0, 7)
        height = f"{height_feet}'{height_inches}\""
        weight = f"{random.randint(45, 65)}kg"
    
    complexion = random.choice(COMPLEXIONS)
    body_type = random.choice(BODY_TYPES)
    
    # Education
    education = existing_profile.get('education') or random.choice(EDUCATION_LEVELS)
    institution = random.choice(INSTITUTIONS_BD)
    degree = education
    major_subject = random.choice([
        "Computer Science", "Business Administration", "Economics", "Medicine",
        "Engineering", "English Literature", "Mathematics", "Physics", "Chemistry",
        "Law", "Pharmacy", "Architecture"
    ]) if education in ["BSc", "BA", "BCom", "MSc", "MA"] else None
    passing_year = current_year - (age - random.randint(22, 25))
    
    # Profession
    profession = existing_profile.get('profession') or random.choice(
        PROFESSIONS_MALE if gender == "Male" else PROFESSIONS_FEMALE
    )
    
    # Religious
    religious_level = random.choice(RELIGIOUS_LEVELS)
    prayer_habit = random.choice(PRAYER_HABITS)
    quran_reading = random.choice(QURAN_READING)
    islamic_knowledge = random.choice(ISLAMIC_KNOWLEDGE)
    
    # Family
    father_status = random.choice(["Alive", "Alive", "Alive", "Deceased"])
    mother_status = random.choice(["Alive", "Alive", "Alive", "Deceased"])
    
    if gender == "Male":
        father_name = f"Md. {random.choice(MALE_FIRST_NAMES.split()[0] for _ in range(1))} {random.choice(MALE_LAST_NAMES)}"
        mother_name = f"{random.choice(FEMALE_FIRST_NAMES)} {random.choice(FEMALE_LAST_NAMES)}"
    else:
        father_name = f"Md. {random.choice(['Abdur', 'Abdul', 'Mohammad', 'Ahmed'])} {random.choice(MALE_LAST_NAMES)}"
        mother_name = f"{random.choice(FEMALE_FIRST_NAMES)} {random.choice(FEMALE_LAST_NAMES)}"
    
    father_profession = random.choice(FATHER_PROFESSIONS)
    mother_profession = random.choice(MOTHER_PROFESSIONS)
    
    brothers = random.randint(0, 3)
    sisters = random.randint(0, 3)
    married_brothers = random.randint(0, brothers) if brothers > 0 else 0
    married_sisters = random.randint(0, sisters) if sisters > 0 else 0
    total_siblings = brothers + sisters
    
    family_values = random.choice(FAMILY_VALUES_OPTIONS)
    home_ownership = random.choice(HOME_OWNERSHIP)
    
    # Lifestyle
    diet = random.choice(DIET_OPTIONS)
    personality_type = random.choice(PERSONALITY_TYPES)
    social_level = random.choice(SOCIAL_LEVELS)
    health_status = random.choice(HEALTH_STATUS)
    
    hobbies = generate_hobbies(gender, profession, personality_type)
    interests = random.choice([
        "Islamic studies, technology, current affairs",
        "Cooking, family time, social welfare",
        "Reading, traveling, photography",
        "Sports, fitness, outdoor activities",
        "Arts, culture, music (halal)",
        "Science, history, documentaries"
    ])
    
    # Location
    city = existing_profile.get('city') or random.choice(BANGLADESHI_CITIES)
    district = random.choice(DISTRICTS)
    permanent_address = f"{random.randint(1, 200)}, {random.choice(['Road', 'Lane'])} {random.randint(1, 50)}, {district}"
    current_address = f"{random.choice(DHAKA_AREAS) if city == 'Dhaka' else city}, {city}"
    willing_to_relocate = random.choice(RELOCATE_OPTIONS)
    
    # Partner expectations
    if gender == "Male":
        expected_age_min = max(18, age - 7)
        expected_age_max = age - 1
        expected_height_min = "4'8\""
        expected_height_max = "5'6\""
    else:
        expected_age_min = age + 1
        expected_age_max = age + 10
        expected_height_min = "5'4\""
        expected_height_max = "6'2\""
    
    expected_education = random.choice(["HSC or above", "Graduate", "Post-graduate", education, "Any"])
    expected_profession = random.choice(["Any respectable profession", "Stable job", "Business or Service", "Open to discussion"])
    expected_income = random.choice([
        "30,000+ BDT", "50,000+ BDT", "70,000+ BDT",
        "1,00,000+ BDT", "Financially stable", "Not a priority"
    ])
    expected_religious_level = random.choice(["Practicing", "Moderately religious", "Religious", "Very religious"])
    expected_family_type = random.choice(["Any", "Nuclear family", "Open to both", "Flexible"])
    
    # Generate rich text content
    about_me = generate_about_me(gender, profession, education, age, city, religious_level, personality_type)
    partner_preference = generate_partner_preference(gender, age, education, religious_level)
    
    # Compile all data
    update_data = {
        # Basic fields (update if missing)
        "full_name": full_name,
        "gender": gender,
        "age": age,
        
        # New physical fields
        "date_of_birth": date_of_birth,
        "weight": weight,
        "height": existing_profile.get('height') or height,
        "complexion": complexion,
        "body_type": body_type,
        "blood_group": existing_profile.get('blood_group') or random.choice(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
        
        # Education fields
        "education": education,
        "institution": institution,
        "degree": degree,
        "major_subject": major_subject,
        "passing_year": passing_year,
        
        # Religious fields
        "religious_level": religious_level,
        "prayer_habit": prayer_habit,
        "quran_reading": quran_reading,
        "islamic_knowledge": islamic_knowledge,
        
        # Family fields
        "father_name": father_name,
        "mother_name": mother_name,
        "father_status": father_status,
        "mother_status": mother_status,
        "father_profession": father_profession,
        "mother_profession": mother_profession,
        "brothers": brothers if existing_profile.get('brothers') is None else existing_profile['brothers'],
        "sisters": sisters if existing_profile.get('sisters') is None else existing_profile['sisters'],
        "married_brothers": married_brothers,
        "married_sisters": married_sisters,
        "total_siblings": total_siblings,
        "family_values": family_values,
        "home_ownership": home_ownership,
        
        # Lifestyle fields
        "diet": diet,
        "hobbies": hobbies,
        "interests": interests,
        "personality_type": personality_type,
        "social_level": social_level,
        "health_status": health_status,
        
        # Location fields
        "city": city,
        "district": district,
        "permanent_address": permanent_address,
        "current_address": current_address,
        "willing_to_relocate": willing_to_relocate,
        
        # Partner expectations
        "expected_age_min": expected_age_min,
        "expected_age_max": expected_age_max,
        "expected_height_min": expected_height_min,
        "expected_height_max": expected_height_max,
        "expected_education": expected_education,
        "expected_profession": expected_profession,
        "expected_income": expected_income,
        "expected_religious_level": expected_religious_level,
        "expected_family_type": expected_family_type,
        
        # Rich text content
        "about_me": about_me,
        "partner_preference": partner_preference,
        
        # Profession (update if missing)
        "profession": profession,
    }
    
    return update_data

# ================================================================
# MAIN EXECUTION
# ================================================================

def fill_enhanced_data():
    """Fill all profiles with enhanced data"""
    
    print("=" * 70)
    print("🚀 BIYE KORI - ENHANCED DATABASE FILL")
    print("=" * 70)
    print()
    print("📊 Fetching existing profiles...")
    
    # Get all profiles
    response = supabase.table('profiles').select('*').execute()
    profiles = response.data
    
    print(f"✅ Found {len(profiles)} profiles to enhance")
    print()
    print("🎯 Generating rich, realistic Bangladeshi data...")
    print("   - 300-word About Me sections")
    print("   - 200-word Partner Preferences")
    print("   - Complete family details")
    print("   - Religious practice information")
    print("   - Hobbies and interests")
    print("   - And 20+ more fields...")
    print()
    
    success_count = 0
    error_count = 0
    
    for idx, profile in enumerate(profiles, 1):
        profile_id = profile['id']
        
        try:
            # Generate enhanced data
            data = generate_enhanced_profile_data(profile_id, profile)
            
            # Update profile
            result = supabase.table('profiles').update(data).eq('id', profile_id).execute()
            
            success_count += 1
            print(f"✅ [{idx}/{len(profiles)}] Enhanced Profile ID {profile_id} - {data['full_name']}")
            
        except Exception as e:
            error_count += 1
            print(f"❌ [{idx}/{len(profiles)}] Error enhancing Profile ID {profile_id}: {str(e)}")
    
    print()
    print("=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    print(f"✅ Successfully enhanced: {success_count} profiles")
    print(f"❌ Errors: {error_count} profiles")
    print("=" * 70)
    print()
    
    if success_count > 0:
        print("🎉 Database enhancement complete!")
        print()
        print("Next steps:")
        print("1. Check your profiles at http://localhost:3000/profiles")
        print("2. Click any profile to see rich, detailed information")
        print("3. All 30+ fields should now be filled!")
        print()

if __name__ == "__main__":
    print()
    print("╔══════════════════════════════════════════════════════════╗")
    print("║   BIYE KORI - ENHANCED DATABASE FILL SCRIPT v2.0         ║")
    print("║   Fills 30+ fields with realistic Bangladeshi data      ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print()
    
    confirm = input("⚠️  This will UPDATE all existing profiles with rich data. Continue? (yes/no): ")
    
    if confirm.lower() == 'yes':
        fill_enhanced_data()
    else:
        print("❌ Operation cancelled.")
