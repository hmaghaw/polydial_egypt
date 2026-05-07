import { useState, useEffect, useRef } from "react";

/* ─── TRANSLATIONS ─────────────────────────────────── */
const T = {
  ar: {
    dir: "rtl",
    langBtn: "EN",
    navHow: "كيف يشتغل",
    navChannels: "القنوات",
    navPricing: "الأسعار",
    navCta: "للمطاعم →",
    liveBadge: "🇪🇬  وكيل الطلبات بالذكاء الاصطناعي — صنع في مصر",
    heroH1a: "الكلام بيتحوّل لطلب",
    heroH1b: "فوراً وبدون مجهود",
    heroSub: "بولي دايل بيخدم جهتين — مطاعم عايزة تزيد مبيعاتها بالذكاء الاصطناعي، وعملاء عايزين يطلبوا أكلهم بسهولة. كل جهة ليها منصتها.",
    splitChip: "👇 اختار — أنت مين؟",
    splitH2: "منصتين. هدف واحد.",
    splitSub: "اختار مسارك واكتشف إيه اللي بولي دايل قادر يعمله عشانك.",
    // Restaurant card
    restBadge: "🍽 للمطاعم والمحلات",
    restTitle: ["زيد مبيعاتك", "بالذكاء الاصطناعي"],
    restDesc: "حمّل منيوك مرة واحدة وبولي دايل هيستقبل طلباتك من موقعك أو واتساب أو التليفون — على مدار اليوم بدون موظفين إضافيين.",
    dashTitle: "📊 لوحة التحكم — الطلبات الجديدة",
    orders: [
      { id: "#PD-2901", desc: "بيتزا وسط + بيبسي", status: "جديد", color: "green", price: "115" },
      { id: "#PD-2900", desc: "شاورما دجاج × 2", status: "يتحضر", color: "amber", price: "90" },
      { id: "#PD-2899", desc: "كشري كبير × 3", status: "في الطريق", color: "blue", price: "135" },
    ],
    statsToday: "مبيعات اليوم ج.م",
    statsVs: "من الأمس",
    statsOrders: "طلب اليوم",
    restFeats: [
      ["استقبل طلبات 24/7", "بدون موظف استقبال"],
      ["لوحة تحكم كاملة", "طلبات ومحادثات وتقارير"],
      ["اقتراح ذكي يزيد الفاتورة +32%", ""],
      ["تركيب سهل", "سطر HTML واحد على موقعك"],
    ],
    restUrl: "restaurant.polydial.com",
    restCta: "ابدأ كمطعم",
    restNote: "تجربة مجانية 30 يوم · بدون كارت",
    // Customer card
    custBadge: "🎙 للعملاء والأفراد",
    custTitle: ["اطلب أكلك", "بصوتك بسهولة"],
    custDesc: "اتكلم أو اكتب لبولي بالعربي أو الإنجليزي — هيفهم طلبك، يقترح مطاعم حسب ذوقك، ويتابع التوصيل لحد بابك.",
    chatTitle: "🤖 محادثة بولي — طلب جديد",
    chatMsgs: [
      { ai: true, text: "أهلاً! 👋 إيه اللي تحب تاكله النهارده؟" },
      { ai: false, text: "عايز بيتزا مارغريتا وسط" },
      { ai: true, text: "ممتاز! تحب جبنة إضافية؟ بس 8 ج.م 🧀" },
      { ai: false, text: "آه وبيبسي" },
    ],
    listening: "بسمعك...",
    orderSoFar: "✅ طلبك حتى الآن",
    orderItem1: "🍕 بيتزا وسط + جبنة — 103 ج.م",
    orderItem2: "🥤 بيبسي 330مل — 20 ج.م",
    orderDelivery: "شامل التوصيل",
    orderTotal: "148 ج.م",
    custFeats: [
      ["طلب بالصوت أو النص", "عربي وإنجليزي"],
      ["اكتشف مطاعم قريبة منك", "حسب ما تحبه"],
      ["تتبع الطلب لحظة بلحظة", "من المطبخ للباب"],
      ["مجاني تماماً للعملاء", ""],
    ],
    custUrl: "customer.polydial.com",
    custCta: "اطلب دلوقتي",
    custNote: "مجاني تماماً — سجّل في ثوانٍ",
    // Stats
    stats: [
      ["+32%", "زيادة متوسط قيمة الطلب"],
      ["-80%", "تقليل وقت معالجة الطلب"],
      ["24/7", "استقبال طلبات بلا توقف"],
      ["+120", "مطعم بيستخدم بولي دايل"],
    ],
    // How it works
    howChip: "⚡ كيف يشتغل",
    howH2: "رحلة كل طرف مختلفة",
    howSub: "منصتين مصممتين بعناية لاحتياجات مختلفة تماماً.",
    restJourney: "رحلة المطعم",
    restSteps: [
      ["سجّل مطعمك", "أنشئ حساباً في دقيقتين وأضف بيانات مطعمك."],
      ["حمّل المنيو", "أضف الأصناف والأسعار والمعدّلات من لوحة التحكم."],
      ["ركّب الإطار على موقعك", "انسخ سطر كود واحد والصقه — خلاص."],
      ["استقبل وتابع الطلبات", "بولي يستقبل الطلبات وأنت تتابع وتدير كل شيء."],
    ],
    restJourneyCta: "ابدأ كمطعم ←",
    custJourney: "رحلة العميل",
    custSteps: [
      ["سجّل بموبايلك", "رقم موبايل + OTP — جاهز في ثوانٍ."],
      ["اتكلم أو اكتب لبولي", "قول إيه اللي تحب تاكله وبولي هيفهمك."],
      ["أكد وادفع", "كاش، كارت، أو إنستاباي — حسب راحتك."],
      ["تتبع لحد بابك", "شوف طلبك فين في أي لحظة — من المطبخ للديليفري."],
    ],
    custJourneyCta: "اطلب دلوقتي ←",
    // Channels
    chChip: "📡 القنوات",
    chH2: "خد طلباتك من أي مكان",
    chSub: "بولي بيشتغل على القنوات اللي عملاؤك بالفعل بيستخدموها.",
    channels: [
      { icon: "🌐", title: "موقعك الإلكتروني", desc: "iframe سهل — عملاؤك يطلبوا بدون ما يغادروا موقعك.", live: true, pill: "متاح الآن" },
      { icon: "💬", title: "واتساب", desc: "رقم واتساب مخصص يستقبل الطلبات تلقائياً — الأكثر استخداماً في مصر.", live: false, pill: "قريباً" },
      { icon: "📞", title: "الهاتف (IVR)", desc: "رقم تليفون خاص يستقبل طلبات صوتية أوتوماتيك.", live: false, pill: "قريباً" },
    ],
    // Pricing
    prChip: "💰 الأسعار",
    prH2: "للمطاعم — سعر يناسب كل حجم",
    prSub: "ابدأ مجاناً وادفع لما تنمو.",
    prFree: "مجاني دائماً للعملاء 🎉",
    plans: [
      {
        name: "مجاني", price: "0", cur: "ج.م", period: "أول 30 يوم · بدون كارت", featured: false,
        feats: [
          [true, "حتى 100 طلب / شهر"], [true, "إطار الموقع"], [true, "منيو حتى 30 صنف"],
          [false, "واتساب وهاتف"], [false, "تقارير متقدمة"],
        ],
        cta: "ابدأ مجاناً", href: "https://restaurant.polydial.com/signup",
      },
      {
        name: "احترافي", price: "899", cur: "ج.م", period: "شهرياً · يُدفع سنوياً", featured: true, popular: "⭐ الأكثر شيوعاً",
        feats: [
          [true, "طلبات غير محدودة"], [true, "إطار + واتساب"], [true, "منيو غير محدود"],
          [true, "تقارير مبيعات متقدمة"], [true, "اقتراح ذكي (Upsell)"], [false, "هاتف IVR"],
        ],
        cta: "ابدأ الآن", href: "https://restaurant.polydial.com/signup",
        note: "لا عقد — يمكن الإلغاء في أي وقت",
      },
      {
        name: "سلاسل المطاعم", price: null, priceLabel: "تسعير مخصص", cur: "ج.م", period: "للسلاسل والأسطول الكبير", featured: false, gold: true,
        feats: [
          [true, "كل مميزات الخطة الاحترافية"], [true, "هاتف + واتساب + موقع"],
          [true, "فروع متعددة في لوحة واحدة"], [true, "API للتكامل + مدير حساب"],
        ],
        cta: "تواصل معنا", href: "mailto:sales@polydial.com",
      },
    ],
    // Testimonials
    testChip: "💬 آراء العملاء",
    testH2: "مطاعم بتشارك تجربتها",
    testimonials: [
      { text: '"بولي وفّر علينا موظفين استقبال الطلبات — والطلبات زادت ٤٠٪ من الأسبوع الأول!"', avatar: "🍕", name: "أحمد رمضان", role: "بيتزا مصر، القاهرة" },
      { text: '"بولي بيفهم العامية المصرية تماماً. الحل المثالي لسوقنا."', avatar: "🌯", name: "سارة حمدي", role: "شاورما الأهرام، الجيزة" },
      { text: '"التكامل أخد أقل من ١٠ دقائق ولوحة التحكم رائعة."', avatar: "🍜", name: "محمود السيد", role: "كشري الأصيل" },
    ],
    // Final CTA
    ctaChip: "🚀 ابدأ اليوم",
    ctaH2: "مستعد تبدأ؟ اختار مسارك.",
    ctaSub: "منصتان. هدف واحد. أكل أسرع وأذكى.",
    ctaRestChip: "للمطاعم",
    ctaRestTitle: "زيد مبيعاتك بالذكاء الاصطناعي",
    ctaRestSub: "ابدأ تجربتك المجانية — بدون كارت",
    ctaRestBtn: "restaurant.polydial.com ←",
    ctaOr: "أو",
    ctaCustChip: "للعملاء",
    ctaCustTitle: "اطلب أكلك بصوتك",
    ctaCustSub: "مجاني تماماً — سجّل وابدأ فوراً",
    ctaCustBtn: "customer.polydial.com ←",
    // Footer
    footerTagline: "وكيل الطلبات بالذكاء الاصطناعي — صنع في مصر 🇪🇬",
    footerRestTitle: "للمطاعم",
    footerRestLinks: [["ابدأ مجاناً","https://restaurant.polydial.com"],["لوحة التحكم","https://restaurant.polydial.com/dashboard"],["الأسعار","#pricing"],["توثيق API","#"]],
    footerCustTitle: "للعملاء",
    footerCustLinks: [["اطلب الآن","https://customer.polydial.com"],["طلباتي","https://customer.polydial.com/orders"],["اكتشف مطاعم","https://customer.polydial.com/discover"]],
    footerCompTitle: "الشركة",
    footerCompLinks: [["من نحن","#"],["المدونة","#"],["اتصل بنا","#"],["الشروط والخصوصية","#"]],
    footerCopy: "© 2025 PolyDial · صنع بـ ❤ في مصر",
    footerStatus: "كل الأنظمة تعمل",
    stepNums: ["١","٢","٣","٤"],
  },
  en: {
    dir: "ltr",
    langBtn: "ع",
    navHow: "How It Works",
    navChannels: "Channels",
    navPricing: "Pricing",
    navCta: "For Restaurants →",
    liveBadge: "🇪🇬  AI Order Agent — Made in Egypt",
    heroH1a: "Where Voice Becomes an Order",
    heroH1b: "Instantly & Effortlessly",
    heroSub: "PolyDial serves two sides — restaurants that want to grow sales with AI, and customers who want to order food effortlessly. Each side has its own platform.",
    splitChip: "👇 Choose — who are you?",
    splitH2: "Two platforms. One goal.",
    splitSub: "Choose your path and discover what PolyDial can do for you.",
    restBadge: "🍽 For Restaurants",
    restTitle: ["Grow your sales", "with AI"],
    restDesc: "Upload your menu once and PolyDial receives orders from your website, WhatsApp, or phone — around the clock without extra staff.",
    dashTitle: "📊 Dashboard — New Orders",
    orders: [
      { id: "#PD-2901", desc: "Medium pizza + Pepsi", status: "New", color: "green", price: "115" },
      { id: "#PD-2900", desc: "Chicken Shawarma × 2", status: "Preparing", color: "amber", price: "90" },
      { id: "#PD-2899", desc: "Large Koshari × 3", status: "On The Way", color: "blue", price: "135" },
    ],
    statsToday: "Today EGP",
    statsVs: "vs yesterday",
    statsOrders: "Orders today",
    restFeats: [
      ["Receive orders 24/7", "without a receptionist"],
      ["Full control dashboard", "orders, chats & reports"],
      ["Smart upselling increases revenue +32%", ""],
      ["Easy install", "one HTML line on your site"],
    ],
    restUrl: "restaurant.polydial.com",
    restCta: "Start as Restaurant",
    restNote: "30-day free trial · No card",
    custBadge: "🎙 For Customers",
    custTitle: ["Order food", "with your voice"],
    custDesc: "Speak or type to Poly in Arabic or English — it understands your order, suggests restaurants based on your taste, and tracks delivery to your door.",
    chatTitle: "🤖 Poly Chat — New Order",
    chatMsgs: [
      { ai: true, text: "Hey! 👋 What would you like to eat today?" },
      { ai: false, text: "I want a medium margherita pizza" },
      { ai: true, text: "Great! Extra cheese? Only 8 EGP more 🧀" },
      { ai: false, text: "Yes, and a Pepsi" },
    ],
    listening: "Listening...",
    orderSoFar: "✅ Your order so far",
    orderItem1: "🍕 Medium pizza + cheese — 103 EGP",
    orderItem2: "🥤 Pepsi 330ml — 20 EGP",
    orderDelivery: "incl. delivery",
    orderTotal: "148 EGP",
    custFeats: [
      ["Order by voice or text", "Arabic & English"],
      ["Discover nearby restaurants", "based on your taste"],
      ["Live order tracking", "kitchen to your door"],
      ["Completely free for customers", ""],
    ],
    custUrl: "customer.polydial.com",
    custCta: "Order Now",
    custNote: "Completely free — sign up in seconds",
    stats: [
      ["+32%", "Average order value increase"],
      ["-80%", "Order processing time reduction"],
      ["24/7", "Non-stop order receiving"],
      ["+120", "Restaurants using PolyDial"],
    ],
    howChip: "⚡ How It Works",
    howH2: "Each side's journey is different",
    howSub: "Two platforms carefully designed for entirely different needs.",
    restJourney: "Restaurant Journey",
    restSteps: [
      ["Register your restaurant", "Create an account in 2 minutes and add your details."],
      ["Upload your menu", "Add items, prices, and modifiers from the dashboard."],
      ["Embed on your website", "Copy one line of code and paste it — done."],
      ["Receive & monitor orders", "Poly receives orders and you manage everything."],
    ],
    restJourneyCta: "Start as Restaurant →",
    custJourney: "Customer Journey",
    custSteps: [
      ["Register with your phone", "Phone number + OTP — ready in seconds."],
      ["Speak or type to Poly", "Tell Poly what you want and he'll understand."],
      ["Confirm & pay", "Cash, card, or InstaPay — your choice."],
      ["Track to your door", "See where your order is at any moment."],
    ],
    custJourneyCta: "Order Now →",
    chChip: "📡 Channels",
    chH2: "Accept orders from anywhere",
    chSub: "Poly works on the channels your customers already use.",
    channels: [
      { icon: "🌐", title: "Your Website", desc: "Easy iframe — customers order without leaving your page.", live: true, pill: "Live Now" },
      { icon: "💬", title: "WhatsApp", desc: "Dedicated WhatsApp number receives orders automatically.", live: false, pill: "Coming Soon" },
      { icon: "📞", title: "Phone (IVR)", desc: "Dedicated phone number auto-receives voice orders.", live: false, pill: "Coming Soon" },
    ],
    prChip: "💰 Pricing",
    prH2: "For Restaurants — a plan for every size",
    prSub: "Start free and pay as you grow.",
    prFree: "Always free for customers 🎉",
    plans: [
      {
        name: "Starter", price: "0", cur: "EGP", period: "First 30 days · No card", featured: false,
        feats: [
          [true, "Up to 100 orders / month"], [true, "Website iframe"], [true, "Menu up to 30 items"],
          [false, "WhatsApp & Phone"], [false, "Advanced reports"],
        ],
        cta: "Start Free", href: "https://restaurant.polydial.com/signup",
      },
      {
        name: "Professional", price: "899", cur: "EGP", period: "Monthly · Billed annually", featured: true, popular: "⭐ Most Popular",
        feats: [
          [true, "Unlimited orders"], [true, "iframe + WhatsApp"], [true, "Unlimited menu"],
          [true, "Advanced sales reports"], [true, "Smart upsell"], [false, "Phone IVR"],
        ],
        cta: "Get Started", href: "https://restaurant.polydial.com/signup",
        note: "No contract — cancel anytime",
      },
      {
        name: "Enterprise", price: null, priceLabel: "Custom Pricing", cur: "EGP", period: "For chains & large fleets", featured: false, gold: true,
        feats: [
          [true, "Everything in Professional"], [true, "Phone + WhatsApp + Web"],
          [true, "Multi-branch in one dashboard"], [true, "API integration + account manager"],
        ],
        cta: "Contact Us", href: "mailto:sales@polydial.com",
      },
    ],
    testChip: "💬 Reviews",
    testH2: "Restaurants sharing their experience",
    testimonials: [
      { text: '"PolyDial saved us order-taking staff costs — orders went up 40% from week one!"', avatar: "🍕", name: "Ahmed Ramadan", role: "Pizza Misr, Cairo" },
      { text: '"Poly understands Egyptian dialect perfectly. The ideal solution for our market."', avatar: "🌯", name: "Sara Hamdy", role: "Shawarma Al-Ahram, Giza" },
      { text: '"Integration took under 10 minutes and the dashboard is excellent."', avatar: "🍜", name: "Mahmoud El-Sayed", role: "Koshari Al-Aseel" },
    ],
    ctaChip: "🚀 Start Today",
    ctaH2: "Ready to start? Choose your path.",
    ctaSub: "Two platforms. One goal. Faster, smarter food.",
    ctaRestChip: "For Restaurants",
    ctaRestTitle: "Grow your sales with AI",
    ctaRestSub: "Start your free trial — no card needed",
    ctaRestBtn: "restaurant.polydial.com →",
    ctaOr: "or",
    ctaCustChip: "For Customers",
    ctaCustTitle: "Order food with your voice",
    ctaCustSub: "Completely free — register and start now",
    ctaCustBtn: "customer.polydial.com →",
    footerTagline: "AI order agent — Made in Egypt 🇪🇬",
    footerRestTitle: "Restaurants",
    footerRestLinks: [["Start Free","https://restaurant.polydial.com"],["Dashboard","https://restaurant.polydial.com/dashboard"],["Pricing","#pricing"],["API Docs","#"]],
    footerCustTitle: "Customers",
    footerCustLinks: [["Order Now","https://customer.polydial.com"],["My Orders","https://customer.polydial.com/orders"],["Discover","https://customer.polydial.com/discover"]],
    footerCompTitle: "Company",
    footerCompLinks: [["About","#"],["Blog","#"],["Contact","#"],["Terms & Privacy","#"]],
    footerCopy: "© 2025 PolyDial · Made with ❤ in Egypt",
    footerStatus: "All systems operational",
    stepNums: ["1","2","3","4"],
  },
};

