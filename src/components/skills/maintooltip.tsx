"use client";

import { MainSkillData } from "@/types/skills_t";

export interface CustomTooltipProps {
  active?: boolean;
  skillDetails?: { [key: string]: string[] };
  payload?: Array<{
    name: string;
    value: number;
    payload: MainSkillData;
  }>;
}

export const MainTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  skillDetails = {},
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const category = data.name;
    const skills = skillDetails[category];

    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{`${category}: ${data.value}%`}</p>
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">Skills:</p>
          <div className="flex flex-wrap gap-1">
            {skills?.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
};
