"use client";

import { SkillProficiency } from "@/types/skills_t";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface SkillDonutProps {
  skillName: string;
  data: SkillProficiency[];
}

export const SkillDonut: React.FC<SkillDonutProps> = ({ skillName, data }) => {
  const chartData = data.map((item: SkillProficiency) => ({
    name: item.skill,
    value: item.proficiency,
    color: item.color,
  }));

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-gray-800 mb-2 text-center">
        {skillName} Breakdown
      </h4>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={0.8 + index * 0.04}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, "Proficiency"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-xs">
        {data.map((item: SkillProficiency, index: number) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-gray-600">{item.skill}</span>
            <span className="font-medium text-gray-800">
              {item.proficiency}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
