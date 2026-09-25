import { NextRequest, NextResponse } from "next/server";
import { apiError, serializeLead, serializeLeads } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import { leadQuery } from "@/lib/query";
import { validateLeadPayload } from "@/lib/validation";
import { Lead } from "@/models/Lead";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const leads = await Lead.find(leadQuery(request.nextUrl.searchParams)).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ leads: serializeLeads(leads) });
  } catch (error) {
    console.error("GET /api/leads", error);
    return apiError("Unable to load leads. Check the MongoDB connection.");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = validateLeadPayload(body);
    if (validation.error) return apiError(validation.error, 400);
    await connectToDatabase();
    const lead = await Lead.create(validation.data);
    return NextResponse.json({ lead: serializeLead(lead) }, { status: 201 });
  } catch (error: any) {
    if (error?.code === 11000) return apiError("A lead with this phone number already exists.", 409);
    console.error("POST /api/leads", error);
    return apiError("Unable to create the lead.");
  }
}
