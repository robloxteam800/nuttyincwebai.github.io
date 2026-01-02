
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 bg-indigo-600/10 rounded-full flex items-center justify-center">
          <i className="fa-solid fa-wand-magic-sparkles text-indigo-600 text-2xl animate-pulse"></i>
        </div>
      </div>
      <p className="text-xl font-outfit font-semibold text-slate-800 animate-pulse">{message}</p>
      <p className="text-sm text-slate-500 mt-2">Gemini is architecting your vision...</p>
    </div>
  );
};

export default Loader;
