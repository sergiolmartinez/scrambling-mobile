import { api } from "./client";

export const searchCourses = async (q: string) => {
  const { data } = await api.get(`/courses/search`, { params: { q } });
  return data; // shape per your GolfCourseAPI
};
