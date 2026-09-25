import { NextRequest, NextResponse } from "next/server";
import { apiError, currentUserName, isValidObjectId, serializeLead } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export const dynamic = "force-dynamic";

type Context = { params: { id: string } };

export async function POST(request: NextRequest, { params }: Context) {
  if (!isValidObjectId(params.id)) return apiError("Invalid lead id.", 400);
  try {
    const body = await request.json().catch(() => ({}));
    const note = typeof body.note === "string" ? body.note.trim() : "";
    const update: Record<string, unknown> = { nextFollowUpDate: null, updatedAt: new Date() };
    if (note) {
      update.activities = {
        type: "Note",
        description: note,
        date: new Date(),
        createdBy: currentUserName(request),
      };
    }
    const query = update.activities
      ? { $set: { nextFollowUpDate: null, updatedAt: new Date() }, $push: { activities: update.activities } }
      : { $set: update };
    await connectToDatabase();
    const lead = await Lead.findByIdAndUpdate(params.id, query, { new: true, runValidators: true });
    if (!lead) return apiError("Lead not found.", 404);
    return NextResponse.json({ lead: serializeLead(lead) });
  } catch (error) {
    console.error("POST /api/follow-ups/[id]/complete", error);
    return apiError("Unable to complete the follow-up.");
  }
}
