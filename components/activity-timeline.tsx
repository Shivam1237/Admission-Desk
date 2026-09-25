"use client";

import { CalendarDays, MessageCircle } from "lucide-react";
import { formatDateTime } from "@/lib/constants";
import type { ActivityRecord } from "@/lib/types";
import { EmptyState } from "./ui";

export function ActivityTimeline({ activities }: { activities: ActivityRecord[] }) {
  const sorted = [...activities].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  if (!sorted.length) return <EmptyState message="No activities recorded yet." icon={<MessageCircle size={18} />} />;
  return <div className="timeline">{sorted.map((activity) => <div className="timeline-item" key={activity.id || activity._id}><div className="timeline-dot"><MessageCircle size={13} /></div><div><p className="timeline-title">{activity.type}</p><p className="timeline-desc">{activity.description}</p><div className="timeline-meta"><CalendarDays size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />{formatDateTime(activity.date)} · {activity.createdBy}</div></div></div>)}</div>;
}
