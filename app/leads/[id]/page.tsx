import { LeadDetailView } from "@/components/lead-detail-view";
export default function LeadPage({ params }: { params: { id: string } }) { return <LeadDetailView id={params.id} />; }
