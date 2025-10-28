import { Calendar2, DollarSquare, FolderOpen, Routing } from "iconsax-react";
import type { 
  BranchExecCardProps,
  EventDetailsProps, 
  EventItemProps, 
  FeaturedPostCardType, 
  FileViewProps, 
  MenuCardProps, 
  OptionLabelProps, 
  ProjectCardProps, 
  ProjectDetailsProps, 
  PublicationCardProps, 
  PublicationDataType, 
  RegularPostCardType 
} from "./types";

export const BRANCHES: string[] = [
  "home", "aba", "umuahia", "enugu", "owerri",
  "lagos", "abuja", "atlanta", "houston",
  "london", "new-york", "toronto",
  "johannesburg", "dubai"
];

export const AGEGRADES: string[] = [
  "okpu-nnukwu", "ndi-udo", "ndi-ijeoma", 
  "uke-achara", "uke-ezinne", 
  "uke-progressive", "uke-unity"
]

export const genderOptions: OptionLabelProps[] = [
  { label: "Man", value: "man" },
  { label: "Woman", value: "woman" },
];

export const nigerianBranches: OptionLabelProps[] = [
  { label: "Home Branch", value: "home" },
  { label: "Aba Branch", value: "aba" },
  { label: "Umuahia Branch", value: "umuahia" },
  { label: "Enugu Branch", value: "enugu" },
  { label: "Owerri Branch", value: "owerri" },
  { label: "Lagos Branch", value: "lagos" },
  { label: "Abuja Branch", value: "abuja" },
];

export const abroadBranches: OptionLabelProps[] = [
  { label: "Atlanta Branch", value: "atlanta" },
  { label: "Houston Branch", value: "houston" },
  { label: "London Branch", value: "london" },
  { label: "New York Branch", value: "new-york" },
  { label: "Toronto Branch", value: "toronto" },
  { label: "Johannesburg Branch", value: "johannesburg" },
  { label: "Dubai Branch", value: "dubai" },
];

export const ageGradeOptions: OptionLabelProps[] = [
  { label: "Okpu Nnukwu", value: "okpu-nnukwu" },
  { label: "Ndi Udo", value: "ndi-udo" },
  { label: "Ndi Ijeoma", value: "ndi-ijeoma" },
  { label: "Uke Achara", value: "uke-achara" },
  { label: "Uke Ezinne", value: "uke-ezinne" },
  { label: "Uke Progressive", value: "uke-progressive" },
  { label: "Uke Unity", value: "uke-unity" },
];

export const locationOptions: OptionLabelProps[] = [
  { label: "Nigeria", value: "nigeria" },
  { label: "Abroad", value: "abroad" },
];

export const villageOptions: OptionLabelProps[] = [
  { label: "Ameke", value: "ameke" },
  { label: "Amogudu", value: "amogudu" },
  { label: "Agboji", value: "agboji" },
];

export const upcomingEvents: EventItemProps[] = [
    {
        id: "1",
        title: "Women's Empowerment Workshop",
        img: "/images/abriba-event.jpg",
        host: "ACIU Lagos Branch",
        date: "21st January 2026",
        time: "12:00pm - 5:00pm"
    },
    {
        id: "2",
        title: "Women's Empowerment Workshop",
        img: "/images/abriba-event.jpg",
        host: "ACIU Lagos Branch",
        date: "21st January 2026",
        time: "12:00pm - 5:00pm"
    },
    {
        id: "3",
        title: "Women's Empowerment Workshop",
        img: "/images/abriba-event.jpg",
        host: "ACIU Lagos Branch",
        date: "21st January 2026",
        time: "12:00pm - 5:00pm"
    },
    {
        id: "4",
        title: "Women's Empowerment Workshop",
        img: "/images/abriba-event.jpg",
        host: "ACIU Lagos Branch",
        date: "21st January 2026",
        time: "12:00pm - 5:00pm"
    },
    {
        id: "5",
        title: "Women's Empowerment Workshop",
        img: "/images/abriba-event.jpg",
        host: "ACIU Lagos Branch",
        date: "21st January 2026",
        time: "12:00pm - 5:00pm"
    },
    {
        id: "6",
        title: "Women's Empowerment Workshop",
        img: "/images/abriba-event.jpg",
        host: "ACIU Lagos Branch",
        date: "21st January 2026",
        time: "12:00pm - 5:00pm"
    },
    {
        id: "7",
        title: "Women's Empowerment Workshop",
        img: "/images/abriba-event.jpg",
        host: "ACIU Lagos Branch",
        date: "21st January 2026",
        time: "12:00pm - 5:00pm"
    },
    {
        id: "8",
        title: "Women's Empowerment Workshop",
        img: "/images/abriba-event.jpg",
        host: "ACIU Lagos Branch",
        date: "21st January 2026",
        time: "12:00pm - 5:00pm"
    },
]

