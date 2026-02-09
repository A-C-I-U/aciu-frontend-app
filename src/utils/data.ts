import { Calendar2, DollarSquare, FolderOpen, Routing } from "iconsax-react";
import type {
  ActivityLog,
  BlogSubmissionDetails,
  BranchExecCardProps,
  EventDetailsProps,
  FeaturedPostCardType,
  MenuCardProps,
  OptionLabelProps,
  ProjectCardProps,
  ProjectDetailsProps,
  PublicationDataType,
  RegularPostCardType,
  StatsCardProps,
  UpcomingEventCardProps
} from "./types";
import { timeAgo } from "./helpers";
import type { MemberProfile } from "@/services/types/database";

export const BRANCHES: string[] = [
  "home", "aba", "umuahia", "enugu", "owerri",
  "lagos", "abuja", "atlanta", "houston",
  "london", "new-york", "toronto",
  "johannesburg", "dubai"
];

export const AGEGRADES: string[] = [
  "All Age Grades", "Okpu Nnukwu", "Ndi Udo", "Ndi Ijeoma",
  "Uke Achara", "Uke Ezinne",
  "Uke Progressive", "Uke Unity"
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
  { label: "All Age Grades", value: "All Age Grades" },
  { label: "Okpu Nnukwu", value: "Okpu Nnukwu" },
  { label: "Ndi Udo", value: "Ndi Udo" },
  { label: "Ndi Ijeoma", value: "Ndi Ijeoma" },
  { label: "Uke Achara", value: "Uke Achara" },
  { label: "Uke Ezinne", value: "Uke Ezinne" },
  { label: "Uke Progressive", value: "Uke Progressive" },
  { label: "Uke Unity", value: "Uke Unity" },
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
    id: "1",
    img: "/images/nig-uk-flag.jpg",
    title: "My First Igwa Mang: Walking with My Age Grade",
    subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
    author: "Chinedu Okoro",
    date: "16 Jan 2025",
    tags: ["ACIU News", "Union Updates"]
  },
  {
    id: "2",
    img: "/images/nig-uk-flag.jpg",
    title: "My First Igwa Mang: Walking with My Age Grade",
    subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
    author: "Chinedu Okoro",
    date: "16 Jan 2025",
    tags: ["ACIU News", "Union Updates"]
  },
  {
    id: "3",
    img: "/images/nig-uk-flag.jpg",
    title: "My First Igwa Mang: Walking with My Age Grade",
    subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
    author: "Chinedu Okoro",
    date: "16 Jan 2025",
    tags: ["ACIU News", "Union Updates"]
  },
  {
    id: "4",
    img: "/images/nig-uk-flag.jpg",
    title: "My First Igwa Mang: Walking with My Age Grade",
    subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
    author: "Chinedu Okoro",
    date: "16 Jan 2025",
    tags: ["ACIU News", "Union Updates"]
  },
  {
    id: "5",
    img: "/images/nig-uk-flag.jpg",
    title: "My First Igwa Mang: Walking with My Age Grade",
    subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
    author: "Chinedu Okoro",
    date: "16 Jan 2025",
    tags: ["ACIU News", "Union Updates"]
  },
  {
    id: "6",
    img: "/images/nig-uk-flag.jpg",
    title: "My First Igwa Mang: Walking with My Age Grade",
    subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
    author: "Chinedu Okoro",
    date: "16 Jan 2025",
    tags: ["ACIU News", "Union Updates"]
  },
  {
    id: "7",
    img: "/images/nig-uk-flag.jpg",
    title: "My First Igwa Mang: Walking with My Age Grade",
    subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
    author: "Chinedu Okoro",
    date: "16 Jan 2025",
    tags: ["ACIU News", "Union Updates"]
  },
  {
    id: "8",
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
    id: "10",
    img: "/images/blog-placeholder.jpg",
    title: "Tech, Tradition and the Future of ACIU",
    author: "Eke Urum",
    date: "20 Jan 2025",
    views: 239,
    comments: 21
  },
  {
    id: "12",
    img: "/images/blog-placeholder.jpg",
    title: "Tech, Tradition and the Future of ACIU",
    author: "Eke Urum",
    date: "20 Jan 2025",
    views: 239,
    comments: 21
  }
]

export const publicationStats: StatsCardProps[] = [
  {
    title: 'Total Submissions',
    number: '5',
    rateOfChange: '+12.5',
    itemLabel: "Post(s)"
  },
  {
    title: 'Published Posts',
    number: '3',
    rateOfChange: '+12.5',
    itemLabel: "Post(s)"
  },
  {
    title: 'Pending Approval',
    number: '2',
    rateOfChange: '-12.5',
    itemLabel: "Post(s)"
  },
]

export const publicationStatuses: PublicationDataType["status"][] =
  ["published", "pending approval", "rejected", "draft"]



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

