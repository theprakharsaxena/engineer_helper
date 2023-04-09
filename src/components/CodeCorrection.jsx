import React, { useState } from "react";
import openai from "../api/OpenAi.jsx";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodeCorrection = () => {
  const [prompt1, setPrompt1] = useState("");
  const [prompt2, setPrompt2] = useState("");
  const [prompt3, setPrompt3] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [reasonOfTheCode, setReasonOfTheCode] = useState("");

  const notify = () =>
    toast.success("Corrected Code Copied!", {
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
    toast.info("Proccessing Corrected Code!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    const response1 = await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `Correct this ${prompt1} language code: \n${prompt2} \nAccording to this error: \n${prompt3}`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1.0,
        frequency_penalty: 0.2,
        presence_penalty: 0.0,
        stop: ["###"],
      })
      .then((response1) => {
        setGeneratedCode(`${response1.data.choices[0].text}`);
        toast.success("Code Generated!", {
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
        toast.error("Some Error Occured in Generating Code!", {
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
    toast.info("Proccessing Explanation of Code!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    const response2 = await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `Explain the reason of the error of this ${prompt1} language code: \n${prompt2} \nAccording to this error: \n${prompt3} and don't write the corrected code`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1.0,
        frequency_penalty: 0.2,
        presence_penalty: 0.0,
        stop: ["###"],
      })
      .then((response2) => {
        setReasonOfTheCode(response2.data.choices[0].text);
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
      <div className="grid grid-cols-1 lg:grid-cols-8 mx-5 mt-5">
        <div className="m-5 flex flex-col col-span-3 justify-center">
          <textarea
            placeholder="Code for correction..."
            value={prompt2}
            onChange={(e) => setPrompt2(e.target.value)}
            cols="40"
            rows="23"
            className="bg-gray-700 p-2 border-4 text-xs text border-red-500 text-white"
          ></textarea>
          <div className="mt-5 flex items-center flex-col sm:flex-row justify-center sm:space-x-3 space-x-0">
            <label htmlFor="language">Name of the Coding Language:</label>
            <input
            placeholder="C/C++..."
            value={prompt1}
              onChange={(e) => setPrompt1(e.target.value)}
              type="text"
              className="bg-gray-100 border mt-1 sm:mt-0 w-32 border-black p-1 rounded-sm"
              name="language"
            />
          </div>
        </div>
        <div className="col-span-2 flex flex-col m-5 lg:space-y-14 space-y-7">
          <div className="lg:flex flex-col justify-center hidden">
            <textarea
              placeholder="Explanation of Code..."
              value={reasonOfTheCode}
              onChange={(e) => setReasonOfTheCode(e.target.value)}
              cols="40"
              rows="9"
              className="bg-gray-700 p-2 border-4 text-xs border-red-500 text-white"
            ></textarea>
          </div>
          <div className="lg:flex flex-col justify-center hidden">
            <textarea
              placeholder="Error..."
              value={prompt3}
              onChange={(e) => setPrompt3(e.target.value)}
              cols="40"
              rows="9"
              className="bg-gray-700 p-2 border-4 text-xs border-red-500 text-white"
            ></textarea>
            <div className="mt-5">
              <button
                onClick={explainCode}
                className="bg-red-500 text-black border border-black px-5 py-1 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center lg:hidden">
            <textarea
              placeholder="Error..."
              value={prompt3}
              onChange={(e) => setPrompt3(e.target.value)}
              cols="40"
              rows="9"
              className="bg-gray-700 p-2 border-4 text-xs border-red-500 text-white"
            ></textarea>
            <div className="mt-5">
              <button
                onClick={explainCode}
                className="bg-red-500 text-black border border-black px-5 py-1 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center lg:hidden">
            <textarea
              placeholder="Explanation of Code..."
              value={reasonOfTheCode}
              onChange={(e) => setReasonOfTheCode(e.target.value)}
              cols="40"
              rows="9"
              className="bg-gray-700 p-2 border-4 text-xs border-red-500 text-white"
            ></textarea>
          </div>
        </div>
        <div className="m-5 flex flex-col col-span-3 justify-center">
          <textarea
            placeholder="Corrected code..."
            value={generatedCode}
            onChange={(e) => setGeneratedCode(e.target.value)}
            cols="40"
            rows="23"
            className="bg-gray-700 p-2 border-4 text-xs border-red-500 text-white"
          ></textarea>
          <div className="mt-5">
            <button
              onClick={handleAlert}
              className="bg-red-500 text-black border border-black px-5 py-1 rounded-lg"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeCorrection;
