import React from 'react';

interface PlayModalProps {
  children: React.ReactNode;
  handleClose: () => void;
}

function PlayModal({ children, handleClose }: PlayModalProps) {
  return (
    <div className="fixed w-full h-screen bg-black bg-opacity-30 top-0 left-0 flex justify-center items-center">
      <div className="relative rounded-md bg-white w-[80%] h-[70%] p-10">
        <button
          className="absolute right-4 top-3 font-bold text-gray-700"
          onClick={handleClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default PlayModal;