export const getHelpSupportMenu = (role: string): MenuCardProps[] => {
  const menu: MenuCardProps[] = [
    {
      icon: Routing,
      title: "Locate My Branch",
      description: "Find meeting venues in your city, state, or country.",
      route: "",
      action: true,
    },
    {
      // Replace “Pay My Dues” with “View Transactions” if national admin
      icon: DollarSquare,
      title: role === "national_admin" ? "View Transactions" : "Pay My Dues",
      description:
        role === "national_admin"
          ? "Create, monitor and manage Dues and Payments."
          : "Clear dues or support a project instantly.",
      route: role === "national_admin" ? "/transactions" : "/my-payments",
    },
    {
      icon: Calendar2,
      title: "See Upcoming Events",
      description:
        "RSVP or register for national, branch or diaspora events.",
      route: "/events?tab=upcoming-events",
    },
    {
      icon: FolderOpen,
      title: "Access Files & Resources",
      description:
        "Download the ACIU Constitution, anthem, or documents.",
      route: "/resources",
    },
  ];

  return menu;
};

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
    id: "1",
    name: "Mazi Emeka Kalu",
    position: "Chairman",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  },
  {
    id: "2",
    name: "Adaora Emezi",
    position: "Secretary",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  },
  {
    id: "3",
    name: "Mr. Ikenna O.",
    position: "Treasurer",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  },
  {
    id: "4",
    name: "Mazi Emeka Kalu",
    position: "Chairman",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  },
  {
    id: "5",
    name: "Adaora Emezi",
    position: "Secretary",
    occupation: "Contractor",
    email: "emeka.kalu@aciu.org",
    phoneNumber: "+234 903 828 3447"
  },
  {
    id: "6",
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
  }],
  link: "www.aciuabiriba.org/amogudu-health-centre-roof-repair"
}

export const projectCategoryOptions = [
  {
    label: "Health",
    value: "Health"
  },
  {
    label: "Education",
    value: "Education"
  },
  {
    label: "Infrastructure",
    value: "Infrastructure"
  },
  {
    label: "Youth",
    value: "Youth"
  },
  {
    label: "Elder",
    value: "Elder"
  },
  {
    label: "Welfare",
    value: "Welfare"
  }
]



export const mockTiptapContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1, textAlign: "center" },
      content: [
        {
          type: "text",
          text: "Welcome to the Tiptap Showcase",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "center" },
      content: [
        {
          type: "text",
          marks: [{ type: "underline" }],
          text: "Rich text editing with custom styles, alignment, and images.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This paragraph demonstrates ",
        },
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "bold",
        },
        {
          type: "text",
          text: ", ",
        },
        {
          type: "text",
          marks: [{ type: "italic" }],
          text: "italic",
        },
        {
          type: "text",
          text: ", and ",
        },
        {
          type: "text",
          marks: [{ type: "underline" }],
          text: "underlined",
        },
        {
          type: "text",
          text: " text styles all in one sentence.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "right" },
      content: [
        {
          type: "text",
          text: "This paragraph is right-aligned using the TextAlign extension.",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2, textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Image Example",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://picsum.photos/600/300",
        alt: "Random test image",
        title: "Sample Image",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "center" },
      content: [
        {
          type: "text",
          text: "Above is an example image rendered through the Image extension.",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3, textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Nested Formatting Example",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "You can combine multiple marks like ",
        },
        {
          type: "text",
          marks: [
            { type: "bold" },
            { type: "italic" },
            { type: "underline" },
          ],
          text: "bold + italic + underline",
        },
        {
          type: "text",
          text: " together in one phrase.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This last paragraph shows normal left-aligned text as a control.",
        },
      ],
    },
  ],
};


export const blogDetails: BlogSubmissionDetails = {
  id: "1",
  slug: "tiptap-showcase",
  title: "Tiptap Showcase",
  author: "Obinna Kalu",
  readingTime: 4,
  createdAt: new Date(),
  updatedAt: new Date(),
  content: mockTiptapContent,
  comments: [{
    id: '4',
    name: "Mazi Mathew Uko",
    date: timeAgo(new Date().toDateString()),
    content: `Technology is not here to replace who we are. 
      It is here to preserve it. And with this new platform, 
      ACIU continues to lead — not just as a union of the past, 
      but as a community shaping the future.`
  }, {
    id: "1",
    name: "Mazi Mathew Uko",
    date: timeAgo(new Date().toDateString()),
    content: `Technology is not here to replace who we are. 
      It is here to preserve it. And with this new platform, 
      ACIU continues to lead — not just as a union of the past, 
      but as a community shaping the future.`
  }, {
    id: "2",
    name: "Mazi Mathew Uko",
    date: timeAgo(new Date().toDateString()),
    content: `Technology is not here to replace who we are. 
      It is here to preserve it. And with this new platform, 
      ACIU continues to lead — not just as a union of the past, 
      but as a community shaping the future.`
  }, {
    id: "3",
    name: "Mazi Mathew Uko",
    date: timeAgo(new Date().toDateString()),
    content: `Technology is not here to replace who we are. 
      It is here to preserve it. And with this new platform, 
      ACIU continues to lead — not just as a union of the past, 
      but as a community shaping the future.`
  }],
  description: "An internal showcase of our new editor setup.",
  tags: ["editor", "react", "tiptap"],
  displayImage: "https://picsum.photos/600/300",
  imageAlt: "Tiptap editor demo image",
  postVisibility: "private",
  status: "pending approval",
}





