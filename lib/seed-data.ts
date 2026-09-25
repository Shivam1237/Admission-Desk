import type { ActivityType, LeadSource, LeadStatus } from "./constants";

const day = (offset: number) => {
  const date = new Date();
  date.setHours(10, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date;
};

const activity = (type: ActivityType, description: string, offset: number, createdBy: string) => ({
  type,
  description,
  date: day(offset),
  createdBy,
});

const rows: Array<{
  name: string;
  phone: string;
  email: string;
  course: string;
  leadSource: LeadSource;
  status: LeadStatus;
  assignedCounsellor: string;
  createdOffset: number;
  followUpOffset: number | null;
  notes: string;
  activities: ReturnType<typeof activity>[];
}> = [
  { name: "Ananya Mehta", phone: "9876501001", email: "ananya.mehta@example.com", course: "MCA", leadSource: "Website", status: "New", assignedCounsellor: "Rahul Sharma", createdOffset: -1, followUpOffset: 1, notes: "Requested the MCA brochure.", activities: [] },
  { name: "Rohan Kapoor", phone: "9876501002", email: "rohan.kapoor@example.com", course: "B.Tech", leadSource: "Education Fair", status: "Contacted", assignedCounsellor: "Priya Singh", createdOffset: -4, followUpOffset: 0, notes: "Interested in the computer science track.", activities: [activity("Call", "Spoke with the student about B.Tech eligibility.", -2, "Priya Singh")] },
  { name: "Meera Nair", phone: "9876501003", email: "meera.nair@example.com", course: "MBA", leadSource: "Referral", status: "Follow-up", assignedCounsellor: "Aman Verma", createdOffset: -9, followUpOffset: -1, notes: "Waiting for the scholarship details.", activities: [activity("WhatsApp", "Shared MBA fee structure over WhatsApp.", -3, "Aman Verma")] },
  { name: "Arjun Iyer", phone: "9876501004", email: "arjun.iyer@example.com", course: "BCA", leadSource: "Campaign", status: "Interested", assignedCounsellor: "Rahul Sharma", createdOffset: -12, followUpOffset: 2, notes: "Parent wants a campus visit.", activities: [activity("Meeting", "Met the student and parent at the campus.", -5, "Rahul Sharma")] },
  { name: "Kavya Reddy", phone: "9876501005", email: "kavya.reddy@example.com", course: "M.Tech", leadSource: "Website", status: "Application Started", assignedCounsellor: "Priya Singh", createdOffset: -18, followUpOffset: 3, notes: "Application is missing one document.", activities: [activity("Email", "Sent the document checklist.", -2, "Priya Singh")] },
  { name: "Vivek Joshi", phone: "9876501006", email: "vivek.joshi@example.com", course: "MBA", leadSource: "Walk-in", status: "Converted", assignedCounsellor: "Aman Verma", createdOffset: -20, followUpOffset: null, notes: "Admission confirmed for the July intake.", activities: [activity("Meeting", "Completed counselling and admission paperwork.", -8, "Aman Verma")] },
  { name: "Ishita Shah", phone: "9876501007", email: "ishita.shah@example.com", course: "MCA", leadSource: "WhatsApp", status: "Lost", assignedCounsellor: "Rahul Sharma", createdOffset: -25, followUpOffset: null, notes: "Chose another institution.", activities: [activity("WhatsApp", "Student confirmed a different college.", -10, "Rahul Sharma")] },
  { name: "Nikhil Malhotra", phone: "9876501008", email: "nikhil.malhotra@example.com", course: "B.Tech", leadSource: "Phone", status: "Contacted", assignedCounsellor: "Priya Singh", createdOffset: -6, followUpOffset: 4, notes: "Needs hostel information.", activities: [activity("Call", "Discussed hostel and transport options.", -1, "Priya Singh")] },
  { name: "Simran Kaur", phone: "9876501009", email: "simran.kaur@example.com", course: "BCA", leadSource: "Website", status: "New", assignedCounsellor: "Aman Verma", createdOffset: -2, followUpOffset: 1, notes: "Prefers an evening call.", activities: [] },
  { name: "Aditya Rao", phone: "9876501010", email: "aditya.rao@example.com", course: "M.Tech", leadSource: "Education Fair", status: "Interested", assignedCounsellor: "Rahul Sharma", createdOffset: -14, followUpOffset: 0, notes: "Comparing specialization options.", activities: [activity("Email", "Shared M.Tech specialization sheet.", -6, "Rahul Sharma")] },
  { name: "Tanvi Agarwal", phone: "9876501011", email: "tanvi.agarwal@example.com", course: "MBA", leadSource: "Campaign", status: "Follow-up", assignedCounsellor: "Priya Singh", createdOffset: -8, followUpOffset: 5, notes: "Requested a call after work hours.", activities: [activity("Call", "Discussed weekend counselling availability.", -2, "Priya Singh")] },
  { name: "Harsh Vardhan", phone: "9876501012", email: "harsh.vardhan@example.com", course: "MCA", leadSource: "Referral", status: "Application Started", assignedCounsellor: "Aman Verma", createdOffset: -16, followUpOffset: 1, notes: "Application fee has been paid.", activities: [activity("Meeting", "Verified application documents.", -4, "Aman Verma")] },
  { name: "Pooja Menon", phone: "9876501013", email: "pooja.menon@example.com", course: "B.Tech", leadSource: "Walk-in", status: "Converted", assignedCounsellor: "Rahul Sharma", createdOffset: -30, followUpOffset: null, notes: "Enrolled after campus counselling.", activities: [activity("Meeting", "Completed admission counselling.", -20, "Rahul Sharma")] },
  { name: "Dev Patel", phone: "9876501014", email: "dev.patel@example.com", course: "BCA", leadSource: "Phone", status: "Lost", assignedCounsellor: "Priya Singh", createdOffset: -22, followUpOffset: null, notes: "Could not meet the fee timeline.", activities: [activity("Call", "Discussed fee payment options.", -13, "Priya Singh")] },
  { name: "Sanya Bose", phone: "9876501015", email: "sanya.bose@example.com", course: "Other", leadSource: "Other", status: "Contacted", assignedCounsellor: "Aman Verma", createdOffset: -3, followUpOffset: 2, notes: "Course preference to be finalized.", activities: [activity("Call", "Initial qualification call completed.", -1, "Aman Verma")] },
  { name: "Manav Gupta", phone: "9876501016", email: "manav.gupta@example.com", course: "MCA", leadSource: "Website", status: "Follow-up", assignedCounsellor: "Rahul Sharma", createdOffset: -10, followUpOffset: -2, notes: "Needs a reminder about the entrance test.", activities: [activity("Note", "Added to entrance-test reminder list.", -3, "Rahul Sharma")] },
  { name: "Neha Kulkarni", phone: "9876501017", email: "neha.kulkarni@example.com", course: "MBA", leadSource: "Referral", status: "Interested", assignedCounsellor: "Priya Singh", createdOffset: -7, followUpOffset: 6, notes: "Strong interest in marketing electives.", activities: [activity("WhatsApp", "Shared marketing elective details.", -1, "Priya Singh")] },
  { name: "Yash Bansal", phone: "9876501018", email: "yash.bansal@example.com", course: "B.Tech", leadSource: "Campaign", status: "New", assignedCounsellor: "Unassigned", createdOffset: 0, followUpOffset: 2, notes: "New campaign lead; assignment pending.", activities: [] },
];

export const seedLeads = rows.map((lead) => ({
  ...lead,
  createdAt: day(lead.createdOffset),
  updatedAt: day(lead.createdOffset),
  nextFollowUpDate: lead.followUpOffset === null ? null : day(lead.followUpOffset),
  lastContactDate: lead.activities.length ? lead.activities[lead.activities.length - 1].date : null,
}));
