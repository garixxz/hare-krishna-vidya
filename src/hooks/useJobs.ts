
import { useState } from "react";

// Mock jobs data (replaceable with real backend later)
const initialJobs = [
  {
    id: 1,
    title: "Sr. Graphic Designer",
    location: "Hyderabad",
    description: "Lorem ipsum dolor sit amet consectetur. Eu turpis sit lectus semper dolor. Senectus ullamcorper venenatis rhoncus hendrerit tortor vel.",
    skills: ["Adobe Creative Suite", "Figma"],
    requirements: "3+ years experience, strong portfolio, team player",
  },
  {
    id: 2,
    title: "Front-end Developer",
    location: "Mumbai",
    description: "Join our fast-paced tech team to build engaging web products.",
    skills: ["React", "TypeScript", "TailwindCSS"],
    requirements: "2+ years in React, UI sense, communication",
  }
];

export function useJobsData() {
  // Later this could be fetched from API, redux, query, etc
  const [jobs, setJobs] = useState(initialJobs);
  return { jobs, setJobs };
}

export function getJobById(id: number) {
  return initialJobs.find(job => job.id === id);
}
