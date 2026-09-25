import { NextResponse } from "next/server";
import { apiError, serializeLeads } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const leads = await Lead.find({ nextFollowUpDate: { $ne: null } }).sort({ nextFollowUpDate: 1 }).lean();
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(start);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(start);
    nextWeek.setDate(nextWeek.getDate() + 8);
    const followUps = serializeLeads(leads)
      .filter((lead) => !["Converted", "Lost"].includes(lead.status))
      .map((lead) => {
        const date = new Date(lead.nextFollowUpDate!);
        const followUpBucket = date < start ? "overdue" : date < tomorrow ? "today" : date < nextWeek ? "upcoming" : "upcoming";
        return { ...lead, followUpBucket };
      });
    return NextResponse.json({
      followUps,
      summary: {
        overdue: followUps.filter((lead) => lead.followUpBucket === "overdue").length,
        today: followUps.filter((lead) => lead.followUpBucket === "today").length,
        upcoming: followUps.filter((lead) => lead.followUpBucket === "upcoming").length,
      },
    });
  } catch (error) {
    console.error("GET /api/follow-ups", error);
    return apiError("Unable to load follow-ups. Check the MongoDB connection.");
  }
}
