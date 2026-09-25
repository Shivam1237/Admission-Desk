import type { ActivityType, LeadSource, LeadStatus } from "./constants";

export interface ActivityRecord {
  id?: string;
  _id?: string;
  type: ActivityType;
  description: string;
  date: string;
  createdBy: string;
}

export interface LeadRecord {
  id: string;
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  course: string;
  leadSource: LeadSource;
  status: LeadStatus;
  assignedCounsellor: string;
  createdAt: string;
  updatedAt: string;
  nextFollowUpDate?: string | null;
  lastContactDate?: string | null;
  notes?: string;
  activities: ActivityRecord[];
  ageDays: number;
  ageCategory: string;
  ageTone: string;
}

export interface DashboardMetrics {
  summary: {
    totalLeads: number;
    newLeads: number;
    followUpsDue: number;
    convertedLeads: number;
    lostLeads: number;
    overdueFollowUps: number;
    ageingLeads: number;
    conversionRate: number;
  };
  bySource: Array<{ name: string; value: number }>;
  byStatus: Array<{ name: string; value: number }>;
  byCourse: Array<{ name: string; value: number }>;
  byCounsellor: Array<{ name: string; value: number }>;
  recentLeads: LeadRecord[];
  upcomingFollowUps: LeadRecord[];
  ageingLeads: LeadRecord[];
}

export interface FollowUpRecord extends LeadRecord {
  followUpBucket: "overdue" | "today" | "upcoming";
}
