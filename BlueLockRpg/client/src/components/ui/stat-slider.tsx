import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface StatSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  color: "blue" | "green" | "yellow" | "red" | "purple" | "cyan";
  min?: number;
  max?: number;
}

const colorClasses = {
  blue: {
    text: "text-blue-400",
    bar: "bg-blue-500",
  },
  green: {
    text: "text-green-400", 
    bar: "bg-green-500",
  },
  yellow: {
    text: "text-yellow-400",
    bar: "bg-yellow-500",
  },
  red: {
    text: "text-red-400",
    bar: "bg-red-500",
  },
  purple: {
    text: "text-purple-400",
    bar: "bg-purple-500",
  },
  cyan: {
    text: "text-cyan-400",
    bar: "bg-cyan-500",
  },
};

export default function StatSlider({ 
  label, 
  value, 
  onChange, 
  color, 
  min = 0, 
  max = 100 
}: StatSliderProps) {
  const colorClass = colorClasses[color];

  const handleValueChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-slate-300 font-rajdhani font-semibold">{label}</label>
        <span className={`font-bold ${colorClass.text}`}>{value}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={handleValueChange}
        max={max}
        min={min}
        step={1}
        className="w-full"
      />
      <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
        <div 
          className={`${colorClass.bar} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
