import React, { useState } from "react";
import { askAi } from "./lib/ai";
import "./index.css";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await askAi(prompt);
    setResponse(response);
    setPrompt("");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Kim Ai Generator</h1>
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Type your question here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-md text-white font-semibold ${
            isLoading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isLoading ? "Generating..." : "Submit"}
        </button>
        {response && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-700 whitespace-pre-wrap">
            {response}
          </div>
        )}
      </form>
    </div>
  );
}
