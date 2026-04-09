import type { HTMLAttributes } from "react";
import { cn } from "./cn";

type SliderProps = HTMLAttributes<HTMLDivElement> & {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
};

export function Slider({
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
}: SliderProps) {
  const values = value ?? defaultValue ?? [min];

  const updateAt = (idx: number, next: number) => {
    const nextValues = [...values];
    nextValues[idx] = next;

    if (nextValues.length === 2) {
      const [a, b] = nextValues;
      if (a > b) {
        nextValues[0] = b;
        nextValues[1] = a;
      }
    }

    onValueChange?.(nextValues);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {values.map((current, idx) => (
        <input
          key={idx}
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={(e) => updateAt(idx, Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-blue-100 accent-blue-600"
        />
      ))}
    </div>
  );
}
