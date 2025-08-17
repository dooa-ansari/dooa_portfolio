export interface MainSkillData {
  name: string;
  value: number;
  color: string;
}

export interface SkillProficiency {
  skill: string;
  proficiency: number;
  color: string;
}

export interface SkillDetails {
  [key: string]: string[];
}

export interface DetailedSkills {
  [key: string]: SkillProficiency[];
}

export type SkillLevel = "Expert" | "Advanced" | "Intermediate" | "Developing";

export type ViewType = "overview" | string;

export interface SkillsResponse {
  mainData: MainSkillData[];
  detailedSkills: DetailedSkills;
  skillDetails: SkillDetails;
}
