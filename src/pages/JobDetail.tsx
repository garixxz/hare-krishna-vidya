
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../hooks/useJobs";
import { ArrowRight } from "lucide-react";

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // find job (id from route param)
  const job = getJobById(Number(id));
  const [applied, setApplied] = useState(false);
  const [application, setApplication] = useState({
    name: "",
    email: "",
    resume: "",
    coverLetter: ""
  });

  if (!job) return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <div className="text-2xl text-gray-600 mb-4">Job not found</div>
      <button
        onClick={() => navigate("/careers")}
        className="px-5 py-2 bg-orange-600 text-white rounded-full"
      >Back to Careers</button>
    </div>
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submit/apply logic
    setApplied(true);
  };

  return (
    <div className="min-h-screen bg-[#fcf5ef] flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-10">
        {/* Back */}
        <button
          onClick={() => navigate("/careers")}
          className="text-orange-600 hover:text-orange-800 mb-3 flex items-center w-fit"
        >&larr; Back</button>

        {/* Job info */}
        <h1 className="text-3xl font-bold mb-1 text-orange-600">{job.title}</h1>
        <p className="text-gray-700 mb-2">{job.description}</p>
        <div className="mb-2">
          <span className="text-gray-600 font-medium text-xs">Location: </span>
          <span className="bg-orange-100 text-orange-700 rounded px-2 py-0.5 text-xs">{job.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((s) => (
            <span key={s} className="bg-orange-50 border border-orange-200 text-orange-600 px-2 py-0.5 rounded text-xs">{s}</span>
          ))}
        </div>
        <div className="text-sm text-gray-600 mb-6">
          <span className="font-semibold">Requirements: </span>
          {job.requirements}
        </div>

        {/* Job application form */}
        {!applied ? (
          <form className="space-y-5" onSubmit={handleApply}>
            <div>
              <label className="block mb-1 font-medium text-sm" htmlFor="name">Full Name</label>
              <input
                id="name"
                className="w-full px-4 py-2 border border-orange-200 rounded focus:outline-orange-500"
                required
                value={application.name}
                onChange={e => setApplication({ ...application, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-orange-200 rounded focus:outline-orange-500"
                required
                value={application.email}
                onChange={e => setApplication({ ...application, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm" htmlFor="resume">LinkedIn/Portfolio/Profile URL</label>
              <input
                id="resume"
                type="url"
                className="w-full px-4 py-2 border border-orange-200 rounded focus:outline-orange-500"
                placeholder="https://linkedin.com/in/..."
                required
                value={application.resume}
                onChange={e => setApplication({ ...application, resume: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm" htmlFor="cover">Cover Letter</label>
              <textarea
                id="cover"
                className="w-full px-4 py-2 border border-orange-200 rounded focus:outline-orange-500"
                rows={4}
                required
                value={application.coverLetter}
                onChange={e => setApplication({ ...application, coverLetter: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold flex items-center gap-1"
            >
              Submit Application <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <div className="py-8 flex flex-col items-center">
            <div className="text-2xl font-semibold text-green-700 mb-2">Thank you for applying!</div>
            <div className="text-gray-600 mb-5">We'll get back to you soon if you are shortlisted.</div>
            <button
              className="px-6 py-2 rounded-full bg-orange-600 text-white"
              onClick={() => navigate("/careers")}
            >Back to Careers</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
