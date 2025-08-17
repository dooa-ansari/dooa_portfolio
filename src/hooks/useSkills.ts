import { SkillsResponse } from "@/types/skills_t";
import { useQuery } from "@tanstack/react-query";

async function fetchSkills(): Promise<SkillsResponse> {
  const res = await fetch("/api/skills");
  if (!res.ok) throw new Error("Failed to fetch skills data");
  return res.json();
}

export function useSkills() {
  return useQuery<SkillsResponse, Error>({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 1000 * 60,
  });
}
export default useSkills;
