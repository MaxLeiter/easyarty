"use client";

import { useState } from "react";
import HelpModal from "./help-modal";
import ThemeSwitch from "./theme-switcher";
import { Button } from "./ui/button";

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
    <div className="flex flex-col items-center justify-center w-full max-w-md py-2 rounded-lg shadow-lg bg-card text-card-foreground">
      <h1 className="text-4xl font-bold text-center">
        EasyArty
        {/* TODO: move this into help-modal */}
        <Button
          className="relative inline-block ml-2"
          onClick={toggleHelp}
          aria-label="Show help dialog"
          variant="ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 text-gray-500 dark:text-gray-400 ${!hasEverOpenedHelp ? "animate-pulse" : ""
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
        </Button>
      </h1>
      <p className="text-center">
        Hell Let Loose artillery calculator
      </p>
      <div id="modal" />
      {helpOpen && <HelpModal isOpen={helpOpen} onClose={toggleHelp} />}
    </div>
  );
};

export default Header;