export const eventDetails: EventDetailsProps = {
  id: "5",
  img: "/images/abriba-event.jpg",
  branch: "ACIU, Lagos Branch",
  title: "Igwa Mang Cultural Festival",
  content: `The Igwa Mang Cultural Festival is one of Abiriba’s most revered traditions, 
    a homecoming, a public show of service, and a rite of identity. 
    This year, the Lagos chapter of ACIU proudly hosts a regional edition, 
    bringing together sons and daughters of Abiriba for a vibrant day of honour, celebration and unity. 
    This event celebrates the achievements of active age grades, honours elders, 
    and showcases the enduring bond that holds us together — no matter where we reside.`,
  eventDate: "21st January 2026",
  eventTime: "12:00 PM – 5:00 PM",
  eventLocation: "12B Obafemi Awolowo Way, Ikeja, Lagos",
  eventHighlights: [
    "Age grade procession and cultural display",
    "Community honours and award presentations",
    "Tribute to retiring age grades (Ime Uche segment)",
    "Traditional food and drinks",
    "Keynote speech by National President",
    "Children’s cultural showcase"
  ]
}


export const regularPosts: RegularPostCardType[] = [
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
]

export const featuredPosts: FeaturedPostCardType[] = [
    {
        img: "/images/blog-placeholder.jpg",
        title: "Tech, Tradition and the Future of ACIU",
        author: "Eke Urum",
        date: "20 Jan 2025",
        views: 239,
        comments: 21
    },
    {
        img: "/images/blog-placeholder.jpg",
        title: "Tech, Tradition and the Future of ACIU",
        author: "Eke Urum",
        date: "20 Jan 2025",
        views: 239,
        comments: 21
    }
]

export const publicationStats: PublicationCardProps[] = [
    {
        title: 'Total Submissions',
        postNumber: '5',
        rateOfChange: '+12.5'
    },
    {
        title: 'Published Posts',
        postNumber: '3',
        rateOfChange: '+12.5'
    },
     {
        title: 'Pending Approval',
        postNumber: '2',
        rateOfChange: '-12.5'
    },
]

export const publicationStatuses: PublicationDataType["status"][] = 
["published", "pending approval", "rejected", "draft"]


export const dummyResources: FileViewProps[] = [
  {
    file: new File(["Hello world content"], "document.txt", { type: "text/plain", lastModified: Date.now() }),
    name: "My Document",
    description: "A simple text document"
  },
  {
    file: new File([new Uint8Array([137, 80, 78, 71])], "image.png", { type: "image/png", lastModified: Date.now() }),
    name: "Profile Image",
    description: "User profile picture"
  },
  {
    file: new File(["<html></html>"], "index.html", { type: "text/html", lastModified: Date.now() }),
    name: "Website Index",
    description: "HTML index file"
  },
  {
    file: new File([new ArrayBuffer(1024 * 1024)], "video.mp4", { type: "video/mp4", lastModified: Date.now() }),
    name: "Promo Video",
    description: "Marketing video clip"
  },
  {
    file: new File([JSON.stringify({ foo: "bar" })], "data.json", { type: "application/json", lastModified: Date.now() }),
    name: "Data Export",
    description: "JSON export of app data"
  }
];


