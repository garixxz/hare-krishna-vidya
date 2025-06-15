
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJobsData } from "../hooks/useJobs";
import { ArrowRight } from "lucide-react";

const collageImages = [
  "https://images.pexels.com/photos/1181696/pexels-photo-1181696.jpeg", // woman thoughtful
  "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg", // woman in red dress
  "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg", // woman in white coat
  "https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg", // office collab
  "https://images.pexels.com/photos/1815164/pexels-photo-1815164.jpeg", // woman with rolled paper
];

const Careers: React.FC = () => {
  const { jobs } = useJobsData();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fcf5ef]">
      {/* Collage Section */}
      <div className="md:w-2/5 w-full grid grid-cols-2 gap-2 p-6 pt-10 relative">
        {/* Overlapping, differently shaped images */}
        <img src={collageImages[0]} alt="" className="rounded-full aspect-square object-cover w-32 h-32 md:w-48 md:h-48 ml-6 shadow-lg z-10" />
        <img src={collageImages[1]} alt="" className="rounded-xl object-cover w-32 h-40 md:w-44 md:h-60 mt-8 z-0" />
        <img src={collageImages[2]} alt="" className="rounded-xl object-cover w-40 h-32 md:w-56 md:h-44 col-span-2 mt-2" />
        <img src={collageImages[3]} alt="" className="rounded-lg object-cover w-40 h-28 md:w-64 md:h-40 col-span-2" />
        <img src={collageImages[4]} alt="" className="rounded-full aspect-square object-cover w-36 h-36 md:w-52 md:h-52 row-span-2 col-span-1 mt-4 ml-8 shadow-lg" />
        {/* Decorative orange circle */}
        <div className="hidden md:block absolute right-0 top-1/3 w-44 h-44 bg-orange-500 rounded-full opacity-20 z-0" />
      </div>

      {/* Vacancy Section */}
      <div className="md:w-3/5 w-full px-4 md:px-12 py-6 flex flex-col gap-8 relative justify-center">
        {/* Heading / Subhead */}
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold text-orange-600">
            Design.<span className="text-gray-600 ml-2">Develop.</span>
            <span className="font-normal italic text-orange-600 ml-2">Inspire.</span>
          </h2>
          <p className="mt-3 text-lg md:text-xl text-gray-600">Elevate Your Career at <span className="font-semibold text-orange-500">Hare Krishna Vidya</span></p>
        </div>

        {/* Search and Button */}
        <div className="flex gap-4 mt-2 mb-3 flex-wrap items-center">
          <input
            className="px-4 py-2 rounded-full border border-orange-200 bg-white max-w-sm outline-orange-400"
            placeholder="Try, Tech Industry"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        </div>

        {/* Job List */}
        <div className="">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">Available Vacancies</h3>
          <div className="flex flex-col gap-5">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white shadow p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold">{job.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{job.description}</p>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-gray-500 text-xs">Skills Required :</span>
                    {job.skills.map(s => <span key={s} className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{s}</span>)}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span>Location: {job.location}</span>
                  </div>
                </div>
                <button
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition mt-2 md:mt-0"
                  onClick={() => navigate(`/careers/${job.id}`)}
                >
                  Visit Job Page <ArrowRight size={16} />
                </button>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <div className="text-gray-500 px-4 py-6 text-center">
                No jobs found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
