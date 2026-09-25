"use client";

import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Panel } from "./ui";

const colors = ["#1d3557", "#0f766e", "#c08a2b", "#8c5bb5", "#be4b5f", "#4b83b4", "#8796a8", "#d26d45"];

export function BreakdownChart({ title, data, kind = "bar" }: { title: string; data: Array<{ name: string; value: number }>; kind?: "bar" | "pie" }) {
  return <Panel title={title}><div className="chart-space">{data.length ? <ResponsiveContainer width="100%" height="100%">{kind === "pie" ? <PieChart><Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="47%" outerRadius={82} innerRadius={42} paddingAngle={2}>{data.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /><Legend verticalAlign="bottom" height={28} wrapperStyle={{ fontSize: 11 }} /></PieChart> : <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><CartesianGrid vertical={false} stroke="#edf0f3" /><XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis allowDecimals={false} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: "#f7fafc" }} /><Bar dataKey="value" fill="#1d3557" radius={[4, 4, 0, 0]} barSize={26} /></BarChart>}</ResponsiveContainer> : <div className="empty">No data yet.</div>}</div></Panel>;
}
