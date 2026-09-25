import { NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import { buildMetrics } from "@/lib/metrics";
import { Lead } from "@/models/Lead";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const leads = await Lead.find({}).lean();
    return NextResponse.json(buildMetrics(leads));
  } catch (error) {
    console.error("GET /api/reports", error);
    return apiError("Unable to load reports. Check the MongoDB connection.");
  }
}
