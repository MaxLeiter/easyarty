import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import * as ReactDOM from "react-dom";

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
      className="fixed inset-0 flex items-center justify-center"
      open={isOpen}
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity z-0 backdrop-filter backdrop-blur-sm"
        aria-hidden="true"
        onClick={handleClick}
      />
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl mx-auto p-4 sm:p-6 sm:pb-4 text-left z-10 h-max overflow-y-scroll">
        <div className="">
          <h1 className="text-2xl font-bold">Welcome to EasyArty.com!</h1>
          <p className="mt-3 w-full">
            This is an artillery calculator for{" "}
            <Link
              href="https://www.hellletloose.com/"
              className="text-blue-500 hover:underline"
            >
              Hell Let Loose.
            </Link>
          </p>
          <p className="mt-3 w-full">
            Input the distance you want to strike and we'll tell you the{" "}
            <abbr title="milliradian">MIL</abbr>. You can also save the results
            to a list for easy access.
          </p>
          <h2 className="mt-6 text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
            Artillery tips
          </h2>
          <ul className="list-disc list-inside mt-3 space-y-2">
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
              <ul className="list-disc list-inside ml-8">
                <li>HE &mdash; 3 munitions</li>
                <li>Smoke &mdash; 5 munitions</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 dark:bg-gray-100 text-base font-medium text-white dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
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
