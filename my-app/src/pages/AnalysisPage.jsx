import React from "react";
import { useLocation } from "react-router-dom";

const AnalysisPage = () => {
  const { state } = useLocation();

  const cleanSuggestions = Array.isArray(state?.suggestions)
    ? state.suggestions
    : state?.suggestions
        ?.replace(/\*\*/g, "")
        ?.replace(/\*/g, "")
        ?.split(/\d+\.\s/)
        ?.filter((s) => s.trim() !== "");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Resume Analysis
        </h2>

        {/* Feedback Section */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Feedback</h3>
        <div className="bg-gray-100 p-5 rounded-lg mb-8">
          {Array.isArray(cleanSuggestions) && cleanSuggestions.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {cleanSuggestions.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">
              {state?.suggestions || "No feedback available."}
            </p>
          )}
        </div>

        {/* Centered Button */}
        <div className="flex justify-center">
          <a
            href={`http://localhost:5000/download/${state?.fileName}`}
            download
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Get AI Improved Version
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
