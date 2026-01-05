import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

export const translations = {
  en: {
    nav_find_home: "Find a Home",
    nav_list_property: "List Property",
    footer_copyright: "© 2024 KariLike Platform. No brokers allowed.",
    privacy: "Privacy",
    terms: "Terms",
    support: "Support",
    
    hero_title_1: "Rent Directly.",
    hero_title_2: "No Brokers attached.",
    hero_subtitle: "Connect directly with homeowners. Save money on brokerage fees. Find your perfect student pad or professional apartment with ease.",
    cat_apartments: "Apartments",
    cat_houses: "Houses",
    cat_rooms: "Shared Rooms",
    cat_studios: "Studios",
    verified_owners: "Verified Owners",
    zero_brokerage: "Zero Brokerage",
    direct_chat: "Direct Chat",
    search_results: "Search Results",
    featured_properties: "Featured Properties",
    found_properties: "Found {count} properties matching your criteria",
    handpicked: "Handpicked properties just for you",
    show_all: "Show All",
    no_properties: "No properties found",
    try_adjusting: "Try adjusting your search terms or using AI search for better matches.",
    clear_filters: "Clear Filters",
    
    search_placeholder: "Search by title or type...",
    ai_search_placeholder: "Describe your dream home... (e.g. 'cheap studio')",
    search_btn: "Search",
    ai_search_btn: "AI Search",
    enable_ai: "Enable AI Search",
    ai_active: "AI Mode Active",
    all_cities: "All Cities",
    select_city: "Select City",
    
    per_month: "/month",
    listed_by: "Listed by",
    featured: "FEATURED",
    
    list_your_property: "List Your Property",
    connect_tenants: "Connect directly with thousands of verified tenants. No broker fees.",
    property_details: "Property Details",
    property_photo: "Property Photos",
    click_upload: "Click to upload",
    add_photos: "Add Photos",
    upload_hint: "PNG, JPG up to 10MB",
    i_want_to: "I want to",
    rent: "Rent",
    lease: "Lease",
    property_type: "Property Type",
    monthly_price: "Monthly Price (MAD)",
    location: "Location",
    location_map: "Location on Map",
    key_features: "Key Features (Amenities)",
    separate_commas: "Separate with commas",
    description: "Description",
    auto_write: "Auto-Write with AI",
    ai_tip: "Tip: Click \"Auto-Write with AI\" to generate a description based on your features and location.",
    contact_info: "Contact Information",
    your_name: "Your Name",
    email_phone: "Contact Email / Phone",
    post_now: "Post Listing Now",
    agreement: "By posting, you agree to KariLike's no-broker policy.",
    listing_submitted: "Listing Submitted!",
    listing_submitted_desc: "Your property has been submitted for review. It will be live on KariLike shortly. Direct tenants are on their way!",
    post_another: "Post Another Property",
    remove_image: "Remove image",
    
    return_home: "Return Home",
    prop_not_found: "Property not found",
    back_listings: "Back to listings",
    share: "Share",
    save: "Save",
    about_home: "About this home",
    amenities: "Amenities",
    property_owner: "Property Owner",
    member_since: "Member since 2023",
    chat_owner: "Chat with Owner",
    no_fees: "No broker fees applicable.",
    kari_assistant: "KariLike Assistant",
    drafting_msg: "Drafting messages to {name}",
    ask_placeholder: "Ask about this property...",
    monthly_rent: "Monthly Rent",
    contact: "Contact",
    bed: "Bed",
    bath: "Bath",
    sqft: "ft²",
    chat_intro: "Hi! I can help answer questions about this property. What would you like to know?",
    currency: "MAD",

    // Rating System
    reviews: "Reviews",
    rate_owner: "Rate Owner",
    rate_title: "Rate {name}",
    submit_review: "Submit Review",
    review_placeholder: "Share your experience with this owner...",
    review_submitted: "Review Submitted!",
    review_thanks: "Thank you for your feedback.",

    // Auth Translations
    nav_login: "Login",
    nav_signup: "Sign Up",
    nav_logout: "Logout",
    auth_login_title: "Welcome Back",
    auth_signup_title: "Create Account",
    auth_name: "Full Name",
    auth_email: "Email Address",
    auth_phone: "Phone Number",
    auth_password: "Password",
    auth_login_btn: "Sign In",
    auth_signup_btn: "Create Account",
    auth_no_account: "Don't have an account?",
    auth_have_account: "Already have an account?",
    auth_welcome: "Hi, {name}",
    auth_switch_signup: "Sign up now",
    auth_switch_login: "Sign in",
    auth_error_creds: "Invalid email or password",
    auth_error_exists: "Account already exists",
    
    // New Role & Verification Translations
    auth_role_label: "I want to...",
    auth_role_owner: "List my place (Homeowner)",
    auth_role_renter: "Find a home (Renter)",
    auth_verify_title: "Identity Verification",
    auth_verify_desc: "To prevent fraud and ensure a safe community, please verify your identity.",
    auth_id_upload_label: "Upload Government ID",
    auth_id_upload_hint: "Drivers License, Passport, or National ID",
    auth_verify_status: "ID Selected: {fileName}"
  },
  ar: {
    nav_find_home: "ابحث عن منزل",
    nav_list_property: "اعرض عقارك",
    footer_copyright: "© 2024 منصة كاري ليك. لا وسطاء.",
    privacy: "الخصوصية",
    terms: "الشروط",
    support: "الدعم",
    
    hero_title_1: "استأجر مباشرة.",
    hero_title_2: "بدون وسطاء.",
    hero_subtitle: "تواصل مباشرة مع أصحاب المنازل. وفر أموالك من رسوم السمسرة. اعثر على سكن الطلاب المثالي أو شقة مهنية بسهولة.",
    cat_apartments: "شقق",
    cat_houses: "منازل",
    cat_rooms: "غرف مشتركة",
    cat_studios: "استوديوهات",
    verified_owners: "ملاك موثوقون",
    zero_brokerage: "بدون عمولة",
    direct_chat: "محادثة مباشرة",
    search_results: "نتائج البحث",
    featured_properties: "عقارات مميزة",
    found_properties: "تم العثور على {count} عقار مطابق لمعاييرك",
    handpicked: "عقارات مختارة خصيصاً لك",
    show_all: "عرض الكل",
    no_properties: "لم يتم العثور على عقارات",
    try_adjusting: "جرب تعديل مصطلحات البحث أو استخدام البحث بالذكاء الاصطناعي للحصول على تطابق أفضل.",
    clear_filters: "مسح المرشحات",
    
    search_placeholder: "ابحث بالعنوان أو النوع...",
    ai_search_placeholder: "صف منزل أحلامك... (مثال: 'استوديو رخيص')",
    search_btn: "بحث",
    ai_search_btn: "بحث ذكي",
    enable_ai: "تفعيل البحث الذكي",
    ai_active: "البحث الذكي مفعل",
    all_cities: "كل المدن",
    select_city: "اختر المدينة",
    
    per_month: "/شهر",
    listed_by: "بواسطة",
    featured: "مميز",
    
    list_your_property: "اعرض عقارك",
    connect_tenants: "تواصل مباشرة مع آلاف المستأجرين الموثوقين. بدون رسوم سمسرة.",
    property_details: "تفاصيل العقار",
    property_photo: "صور العقار",
    click_upload: "انقر للرفع",
    add_photos: "أضف صوراً",
    upload_hint: "PNG, JPG حتى 10 ميجابايت",
    i_want_to: "أريد أن",
    rent: "أؤجر",
    lease: "عقد إيجار",
    property_type: "نوع العقار",
    monthly_price: "السعر الشهري (د.م.)",
    location: "الموقع",
    location_map: "الموقع على الخريطة",
    key_features: "الميزات الرئيسية (المرافق)",
    separate_commas: "افصل بينها بفواصل",
    description: "الوصف",
    auto_write: "كتابة تلقائية بالذكاء الاصطناعي",
    ai_tip: "نصيحة: انقر فوق 'كتابة تلقائية' لإنشاء وصف بناءً على ميزاتك وموقعك.",
    contact_info: "معلومات الاتصال",
    your_name: "اسمك",
    email_phone: "البريد الإلكتروني / الهاتف",
    post_now: "انشر القائمة الآن",
    agreement: "بإرسالك لهذا، أنت توافق على سياسة كاري ليك بعدم وجود وسطاء.",
    listing_submitted: "تم تقديم القائمة!",
    listing_submitted_desc: "تم تقديم عقارك للمراجعة. سيكون متاحاً على كاري ليك قريباً. المستأجرون في طريقهم إليك!",
    post_another: "انشر عقاراً آخر",
    remove_image: "إزالة الصورة",
    
    return_home: "العودة للرئيسية",
    prop_not_found: "العقار غير موجود",
    back_listings: "العودة للقوائم",
    share: "مشاركة",
    save: "حفظ",
    about_home: "حول هذا المنزل",
    amenities: "المرافق",
    property_owner: "مالك العقار",
    member_since: "عضو منذ 2023",
    chat_owner: "دردش مع المالك",
    no_fees: "لا توجد رسوم سمسرة.",
    kari_assistant: "مساعد كاري ليك",
    drafting_msg: "صياغة رسائل إلى {name}",
    ask_placeholder: "اسأل عن هذا العقار...",
    monthly_rent: "إيجار شهري",
    contact: "تواصل",
    bed: "سرير",
    bath: "حمام",
    sqft: "قدم²",
    chat_intro: "مرحباً! يمكنني المساعدة في الإجابة عن أسئلة حول هذا العقار. ماذا تريد أن تعرف؟",
    currency: "د.م.",

    // Rating System
    reviews: "تقييمات",
    rate_owner: "قيّم المالك",
    rate_title: "تقييم {name}",
    submit_review: "إرسال التقييم",
    review_placeholder: "شارك تجربتك مع هذا المالك...",
    review_submitted: "تم إرسال التقييم!",
    review_thanks: "شكراً لملاحظاتك.",

    // Auth Translations
    nav_login: "دخول",
    nav_signup: "تسجيل جديد",
    nav_logout: "خروج",
    auth_login_title: "مرحباً بعودتك",
    auth_signup_title: "إنشاء حساب",
    auth_name: "الاسم الكامل",
    auth_email: "البريد الإلكتروني",
    auth_phone: "رقم الهاتف",
    auth_password: "كلمة المرور",
    auth_login_btn: "تسجيل الدخول",
    auth_signup_btn: "إنشاء حساب",
    auth_no_account: "ليس لديك حساب؟",
    auth_have_account: "لديك حساب بالفعل؟",
    auth_welcome: "مرحباً، {name}",
    auth_switch_signup: "سجل الآن",
    auth_switch_login: "تسجيل الدخول",
    auth_error_creds: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    auth_error_exists: "الحساب موجود بالفعل",
    
    // New Role & Verification Translations
    auth_role_label: "أنا أريد...",
    auth_role_owner: "عرض عقار (مالك)",
    auth_role_renter: "البحث عن سكن (مستأجر)",
    auth_verify_title: "التحقق من الهوية",
    auth_verify_desc: "لمنع الاحتيال وضمان مجتمع آمن، يرجى التحقق من هويتكم.",
    auth_id_upload_label: "رفع هوية حكومية",
    auth_id_upload_hint: "رخصة قيادة، جواز سفر، أو هوية وطنية",
    auth_verify_status: "تم تحديد الهوية: {fileName}"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string, params?: Record<string, string | number>) => {
    // @ts-ignore
    let text = translations[language][key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};