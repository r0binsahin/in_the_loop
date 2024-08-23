interface SliderProps {
  value: number;
  setValue: (value: number) => void;
}

export const Slider = ({ value, setValue }: SliderProps) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  return (
    <div className="slidecontainer">
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={handleSliderChange}
        className="slider w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
      />
      <p className="mt-4">Current value: {value}</p>
    </div>
  );
};
