export interface PortalRecord {
  id: string;
  name: string;
  level: string; // e.g. Central Government, State Government, Municipal Corporation
  jurisdiction: string; // e.g. All India, Greater Chennai Corporation, Delhi
  department: string;
  state: string; // e.g. Tamil Nadu, All India
  categories: string[];
  url: string;
  desc: string;
  verified: boolean;
  lastVerified: string;
}

export const allPortals: PortalRecord[] = [
  // CENTRAL GOVERNMENT
  {
    id: "CG-1",
    name: "CPGRAMS (Centralized Public Grievance Redress and Monitoring System)",
    level: "Central Government",
    jurisdiction: "All India",
    department: "Public Grievances",
    state: "All India",
    categories: ["Public Grievances", "Central Services", "General"],
    url: "https://pgportal.gov.in/",
    desc: "The primary central grievance portal for issues related to central government ministries and departments.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "CG-2",
    name: "RailMadad",
    level: "Central Government",
    jurisdiction: "All India",
    department: "Railways",
    state: "All India",
    categories: ["Railways", "Transport"],
    url: "https://railmadad.indianrailways.gov.in/",
    desc: "Official grievance portal for all complaints and queries related to Indian Railways.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "CG-3",
    name: "National Consumer Helpline",
    level: "Central Government",
    jurisdiction: "All India",
    department: "Department of Consumer Affairs",
    state: "All India",
    categories: ["Consumer Grievances", "Legal"],
    url: "https://consumerhelpline.gov.in/",
    desc: "National portal for resolving consumer grievances against products and services.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "CG-4",
    name: "National Portal of India",
    level: "Central Government",
    jurisdiction: "All India",
    department: "Government of India",
    state: "All India",
    categories: ["General Information", "Central Services"],
    url: "https://www.india.gov.in/",
    desc: "Single window access to information and services provided by the Indian Government.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  
  // TAMIL NADU
  {
    id: "TN-1",
    name: "Tamil Nadu e-Sevai",
    level: "State Government",
    jurisdiction: "Tamil Nadu",
    department: "TNeGA",
    state: "Tamil Nadu",
    categories: ["Citizen Services", "Certificates", "Revenue"],
    url: "https://www.tnesevai.tn.gov.in/",
    desc: "Common service portal for various citizen services in Tamil Nadu.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "TN-2",
    name: "Greater Chennai Corporation (GCC) Online Services",
    level: "Municipal Corporation",
    jurisdiction: "Greater Chennai Corporation",
    department: "Municipal Administration",
    state: "Tamil Nadu",
    categories: ["Sanitation", "Roads and Public Works", "Water Supply"],
    url: "https://portal.chennaicorporation.gov.in/gcc/online-services/",
    desc: "Official online services for Chennai city municipal limits.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "TN-2-A",
    name: "Greater Chennai Corporation (GCC) Complaints",
    level: "Municipal Corporation",
    jurisdiction: "Greater Chennai Corporation",
    department: "Municipal Administration",
    state: "Tamil Nadu",
    categories: ["Sanitation", "Streetlights", "Public Grievances"],
    url: "https://chennaicorporation.gov.in/gcc/complaints/",
    desc: "Official complaints information and registration for Chennai.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "TN-3",
    name: "TN CM Helpline (Mudhalvarin Mugavari)",
    level: "State Government",
    jurisdiction: "Tamil Nadu",
    department: "Chief Minister's Special Cell",
    state: "Tamil Nadu",
    categories: ["Public Grievances", "State Grievances"],
    url: "https://cmhelpline.tnega.org/",
    desc: "Tamil Nadu Chief Minister's special cell for public grievance redressal.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "TN-4",
    name: "TANGEDCO",
    level: "State Government",
    jurisdiction: "Tamil Nadu",
    department: "Electricity",
    state: "Tamil Nadu",
    categories: ["Electricity", "Energy"],
    url: "https://www.tangedco.org/",
    desc: "For electricity billing and power cut complaints in Tamil Nadu.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "TN-5",
    name: "Tamil Nadu Water Supply and Drainage Board (TWAD)",
    level: "State Government",
    jurisdiction: "Tamil Nadu",
    department: "Water Supply",
    state: "Tamil Nadu",
    categories: ["Water Supply", "Sanitation and Waste"],
    url: "https://www.twadboard.tn.gov.in/",
    desc: "Water supply and drainage infrastructure portal for TN.",
    verified: true,
    lastVerified: "2023-10-10"
  },

  // ANDHRA PRADESH
  {
    id: "AP-1",
    name: "Andhra Pradesh Spandana",
    level: "State Government",
    jurisdiction: "Andhra Pradesh",
    department: "Public Grievance Redressal",
    state: "Andhra Pradesh",
    categories: ["Public Grievances", "Roads and Public Works"],
    url: "https://www.spandana.ap.gov.in/",
    desc: "The official grievance redressal portal for citizens of Andhra Pradesh.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "AP-2",
    name: "APEPDCL Grievances",
    level: "State Government",
    jurisdiction: "Andhra Pradesh (Eastern)",
    department: "Electricity",
    state: "Andhra Pradesh",
    categories: ["Electricity"],
    url: "https://www.apeasternpower.com/",
    desc: "Eastern Power Distribution Company of AP grievance registration.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "AP-3",
    name: "Vijayawada Municipal Corporation (VMC)",
    level: "Municipal Corporation",
    jurisdiction: "Vijayawada",
    department: "Civic Amenities",
    state: "Andhra Pradesh",
    categories: ["Sanitation and Waste", "Water Supply", "Roads and Public Works"],
    url: "https://www.ourvmc.org/",
    desc: "Official civic service portal for Vijayawada city limits.",
    verified: true,
    lastVerified: "2023-10-10"
  },

  // MAHARASHTRA
  {
    id: "MH-1",
    name: "Aaple Sarkar (Maharashtra)",
    level: "State Government",
    jurisdiction: "Maharashtra",
    department: "Citizen Services",
    state: "Maharashtra",
    categories: ["Public Grievances", "Revenue and Land Records"],
    url: "https://aaplesarkar.mahaonline.gov.in/",
    desc: "Online services and grievance portal for the Government of Maharashtra.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "MH-2",
    name: "BMC (Brihanmumbai Municipal Corporation)",
    level: "Municipal Corporation",
    jurisdiction: "Mumbai",
    department: "Municipal Services",
    state: "Maharashtra",
    categories: ["Sanitation and Waste", "Roads and Public Works", "Water Supply"],
    url: "https://portal.mcgm.gov.in/",
    desc: "The official portal for civic issues in Mumbai.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  
  // DELHI
  {
    id: "DL-1",
    name: "Delhi e-District",
    level: "Union Territory",
    jurisdiction: "Delhi (NCT)",
    department: "Revenue Department",
    state: "Delhi (NCT)",
    categories: ["Revenue and Land Records", "Public Grievances"],
    url: "https://edistrict.delhigovt.nic.in/",
    desc: "Citizen services for the National Capital Territory of Delhi.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  {
    id: "DL-2",
    name: "MCD (Municipal Corporation of Delhi)",
    level: "Municipal Corporation",
    jurisdiction: "Delhi",
    department: "Civic Services",
    state: "Delhi (NCT)",
    categories: ["Sanitation and Waste", "Roads and Public Works"],
    url: "https://mcdonline.nic.in/",
    desc: "Municipal portal for civic amenities and grievances in Delhi.",
    verified: true,
    lastVerified: "2023-10-10"
  },
  
  // KERALA
  {
    id: "KL-1",
    name: "Chief Minister's Public Grievance Redressal (CMPGRC)",
    level: "State Government",
    jurisdiction: "Kerala",
    department: "Chief Minister's Office",
    state: "Kerala",
    categories: ["Public Grievances"],
    url: "https://cmo.kerala.gov.in/",
    desc: "Direct grievance redressal portal for Kerala state.",
    verified: true,
    lastVerified: "2023-10-10"
  }
];

export const STATES_AND_UTS = [
  "All India",
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCT)",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];
