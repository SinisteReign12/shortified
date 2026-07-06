"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";

export default function ClicksChart({ data }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow mb-8">
      <h2 className="text-xl font-bold mb-4">
        Click Analytics
      </h2>

      <ResponsiveContainer width="90%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="shortCode" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="clicks"
            fill="#52525b"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}