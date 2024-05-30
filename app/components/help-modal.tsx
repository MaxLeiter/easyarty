import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import * as ReactDOM from "react-dom";
import ThemeSwitch from "./theme-switcher";

const HelpModal = ({ isOpen, onClose }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Tab" && !e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <dialog
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
      open={isOpen}
    >
      <div
        className="fixed inset-0 transition-opacity bg-gray-500 z-9 bg-opacity-30 backdrop-filter backdrop-blur-sm"
        aria-hidden="true"
        onClick={handleClick}
      />
      <div className="z-10 w-full max-w-2xl p-4 mx-auto overflow-y-scroll text-left bg-white rounded-lg dark:bg-gray-900 sm:p-6 sm:pb-4 h-max">
        <div className="">
          <h1 className="text-2xl font-bold">Welcome to EasyArty.com!</h1>
          <p className="w-full mt-3">
            This is an artillery calculator for{" "}
            <Link
              href="https://www.hellletloose.com/"
              className="text-blue-500 hover:underline"
            >
              Hell Let Loose.
            </Link>
          </p>
          <p className="w-full mt-3">
            Input the distance you want to strike and we'll tell you the{" "}
            <abbr title="milliradian">MIL</abbr>. You can also save the results
            to a list for easy access.
          </p>
          <h2 className="mt-6 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            Artillery tips
          </h2>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>
              Artillery is most effective when you know where the enemy is.
              Either know the game well, or have someone pinging for you.
            </li>
            <li>
              Constantly use your map and right click to create a ping to line
              yourself up and check the distance.
            </li>
            <li>
              Artillery uses resources that your team needs. Use them sparingly
              and keep an eye on your resources at the top of the map.
              <ul className="ml-8 list-disc list-inside">
                <li>HE &mdash; 3 munitions</li>
                <li>Smoke &mdash; 5 munitions</li>
              </ul>
            </li>
            <h2 className="pt-6 pb-1 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
              Change the theme
            </h2>
            <ThemeSwitch />
          </ul>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm dark:bg-gray-100 dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
  ReactDOM.createPortal(
    <HelpModal isOpen={isOpen} onClose={onClose} />,
    document.getElementById("modal")
  );

export default Modal;
