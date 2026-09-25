import { NextRequest, NextResponse } from "next/server";
import { apiError, currentUserName, isValidObjectId, serializeLead } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import { validateActivityPayload } from "@/lib/validation";
import { Lead } from "@/models/Lead";

export const dynamic = "force-dynamic";

type Context = { params: { id: string } };

export async function POST(request: NextRequest, { params }: Context) {
  if (!isValidObjectId(params.id)) return apiError("Invalid lead id.", 400);
  try {
    const validation = validateActivityPayload(await request.json());
    if (validation.error) return apiError(validation.error, 400);
    await connectToDatabase();
    const activity = { ...validation.data, createdBy: currentUserName(request) };
    const set: Record<string, unknown> = { updatedAt: new Date() };
    if (["Call", "WhatsApp", "Email", "Meeting"].includes(String(activity.type))) set.lastContactDate = activity.date;
    const lead = await Lead.findByIdAndUpdate(
      params.id,
      { $push: { activities: activity }, $set: set },
      { new: true, runValidators: true },
    );
    if (!lead) return apiError("Lead not found.", 404);
    return NextResponse.json({ lead: serializeLead(lead) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/leads/[id]/activities", error);
    return apiError("Unable to add the activity.");
  }
}
