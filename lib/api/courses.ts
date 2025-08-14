// lib/api/courses.ts
import { api } from "./client";

export type Course = {
  id: number | string;
  club_name?: string | null;
  course_name: string; // ← display this in the list
  city?: string | null;
  state?: string | null;
  country?: string | null;
  number_of_holes?: number | null;
};

// Normalize whatever the server returns into an array of Course-like objects
function normalizeCourses(data: any): Course[] {
  const arr = Array.isArray(data)
    ? data
    : Array.isArray(data?.results)
      ? data.results
      : Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.courses)
          ? data.courses
          : Array.isArray(data?.data)
            ? data.data
            : [];

  return arr.map((it: any) => ({
    id: it.id ?? it.course_id ?? it._id ?? it.uuid,
    club_name: it.club_name ?? null,
    course_name: it.course_name ?? it.name ?? "Unnamed Course",
    city: it.city ?? it.location?.city ?? null,
    state: it.state ?? it.location?.state ?? null,
    country: it.country ?? it.location?.country ?? null,
    number_of_holes: it.number_of_holes ?? it.holes ?? null,
  }));
}

export const searchCourses = async (search: string): Promise<Course[]> => {
  const term = search.trim();
  if (term.length < 2) return [];

  try {
    // Backend expects GET /courses/ with ?search=<term>
    const res = await api.get("/courses/", { params: { search: term } });
    // One-time peek while you verify; feel free to remove after it works:
    // console.log(
    //   "courses.search 200 ->",
    //   JSON.stringify(res.data).slice(0, 300)
    // );
    return normalizeCourses(res.data);
  } catch (e: any) {
    console.log("courses.search error >>>", {
      status: e?.response?.status,
      data: e?.response?.data,
      message: e?.message,
    });
    throw e;
  }
};