/* ─── STYLES ─────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  .pd-root *, .pd-root *::before, .pd-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .pd-root {
    --blue: #1A70FF; --blue-l: #4D93FF; --blue-d: #0A4ACC;
    --blue-faint: rgba(26,112,255,.09); --blue-glow: rgba(26,112,255,.22);
    --gold: #F5A623; --teal: #0EA882; --teal-l: #1EC99C;
    --bg: #050F1E; --bg2: #081524; --bg3: #0C1B2E;
    --s1: rgba(255,255,255,.04); --s2: rgba(255,255,255,.07);
    --b1: rgba(255,255,255,.07); --b2: rgba(255,255,255,.13); --b3: rgba(255,255,255,.2);
    --t1: #EFF4FF; --t2: rgba(239,244,255,.65); --t3: rgba(239,244,255,.38);
    background: var(--bg);
    color: var(--t1);
    font-family: 'Cairo', 'Space Grotesk', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
  }

  .pd-root h1 { font-size: clamp(2.2rem, 4.5vw, 3.6rem); font-weight: 900; line-height: 1.15; letter-spacing: -.02em; }
  .pd-root h2 { font-size: clamp(1.55rem, 2.8vw, 2.35rem); font-weight: 800; line-height: 1.2; }
  .pd-root h3 { font-size: 1.08rem; font-weight: 700; }
  .pd-root p { font-size: .96rem; color: var(--t2); }
  .pd-root a { text-decoration: none; }

  .pd-cn { max-width: 1160px; margin: 0 auto; padding: 0 28px; }
  .pd-center { text-align: center; }

  /* NAV */
  .pd-nav { position: sticky; top: 0; z-index: 999; padding: 13px 0; transition: all .3s; }
  .pd-nav.scrolled { background: rgba(5,15,30,.94); backdrop-filter: blur(18px); border-bottom: 1px solid var(--b1); }
  .pd-nav-inner { display: flex; align-items: center; justify-content: space-between; }
  .pd-nav-links { display: flex; align-items: center; gap: 2px; }
  .pd-nav-link { color: var(--t2); padding: 8px 13px; border-radius: 8px; font-size: .88rem; font-weight: 500; transition: all .15s; cursor: pointer; background: none; border: none; font-family: inherit; }
  .pd-nav-link:hover { color: var(--t1); background: var(--s2); }
  .pd-nav-right { display: flex; align-items: center; gap: 10px; }
  .pd-langbtn { background: var(--s1); border: 1px solid var(--b2); color: var(--t1); font-family: 'Cairo', sans-serif; font-size: .78rem; font-weight: 700; padding: 6px 13px; border-radius: 20px; cursor: pointer; transition: all .15s; }
  .pd-langbtn:hover { border-color: var(--blue-l); color: var(--blue-l); }

  /* BUTTONS */
  .pd-btn { display: inline-flex; align-items: center; gap: 8px; font-family: 'Cairo', sans-serif; font-weight: 700; border: none; cursor: pointer; transition: all .2s; text-decoration: none; white-space: nowrap; border-radius: 12px; }
  .pd-btn-blue { background: var(--blue); color: #fff; padding: 13px 26px; font-size: .95rem; }
  .pd-btn-blue:hover { background: var(--blue-l); transform: translateY(-2px); box-shadow: 0 14px 36px var(--blue-glow); }
  .pd-btn-teal { background: var(--teal); color: #fff; padding: 13px 26px; font-size: .95rem; }
  .pd-btn-teal:hover { background: var(--teal-l); transform: translateY(-2px); box-shadow: 0 14px 36px rgba(14,168,130,.32); }
  .pd-btn-ghost { background: transparent; color: var(--t1); padding: 11px 22px; font-size: .9rem; border: 1.5px solid var(--b2); }
  .pd-btn-ghost:hover { border-color: var(--b3); background: var(--s2); }
  .pd-btn-gold-outline { background: rgba(245,166,35,.1); border: 1.5px solid rgba(245,166,35,.28); color: var(--gold); padding: 11px 22px; font-size: .9rem; }
  .pd-btn-gold-outline:hover { background: rgba(245,166,35,.16); }

  /* CHIPS */
  .pd-chip { display: inline-flex; align-items: center; gap: 6px; background: var(--blue-faint); border: 1px solid rgba(26,112,255,.22); color: var(--blue-l); font-size: .74rem; font-weight: 700; padding: 5px 14px; border-radius: 30px; letter-spacing: .05em; text-transform: uppercase; }
  .pd-chip-teal { background: rgba(14,168,130,.08); border-color: rgba(14,168,130,.22); color: var(--teal-l); }

  /* HERO */
  .pd-hero { min-height: 90vh; display: flex; align-items: center; padding: 120px 0 60px; position: relative; overflow: hidden; }
  .pd-hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .pd-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(26,112,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(26,112,255,.055) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(ellipse 90% 70% at 50% 40%, black, transparent); }
  .pd-hero-glow { position: absolute; top: -5%; left: 50%; transform: translateX(-50%); width: 700px; height: 500px; background: radial-gradient(ellipse, rgba(26,112,255,.13) 0%, transparent 70%); }
  .pd-hero-inner { position: relative; z-index: 1; text-align: center; max-width: 860px; margin: 0 auto; }
  .pd-live-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(14,168,130,.1); border: 1px solid rgba(14,168,130,.28); border-radius: 30px; padding: 7px 16px; margin-bottom: 24px; }
  .pd-live-dot { width: 7px; height: 7px; background: #4ADE80; border-radius: 50%; animation: pdBlink 2s infinite; }
  @keyframes pdBlink { 0%,100%{opacity:1} 50%{opacity:.3} }
  .pd-live-txt { font-size: .78rem; color: var(--teal-l); font-weight: 600; }
  .pd-hero-sub { font-size: 1.05rem; color: var(--t2); max-width: 560px; margin: 14px auto 0; line-height: 1.85; }
  .pd-gradient-text { background: linear-gradient(130deg, var(--blue-l), var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  /* SPLIT */
  .pd-split-section { padding: 0 0 96px; }
  .pd-split-label { text-align: center; margin-bottom: 44px; }
  .pd-split-label h2 { margin-bottom: 8px; }
  .pd-split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

  /* PATH CARDS */
  .pd-pc { border-radius: 26px; overflow: hidden; display: flex; flex-direction: column; transition: transform .3s, box-shadow .3s; border: 1px solid var(--b1); }
  .pd-pc:hover { transform: translateY(-5px); }
  .pd-pc-rest { background: linear-gradient(160deg, #091629 0%, #050D1E 100%); border-color: rgba(26,112,255,.25); }
  .pd-pc-rest:hover { box-shadow: 0 28px 70px rgba(26,112,255,.2), 0 0 0 1px rgba(26,112,255,.32); }
  .pd-pc-cust { background: linear-gradient(160deg, #071A12 0%, #040E0A 100%); border-color: rgba(14,168,130,.25); }
  .pd-pc-cust:hover { box-shadow: 0 28px 70px rgba(14,168,130,.18), 0 0 0 1px rgba(14,168,130,.32); }
  .pd-pc-stripe { height: 4px; width: 100%; }
  .pd-pc-stripe-rest { background: linear-gradient(90deg, var(--blue-d), var(--blue-l)); }
  .pd-pc-stripe-cust { background: linear-gradient(90deg, #07856A, var(--teal-l)); }
  .pd-pc-body { padding: 34px 34px 22px; }
  .pd-pc-badge { display: inline-flex; align-items: center; gap: 7px; border-radius: 30px; padding: 5px 14px; font-size: .72rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; margin-bottom: 16px; }
  .pd-pcbadge-rest { background: rgba(26,112,255,.1); border: 1px solid rgba(26,112,255,.22); color: var(--blue-l); }
  .pd-pcbadge-cust { background: rgba(14,168,130,.1); border: 1px solid rgba(14,168,130,.22); color: var(--teal-l); }
  .pd-pc-icon { font-size: 2.5rem; margin-bottom: 12px; display: block; }
  .pd-pc-title { font-size: clamp(1.35rem, 2.5vw, 1.85rem); font-weight: 900; line-height: 1.2; margin-bottom: 11px; color: var(--t1); }
  .pd-pc-desc { font-size: .89rem; color: var(--t2); line-height: 1.78; margin-bottom: 20px; }

  /* MOCK */
  .pd-mock { margin: 0 22px 22px; border-radius: 14px; overflow: hidden; }
  .pd-mock-rest { border: 1px solid rgba(26,112,255,.15); background: rgba(5,14,30,.85); }
  .pd-mock-cust { border: 1px solid rgba(14,168,130,.15); background: rgba(4,12,9,.85); }
  .pd-mock-head { padding: 9px 13px; border-bottom: 1px solid var(--b1); font-size: .7rem; font-weight: 700; display: flex; align-items: center; gap: 6px; }
  .pd-mh-rest { color: var(--blue-l); border-color: rgba(26,112,255,.12); }
  .pd-mh-cust { color: var(--teal-l); border-color: rgba(14,168,130,.12); }
  .pd-mock-body { padding: 12px; }
  .pd-order-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 9px; background: var(--s1); margin-bottom: 6px; border: 1px solid var(--b1); }
  .pd-or-left { display: flex; align-items: center; gap: 8px; }
  .pd-or-em { font-size: .98rem; }
  .pd-or-title { font-size: .7rem; font-weight: 700; color: var(--t1); }
  .pd-or-sub { font-size: .62rem; color: var(--t3); }
  .pd-or-status { display: flex; align-items: center; gap: 5px; }
  .pd-status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .pd-dot-green { background: #4ADE80; }
  .pd-dot-amber { background: var(--gold); }
  .pd-dot-blue { background: var(--blue-l); }
  .pd-st-txt { font-size: .66rem; font-weight: 700; }
  .pd-st-green { color: #4ADE80; }
  .pd-st-amber { color: var(--gold); }
  .pd-st-blue { color: var(--blue-l); }
  .pd-or-price { font-size: .71rem; font-weight: 800; color: var(--t1); }
  .pd-mini-stats { display: flex; gap: 6px; margin-top: 8px; }
  .pd-ms { flex: 1; background: rgba(26,112,255,.07); border: 1px solid rgba(26,112,255,.12); border-radius: 8px; padding: 8px; text-align: center; }
  .pd-ms-n { font-size: .93rem; font-weight: 900; color: var(--blue-l); }
  .pd-ms-l { font-size: .58rem; color: var(--t3); margin-top: 1px; }

  /* CHAT */
  .pd-chat-col { display: flex; flex-direction: column; gap: 7px; }
  .pd-cb { border-radius: 12px; padding: 8px 12px; font-size: .7rem; line-height: 1.55; max-width: 90%; color: var(--t1); }
  .pd-cb-ai { background: rgba(14,168,130,.1); border: 1px solid rgba(14,168,130,.18); border-radius: 4px 12px 12px 12px; align-self: flex-start; }
  .pd-cb-user { background: var(--teal); border-radius: 12px 4px 12px 12px; align-self: flex-end; }
  .pd-mic-row { display: flex; align-items: center; gap: 8px; background: rgba(14,168,130,.07); border: 1px solid rgba(14,168,130,.18); border-radius: 30px; padding: 7px 12px; margin-top: 5px; }
  .pd-mic-listen { font-size: .62rem; color: var(--teal-l); }
  .pd-wave-bars { display: flex; align-items: center; gap: 3px; }
  .pd-wb { width: 3px; background: var(--teal-l); border-radius: 3px; animation: pdWave .9s ease-in-out infinite; display: inline-block; }
  @keyframes pdWave { 0%,100%{height:5px} 50%{height:17px} }
  .pd-order-conf { background: rgba(14,168,130,.06); border: 1px solid rgba(14,168,130,.16); border-radius: 9px; padding: 9px 11px; margin-top: 7px; }
  .pd-oc-h { font-size: .62rem; color: var(--teal-l); font-weight: 700; margin-bottom: 4px; }
  .pd-oc-i { font-size: .68rem; color: var(--t2); margin-bottom: 2px; }
  .pd-oc-tot { display: flex; justify-content: space-between; margin-top: 5px; padding-top: 5px; border-top: 1px solid rgba(14,168,130,.12); font-size: .7rem; font-weight: 800; }

  /* FEATS */
  .pd-pc-feats { padding: 0 34px 20px; display: flex; flex-direction: column; gap: 9px; }
  .pd-pf { display: flex; align-items: flex-start; gap: 10px; font-size: .85rem; color: var(--t2); }
  .pd-pf-dot { width: 17px; height: 17px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .58rem; flex-shrink: 0; margin-top: 2px; }
  .pd-pfd-rest { background: rgba(26,112,255,.14); color: var(--blue-l); border: 1px solid rgba(26,112,255,.22); }
  .pd-pfd-cust { background: rgba(14,168,130,.14); color: var(--teal-l); border: 1px solid rgba(14,168,130,.22); }

  /* CTA bottom */
  .pd-pc-cta { margin-top: auto; padding: 18px 34px 30px; border-top: 1px solid var(--b1); }
  .pd-pc-cta-rest { border-color: rgba(26,112,255,.1); }
  .pd-pc-cta-cust { border-color: rgba(14,168,130,.1); }
  .pd-pc-url { font-size: .74rem; font-weight: 600; margin-bottom: 12px; opacity: .5; direction: ltr; }
  .pd-pc-cta-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .pd-pc-note { font-size: .73rem; color: var(--t3); }

  /* STATS */
  .pd-stats-bar { background: var(--bg2); border-top: 1px solid var(--b1); border-bottom: 1px solid var(--b1); padding: 34px 0; }
  .pd-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; }
  .pd-stat-item { padding: 0 14px; }
  .pd-stat-item + .pd-stat-item { border-right: 1px solid var(--b1); }
  .pd-stat-num { font-size: 1.9rem; font-weight: 900; background: linear-gradient(135deg, var(--blue-l), var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .pd-stat-lbl { font-size: .77rem; color: var(--t3); margin-top: 2px; }

  /* HOW */
  .pd-sec { padding: 90px 0; }
  .pd-divline { height: 1px; background: linear-gradient(90deg, transparent, var(--b2), transparent); }
  .pd-hiw-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; margin-top: 48px; }
  .pd-hiw-hd { display: flex; align-items: center; gap: 12px; padding: 13px 17px; border-radius: 13px; margin-bottom: 24px; }
  .pd-hiw-hd-rest { background: rgba(26,112,255,.07); border: 1px solid rgba(26,112,255,.16); }
  .pd-hiw-hd-cust { background: rgba(14,168,130,.07); border: 1px solid rgba(14,168,130,.16); }
  .pd-hiw-ico { font-size: 1.3rem; }
  .pd-hiw-ht { font-size: .96rem; font-weight: 800; color: var(--t1); }
  .pd-hiw-hs { font-size: .74rem; color: var(--t3); margin-top: 1px; }
  .pd-sv { display: flex; flex-direction: column; }
  .pd-sv-item { display: flex; gap: 14px; padding-bottom: 24px; }
  .pd-sv-item:last-child { padding-bottom: 0; }
  .pd-sv-left { display: flex; flex-direction: column; align-items: center; }
  .pd-sv-num { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .8rem; font-weight: 800; flex-shrink: 0; }
  .pd-svn-rest { background: rgba(26,112,255,.12); border: 1.5px solid rgba(26,112,255,.28); color: var(--blue-l); }
  .pd-svn-rest-a { background: var(--blue); color: #fff; border-color: var(--blue); box-shadow: 0 0 0 5px rgba(26,112,255,.14); }
  .pd-svn-cust { background: rgba(14,168,130,.12); border: 1.5px solid rgba(14,168,130,.28); color: var(--teal-l); }
  .pd-svn-cust-a { background: var(--teal); color: #fff; border-color: var(--teal); box-shadow: 0 0 0 5px rgba(14,168,130,.14); }
  .pd-sv-line { flex: 1; width: 1.5px; margin-top: 6px; min-height: 14px; }
  .pd-svl-rest { background: linear-gradient(180deg, rgba(26,112,255,.28), transparent); }
  .pd-svl-cust { background: linear-gradient(180deg, rgba(14,168,130,.28), transparent); }
  .pd-sv-txt { padding-top: 4px; }
  .pd-sv-txt h4 { font-size: .89rem; font-weight: 700; margin-bottom: 3px; color: var(--t1); }
  .pd-sv-txt p { font-size: .79rem; color: var(--t3); line-height: 1.6; }

  /* CHANNELS */
  .pd-ch-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 17px; margin-top: 38px; }
  .pd-ch { background: var(--s1); border: 1px solid var(--b1); border-radius: 22px; padding: 24px; text-align: center; transition: all .22s; }
  .pd-ch.live:hover { border-color: rgba(26,112,255,.3); background: rgba(26,112,255,.05); }
  .pd-ch.soon { opacity: .5; }
  .pd-ch-ic { font-size: 2.2rem; margin-bottom: 10px; }
  .pd-live-pill { display: inline-flex; align-items: center; gap: 5px; background: rgba(74,222,128,.09); border: 1px solid rgba(74,222,128,.2); color: #4ADE80; font-size: .67rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-top: 8px; }
  .pd-soon-pill { display: inline-flex; align-items: center; gap: 5px; background: rgba(245,166,35,.09); border: 1px solid rgba(245,166,35,.2); color: var(--gold); font-size: .67rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-top: 8px; }
  .pd-code-block { background: var(--bg3); border-radius: 9px; padding: 9px 12px; font-size: .67rem; font-family: 'Courier New', monospace; color: var(--blue-l); direction: ltr; text-align: left; margin-top: 11px; border: 1px solid rgba(26,112,255,.1); }

  /* PRICING */
  .pd-pr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 19px; margin-top: 40px; align-items: start; }
  .pd-pr { background: var(--s1); border: 1px solid var(--b1); border-radius: 22px; padding: 27px; position: relative; transition: all .22s; }
  .pd-pr:hover { background: var(--s2); }
  .pd-pr-feat { border-color: rgba(26,112,255,.4); background: rgba(26,112,255,.06); box-shadow: 0 0 50px rgba(26,112,255,.1); }
  .pd-pr-gold { border-color: rgba(245,166,35,.22); background: rgba(245,166,35,.03); }
  .pd-pr-pop { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--blue); color: #fff; font-size: .69rem; font-weight: 800; padding: 4px 16px; border-radius: 30px; white-space: nowrap; }
  .pd-pr-nm { font-size: .85rem; font-weight: 700; color: var(--t3); margin-bottom: 7px; }
  .pd-pr-price { font-size: 2.1rem; font-weight: 900; line-height: 1; color: var(--t1); }
  .pd-pr-custom { font-size: 1.6rem; font-weight: 900; color: var(--gold); margin-bottom: 3px; }
  .pd-pr-cur { font-size: .84rem; color: var(--t3); font-weight: 600; display: inline-block; vertical-align: top; margin-top: 4px; }
  .pd-pr-period { font-size: .73rem; color: var(--t3); margin-top: 3px; margin-bottom: 15px; }
  .pd-pr-dv { height: 1px; background: var(--b1); margin: 13px 0; }
  .pd-pr-feats { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
  .pd-prf { display: flex; align-items: center; gap: 8px; font-size: .8rem; }
  .pd-prf-y { color: #4ADE80; font-size: .67rem; flex-shrink: 0; }
  .pd-prf-n { color: var(--t3); font-size: .67rem; flex-shrink: 0; }
  .pd-prf-t { color: var(--t2); }
  .pd-prf-t-off { color: var(--t3); }

  /* TESTIMONIALS */
  .pd-t-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 17px; margin-top: 38px; }
  .pd-tc { background: var(--s1); border: 1px solid var(--b1); border-radius: 22px; padding: 20px; transition: all .2s; }
  .pd-tc:hover { background: var(--s2); }
  .pd-t-stars { color: var(--gold); font-size: .82rem; margin-bottom: 9px; }
  .pd-t-text { font-size: .83rem; color: var(--t2); line-height: 1.75; margin-bottom: 13px; font-style: italic; }
  .pd-t-auth { display: flex; align-items: center; gap: 9px; }
  .pd-t-av { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--b2); display: flex; align-items: center; justify-content: center; font-size: 1rem; background: var(--bg3); }
  .pd-t-name { font-size: .8rem; font-weight: 700; color: var(--t1); }
  .pd-t-role { font-size: .71rem; color: var(--t3); }

  /* FINAL CTA */
  .pd-cta-sec { padding: 0 0 76px; }
  .pd-cta-box { background: linear-gradient(135deg, rgba(26,112,255,.1), rgba(14,168,130,.07)); border: 1px solid rgba(26,112,255,.2); border-radius: 32px; padding: 66px 40px; text-align: center; position: relative; overflow: hidden; }
  .pd-cta-box::before { content:''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; background: radial-gradient(rgba(26,112,255,.16), transparent 70%); border-radius: 50%; pointer-events: none; }
  .pd-cta-box::after { content:''; position: absolute; bottom: -40px; left: -40px; width: 180px; height: 180px; background: radial-gradient(rgba(14,168,130,.12), transparent 70%); border-radius: 50%; pointer-events: none; }
  .pd-cta-in { position: relative; z-index: 1; }
  .pd-cta-split { display: grid; grid-template-columns: 1fr auto 1fr; gap: 32px; align-items: center; margin-top: 38px; }
  .pd-cta-path { background: var(--s1); border-radius: 18px; padding: 24px; transition: all .22s; border: 1px solid var(--b1); }
  .pd-cta-rest { border-color: rgba(26,112,255,.18); }
  .pd-cta-rest:hover { background: rgba(26,112,255,.07); border-color: rgba(26,112,255,.32); }
  .pd-cta-cust { border-color: rgba(14,168,130,.18); }
  .pd-cta-cust:hover { background: rgba(14,168,130,.05); border-color: rgba(14,168,130,.32); }
  .pd-cta-or { font-size: 1rem; font-weight: 900; color: var(--t3); }
  .pd-cta-pi { font-size: 1.75rem; margin-bottom: 8px; }
  .pd-cta-path h3 { margin-bottom: 5px; color: var(--t1); }
  .pd-cta-path p { font-size: .8rem; margin-bottom: 13px; }

  /* FOOTER */
  .pd-footer { background: var(--bg2); border-top: 1px solid var(--b1); padding: 48px 0 24px; }
  .pd-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 30px; margin-bottom: 30px; }
  .pd-footer-brand p { font-size: .79rem; color: var(--t3); line-height: 1.75; max-width: 240px; margin-top: 10px; }
  .pd-footer-col h4 { font-size: .79rem; font-weight: 700; color: var(--t2); margin-bottom: 11px; }
  .pd-fl { display: block; font-size: .77rem; color: var(--t3); text-decoration: none; margin-bottom: 6px; transition: color .15s; cursor: pointer; }
  .pd-fl:hover { color: var(--blue-l); }
  .pd-footer-bot { border-top: 1px solid var(--b1); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; font-size: .73rem; color: var(--t3); flex-wrap: wrap; gap: 10px; }
  .pd-socials { display: flex; gap: 7px; }
  .pd-soc { width: 30px; height: 30px; border-radius: 7px; background: var(--s1); border: 1px solid var(--b1); display: flex; align-items: center; justify-content: center; font-size: .8rem; cursor: pointer; transition: all .15s; color: var(--t2); }
  .pd-soc:hover { border-color: var(--blue-l); }

  /* RTL overrides */
  [dir="rtl"] .pd-stat-item + .pd-stat-item { border-right: none; border-left: 1px solid var(--b1); }
  [dir="rtl"] .pd-cb-ai { border-radius: 4px 12px 12px 12px; }
  [dir="rtl"] .pd-cb-user { border-radius: 12px 4px 12px 12px; }
  [dir="ltr"] .pd-cb-ai { border-radius: 12px 4px 12px 12px; }
  [dir="ltr"] .pd-cb-user { border-radius: 4px 12px 12px 12px; }
  [dir="rtl"] .pd-pc-url { text-align: right; }
  [dir="ltr"] .pd-pc-url { text-align: left; }

  /* Responsive */
  @media(max-width:960px){
    .pd-split-grid { grid-template-columns: 1fr; }
    .pd-hiw-grid { grid-template-columns: 1fr; gap: 32px; }
    .pd-pr-grid { grid-template-columns: 1fr 1fr; }
    .pd-t-grid { grid-template-columns: 1fr 1fr; }
    .pd-footer-grid { grid-template-columns: 1fr 1fr; }
    .pd-cta-split { grid-template-columns: 1fr; gap: 14px; }
    .pd-cta-or { display: none; }
  }
  @media(max-width:640px){
    .pd-stats-grid { grid-template-columns: 1fr 1fr; }
    .pd-ch-grid { grid-template-columns: 1fr; }
    .pd-pr-grid { grid-template-columns: 1fr; }
    .pd-t-grid { grid-template-columns: 1fr; }
    .pd-footer-grid { grid-template-columns: 1fr; }
    .pd-nav-links { display: none; }
    .pd-hero { padding-top: 90px; }
  }
`;

/* ─── LOGO SVG ──────────────────────────────────────── */
const Logo = ({ height = 34 }) => (
  <svg style={{ height, width: "auto" }} viewBox="0 0 260 72" fill="none">
    <circle cx="34" cy="36" r="32" fill="#1A70FF"/>
    <ellipse cx="26" cy="36" rx="13" ry="18" stroke="#050F1E" strokeWidth="3.5" fill="none"/>
    <line x1="12" y1="36" x2="40" y2="36" stroke="#050F1E" strokeWidth="2.5"/>
    <line x1="26" y1="18" x2="26" y2="54" stroke="#050F1E" strokeWidth="2.5"/>
    <circle cx="44" cy="27" r="3.5" fill="#050F1E"/>
    <circle cx="44" cy="36" r="3.5" fill="#050F1E"/>
    <circle cx="44" cy="45" r="3.5" fill="#050F1E"/>
    <line x1="44" y1="27" x2="54" y2="36" stroke="#050F1E" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="44" y1="36" x2="54" y2="36" stroke="#050F1E" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="44" y1="45" x2="54" y2="36" stroke="#050F1E" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M8 58 Q34 72 60 58" stroke="#050F1E" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <text x="75" y="50" fontFamily="'Space Grotesk','Cairo',sans-serif" fontSize="32" fontWeight="700" fill="white">PolyDial</text>
  </svg>
);

/* ─── WAVE BARS ─────────────────────────────────────── */
const WaveBars = () => (
  <div className="pd-wave-bars">
    {[0,1,2,3,4].map(i => (
      <span key={i} className="pd-wb" style={{ animationDelay: `${i * 0.12}s` }} />
    ))}
  </div>
);

/* ─── DASHBOARD MOCK ─────────────────────────────────── */
const DashMock = ({ t }) => (
  <div className="pd-mock pd-mock-rest">
    <div className="pd-mock-head pd-mh-rest">{t.dashTitle}</div>
    <div className="pd-mock-body">
      {t.orders.map((o, i) => (
        <div key={i} className="pd-order-row">
          <div className="pd-or-left">
            <span className="pd-or-em">{["🍕","🌯","🍜"][i]}</span>
            <div>
              <div className="pd-or-title">{o.id}</div>
              <div className="pd-or-sub">{o.desc}</div>
            </div>
          </div>
          <div className="pd-or-status">
            <div className={`pd-status-dot pd-dot-${o.color}`}/>
            <span className={`pd-st-txt pd-st-${o.color}`}>{o.status}</span>
          </div>
          <span className="pd-or-price">{o.price} <span style={{fontSize:".6rem",color:"var(--t3)"}}>ج.م</span></span>
        </div>
      ))}
      <div className="pd-mini-stats">
        <div className="pd-ms"><div className="pd-ms-n">3,420</div><div className="pd-ms-l">{t.statsToday}</div></div>
        <div className="pd-ms"><div className="pd-ms-n" style={{color:"var(--gold)"}}>↑34%</div><div className="pd-ms-l">{t.statsVs}</div></div>
        <div className="pd-ms"><div className="pd-ms-n">18</div><div className="pd-ms-l">{t.statsOrders}</div></div>
      </div>
    </div>
  </div>
);

/* ─── CHAT MOCK ──────────────────────────────────────── */
const ChatMock = ({ t }) => (
  <div className="pd-mock pd-mock-cust">
    <div className="pd-mock-head pd-mh-cust">{t.chatTitle}</div>
    <div className="pd-mock-body">
      <div className="pd-chat-col">
        {t.chatMsgs.map((m, i) => (
          <div key={i} className={`pd-cb ${m.ai ? "pd-cb-ai" : "pd-cb-user"}`}>{m.text}</div>
        ))}
      </div>
      <div className="pd-mic-row">
        <span className="pd-mic-listen">{t.listening}</span>
        <WaveBars/>
        <span style={{fontSize:".9rem"}}>🎙</span>
      </div>
      <div className="pd-order-conf">
        <div className="pd-oc-h">{t.orderSoFar}</div>
        <div className="pd-oc-i">{t.orderItem1}</div>
        <div className="pd-oc-i">{t.orderItem2}</div>
        <div className="pd-oc-tot">
          <span style={{color:"var(--t3)"}}>{t.orderDelivery}</span>
          <span style={{color:"var(--teal-l)"}}>{t.orderTotal}</span>
        </div>
      </div>
    </div>
  </div>
);

/* ─── MAIN COMPONENT ─────────────────────────────────── */
export default function App() {
  const [lang, setLang] = useState("ar");
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const goto = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleLang = () => setLang(l => l === "ar" ? "en" : "ar");

  return (
    <div className="pd-root" dir={t.dir}>
      <style>{STYLES}</style>

      {/* ── NAVBAR ── */}
      <nav className={`pd-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="pd-cn">
          <div className="pd-nav-inner">
            <a href="#" style={{display:"flex",alignItems:"center",gap:10}}><Logo/></a>
            <div className="pd-nav-links">
              {[["how", t.navHow], ["channels", t.navChannels], ["pricing", t.navPricing]].map(([id, lbl]) => (
                <button key={id} className="pd-nav-link" onClick={() => goto(id)}>{lbl}</button>
              ))}
            </div>
            <div className="pd-nav-right">
              <button className="pd-langbtn" onClick={toggleLang}>{t.langBtn}</button>
              <a className="pd-btn pd-btn-blue" style={{padding:"9px 20px",fontSize:".84rem"}} href="https://restaurant.polydial.com">{t.navCta}</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pd-hero">
        <div className="pd-hero-bg">
          <div className="pd-hero-grid"/>
          <div className="pd-hero-glow"/>
        </div>
        <div className="pd-cn">
          <div className="pd-hero-inner">
            <div className="pd-live-badge">
              <div className="pd-live-dot"/>
              <span className="pd-live-txt">{t.liveBadge}</span>
            </div>
            <h1>
              <span>{t.heroH1a}</span><br/>
              <span className="pd-gradient-text">{t.heroH1b}</span>
            </h1>
            <p className="pd-hero-sub">{t.heroSub}</p>
          </div>
        </div>
      </section>

      {/* ── THE SPLIT ── */}
      <section className="pd-split-section">
        <div className="pd-cn">
          <div className="pd-split-label">
            <div className="pd-chip" style={{marginBottom:14}}>{t.splitChip}</div>
            <h2>{t.splitH2}</h2>
            <p style={{maxWidth:480,margin:"8px auto 0"}}>{t.splitSub}</p>
          </div>

          <div className="pd-split-grid">
            {/* RESTAURANT */}
            <div className="pd-pc pd-pc-rest">
              <div className="pd-pc-stripe pd-pc-stripe-rest"/>
              <div className="pd-pc-body">
                <div className="pd-pc-badge pd-pcbadge-rest">{t.restBadge}</div>
                <span className="pd-pc-icon">📈</span>
                <h2 className="pd-pc-title">{t.restTitle[0]}<br/>{t.restTitle[1]}</h2>
                <p className="pd-pc-desc">{t.restDesc}</p>
              </div>
              <DashMock t={t}/>
              <div className="pd-pc-feats">
                {t.restFeats.map(([bold, rest], i) => (
                  <div key={i} className="pd-pf">
                    <div className="pd-pf-dot pd-pfd-rest">✓</div>
                    <span><strong style={{color:"var(--t1)",fontWeight:700}}>{bold}</strong>{rest ? <> — {rest}</> : null}</span>
                  </div>
                ))}
              </div>
              <div className="pd-pc-cta pd-pc-cta-rest">
                <div className="pd-pc-url">{t.restUrl}</div>
                <div className="pd-pc-cta-row">
                  <a className="pd-btn pd-btn-blue" href="https://restaurant.polydial.com">
                    {t.restCta} <span>{lang==="ar"?"←":"→"}</span>
                  </a>
                  <span className="pd-pc-note">{t.restNote}</span>
                </div>
              </div>
            </div>

            {/* CUSTOMER */}
            <div className="pd-pc pd-pc-cust">
              <div className="pd-pc-stripe pd-pc-stripe-cust"/>
              <div className="pd-pc-body">
                <div className="pd-pc-badge pd-pcbadge-cust">{t.custBadge}</div>
                <span className="pd-pc-icon">🍔</span>
                <h2 className="pd-pc-title">{t.custTitle[0]}<br/>{t.custTitle[1]}</h2>
                <p className="pd-pc-desc">{t.custDesc}</p>
              </div>
              <ChatMock t={t}/>
              <div className="pd-pc-feats">
                {t.custFeats.map(([bold, rest], i) => (
                  <div key={i} className="pd-pf">
                    <div className="pd-pf-dot pd-pfd-cust">✓</div>
                    <span><strong style={{color:"var(--t1)",fontWeight:700}}>{bold}</strong>{rest ? <> — {rest}</> : null}</span>
                  </div>
                ))}
              </div>
              <div className="pd-pc-cta pd-pc-cta-cust">
                <div className="pd-pc-url" style={{color:"var(--teal-l)"}}>{t.custUrl}</div>
                <div className="pd-pc-cta-row">
                  <a className="pd-btn pd-btn-teal" href="https://customer.polydial.com">
                    {t.custCta} <span>{lang==="ar"?"←":"→"}</span>
                  </a>
                  <span className="pd-pc-note">{t.custNote}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="pd-stats-bar">
        <div className="pd-cn">
          <div className="pd-stats-grid">
            {t.stats.map(([num, lbl], i) => (
              <div key={i} className="pd-stat-item">
                <div className="pd-stat-num">{num}</div>
                <div className="pd-stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="pd-sec pd-center" id="how">
        <div className="pd-cn">
          <div className="pd-chip" style={{marginBottom:14}}>{t.howChip}</div>
          <h2>{t.howH2}</h2>
          <p style={{maxWidth:460,margin:"10px auto 0"}}>{t.howSub}</p>

          <div className="pd-hiw-grid">
            {/* Restaurant journey */}
            <div>
              <div className="pd-hiw-hd pd-hiw-hd-rest">
                <span className="pd-hiw-ico">🍽</span>
                <div>
                  <div className="pd-hiw-ht">{t.restJourney}</div>
                  <div className="pd-hiw-hs">restaurant.polydial.com</div>
                </div>
              </div>
              <div className="pd-sv">
                {t.restSteps.map(([title, desc], i) => (
                  <div key={i} className="pd-sv-item">
                    <div className="pd-sv-left">
                      <div className={`pd-sv-num ${i===0?"pd-svn-rest-a":"pd-svn-rest"}`}>{t.stepNums[i]}</div>
                      {i < 3 && <div className="pd-sv-line pd-svl-rest"/>}
                    </div>
                    <div className="pd-sv-txt" style={{textAlign:lang==="ar"?"right":"left"}}>
                      <h4>{title}</h4>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:22,textAlign:lang==="ar"?"right":"left"}}>
                <a className="pd-btn pd-btn-blue" href="https://restaurant.polydial.com">{t.restJourneyCta}</a>
              </div>
            </div>

            {/* Customer journey */}
            <div>
              <div className="pd-hiw-hd pd-hiw-hd-cust">
                <span className="pd-hiw-ico">🎙</span>
                <div>
                  <div className="pd-hiw-ht">{t.custJourney}</div>
                  <div className="pd-hiw-hs">customer.polydial.com</div>
                </div>
              </div>
              <div className="pd-sv">
                {t.custSteps.map(([title, desc], i) => (
                  <div key={i} className="pd-sv-item">
                    <div className="pd-sv-left">
                      <div className={`pd-sv-num ${i===0?"pd-svn-cust-a":"pd-svn-cust"}`}>{t.stepNums[i]}</div>
                      {i < 3 && <div className="pd-sv-line pd-svl-cust"/>}
                    </div>
                    <div className="pd-sv-txt" style={{textAlign:lang==="ar"?"right":"left"}}>
                      <h4>{title}</h4>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:22,textAlign:lang==="ar"?"right":"left"}}>
                <a className="pd-btn pd-btn-teal" href="https://customer.polydial.com">{t.custJourneyCta}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pd-divline"/>

      {/* ── CHANNELS ── */}
      <section className="pd-sec pd-center" id="channels">
        <div className="pd-cn">
          <div className="pd-chip" style={{marginBottom:14}}>{t.chChip}</div>
          <h2>{t.chH2}</h2>
          <p style={{maxWidth:460,margin:"10px auto 0"}}>{t.chSub}</p>
          <div className="pd-ch-grid">
            {t.channels.map((ch, i) => (
              <div key={i} className={`pd-ch ${ch.live?"live":"soon"}`}>
                <div className="pd-ch-ic">{ch.icon}</div>
                <h3>{ch.title}</h3>
                <p style={{fontSize:".82rem",marginTop:6}}>{ch.desc}</p>
                {ch.live
                  ? <div className="pd-live-pill"><span style={{width:6,height:6,background:"#4ADE80",borderRadius:"50%",display:"inline-block"}}/> {ch.pill}</div>
                  : <div className="pd-soon-pill">{ch.pill}</div>}
                {ch.live && <div className="pd-code-block">&lt;iframe src="polydial.eg/w?rk=YOUR_KEY" /&gt;</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pd-divline"/>

      {/* ── PRICING ── */}
      <section className="pd-sec pd-center" id="pricing">
        <div className="pd-cn">
          <div className="pd-chip" style={{marginBottom:14}}>{t.prChip}</div>
          <h2>{t.prH2}</h2>
          <p style={{maxWidth:440,margin:"10px auto 0"}}>
            {t.prSub} <strong style={{color:"#4ADE80"}}>{t.prFree}</strong>
          </p>
          <div className="pd-pr-grid">
            {t.plans.map((plan, i) => (
              <div key={i} className={`pd-pr ${plan.featured?"pd-pr-feat":""} ${plan.gold?"pd-pr-gold":""}`}>
                {plan.popular && <div className="pd-pr-pop">{plan.popular}</div>}
                <div className="pd-pr-nm">{plan.name}</div>
                {plan.price !== null
                  ? <div><span className="pd-pr-cur">{plan.cur} </span><span className="pd-pr-price">{plan.price}</span></div>
                  : <div className="pd-pr-custom">{plan.priceLabel}</div>}
                <div className="pd-pr-period">{plan.period}</div>
                <div className="pd-pr-dv" style={plan.featured?{background:"rgba(26,112,255,.18)"}:plan.gold?{background:"rgba(245,166,35,.14)"}:{}}/>
                <div className="pd-pr-feats">
                  {plan.feats.map(([yes, text], j) => (
                    <div key={j} className="pd-prf">
                      <span className={yes?"pd-prf-y":"pd-prf-n"}>{yes?"✓":"✗"}</span>
                      <span className={`pd-prf-t${yes?"":" pd-prf-t-off"}`}>{text}</span>
                    </div>
                  ))}
                </div>
                <a
                  className={`pd-btn ${plan.gold?"pd-btn-gold-outline":plan.featured?"pd-btn-blue":"pd-btn-ghost"}`}
                  style={{width:"100%",justifyContent:"center"}}
                  href={plan.href}
                >{plan.cta}</a>
                {plan.note && <p style={{fontSize:".7rem",color:"var(--t3)",marginTop:8}}>{plan.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pd-divline"/>

      {/* ── TESTIMONIALS ── */}
      <section className="pd-sec pd-center">
        <div className="pd-cn">
          <div className="pd-chip" style={{marginBottom:14}}>{t.testChip}</div>
          <h2>{t.testH2}</h2>
          <div className="pd-t-grid">
            {t.testimonials.map((tt, i) => (
              <div key={i} className="pd-tc">
                <div className="pd-t-stars">★★★★★</div>
                <div className="pd-t-text">{tt.text}</div>
                <div className="pd-t-auth">
                  <div className="pd-t-av">{tt.avatar}</div>
                  <div>
                    <div className="pd-t-name">{tt.name}</div>
                    <div className="pd-t-role">{tt.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="pd-cta-sec">
        <div className="pd-cn">
          <div className="pd-cta-box">
            <div className="pd-cta-in">
              <div className="pd-chip" style={{marginBottom:14}}>{t.ctaChip}</div>
              <h2>{t.ctaH2}</h2>
              <p style={{maxWidth:440,margin:"10px auto 0"}}>{t.ctaSub}</p>
              <div className="pd-cta-split">
                <div className="pd-cta-path pd-cta-rest">
                  <div className="pd-cta-pi">🍽</div>
                  <div className="pd-chip" style={{marginBottom:10,fontSize:".7rem"}}>{t.ctaRestChip}</div>
                  <h3>{t.ctaRestTitle}</h3>
                  <p>{t.ctaRestSub}</p>
                  <a className="pd-btn pd-btn-blue" href="https://restaurant.polydial.com">{t.ctaRestBtn}</a>
                </div>
                <div className="pd-cta-or">{t.ctaOr}</div>
                <div className="pd-cta-path pd-cta-cust">
                  <div className="pd-cta-pi">🎙</div>
                  <div className="pd-chip pd-chip-teal" style={{marginBottom:10,fontSize:".7rem"}}>{t.ctaCustChip}</div>
                  <h3>{t.ctaCustTitle}</h3>
                  <p>{t.ctaCustSub}</p>
                  <a className="pd-btn pd-btn-teal" href="https://customer.polydial.com">{t.ctaCustBtn}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pd-footer">
        <div className="pd-cn">
          <div className="pd-footer-grid">
            <div className="pd-footer-brand">
              <Logo height={28}/>
              <p>{t.footerTagline}</p>
              <div className="pd-socials" style={{marginTop:13}}>
                {["𝕏","in","f","▶"].map(s => <div key={s} className="pd-soc">{s}</div>)}
              </div>
            </div>
            {[
              [t.footerRestTitle, t.footerRestLinks],
              [t.footerCustTitle, t.footerCustLinks],
              [t.footerCompTitle, t.footerCompLinks],
            ].map(([title, links]) => (
              <div key={title} className="pd-footer-col">
                <h4>{title}</h4>
                {links.map(([lbl, href]) => (
                  <a key={lbl} className="pd-fl" href={href}>{lbl}</a>
                ))}
              </div>
            ))}
          </div>
          <div className="pd-footer-bot">
            <span>{t.footerCopy}</span>
            <span style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{width:7,height:7,background:"#4ADE80",borderRadius:"50%",display:"inline-block"}}/>
              {t.footerStatus}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
