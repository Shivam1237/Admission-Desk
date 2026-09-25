import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { seedLeads } from "@/lib/seed-data";
import { Lead } from "@/models/Lead";
import { User } from "@/models/User";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function seed() {
  await connectToDatabase();
  await Lead.deleteMany({});
  await User.deleteMany({});
  await Lead.insertMany(seedLeads);
  await User.insertMany([
    { name: "Demo Manager", email: "manager@example.com", password: "manager123", role: "manager" },
    { name: "Demo Counsellor", email: "counsellor@example.com", password: "counsellor123", role: "counsellor" },
    { name: "Rahul Sharma", email: "rahul@example.com", password: "demo", role: "counsellor" },
    { name: "Priya Singh", email: "priya@example.com", password: "demo", role: "counsellor" },
    { name: "Aman Verma", email: "aman@example.com", password: "demo", role: "counsellor" },
  ]);
  console.log(`Seeded ${seedLeads.length} leads.`);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
