import { Dispatch, memo, SetStateAction } from "react";
import { Faction } from ".";

export type Result = {
  id: string;
  input: number;
  output: number;
  faction: Faction;
};

type ResultsProps = {
  results: Result[];
  setResults: Dispatch<SetStateAction<Result[]>>;
};

const Results = ({ results, setResults }: ResultsProps) => {
  const tableClasses = "w-full table-auto";
  const tableHeadClasses =
    "w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-300";
  const tableBodyClasses = "w-full";
  const tableRowClasses = "w-full";
  const tableCellClasses =
    "px-2 py-2 text-center border border-gray-200 dark:border-gray-700 dark:text-gray-300";

  const columns = ["Distance", "Result", "Faction"];

  const getFactionName = (faction: string) => {
    switch (faction) {
      case "german":
        return "Axis/Ally";
      case "british":
        return "British";
      case "russian":
        return "Russian";
    }
  };

  const data = results.map((result) => {
    return [
      result.input,
      result.output,
      getFactionName(result.faction),
      result.id,
    ];
  });

  return (
    <aside className="w-full border rounded-md bg-card text-card-foreground">
      <h2 className="my-4 text-2xl font-bold">
        Saved results
      </h2>
      <table className={tableClasses}>
        <thead className={tableHeadClasses}>
          <tr className={tableRowClasses}>
            {columns.map((column) => {
              return (
                <th className={tableCellClasses} key={column}>
                  {column}
                </th>
              );
            })}
            <th className={tableCellClasses}>Delete</th>
          </tr>
        </thead>
        <tbody className={tableBodyClasses}>
          {data.map((row) => {
            return (
              <tr className={tableRowClasses}>
                {row.slice(0, -1).map((cell) => {
                  return <td className={tableCellClasses}>{cell}</td>;
                })}
                <td className={tableCellClasses}>
                  <button
                    className="px-2 py-1 text-sm font-medium text-red-100 bg-red-600 rounded-md dark:bg-red-800 dark:text-red-100 hover:bg-red-700 dark:hover:bg-red-900"
                    onClick={() => {
                      setResults((prev) => {
                        return prev.filter((result) => {
                          return result.id !== row[3];
                        });
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </aside>
  );
};

export default memo(Results);
