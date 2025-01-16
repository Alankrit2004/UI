import React from 'react';

export const Cylindergraph = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
    <div className="relative w-[400px] h-[300px]">
      {data.map((item, index) => (
        <div
          key={index}
          className={`absolute bottom-0 left-[20px] w-[50px] rounded-xl shadow-xl ${
            index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{
            height: `${item.value}px`,
            transform: `translateX(${index * 80}px) rotateX(-15deg)`,
            background: `linear-gradient(to bottom, #0a4b70, #03407a ${item.value}%)`,
          }}
        >
          <p className="text-center text-white">{item.label}</p>
        </div>
      ))}
    </div>
  </div>
  );
};
