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
  bio?: string;
  socials?: {
    telegram?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const siteData = {
  name: "ArticularUZ",
  edition: "Season 2026",
  tagline: "Where young minds articulate the future.",
  heroQuote: "Vision without execution is daydreaming.",
  motto: "Learn · Think · Articulate",
  shortDesc:
    "ArticularUZ is a youth-led space initiative in Uzbekistan. Workshops, debates, and mentoring for students who want to understand the space industry and speak about it with confidence. In person. In English. Free of charge.",

  links: {
    bot: "https://t.me/articularuzbot",
    channel: "https://t.me/articularuz",
    instagram: "https://www.instagram.com/articularuz",
    linkedin: "https://www.linkedin.com/company/articularuz",
    yvc: "https://t.me/yvc_uz",
    email: "contact@articular.uz"
  },

  stats: [
    { label: "Active Regions", value: "5", suffix: " Chapters" },
    { label: "Official Partners", value: "2", suffix: " Recognitions" },
    { label: "Event Participants", value: "300+", suffix: " In Person" },
    { label: "Telegram Members", value: "1,200+", suffix: " Community" }
  ],

  mission: {
    badge: "MISSION",
    heading: "Public opinion first. The industry follows.",
    desc: "The space industry cannot grow without young people who care about it, and young people cannot care about what they have never seen. So we begin with perception. ArticularUZ was founded on 8 April 2026 with one mission: to make the space industry popular among young people in Uzbekistan.",
    values: "Our values: respect, humility, and a commitment to improving the space industry in Uzbekistan."
  },

  method: {
    badge: "LEARN. THINK. ARTICULATE.",
    steps: [
      {
        num: "01",
        word: "LEARN.",
        desc: "Space science through real questions, not textbook templates."
      },
      {
        num: "02",
        word: "THINK.",
        desc: "Critical thinking applied to bold scientific ideas."
      },
      {
        num: "03",
        word: "ARTICULATE.",
        desc: "Present your ideas in English, with confidence, in front of an audience."
      }
    ]
  },

  events: {
    badge: "WHAT WE RUN",
    heading: "What we run",
    desc: "Events are held in person, one to two times a month in every active region. Come alone or bring a team. Solo participants are placed in a team on the spot.",
    items: [
      {
        id: "workshops",
        title: "Workshops",
        subtitle: "Learn by doing",
        desc: "Learn by doing, guided by people who know the subject.",
        photo: "./assets/workshop.jpg"
      },
      {
        id: "debates",
        title: "Debates",
        subtitle: "Defend your position",
        desc: "Take a position on a real question, defend it, and answer the challenge.",
        photo: "./assets/pitching.jpg"
      },
      {
        id: "mentoring",
        title: "Mentoring",
        subtitle: "Sharpen your idea",
        desc: "Sit down with experienced mentors and sharpen your idea.",
        photo: "./assets/mentoring.jpg"
      }
    ]
  },

  spaceFest: {
    badge: "FEATURED EVENT",
    title: "Space Fest 2026",
    subtitle:
      "ArticularUZ took part officially in Space Fest 2026, held during International Space Week.",
    date: "October 2026",
    venue: "Tashkent, Uzbekistan",
    participants: "70+ Participants",
    results:
      "A two-hour challenge for teams on the question of how humanity moves across Mars. More than 70 participants took part. The top three teams received official certificates, merchandise, and prizes.",
    photos: [
      {
        src: "./assets/event-grand.jpg",
        alt: "Space Fest 2026 Mars Challenge",
        title: "Mars Challenge Final Defense",
        tag: "Space Fest 2026"
      },
      {
        src: "./assets/certificates.jpg",
        alt: "Awarding Top Teams",
        title: "Top 3 Team Certificates",
        tag: "Ceremony"
      },
      {
        src: "./assets/discussion.jpg",
        alt: "Team Strategy Discussion",
        title: "Mars Transportation Architecture",
        tag: "Challenge Lab"
      }
    ]
  },

  milestones: [
    {
      date: "8 April 2026",
      title: "ArticularUZ is founded",
      desc: "Founded with one mission: to make the space industry popular among young people in Uzbekistan."
    },
    {
      date: "27 September 2026",
      title: "Tashkent City Event",
      desc: "In-person regional tournament round at C-Space Yunusabad."
    },
    {
      date: "October 2026",
      title: "Space Fest 2026",
      desc: "Official participation in Space Fest held during World Space Week."
    },
    {
      date: "10 October 2026",
      title: "Mars Transportation Challenge",
      desc: "Over 70 participants competed in solving interplanetary surface mobility."
    }
  ],

  certificates: {
    badge: "RECOGNITION",
    heading: "Earned, not handed out.",
    desc: "The top three teams at each event receive official ArticularUZ certificates, recognized by Uzcosmos Agency and the Youth Volunteers Club. Each one states what the team actually achieved."
  },

  partners: [
    {
      name: "Uzcosmos Agency",
      fullName: "Space Research and Technology Agency under the Cabinet of Ministers of the Republic of Uzbekistan",
      logoLight: "./assets/uzcosmos-dark.svg",
      logoDark: "./assets/uzcosmos-white.svg",
      role: "Official State Patron · Jury Mentorship & Certificates"
    },
    {
      name: "Youth Volunteers Club",
      fullName: "National Youth Volunteering Community (@yvc_uz)",
      logoLight: "./assets/yvc-png.png",
      logoDark: "./assets/yvc-white.png",
      role: "Strategic Partner · Logistics & Regional Outreach"
    }
  ],

  // 14 regions of Uzbekistan (5 active, 9 coming soon)
  regions: [
    {
      id: "tashkent",
      name: "Tashkent City",
      uzName: "Toshkent shahri",
      isConfirmed: true,
      venue: "C-Space Yunusabad",
      date: "27 September",
      time: "15:00",
      status: "Event Completed"
    },
    {
      id: "tashkent-region",
      name: "Tashkent Region",
      uzName: "Toshkent viloyati",
      isConfirmed: true,
      venue: "Academic Lyceum of Agrarian State University",
      date: "27 September",
      time: "11:00",
      status: "Active Chapter"
    },
    {
      id: "bukhara",
      name: "Bukhara",
      uzName: "Buxoro viloyati",
      isConfirmed: true,
      venue: "Ibn Sino School",
      date: "26 September",
      time: "13:00",
      status: "Active Chapter"
    },
    {
      id: "andijan",
      name: "Andijan",
      uzName: "Andijon viloyati",
      isConfirmed: true,
      venue: "Satashkent",
      date: "27 September",
      time: "14:00",
      status: "Active Chapter"
    },
    {
      id: "fergana",
      name: "Fergana",
      uzName: "Farg`ona viloyati",
      isConfirmed: true,
      venue: "Unity Language Academy",
      date: "27 September",
      time: "10:00",
      status: "Active Chapter"
    },
    {
      id: "samarkand",
      name: "Samarkand",
      uzName: "Samarqand viloyati",
      isConfirmed: false,
      status: "Coming Soon"
    },
    {
      id: "namangan",
      name: "Namangan",
      uzName: "Namangan viloyati",
      isConfirmed: false,
      status: "Coming Soon"
    },
    {
      id: "kashkadarya",
      name: "Kashkadarya",
      uzName: "Qashqadaryo viloyati",
      isConfirmed: false,
      status: "Coming Soon"
    },
    {
      id: "surkhandarya",
      name: "Surkhandarya",
      uzName: "Surxondaryo viloyati",
      isConfirmed: false,
      status: "Coming Soon"
    },
    {
      id: "jizzakh",
      name: "Jizzakh",
      uzName: "Jizzax viloyati",
      isConfirmed: false,
      status: "Coming Soon"
    },
    {
      id: "syrdarya",
      name: "Syrdarya",
      uzName: "Sirdaryo viloyati",
      isConfirmed: false,
      status: "Coming Soon"
    },
    {
      id: "navoi",
      name: "Navoi",
      uzName: "Navoiy viloyati",
      isConfirmed: false,
      status: "Coming Soon"
    },
    {
      id: "khorezm",
      name: "Khorezm",
      uzName: "Xorazm viloyati",
      isConfirmed: false,
      status: "Coming Soon"
    },
    {
      id: "karakalpakstan",
      name: "Karakalpakstan",
      uzName: "Qoraqalpog`iston",
      isConfirmed: false,
      status: "Coming Soon"
    }
  ] as RegionEvent[],

  // Core Leadership & Department Leads from Temurbek Muslimov
  team: [
    {
      id: "sarvar",
      name: "Sarvar Esanmuratov",
      role: "Co-Founder & Executive Co-Director",
      department: "Executive Leadership",
      badge: "Co-Founder",
      photo: "",
      socials: {
        telegram: "https://t.me/articularuz",
        instagram: "https://instagram.com/articularuz",
        linkedin: "https://linkedin.com/company/articularuz"
      }
    },
    {
      id: "ahmadjon",
      name: "Ahmadjon Khaldarov",
      role: "Co-Founder & Executive Co-Director",
      department: "Executive Leadership",
      badge: "Co-Founder",
      photo: "",
      socials: {
        telegram: "https://t.me/articularuz",
        instagram: "https://instagram.com/articularuz",
        linkedin: "https://linkedin.com/company/articularuz"
      }
    },
    {
      id: "sherozbek",
      name: "Sherozbek Fozilov",
      role: "Internal Affairs",
      department: "Regional Coordination & Chapter Growth",
      badge: "Operations",
      photo: "",
      socials: {
        telegram: "https://t.me/articularuz",
        instagram: "https://instagram.com/articularuz",
        linkedin: "https://linkedin.com/company/articularuz"
      }
    },
    {
      id: "sardor",
      name: "Sardor Qodirov",
      role: "Research & Development",
      department: "New Event Formats",
      badge: "R&D",
      photo: "",
      socials: {
        telegram: "https://t.me/articularuz",
        instagram: "https://instagram.com/articularuz",
        linkedin: "https://linkedin.com/company/articularuz"
      }
    },
    {
      id: "temurbek",
      name: "Temurbek Muslimov",
      role: "Software Development & Automation",
      department: "Event Software, Official Website & Automation Tools",
      badge: "Tech Lead",
      photo: "",
      socials: {
        telegram: "https://t.me/articularuz",
        instagram: "https://instagram.com/articularuz",
        linkedin: "https://linkedin.com/company/articularuz"
      }
    }
  ] as TeamMember[],

  faq: [
    {
      question: "Who can join?",
      answer: "Anyone currently enrolled in a school, lyceum, college, or university in Uzbekistan."
    },
    {
      question: "Do I need experience?",
      answer: "No. Anyone interested is welcome."
    },
    {
      question: "What English level is needed?",
      answer: "B2 or above is preferred."
    },
    {
      question: "Can I join alone?",
      answer: "Yes. Solo participants are placed in a team at the event."
    },
    {
      question: "Does it cost anything?",
      answer: "No. Participation is free."
    },
    {
      question: "Is my region active?",
      answer: "If it is not listed, it is coming soon."
    }
  ] as FaqItem[]
};
