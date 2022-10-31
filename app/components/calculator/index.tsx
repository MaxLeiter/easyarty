"use client";

import { useEffect, useRef } from "react";
import { ChangeEvent, useState } from "react";
import calculate, { DistanceError } from "../../lib/calculate";
import Results, { Result } from "./results";
import Input from "./input";
import uuidv4 from "../../lib/uuidv4";

const Calculator = () => {
  const [input, setInput] = useState<string>();
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<number>(764);
  const [results, setResults] = useState<Result[]>([]);
  const [russianArty, setRussianArty] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Tab") {
      return;
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setInput(e.target.value);
      const output = calculate(russianArty, parseInt(e.target.value));
      if (output) {
        setResult(output);
        setError("");
      }
    } catch (e) {
      if (input) {
        if (e instanceof DistanceError) {
          setError(e.message);
        }
      } else {
        setError("Input must be a number.");
        console.error(e);
      }
    }
  };

  const onRussianArtyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRussianArty(e.target.checked);
    try {
      const output = calculate(e.target.checked, parseInt(input));
      if (output) {
        setResult(output);
        setError("");
      }
    } catch (e) {
      if (input) {
        if (e instanceof DistanceError) {
          setError(e.message);
        }
      } else {
        setError("Input must be a number.");
        console.error(e);
      }
    }
  };

  const saveResult = () => {
    if (document.querySelector("dialog")) {
      return;
    }

    if (input && result) {
      setResults((prev) => [
        ...prev,
        {
          id: uuidv4(),
          input: parseInt(input),
          team: russianArty ? "Russia" : "Axis/Ally",
          output: result,
        },
      ]);
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center flex-shrink-0 w-full max-w-md px-4 py-6 space-y-4 bg-white rounded-lg shadow-lg dark:bg-gray-800"
        onSubmit={(e) => {
          e.preventDefault();
          saveResult();
        }}
      >
        <Input value={input} onChange={onInputChange} ref={inputRef} />
        <label
          htmlFor="default-toggle"
          className="relative inline-flex w-full cursor-pointer"
        >
          <input
            type="checkbox"
            checked={russianArty}
            id="default-toggle"
            className="sr-only peer"
            onChange={onRussianArtyChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Russian?
          </span>
        </label>
        {error && (
          <div className="flex items-center justify-center w-full px-4 py-2 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-800 dark:text-red-300">
            {error}
          </div>
        )}
        <output
          className={`w-full px-4 py-2 text-4xl text-center text-gray-700 bg-gray-200 rounded-lg dark:text-gray-100 dark:bg-gray-700 ${error ? `text-red-600 dark:text-red-300` : ''}`}
          aria-live="polite"
        >
          {result}
        </output>
        <button
          type="submit"
          className="invisible w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md lg:visible hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-700"
        >
          Save
        </button>
      </form>
      <div className="absolute invisible w-96 h-96 -bottom-24 lg:top-0 lg:right-0 lg:visible">
        <div className="bg-gray-100 rounded-md dark:bg-gray-700">
          <Results results={results} setResults={setResults} />
        </div>
      </div>
    </>
  );
};

export default Calculator;
