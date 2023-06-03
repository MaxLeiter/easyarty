"use client";

import { useEffect, useRef } from "react";
import { ChangeEvent, useState } from "react";
import calculate, { DistanceError, options } from "../../lib/calculate";
import Results, { Result } from "./results";
import Input from "./input";
import uuidv4 from "../../lib/uuidv4";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import va from "@vercel/analytics";

export type Faction = "german" | "british" | "russian";

const Calculator = () => {
  const [input, setInput] = useState<number>();
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<number>(764);
  const [results, setResults] = useState<Result[]>([]);
  const [faction, setFaction] = useState<Faction>("german");
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
      const value = parseInt(e.target.value);
      setInput(value);
      updateCalculation(value, faction);
    } catch (e) {
      setError("Input must be a number.");
      console.error(e);
    }
  };

  const updateCalculation = (x: number, faction: Faction) => {
    if (!options[faction]) {
      alert("No faction selected");
      return;
    }

    try {
      const output = calculate(x, options[faction]);

      va.track("calculation", {
        input: x,
        faction,
      });

      if (output) {
        setResult(output);
        setError("");
      }
    } catch (e) {
      // check for x so we don't show an error when input is empty
      if (x && e instanceof DistanceError) {
        setError(e.message);
      }
    }
  };

  const onFactionChange = (newFaction: Faction) => {
    setFaction(newFaction);
    updateCalculation(input, newFaction);
  };

  const saveResult = () => {
    if (document.querySelector("dialog")) {
      return;
    }

    va.track("saved result", {
      input,
      faction,
    });

    if (input && result) {
      setResults((prev) => [
        ...prev,
        {
          id: uuidv4(),
          input,
          faction,
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
          <Select onValueChange={onFactionChange} value={faction}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a faction" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Factions</SelectLabel>
                <SelectItem value="german">Axis/Ally</SelectItem>
                <SelectItem value="russian">USSR</SelectItem>
                <SelectItem value="british">British</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </label>
        {error && (
          <div className="flex items-center justify-center w-full px-4 py-2 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-800 dark:text-red-300">
            {error}
          </div>
        )}
        <output
          className={`w-full px-4 py-2 text-4xl text-center text-gray-700 bg-gray-200 rounded-lg dark:text-gray-100 dark:bg-gray-700 ${
            error ? `text-red-600 dark:text-red-300` : ""
          }`}
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
