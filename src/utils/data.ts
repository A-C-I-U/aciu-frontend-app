import type { EventDetailsProps, EventItemProps, FeaturedPostCard, OptionLabelProps, PublicationCardProps, RegularPostCard } from "./types";

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


export const regularPosts: RegularPostCard[] = [
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

export const featuredPosts: FeaturedPostCard[] = [
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