export const fields = [
  {
    name: "title",
    label: "Post Title",
    placeholder: "Enter your post title",
    required: true,
  },
  {
    name: "description",
    label: "Post Description",
    placeholder: "Write a short description for your post",
    required: true,
  },
  {
    name: "tags",
    label: "Post Tags",
    placeholder: "Add tags",
    required: true,
    helperText: 'Press "<span className="italic">return</span>" to add tag',
  },
];

export const helpSupportMenu: MenuCardProps[] = [
  {
    icon: Routing,
    title: "Locate My Branch",
    description: "Find meeting venues in your city, state, or country.",
    route: "",
    action: true,
  },
  {
    icon: DollarSquare,
    title: "Pay My Dues",
    description: "Clear dues or support a project instantly.",
    route: "/my-payments"
  },
  {
    icon: Calendar2,
    title: "See Upcoming Events",
    description: "RSVP or register for national, branch or diaspora events.",
    route: "/events"
  },
  {
    icon: FolderOpen,
    title: "Access Files & Resources",
    description: "Download the ACIU Constitution, anthem, or documents.",
    route: "/resources"
  }
]

export const helpAndSupportAccordion = [
    {
        id: 1,
        summary: "How do I register as a member?",
        content: "Visit the Membership page and click “Register.” Fill in your details, select your branch and submit for verification."
    },
    {
        id: 2,
        summary: "What if I don’t know my age grade?",
        content: "Visit the Membership page and click “Register.” Fill in your details, select your branch and submit for verification."
    },
    {
        id: 3,
        summary: "How do I pay my dues or make a donation?",
        content: "Visit the Membership page and click “Register.” Fill in your details, select your branch and submit for verification."
    },
    {
        id: 4,
        summary: "Can I volunteer or serve in a committee?",
        content: "Visit the Membership page and click “Register.” Fill in your details, select your branch and submit for verification."
    },
    {
        id: 5,
        summary: "How do I contact my local branch?",
        content: "Visit the Membership page and click “Register.” Fill in your details, select your branch and submit for verification."
    },
    {
        id: 6,
        summary: "I need help with my login or dashboard. What should I do?",
        content: "Visit the Membership page and click “Register.” Fill in your details, select your branch and submit for verification."
    },
]


export const branchExecutiveMockData: BranchExecCardProps[] = [
  {
    name: "Mazi Emeka Kalu",
    position: "Chairman",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  },
  {
    name: "Adaora Emezi",
    position: "Secretary",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  },
  {
    name: "Mr. Ikenna O.",
    position: "Treasurer",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  },
  {
    name: "Mazi Emeka Kalu",
    position: "Chairman",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  },
  {
    name: "Adaora Emezi",
    position: "Secretary",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  },
  {
    name: "Mr. Ikenna O.",
    position: "Treasurer",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  }
]

