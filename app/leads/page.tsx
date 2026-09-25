import Link from "next/link";
import { Plus } from "lucide-react";
import { LeadTable } from "@/components/lead-table";
import { PageHeader } from "@/components/ui";
export default function LeadsPage() { return <><PageHeader eyebrow="Pipeline" title="Leads" subtitle="Search, filter, assign, and move every admission enquiry forward." action={<Link href="/leads/new" className="button primary"><Plus size={15} />Add lead</Link>} /><LeadTable /></>; }
