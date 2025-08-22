import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AtsScoreCalculator() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
    const navigate = useNavigate();

  const handleCalculateAtsScore = async () => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    alert("Please log in to use the ATS score feature.");
    navigate("/login"); // Make sure `useNavigate` is imported
    return;
  }

  if (!jobDescription || !resumeFile) {
    alert("Please provide both a job description and a resume file.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resumeFile", resumeFile);

    const response = await axios.post(
      "http://localhost:5000/api/calculate-ats-score",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setAtsScore(response.data.atsScore);
  } catch (error) {
    console.error(error);
    alert("Something went wrong while calculating ATS score.");
  }
};

  return (
    <section className="text-center py-16 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        ATS Score Calculator
      </h1>

      {/* Job Description Input */}
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Enter job description"
        className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={6}
      />

      {/* Resume Upload */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 hover:scale-105 transition-transform duration-200 ease-in-out">
  <label className="block text-gray-700 font-semibold mb-2">
    Upload Resume
  </label>
  <input
    type="file"
    accept=".pdf"
    onChange={(e) => setResumeFile(e.target.files[0])}
    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-200 file:text-black
      hover:file:bg-gray-300"
  />
</div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculateAtsScore}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Calculate ATS Score
      </button>

      {/* ATS Score Display */}
      {atsScore !== null && (
        <div className="mt-8 bg-green-100 border border-green-300 text-green-800 p-6 rounded-lg shadow-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">Your ATS Score</h2>
          <p className="text-4xl font-extrabold">{atsScore}%</p>
          <p className="mt-2 text-gray-700">
            {atsScore >= 80
              ? "Excellent! Your resume is highly optimized for ATS."
              : atsScore >= 50
              ? "Good, but there’s room for improvement to boost your chances."
              : "Low score — consider revising your resume for better keyword matching."}
          </p>
        </div>
      )}
    </section>
  );
}

export default AtsScoreCalculator;
