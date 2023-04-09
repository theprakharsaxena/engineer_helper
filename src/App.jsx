import React, { useState } from "react";
import CodeCorrection from "./components/CodeCorrection.jsx";
import CodeConverter from "./components/CodeConverter.jsx";
import CodeExplanation from "./components/CodeExplanation.jsx";


const App = () => {
  const [active, setActive] = useState("correction");
  return (
    <main>
      <header className="bg-gray-800 font-mono font-bold text-3xl text-white text-center py-5">
        <h1>Developer Helper</h1>
      </header>
      <nav className="bg-gray-500 text-white p-4">
        <ul className="flex items-center justify-center space-x-10 sm:space-x-20 md:space-x-32">
          <li onClick={()=>setActive("correction")} className="bg-red-500 py-1 px-2 rounded-md cursor-pointer border text-xs sm:text-sm md:text-base">
            Code Correction
          </li>
          <li onClick={()=>setActive("converter")} className="bg-green-500 py-1 px-2 rounded-md cursor-pointer border text-xs sm:text-sm md:text-base">
            Code Converter
          </li>
          <li onClick={()=>setActive("explanation")} className="bg-yellow-500 py-1 px-2 rounded-md cursor-pointer border text-xs sm:text-sm md:text-base">
            Code Explanation
          </li>
        </ul>
      </nav>
      {active==="converter" && <CodeConverter/>}
      {active==="correction" && <CodeCorrection/>}
      {active==="explanation" && <CodeExplanation/>}
    </main>
  );
};

export default App;
