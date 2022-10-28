import { forwardRef } from "react";
import { xMax, xMin } from "../../lib/calculate";

const Input = forwardRef<
  HTMLInputElement,
  {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
>(({ value, onChange }, ref) => {
  return (
    <div className="relative w-full mb-3">
      <input
        type="number"
        placeholder="Distance"
        className="w-full px-3 py-3 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:border-gray-600 dark:border-gray-600"
        value={value}
        onChange={onChange}
        aria-label="Distance"
        min={xMin}
        max={xMax}
        ref={ref}
      />
    </div>
  );
});

export default Input;
