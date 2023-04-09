import React, { useState } from "react";
import openai from "../api/OpenAi.jsx";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodeExplanation = () => {
  const [prompt1, setPrompt1] = useState("");
  const [prompt2, setPrompt2] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const notify = () =>
    toast.success("Explanation Copied!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleAlert = () => {
    notify();
    copy(generatedCode);
  };

  const explainCode = async () => {
    toast.info("Proccessing Code!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt1}\n\n"""\nexplain this ${prompt2} language code in a concise way step by step:\n1.`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['"""'],
      })
      .then((response) => {
        setGeneratedCode(`1.${response.data.choices[0].text}`);
        toast.success("Explanation Generated!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch(() => {
        toast.error("Some Error Occured in Generating Explanation!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 mx-5 mt-5">
        <div className="m-5 flex flex-col justify-center">
          <textarea
            placeholder="Code for Explanation..."
            value={prompt1}
            onChange={(e) => setPrompt1(e.target.value)}
            cols="40"
            rows="15"
            className="bg-gray-700 p-2 border-4 border-yellow-500 text-white"
          ></textarea>
          <div className="mt-5 flex items-center flex-col sm:flex-row justify-center sm:space-x-3 space-x-0">
            <label htmlFor="language">Name of the Coding Language:</label>
            <input
              placeholder="C/C++..."
              value={prompt2}
              onChange={(e) => setPrompt2(e.target.value)}
              type="text"
              className="bg-gray-100 border mb-5 sm:mb-0 mt-1 sm:mt-0 sm:w-32 border-black p-1 rounded-sm"
              name="language"
              id="language"
            />
            <button
              onClick={explainCode}
              className="bg-yellow-500 text-black border border-black px-5 py-1 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="m-5 flex flex-col justify-center">
          <textarea
            placeholder="Explanation..."
            value={generatedCode}
            onChange={(e) => setGeneratedCode(e.target.value)}
            cols="40"
            rows="15"
            className="bg-gray-700 p-2 border-4 border-yellow-500 text-white"
          ></textarea>
          <div className="mt-5">
            <button
              onClick={handleAlert}
              className="bg-yellow-500 text-black border border-black px-5 py-1 rounded-lg"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeExplanation;