export const dashboardUpcomingEvents: UpcomingEventCardProps[] = [
  {
    id: "1",
    label: "Igwa Mang Cultural Festival",
    image: "/images/abriba-event.jpg",
    dateStr: "21 January 2026",
    timeRange: "12:00PM - 5:00PM"
  },
  {
    id: "2",
    label: "Igwa Mang Cultural Festival",
    image: "/images/abriba-event.jpg",
    dateStr: "21 January 2026",
    timeRange: "12:00PM - 5:00PM"
  },
  {
    id: "3",
    label: "Igwa Mang Cultural Festival",
    image: "/images/abriba-event.jpg",
    dateStr: "21 January 2026",
    timeRange: "12:00PM - 5:00PM"
  },
  {
    id: "4",
    label: "Igwa Mang Cultural Festival",
    image: "/images/abriba-event.jpg",
    dateStr: "21 January 2026",
    timeRange: "12:00PM - 5:00PM"
  },
]


export const branchInfo = {
  createdAt: "20/3/2025",
  meetingLocation: "Community Hall, Bode Thomas Street, Surulere, Lagos State",
  branchKey: "Lagos Branch",
  branchName: "ACIU Lagos Mainland Branch",
  branchChairman: "Emeka Kalu",
  branchChairmanEmail: "emeka.kalu@aciu.org"
}

export const branchStats = [
  {
    title: "Total Verified Members",
    number: "25",
    rateOfChange: "12.5"
  },
  {
    title: "Active Age Grades",
    number: "3",
    rateOfChange: "12.5"
  },
  {
    title: "Pending Verification",
    number: "45",
    rateOfChange: "33"
  },
  {
    title: "Total Dues Collected",
    number: "25104000",
    rateOfChange: "44",
    currency: "N"
  },
  {
    title: "Total Withdrawals",
    number: "30100000",
    rateOfChange: "44",
    currency: "N"
  }
]



export const logs: ActivityLog[] = [
  {
    id: "1",
    action: "Created Due",
    timestamp: "2025-12-08T09:30:00Z",
    actor: "ACIU Leadership",
    details: "Initial due created with amount ₦5000",
  },
  {
    id: "2",
    action: "Updated Status",
    timestamp: "2025-12-08T10:15:00Z",
    actor: "Treasurer",
    metadata: { status: "Paid" },
  },
];


export const fakeMonthlyPayments = [
  { month: 'Jan', totalPayment: 12_500_000 },
  { month: 'Feb', totalPayment: 18_200_000 },
  { month: 'Mar', totalPayment: 9_800_000 },
  { month: 'Apr', totalPayment: 22_000_000 },
  { month: 'May', totalPayment: 16_400_000 },
  { month: 'Jun', totalPayment: 28_600_000 },
  { month: 'Jul', totalPayment: 21_300_000 },
  { month: 'Aug', totalPayment: 25_900_000 },
  { month: 'Sep', totalPayment: 19_700_000 },
  { month: 'Oct', totalPayment: 31_200_000 },
  { month: 'Nov', totalPayment: 27_800_000 },
  { month: 'Dec', totalPayment: 34_500_000 },
];


export const datePickerSx = {
  '& .MuiInputLabel-root': {
    fontSize: '.875rem'
  },
  '& .MuiPickersInputBase-root': {
    fontSize: ".875rem"
  },
  '& .MuiPickersOutlinedInput-root': {
    borderRadius: ".5rem",
    borderColor: "#DFE1E7",
  }
}

export const formLabelSx = {
  fontFamily: "'Montserrat', sans-serif",
  color: '#3E3E3E',
  fontWeight: 500,
  fontSize: '0.875rem'
}

export const dueAgeGradeOptions = [
  { label: "All Age Grades", value: "All Age Grades" },
  { label: "Okpu Nnukwu", value: "Okpu Nnukwu" },
  { label: "Ndi Udo", value: "Ndi Udo" },
  { label: "Ndi Ijeoma", value: "Ndi Ijeoma" },
  { label: "Uke Achara", value: "Uke Achara" },
  { label: "Uke Ezinne", value: "Uke Ezinne" },
  { label: "Uke Progressive", value: "Uke Progressive" },
  { label: "Uke Unity", value: "Uke Unity" },
]

export const dummyBranchMember: MemberProfile = {
  fullName: "Chinedu Okafor",
  phone: "+234 803 456 7890",
  email: "chinedu.okafor@gmail.com",
  ageGrade: "Umuaka 2015",
  village: "Umuahia",
  occupation: "Civil Engineer",
  gender: "Man",
  branch: "Abuja Municipal Branch",
  joinedOn: "2022-06-14",
  verifiedOn: "2022-06-20",
  verifiedBy: "Branch Chairman",
  events: "Annual General Meeting, Youth Development Summit",
  projects: "Community Hall Renovation, Road Maintenance Project"
};
