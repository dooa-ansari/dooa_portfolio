"use client";
import { DetailedChart } from "@/components/skills/detailedchart";
import { SkillDonut } from "@/components/skills/donut";
import { MainTooltip } from "@/components/skills/maintooltip";
import { NavigationButton } from "@/components/skills/navigationbuttons";
import useSkills from "@/hooks/useSkills";
import {
  MainSkillData,
  SkillLevel,
  SkillProficiency,
  ViewType,
} from "@/types/skills_t";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const getSkillLevel = (proficiency: number): SkillLevel => {
  if (proficiency >= 90) return "Expert";
  if (proficiency >= 80) return "Advanced";
  if (proficiency >= 70) return "Intermediate";
  return "Developing";
};

const getSkillLevelColor = (level: SkillLevel): string => {
  switch (level) {
    case "Expert":
      return "bg-green-100 text-green-800";
    case "Advanced":
      return "bg-blue-100 text-blue-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "Developing":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const DeveloperSkillsDashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState<ViewType>("overview");
  const { data, isLoading, isError } = useSkills();

  if (isLoading) return <div>Loading values...</div>;
  if (isError) return <div>Failed to load values.</div>;
  if (!data) return <div>No data available.</div>;
  const { mainData, detailedSkills, skillDetails } = data;
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Skills Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive breakdown of technical skills and proficiency levels
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <NavigationButton
          isActive={selectedView === "overview"}
          onClick={() => setSelectedView("overview")}
        >
          Overview
        </NavigationButton>
        {Object.keys(detailedSkills).map((skill: string) => (
          <NavigationButton
            key={skill}
            isActive={selectedView === skill}
            onClick={() => setSelectedView(skill)}
          >
            {skill}
          </NavigationButton>
        ))}
      </div>

      {selectedView === "overview" && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mainData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {mainData.map((entry: MainSkillData, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={<MainTooltip skillDetails={skillDetails} />}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(detailedSkills).map((skillName: string) => (
              <SkillDonut
                key={skillName}
                skillName={skillName}
                data={detailedSkills[skillName]}
              />
            ))}
          </div>
        </div>
      )}

      {selectedView !== "overview" && detailedSkills[selectedView] && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <DetailedChart
              skillName={selectedView}
              data={detailedSkills[selectedView]}
            />
            <SkillDonut
              skillName={selectedView}
              data={detailedSkills[selectedView]}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {selectedView} - Detailed Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Skill Area
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Proficiency
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailedSkills[selectedView].map(
                    (item: SkillProficiency, index: number) => {
                      const level = getSkillLevel(item.proficiency);
                      return (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-800">
                            {item.skill}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${item.proficiency}%`,
                                    backgroundColor: item.color,
                                  }}
                                />
                              </div>
                              <span className="text-gray-700 font-medium">
                                {item.proficiency}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(
                                level
                              )}`}
                            >
                              {level}
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperSkillsDashboard;
