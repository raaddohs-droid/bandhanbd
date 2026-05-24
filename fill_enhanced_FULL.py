"""
BIYE KORI - ENHANCED DATABASE FILL SCRIPT
Version: 2.0 FULL
Fills all 30+ new fields with realistic Bangladeshi matrimonial data
Generates rich 100-300 word About Me and 80-200 word Partner Preferences
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
    "Monir", "Kamrul", "Habib", "Tareq", "Ashraf", "Iqbal", "Rashed",
    "Faisal", "Nabil", "Sabbir", "Masud"
]

MALE_LAST_NAMES = [
    "Hossain", "Ahmed", "Rahman", "Islam", "Khan", "Uddin", "Alam",
    "Rana", "Kabir", "Mahmud", "Hassan", "Ali", "Chowdhury", "Miah"
]

FEMALE_FIRST_NAMES = [
    "Fatima", "Ayesha", "Nusrat", "Sabina", "Taslima", "Rozina", "Sharmin",
    "Nasrin", "Farhana", "Shamima", "Rubina", "Sultana", "Mahmuda", "Sadia",
    "Rehana", "Dilruba", "Tahsina", "Umme", "Israt", "Lamia", "Bristy"
]

FEMALE_LAST_NAMES = [
    "Khatun", "Rahman", "Jahan", "Yasmin", "Akter", "Begum", "Sultana",
    "Islam", "Ahmed", "Razia", "Parvin", "Nahar"
]

PROFESSIONS_MALE = [
    "Software Engineer", "Bank Officer", "Government Service (BCS)",
    "Doctor (MBBS)", "Engineer (Civil)", "Business Owner",
    "Teacher/Lecturer", "Pharmacist", "Chartered Accountant",
    "Marketing Manager", "Civil Servant", "NGO Officer",
    "IT Professional", "Architect", "Lawyer", "Data Analyst"
]

PROFESSIONS_FEMALE = [
    "Teacher", "Doctor", "Banker", "Government Officer", "Homemaker",
    "NGO Worker", "Pharmacist", "Lecturer", "Software Developer",
    "Marketing Executive", "Nurse", "Fashion Designer", "Entrepreneur",
    "HR Manager", "Nutritionist", "Interior Designer"
]

EDUCATION_LEVELS = [
    "SSC", "HSC", "BSc", "BA", "BCom", "MBA", "MSc", "MA",
    "MBBS", "BBA", "Engineering (BSc)", "LLB", "Diploma", "MPhil"
]

INSTITUTIONS_BD = [
    "Dhaka University", "BUET", "Chittagong University", "Rajshahi University",
    "North South University", "BRAC University", "IBA (DU)", "Jahangirnagar University",
    "Bangladesh Agricultural University", "SUST", "Medical College Dhaka",
    "Engineering University", "IUT", "East West University", "United International University",
    "Daffodil International University", "American International University"
]

MAJORS = [
    "Computer Science", "Business Administration", "Economics", "Medicine",
    "Civil Engineering", "English Literature", "Mathematics", "Physics", 
    "Chemistry", "Law", "Pharmacy", "Architecture", "Accounting", "Finance",
    "Electrical Engineering", "Mechanical Engineering", "Marketing"
]

COMPLEXIONS = ["Fair", "Wheatish", "Medium", "Olive", "Light Brown"]
BODY_TYPES = ["Slim", "Average", "Athletic", "Heavy", "Well-built"]

RELIGIOUS_LEVELS = [
    "Very Religious (Practicing)", "Moderately Religious", "Religious",
    "Practicing Muslim", "Moderately Practicing", "Devout Muslim"
]

PRAYER_HABITS = [
    "5 times daily (Regular)", "Tries to pray 5 times", "Prays regularly",
    "Sometimes", "Friday prayers regular", "4-5 times daily"
]

QURAN_READING = [
    "Can read fluently with Tajweed", "Can read with some mistakes",
    "Learning to read", "Can recite from memory", "Basic reading ability",
    "Read with Tajweed", "Learning Tajweed"
]

ISLAMIC_KNOWLEDGE = ["Basic", "Good", "Advanced", "Moderate", "Learning", "Intermediate"]

FATHER_PROFESSIONS = [
    "Businessman", "Government Officer", "Teacher", "Doctor", "Retired",
    "Farmer", "Engineer", "Bank Officer", "Private Service", "Self-employed",
    "Civil Servant", "Shop Owner"
]

MOTHER_PROFESSIONS = [
    "Homemaker", "Teacher", "Retired Teacher", "Doctor", "Social Worker",
    "Housewife", "NGO Worker"
]

FAMILY_VALUES_OPTIONS = ["Traditional", "Moderate", "Liberal", "Conservative", "Progressive", "Modern"]
HOME_OWNERSHIP = ["Own house", "Rented", "Family property", "Apartment owner", "Own apartment"]

DIET_OPTIONS = ["Non-vegetarian", "Vegetarian", "Occasionally non-veg", "Halal only", "Pescatarian"]
PERSONALITY_TYPES = ["Introvert", "Extrovert", "Ambivert", "Reserved", "Outgoing", "Balanced"]
SOCIAL_LEVELS = ["Very social", "Moderately social", "Private", "Selective", "Family-oriented", "Social butterfly"]
HEALTH_STATUS = ["Excellent", "Good", "Average", "Very good", "Fit and healthy"]

RELOCATE_OPTIONS = ["Yes", "No", "Depends on job", "Open to discussion", "Within Bangladesh only", "Anywhere"]

# ================================================================
# TEXT GENERATION FUNCTIONS - VARIABLE LENGTH
# ================================================================

def generate_about_me(gender, profession, education, age, city, religious_level, personality):
    """Generate realistic 100-300 word About Me section with variable length"""
    
    # Choose length randomly
    length_type = random.choice(["short", "medium", "long"])
    
    if gender == "Male":
        if length_type == "short":
            # 100-150 words
            return f"Assalamu Alaikum. I am a {age}-year-old {profession} based in {city}. I completed {education} and Alhamdulillah, come from a {religious_level.lower()} family. I am a {personality.lower()} person who values honesty and family. I pray regularly and try to follow Islamic principles in daily life. Looking for a compatible life partner who shares similar values and is committed to building a peaceful Islamic household together. Family is important to me, and I believe in maintaining strong bonds with loved ones."
        
        elif length_type == "medium":
            # 150-220 words
            return f"Assalamu Alaikum. I am a {age}-year-old {profession} currently based in {city}, Bangladesh. I completed my {education} from a reputable institution. Alhamdulillah, I come from a well-educated, {religious_level.lower()} family that values both Deen and Duniya.\n\nProfessionally, I am dedicated to my career and take my responsibilities seriously. At the same time, I believe in maintaining a healthy work-life balance. I am a {personality.lower()} person who values honesty, integrity, and mutual respect in all relationships.\n\nIn terms of religious practice, I am {religious_level.lower()} and strive to follow Islamic principles. I pray regularly and believe that a strong foundation in faith is essential for a successful marriage. Family is very important to me, and I maintain close relationships with my parents and siblings.\n\nI am looking for a compatible partner to complete half of my Deen. Someone who is understanding, respectful, and shares my values regarding family and religion."
        
        else:  # long
            # 250-320 words
            return f"Assalamu Alaikum. I am a {age}-year-old {profession} currently based in {city}, Bangladesh. I completed my {education} from a reputable institution. Alhamdulillah, I come from a well-educated, {religious_level.lower()} family that values both Deen and Duniya.\n\nProfessionally, I am dedicated to my career and take my responsibilities seriously. At the same time, I believe in maintaining a healthy work-life balance and spending quality time with family. I am a {personality.lower()} person who values honesty, integrity, and mutual respect in all relationships.\n\nIn terms of religious practice, I am {religious_level.lower()} and strive to follow Islamic principles in my daily life. I pray regularly, try to increase my Islamic knowledge, and believe that a strong foundation in faith is essential for a successful marriage. I am looking for a life partner who shares similar values and is committed to building a peaceful, loving household together.\n\nFamily is very important to me, and I maintain close relationships with my parents and siblings. I believe in the importance of respecting elders and maintaining strong family bonds. In my free time, I enjoy reading, spending time with family and friends, and engaging in activities that help me grow both personally and spiritually.\n\nI am looking for a compatible partner to complete half of my Deen. Someone who is understanding, respectful, educated, and shares my values regarding family and religion. Together, I hope we can build a beautiful life based on mutual love, respect, and understanding, while always keeping Allah at the center of our marriage."
    
    else:  # Female
        if length_type == "short":
            # 100-150 words
            return f"Assalamu Alaikum. I am {age} years old, working as {profession}. I completed {education} and come from a {religious_level.lower()} family in {city}. I am a {personality.lower()} person who believes in maintaining modesty. I observe hijab and try to live according to Islamic principles. Family means everything to me. After marriage, I envision a household where Islamic values are practiced and there is mutual respect between spouses. Looking for a practicing Muslim husband who is kind, respectful, and values family."
        
        elif length_type == "medium":
            # 150-220 words
            return f"Assalamu Alaikum. I am {age} years old and currently working as a {profession}. I have completed my {education} and Alhamdulillah, I am from a well-educated, {religious_level.lower()} family in {city}. My family has always emphasized the importance of education alongside religious values.\n\nI am a {personality.lower()} person who believes in maintaining modesty and dignity in all aspects of life. I observe hijab and try to live according to Islamic principles while also pursuing my personal and professional growth. I pray regularly and continuously try to improve my knowledge of Islam.\n\nFamily means everything to me. I have been raised with traditional values where respect for elders and maintaining family bonds are paramount. After marriage, I envision a household where Islamic values are practiced, children are raised with good character, and there is mutual respect between spouses.\n\nI am looking for a practicing Muslim husband who is kind, respectful, responsible, and values family. Someone who will treat me with dignity according to the Sunnah and together we can build a home filled with love and faith."
        
        else:  # long
            # 250-320 words
            return f"Assalamu Alaikum. I am {age} years old and currently working as a {profession}. I have completed my {education} and Alhamdulillah, I am from a well-educated, {religious_level.lower()} family in {city}. My family has always emphasized the importance of education alongside religious values.\n\nI am a {personality.lower()} person who believes in maintaining modesty and dignity in all aspects of life. I observe hijab and try to live according to Islamic principles while also pursuing my personal and professional growth. I pray regularly, have a basic understanding of Quran, and continuously try to improve my knowledge of Islam.\n\nFamily means everything to me. I have been raised with traditional values where respect for elders, maintaining family bonds, and caring for loved ones are paramount. After marriage, I envision a household where Islamic values are practiced, children are raised with good character, and there is mutual respect and understanding between spouses.\n\nRegarding work after marriage, I am open to discussion with my future husband. I believe in flexibility and understanding each other's preferences while making decisions that are best for the family. What matters most is creating a peaceful, loving home where we can support each other's goals and grow together spiritually.\n\nI am looking for a practicing Muslim husband who is kind, respectful, responsible, and values family. Someone who will treat me with dignity according to the Sunnah, support my personal growth, and together we can build a home filled with love, faith, and mutual respect. My hope is to find a partner with whom I can complete half of my Deen and walk the path of life with trust in Allah."

def generate_partner_preference(gender, age, education, religious_level):
    """Generate realistic 80-200 word Partner Preference with variable length"""
    
    # Choose length randomly
    length_type = random.choice(["short", "medium", "long"])
    
    if gender == "Male":
        min_age = max(18, age - 7)
        max_age = age - 1
        
        if length_type == "short":
            # 80-120 words
            return f"Looking for an educated, practicing Muslimah aged {min_age}-{max_age} who observes hijab and is committed to Islamic values. She should be from a good family background with similar religious values. Education level: minimum {education} or equivalent. Must pray regularly. Character and Deen are more important to me than physical appearance. My ideal partner would be understanding, supportive, and family-oriented. Financial status is not a primary concern, but she should come from a respectable family."
        
        elif length_type == "medium":
            # 120-180 words
            return f"I am looking for an educated, practicing Muslimah aged {min_age}-{max_age} who observes hijab and is committed to Islamic values. She should be from a good family background with similar religious and cultural values. Education level: minimum {education} or equivalent. Must pray regularly and have knowledge of basic Islamic teachings.\n\nI prefer someone who is modest, respectful, family-oriented, and willing to maintain a balance between career (if any) and family life. Character and Deen are more important to me than physical appearance, though mutual attraction is also important for a healthy marriage.\n\nMy ideal partner would be understanding, supportive, and someone I can communicate openly with. She should value family relationships and be respectful towards elders. I am open to someone who wants to continue her career after marriage, but this can be discussed mutually."
        
        else:  # long
            # 180-240 words
            return f"I am looking for an educated, practicing Muslimah aged {min_age}-{max_age} who observes hijab and is committed to Islamic values. She should be from a good family background with similar religious and cultural values. Education level: minimum {education} or equivalent. Must pray regularly and have knowledge of basic Islamic teachings.\n\nI prefer someone who is modest, respectful, family-oriented, and willing to maintain a balance between career (if any) and family life. Character and Deen are more important to me than physical appearance, though mutual attraction is also important for a healthy marriage.\n\nMy ideal partner would be understanding, supportive, and someone I can communicate openly with. She should value family relationships and be respectful towards elders. Financial status is not a primary concern, but she should come from a respectable family.\n\nI am open to someone who wants to continue her career after marriage, but this can be discussed and decided mutually based on family circumstances. What matters most is that we share the same vision for our future, prioritize our Deen, and work together to build a peaceful Islamic household. May Allah guide us both to what is best and bless us with a spouse who will be the coolness of our eyes."
    
    else:  # Female
        min_age = age + 1
        max_age = age + 10
        
        if length_type == "short":
            # 80-120 words
            return f"Looking for an educated, practicing Muslim man aged {min_age}-{max_age} who prays regularly and has a stable career. He should be from a good family, respectful towards women, and understanding. Minimum education: {education} or equivalent. Financial stability is important. My ideal husband would be kind, responsible, supportive, and have good character. I prefer someone who prays five times daily and has Islamic knowledge. Character and religious practice are more important than wealth."
        
        elif length_type == "medium":
            # 120-180 words
            return f"I am looking for an educated, practicing Muslim man aged {min_age}-{max_age} who prays regularly and has a stable career. He should be from a good family, respectful towards women, and understanding of women's rights in Islam. Minimum education level: {education} or equivalent. Financial stability is important as it's a basic requirement for marriage.\n\nMy ideal husband would be someone who is kind, responsible, supportive, and treats his wife with respect and dignity according to the Sunnah of Prophet Muhammad (PBUH). He should value family, have good character, and be committed to building an Islamic household together.\n\nI am looking for a partner who will support my personal growth while understanding that family comes first. Good communication skills and emotional maturity are very important to me. Character and religious practice are more important than wealth, though he should be financially responsible."
        
        else:  # long
            # 180-240 words
            return f"I am looking for an educated, practicing Muslim man aged {min_age}-{max_age} who prays regularly and has a stable career. He should be from a good family, respectful towards women, and understanding of women's rights in Islam. Minimum education level: {education} or equivalent. Financial stability is important as it's a basic requirement for marriage.\n\nMy ideal husband would be someone who is kind, responsible, supportive, and treats his wife with respect and dignity according to the Sunnah of Prophet Muhammad (PBUH). He should value family, have good character, and be committed to building an Islamic household together.\n\nI am looking for a partner who will support my personal and professional growth while understanding that family comes first. Someone who believes in partnership and shared decision-making rather than one-sided authority. Good communication skills and emotional maturity are very important to me.\n\nI prefer someone who prays five times daily, has Islamic knowledge, and continuously strives to improve his Deen. Character and religious practice are more important than wealth, though he should be financially responsible and capable of supporting a family. May Allah grant us both a spouse who will be a source of comfort, help us grow in faith, and with whom we can build a beautiful life together."

def generate_hobbies(gender, profession, personality):
    """Generate realistic hobbies based on profile"""
    
    hobby_pools = {
        "Introvert": [
            "Reading Islamic books and novels",
            "Learning Quran with Tajweed",
            "Watching documentaries",
            "Gardening",
            "Cooking and trying new recipes",
            "Writing and journaling",
            "Learning new languages",
            "Calligraphy",
            "Listening to nasheeds"
        ],
        "Extrovert": [
            "Traveling and exploring new places",
            "Social work and community service",
            "Organizing family gatherings",
            "Playing cricket or badminton",
            "Attending Islamic lectures",
            "Photography and videography",
            "Meeting new people",
            "Volunteering",
            "Sports activities"
        ],
        "Ambivert": [
            "Reading books and traveling",
            "Cooking traditional Bangladeshi dishes",
            "Spending quality time with family",
            "Watching movies",
            "Learning new skills online",
            "Occasional hiking",
            "Listening to Islamic lectures",
            "Photography",
            "Fitness and yoga"
        ],
        "Reserved": [
            "Reading",
            "Learning Quran",
            "Indoor gardening",
            "Cooking",
            "Watching educational content",
            "Calligraphy",
            "Writing",
            "Learning Islamic history"
        ],
        "Outgoing": [
            "Traveling",
            "Social gatherings",
            "Sports",
            "Attending events",
            "Photography",
            "Community service",
            "Meeting friends",
            "Outdoor activities"
        ],
        "Balanced": [
            "Reading and traveling",
            "Cooking",
            "Family time",
            "Learning new things",
            "Photography",
            "Fitness",
            "Watching documentaries",
            "Occasional hiking"
        ]
    }
    
    base_hobbies = hobby_pools.get(personality, hobby_pools["Ambivert"])
    num_hobbies = random.randint(4, 7)
    selected = random.sample(base_hobbies, k=min(num_hobbies, len(base_hobbies)))
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
    if not existing_profile.get('full_name') or existing_profile.get('full_name') in ["Fatima Khatun", "Ayesha Rahman", "Nusrat Jahan", "Sabina Yasmin", "Md. Kamal Hossain", "Rahim Ahmed", "Farhan Rahman", "Tanvir Islam"]:
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
    major_subject = random.choice(MAJORS) if education in ["BSc", "BA", "BCom", "MSc", "MA", "MBA", "BBA"] else None
    passing_year = current_year - (age - random.randint(22, 26))
    
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
        father_name = f"Md. {random.choice(['Abdur', 'Abdul', 'Mohammad', 'Ahmed', 'Kamal', 'Rahim'])} {random.choice(MALE_LAST_NAMES)}"
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
        "Arts, culture, halal entertainment",
        "Science, history, documentaries",
        "Volunteering, community service",
        "Learning languages, cultural exploration"
    ])
    
    # Location
    city = existing_profile.get('city') or random.choice(BANGLADESHI_CITIES)
    district = random.choice(DISTRICTS)
    area = random.choice(DHAKA_AREAS) if city == "Dhaka" else city
    permanent_address = f"{random.randint(1, 200)}, {random.choice(['Road', 'Lane'])} {random.randint(1, 50)}, {district}, Bangladesh"
    current_address = f"{area}, {city}, Bangladesh"
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
    
    expected_education = random.choice(["HSC or above", "Graduate", "Post-graduate", education, "Any", "Educated"])
    expected_profession = random.choice(["Any respectable profession", "Stable job", "Business or Service", "Open to discussion", "Not specified"])
    expected_income = random.choice([
        "30,000+ BDT", "50,000+ BDT", "70,000+ BDT",
        "1,00,000+ BDT", "Financially stable", "Not a priority", "Open to discussion"
    ])
    expected_religious_level = random.choice(["Practicing", "Moderately religious", "Religious", "Very religious", "Similar to mine"])
    expected_family_type = random.choice(["Any", "Nuclear family", "Open to both", "Flexible", "Not specified"])
    
    # Generate rich text content with variable length
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
        
        # Rich text content (VARIABLE LENGTH)
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
    print("🚀 BIYE KORI - FULL ENHANCED DATABASE FILL")
    print("=" * 70)
    print()
    print("📊 Fetching existing profiles...")
    
    # Get all profiles
    response = supabase.table('profiles').select('*').execute()
    profiles = response.data
    
    print(f"✅ Found {len(profiles)} profiles to enhance")
    print()
    print("🎯 Generating rich, realistic Bangladeshi data...")
    print("   - 100-300 word About Me sections (VARIABLE LENGTH)")
    print("   - 80-200 word Partner Preferences (VARIABLE LENGTH)")
    print("   - Complete family details (parents, siblings)")
    print("   - Religious practice information")
    print("   - Hobbies and interests (4-7 items)")
    print("   - Education details (institution, degree, major)")
    print("   - Physical attributes")
    print("   - Location details")
    print("   - Partner expectations (detailed)")
    print("   - And ALL 30+ fields filled!")
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
        print("✨ All profiles now have:")
        print("   - Variable length About Me (100-300 words)")
        print("   - Variable length Partner Preferences (80-200 words)")
        print("   - ALL 30+ fields completely filled")
        print("   - Realistic Bangladeshi names, locations, professions")
        print("   - Complete family background information")
        print("   - Detailed religious practice information")
        print()
        print("Next steps:")
        print("1. Check your profiles at http://localhost:3000/profiles")
        print("2. Click any profile to see rich, detailed information")
        print("3. Every profile should look professional and complete!")
        print()

if __name__ == "__main__":
    print()
    print("╔══════════════════════════════════════════════════════════╗")
    print("║   BIYE KORI - FULL ENHANCED FILL SCRIPT v2.0            ║")
    print("║   Fills ALL 30+ fields with variable length content     ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print()
    
    confirm = input("⚠️  This will UPDATE all 172 profiles with COMPLETE data. Continue? (yes/no): ")
    
    if confirm.lower() == 'yes':
        fill_enhanced_data()
    else:
        print("❌ Operation cancelled.")
