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
import { Button } from "../ui/button";

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
        className="flex flex-col items-center justify-center flex-shrink-0 w-full max-w-md mt-24 lg:mt-0 px-4 py-6 space-y-4 rounded-lg shadow-lg bg-card text-card-foreground"
        onSubmit={(e) => {
          e.preventDefault();
          saveResult();
        }}
      >
        <Input value={input} onChange={onInputChange} ref={inputRef} />
        <Select onValueChange={onFactionChange} value={faction} name="team-select">
          <SelectTrigger className="">
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
        {error && (
          <div className="flex items-center justify-center w-full px-4 py-2 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-800 dark:text-red-300">
            {error}
          </div>
        )}
        <output
          className={`w-full px-4 py-2 text-4xl text-center  rounded-lg  ${error ? `text-red-600 dark:text-red-300` : ""
            }`}
          aria-live="polite"
        >
          {result}
        </output>
        <Button
          type="submit"
          className="w-full"
          variant="outline"
        >
          Save
        </Button>
      </form>
      <div className="w-full max-w-md my-24 lg:w-96 lg:mt-0 lg:absolute lg:top-0 lg:right-0">
        <div className="bg-gray-100 rounded-md dark:bg-gray-700">
          <Results results={results} setResults={setResults} />
        </div>
      </div>
    </>
  );
};

export default Calculator;
