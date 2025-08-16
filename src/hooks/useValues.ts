import { useQuery } from "@tanstack/react-query";
import type { Value } from "@/types/value_t";

async function fetchValues(): Promise<Value[]> {
  const res = await fetch("/api/values");
  if (!res.ok) throw new Error("Failed to fetch values");
  return res.json();
}

export function useValues() {
  return useQuery<Value[], Error>({
    queryKey: ["values"],
    queryFn: fetchValues,
    staleTime: 1000 * 60, 
  });
}
export default useValues;