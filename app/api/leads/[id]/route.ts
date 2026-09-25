import { NextRequest, NextResponse } from "next/server";
import { apiError, isValidObjectId, serializeLead } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import { validateLeadPayload } from "@/lib/validation";
import { Lead } from "@/models/Lead";

export const dynamic = "force-dynamic";

type Context = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: Context) {
  if (!isValidObjectId(params.id)) return apiError("Invalid lead id.", 400);
  try {
    await connectToDatabase();
    const lead = await Lead.findById(params.id);
    if (!lead) return apiError("Lead not found.", 404);
    return NextResponse.json({ lead: serializeLead(lead) });
  } catch (error) {
    console.error("GET /api/leads/[id]", error);
    return apiError("Unable to load the lead.");
  }
}

export async function PUT(request: NextRequest, { params }: Context) {
  if (!isValidObjectId(params.id)) return apiError("Invalid lead id.", 400);
  try {
    const body = await request.json();
    const validation = validateLeadPayload(body, true);
    if (validation.error) return apiError(validation.error, 400);
    await connectToDatabase();
    const lead = await Lead.findByIdAndUpdate(
      params.id,
      { $set: { ...validation.data, updatedAt: new Date() } },
      { new: true, runValidators: true },
    );
    if (!lead) return apiError("Lead not found.", 404);
    return NextResponse.json({ lead: serializeLead(lead) });
  } catch (error: any) {
    if (error?.code === 11000) return apiError("A lead with this phone number already exists.", 409);
    console.error("PUT /api/leads/[id]", error);
    return apiError("Unable to update the lead.");
  }
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  if (!isValidObjectId(params.id)) return apiError("Invalid lead id.", 400);
  try {
    await connectToDatabase();
    const lead = await Lead.findByIdAndDelete(params.id);
    if (!lead) return apiError("Lead not found.", 404);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/leads/[id]", error);
    return apiError("Unable to delete the lead.");
  }
}
