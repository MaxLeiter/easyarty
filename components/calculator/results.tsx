import { Dispatch, memo, SetStateAction } from "react";

export type Result = {
  id: string;
  input: number;
  output: number;
  team: "Axis/Ally" | "Russia";
};

type ResultsProps = {
  results: Result[];
  setResults: Dispatch<SetStateAction<Result[]>>;
};

const Results = ({ results, setResults }: ResultsProps) => {
  const tableClasses = "w-full table-auto";
  const tableHeadClasses = "w-full bg-gray-100 dark:bg-gray-800";
  const tableBodyClasses = "w-full";
  const tableRowClasses = "w-full";
  const tableCellClasses =
    "px-2 py-2 text-center border border-gray-200 dark:border-gray-700";

  const columns = ["Distance", "Result", "Team"];

  const data = results.map((result) => {
    return [result.input, result.output, result.team, result.id];
  });

  return (
    <div className="w-full border border-gray-300 rounded-md dark:border-gray-600 pt-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Saved results
      </h2>
      {/* <small>Drag to move</small> */}
      <table className={tableClasses}>
        <thead className={tableHeadClasses}>
          <tr className={tableRowClasses}>
            {columns.map((column) => {
              return <th className={tableCellClasses}>{column}</th>;
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
    </div>
  );
};

export default memo(Results);
