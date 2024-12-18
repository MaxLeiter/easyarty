import { forwardRef, useEffect, useState } from "react";
import { xMax, xMin } from "../../lib/calculate";
import { Input as ShadInput } from "../ui/input";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const checkIsMobile = (): boolean => {
      if (typeof window === 'undefined') return false;
      return /iPhone|iPad/i.test(navigator.userAgent);
    };
    setIsMobile(checkIsMobile());
  }, []);
  
  return isMobile;
};

interface InputProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, onChange } = props;
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="relative w-48">
        <ShadInput
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Distance"
          value={value}
          onChange={onChange}
          aria-label="Distance"
          min={xMin}
          max={xMax}
          ref={ref}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <ShadInput
      type="number"
      placeholder="Distance"
      value={value}
      onChange={onChange}
      aria-label="Distance"
      min={xMin}
      max={xMax}
      ref={ref}
      className="w-48"
    />
  );
});

Input.displayName = "Input";

export default Input;