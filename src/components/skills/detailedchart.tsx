"use client";

import { SkillProficiency } from "@/types/skills_t";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DetailedChartProps {
  skillName: string;
  data: SkillProficiency[];
}

export const DetailedChart: React.FC<DetailedChartProps> = ({
  skillName,
  data,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-gray-800 mb-4 text-center">
        {skillName} Proficiency
      </h4>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="skill"
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value: number) => [`${value}%`, "Proficiency"]}
              labelStyle={{ color: "#374151" }}
            />
            <Bar
              dataKey="proficiency"
              fill={data[0]?.color || "#3b82f6"}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
