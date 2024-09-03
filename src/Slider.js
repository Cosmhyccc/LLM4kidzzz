import React from 'react';

const Slider = ({ min, max, step, value, onValueChange }) => {
  const handleChange = (event) => {
    onValueChange([parseFloat(event.target.value)]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
  );
};

export default Slider;