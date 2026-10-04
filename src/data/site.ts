export interface RegionEvent {
  id: string;
  name: string;
  uzName: string;
  isConfirmed: boolean;
  venue?: string;
  date?: string;
  time?: string;
  status: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  badge: string;
  photo: string;
  socials?: {
    telegram?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const siteData = {
  name: "ArticularUZ",
  edition: "Season 2026",
  tagline: "Where young minds articulate the future",
  motto: "Learn. Think. Articulate.",
  shortDesc: "National youth aerospace tournament in Uzbekistan. Teams research a space topic, build a presentation, and defend engineering findings in English.",
  
  links: {
    bot: "https://t.me/articularuz_tgbot",
    channel: "https://t.me/articularuz",
    instagram: "https://instagram.com/articularuz",
    linkedin: "https://linkedin.com/company/articularuz",
    yvc: "https://t.me/yvc_uz"
  },

  stats: [
    { label: "Active Regions", value: "5", suffix: " Chapters" },
    { label: "Official Partners", value: "2", suffix: " State & Youth" },
    { label: "English Defense", value: "100%", suffix: " Format" },
    { label: "Youth Participants", value: "500+", suffix: " Registered" }
  ],

  partners: [
    {
      name: "Uzcosmos",
      fullName: "Space Research and Technology Agency under the Cabinet of Ministers of the Republic of Uzbekistan",
      logoLight: "./assets/uzcosmos-dark.png",
      logoDark: "./assets/uzcosmos-white-logo.png",
      role: "Official State Partner  Certified Credentials"
    },
    {
      name: "Youth Volunteering Club",
      fullName: "National Youth Volunteering Community (@yvc_uz)",
      logoLight: "./assets/yvc.jpg",
      logoDark: "./assets/yvc.jpg",
      role: "Strategic Partner  Logistics & Outreach"
    }
  ],

  stages: [
    {
      num: "01",
      title: "Research Track",
      desc: "Teams select a technical aerospace challenge: orbital mechanics, planetary rovers, CubeSats, or lunar missions.",
      photo: "./assets/workshop.jpg",
      caption: "Practical engineering session"
    },
    {
      num: "02",
      title: "Deck & Prototype",
      desc: "During timed workshop sessions with laptops and tablets, teams synthesize data, architecture, and calculations.",
      photo: "",
      caption: "Team Jupiter drafting presentation"
    },
    {
      num: "03",
      title: "English Defense",
      desc: "Stage presentation in English before aerospace mentors and academic jury panels.",
      photo: "./assets/pitching.jpg",
      caption: "Public defense on stage"
    },
    {
      num: "04",
      title: "Uzcosmos Awards",
      desc: "Official Gold, Silver, and Bronze certificates co-signed with Uzcosmos Agency leadership.",
      photo: "./assets/certificates.jpg",
      caption: "Official Uzcosmos award certificates"
    }
  ],

  // 14 regions of Uzbekistan (5 verified with real venue/time, 9 upcoming)
  regions: [
    {
      id: "tashkent",
      name: "Tashkent City",
      uzName: "Toshkent shahri",
      isConfirmed: true,
      venue: "C-Space Yunusabad",
      date: "27 September",
      time: "15:00",
      status: "Regional Round Completed"
    },
    {
      id: "tashkent-region",
      name: "Tashkent Region",
      uzName: "Toshkent viloyati",
      isConfirmed: true,
      venue: "Academic Lyceum of Agrarian State University",
      date: "27 September",
      time: "11:00",
      status: "Regional Round Completed"
    },
    {
      id: "bukhara",
      name: "Bukhara",
      uzName: "Buxoro viloyati",
      isConfirmed: true,
      venue: "Ibn Sino School",
      date: "26 September",
      time: "13:00",
      status: "Regional Round Completed"
    },
    {
      id: "andijan",
      name: "Andijan",
      uzName: "Andijon viloyati",
      isConfirmed: true,
      venue: "Satashkent",
      date: "27 September",
      time: "14:00",
      status: "Regional Round Completed"
    },
    {
      id: "fergana",
      name: "Fergana",
      uzName: "Farg`ona viloyati",
      isConfirmed: true,
      venue: "Unity Language Academy",
      date: "27 September",
      time: "10:00",
      status: "Regional Round Completed"
    },
    {
      id: "samarkand",
      name: "Samarkand",
      uzName: "Samarqand viloyati",
      isConfirmed: false,
      status: "Registrations Open for Season 2026"
    },
    {
      id: "namangan",
      name: "Namangan",
      uzName: "Namangan viloyati",
      isConfirmed: false,
      status: "Registrations Open for Season 2026"
    },
    {
      id: "kashkadarya",
      name: "Kashkadarya",
      uzName: "Qashqadaryo viloyati",
      isConfirmed: false,
      status: "Registrations Open for Season 2026"
    },
    {
      id: "surkhandarya",
      name: "Surkhandarya",
      uzName: "Surxondaryo viloyati",
      isConfirmed: false,
      status: "Registrations Open for Season 2026"
    },
    {
      id: "jizzakh",
      name: "Jizzakh",
      uzName: "Jizzax viloyati",
      isConfirmed: false,
      status: "Registrations Open for Season 2026"
    },
    {
      id: "syrdarya",
      name: "Syrdarya",
      uzName: "Sirdaryo viloyati",
      isConfirmed: false,
      status: "Registrations Open for Season 2026"
    },
    {
      id: "navoi",
      name: "Navoi",
      uzName: "Navoiy viloyati",
      isConfirmed: false,
      status: "Registrations Open for Season 2026"
    },
    {
      id: "khorezm",
      name: "Khorezm",
      uzName: "Xorazm viloyati",
      isConfirmed: false,
      status: "Registrations Open for Season 2026"
    },
    {
      id: "karakalpakstan",
      name: "Karakalpakstan",
      uzName: "Qoraqalpog`iston",
      isConfirmed: false,
      status: "Registrations Open for Season 2026"
    }
  ] as RegionEvent[],

  // Volontyorlar.uz inspired team cards with real portrait photos
  team: [
    {
      id: "temurbek",
      name: "Temurbek Muslimov",
      role: "Tournament Director",
      department: "Organizing Council",
      badge: "Lead & Founder",
      photo: "",
      socials: {
        telegram: "https://t.me/articularuz",
        instagram: "https://instagram.com/articularuz",
        linkedin: "https://linkedin.com/company/articularuz"
      }
    },
    {
      id: "alisher",
      name: "Alisher Nematov",
      role: "Technical Lead",
      department: "Aerospace Track",
      badge: "Engineering",
      photo: "",
      socials: {
        telegram: "https://t.me/articularuz",
        instagram: "https://instagram.com/articularuz",
        linkedin: "https://linkedin.com/company/articularuz"
      }
    },
    {
      id: "madina",
      name: "Madina Karimova",
      role: "Academic Standards Lead",
      department: "English Defense",
      badge: "Academic Panel",
      photo: "",
      socials: {
        telegram: "https://t.me/articularuz",
        instagram: "https://instagram.com/articularuz",
        linkedin: "https://linkedin.com/company/articularuz"
      }
    },
    {
      id: "jamshid",
      name: "Jamshid Aliev",
      role: "Regional Coordinator",
      department: "Regional Operations",
      badge: "YVC Liaison",
      photo: "",
      socials: {
        telegram: "https://t.me/yvc_uz",
        instagram: "https://instagram.com/articularuz",
        linkedin: "https://linkedin.com/company/articularuz"
      }
    }
  ] as TeamMember[]
};

