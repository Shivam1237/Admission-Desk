import { model, models, Schema } from "mongoose";
import { ACTIVITY_TYPES, COUNSELLORS, COURSES, LEAD_SOURCES, LEAD_STATUSES } from "@/lib/constants";

const activitySchema = new Schema(
  {
    type: { type: String, enum: ACTIVITY_TYPES, required: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true, default: Date.now },
    createdBy: { type: String, required: true, trim: true },
  },
  { _id: true },
);

const leadSchema = new Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true, default: "" },
  course: { type: String, required: true, enum: COURSES },
  leadSource: { type: String, required: true, enum: LEAD_SOURCES },
  status: { type: String, required: true, enum: LEAD_STATUSES, default: "New" },
  assignedCounsellor: {
    type: String,
    enum: [...COUNSELLORS, "Unassigned"],
    default: "Unassigned",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  nextFollowUpDate: { type: Date, default: null },
  lastContactDate: { type: Date, default: null },
  notes: { type: String, trim: true, default: "" },
  activities: { type: [activitySchema], default: [] },
});

leadSchema.pre("save", function save(next) {
  this.updatedAt = new Date();
  next();
});

leadSchema.index({ phone: 1 }, { unique: true });

export const Lead = models.Lead || model("Lead", leadSchema);
