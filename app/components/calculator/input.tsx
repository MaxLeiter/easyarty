import { forwardRef } from "react";
import { xMax, xMin } from "../../lib/calculate";
import { Input as ShadInput } from "../ui/input";
const Input = forwardRef<
  HTMLInputElement,
  {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
>(({ value, onChange }, ref) => {
  return (
    <div className="relative w-full mb-3">
      <ShadInput
        type="number"
        placeholder="Distance"
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
