import React from 'react';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selectedColor, onColorChange }) => {
  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      orange: 'bg-orange-500',
      multicolor: 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-800">Choose Color:</h4>
      <div className="flex flex-wrap gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => onColorChange(color)}
            className={`w-10 h-10 rounded-full border-4 transition-all duration-200 hover:scale-110 ${
              selectedColor === color 
                ? 'border-gray-800 shadow-lg' 
                : 'border-gray-300 hover:border-gray-400'
            } ${getColorClass(color)}`}
            title={color.charAt(0).toUpperCase() + color.slice(1)}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600 capitalize">
        Selected: <span className="font-semibold">{selectedColor}</span>
      </p>
    </div>
  );
};

export default ColorPicker;