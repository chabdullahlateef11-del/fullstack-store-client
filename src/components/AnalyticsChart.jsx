import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import API from "../api/axios";

const COLORS = ["#6366f1", "#a855f7", "#f59e0b", "#10b981", "#ef4444"];

export default function AnalyticsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/analytics").then((res) => {
      setData(res.data.map((d) => ({ name: d.page, value: d.count })));
    });
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-[#e5e9ef] to-[#eef0f5] rounded-3xl p-6 shadow-[8px_8px_16px_#c8ccd2,-8px_-8px_16px_#ffffff] border border-white/60">
      <h3 className="text-slate-700 font-semibold text-sm tracking-wide mb-1">Store Insights</h3>
      <p className="text-slate-400 text-xs mb-4">Hover on the chart to see page-wise visits</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={4}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#141210",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}