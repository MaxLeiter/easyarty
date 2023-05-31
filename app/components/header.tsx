"use client";

import { useState } from "react";
import HelpModal from "./help-modal";

const Header = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [hasEverOpenedHelp, setHasEverOpenedHelp] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("easyarty.hasEverOpenedHelp") === "true"
  );

  const toggleHelp = () => {
    setHelpOpen(!helpOpen);
    if (!hasEverOpenedHelp) {
      setHasEverOpenedHelp(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("easyarty.hasEverOpenedHelp", "true");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md py-3 space-y-1 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
        EasyArty
        {/* TODO: move this into help-modal */}
        <button
          className="relative inline-block ml-2 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-800"
          onClick={toggleHelp}
          aria-label="Show help dialog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 text-gray-500 dark:text-gray-400 ${
              !hasEverOpenedHelp ? "animate-pulse" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 112 0v4a1 1 0 11-2 0v-4zm1-3a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </h1>
      <p className="text-center text-gray-700 dark:text-gray-300">
        Hell Let Loose artillery calculator
      </p>
      <span className="text-xs text-center text-gray-500 dark:text-gray-400">
        British support will be implemented soon!
      </span>
      <div id="modal" />
      {helpOpen && <HelpModal isOpen={helpOpen} onClose={toggleHelp} />}
    </div>
  );
};

export default Header;
