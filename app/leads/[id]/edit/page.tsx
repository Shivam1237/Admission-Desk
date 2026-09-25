"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch, responseMessage } from "@/lib/client-api";
import type { LeadRecord } from "@/lib/types";
import { LeadForm } from "@/components/lead-form";
import { EmptyState, LoadingState, PageHeader } from "@/components/ui";

export default function EditLeadPage() {
  const params = useParams<{ id: string }>(); const [lead, setLead] = useState<LeadRecord | null>(null); const [error, setError] = useState("");
  useEffect(() => { responseMessage(apiFetch(`/api/leads/${params.id}`)).then((body) => setLead(body.lead)).catch((err) => setError(err.message)); }, [params.id]);
  if (error) return <EmptyState message={error} />; if (!lead) return <LoadingState />;
  return <><PageHeader eyebrow="Pipeline" title={`Edit ${lead.name}`} subtitle="Keep the lead record accurate for the next handoff." /><LeadForm lead={lead} /></>;
}
