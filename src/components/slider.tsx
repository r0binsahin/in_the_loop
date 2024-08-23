interface SliderProps {
  value: number;
  setValue: (value: number) => void;
}

export const Slider = ({ value, setValue }: SliderProps) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  return (
    <div className="slidecontainer mt-10">
      <input
        type="range"
        min={1}
        max="10"
        value={value}
        onChange={handleSliderChange}
        className="range range-xs range-accent bg-[#f5e9dd]"
        step="1"
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
      <p className="mt-8">Current value: {value}</p>
    </div>
  );
};