export const ongoingProjects: ProjectCardProps[] = [
  {
    id: "1",
    name: "Scholarship Fund 2025",
    image: "/images/abriba-event.jpg",
    badge: "Student Scholarships",
    targetFunds: "1200000",
    collectedFunds: "600000",
    description: `This project will restore the leaking roof 
      of the only health centre 
      in Amogudu village, ensuring safe care for residents and children.`,
    link: "/projects/1"
  },
  {
    id: "2",
    name: "Amogudu Health Centre Roof Repair",
    image: "/images/abriba-event.jpg",
    badge: "Community Infrastructure",
    targetFunds: "1200000",
    collectedFunds: "60000000",
    description: `This project will restore the leaking roof 
      of the only health centre 
      in Amogudu village, ensuring safe care for residents and children.`,
    link: "/projects/1"
  },
  {
    id: "3",
    name: "Water Borehole for Itumbauzo Road Axis",
    image: "/images/abriba-event.jpg",
    badge: "Health Outreach",
    targetFunds: "1200000",
    collectedFunds: "600000",
    description: `This project will restore the leaking roof 
      of the only health centre 
      in Amogudu village, ensuring safe care for residents and children.`,
    link: "/projects/1"
  },
  {
    id: "4",
    name: "Scholarship Fund 2025",
    image: "/images/abriba-event.jpg",
    badge: "Student Scholarships",
    targetFunds: "60000000",
    collectedFunds: "12000000",
    description: `This project will restore the leaking roof 
      of the only health centre 
      in Amogudu village, ensuring safe care for residents and children.`,
    link: "/projects/1"
  },
  {
    id: "5",
    name: "Amogudu Health Centre Roof Repair",
    image: "/images/abriba-event.jpg",
    badge: "Community Infrastructure",
    targetFunds: "12000000",
    collectedFunds: "6000000",
    description: `This project will restore the leaking roof 
      of the only health centre 
      in Amogudu village, ensuring safe care for residents and children.`,
    link: "/projects/1"
  },
  {
    id: "6",
    name: "Water Borehole for Itumbauzo Road Axis",
    image: "/images/abriba-event.jpg",
    badge: "Health Outreach",
    targetFunds: "1203000",
    collectedFunds: "635000",
    description: `This project will restore the leaking roof 
      of the only health centre 
      in Amogudu village, ensuring safe care for residents and children.`,
    link: "/projects/1"
  },

]


export const projectDetail: ProjectDetailsProps = {
  id: "1",
  title: "Abiriba Community Road Rehabilitation",
  location: "Abriba Town",
  badge: "Community Infrastructure",
  projectImages: ["/images/project-img-1.jpg", "/images/project-img-1.jpg", 
    "/images/project-img-1.jpg", "/images/project-img-1.jpg", 
    "/images/project-img-1.jpg",
  ],
  description: `This project focuses on rehabilitating and 
  resurfacing the major access road linking Ameke, Agboji, 
  and Amogudu villages, improving transportation and 
  accessibility for residents and visitors.`,
  value: `For decades, poor road conditions have made daily 
  commuting difficult, increased vehicle maintenance costs, 
  and slowed down economic activities in the community. 
  By fixing this road, we ensure smoother transportation for traders, 
  students, and elders while boosting local commerce and safety.`,
  impact: [{
    type: "list",
    content: [
      "10,000+ community members benefit directly",
      "Easier access to schools, markets, and health facilities",
      "Encourages diaspora investment and community pride"
    ]
  }],
  scope: [{
      type: "list",
      content: [
        "Grading and resurfacing of the 7 km stretch",
        "Installation of proper drainage to prevent flooding"
      ]
    },
    {
      type: "paragraph",
      content: ["We will begin next week."]
    }
  ],
  collectedFunds: "₦18,200,000",
  targetFunds: "₦25,000,000",
  projectManager: "Uke Ezema Age Grade",
  donations: [{
    name: "Prince Chijokie",
    amount: "$1,000",
    time: "2025-10-10"
  },
  {
    name: "Prince Chijokie",
    amount: "$1,000",
    time: "2025-10-10"
  },
  {
    name: "Prince Chijokie",
    amount: "$1,000",
    time: "2025-10-10"
  },
  {
    name: "Prince Chijokie",
    amount: "$1,000",
    time: "2025-10-10"
  },
  {
    name: "Prince Chijokie",
    amount: "$1,000",
    time: "2025-10-10"
  }]
}

export const projectCategoryOptions = [
  {
    label: "Health",
    value: "health"
  },
  {
    label: "Education",
    value: "education"
  },
  {
    label: "Infrastructure",
    value: "infrastructure"
  },
  {
    label: "Youth",
    value: "youth"
  },
  {
    label: "Elder",
    value: "elder"
  },
  {
    label: "Welfare",
    value: "welfare"
  }
]