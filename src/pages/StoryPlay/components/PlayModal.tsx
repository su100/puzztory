import React from 'react';

interface PlayModalProps {
  children: React.ReactNode;
  handleClose: () => void;
}

function PlayModal({ children, handleClose }: PlayModalProps) {
  return (
    <div className="fixed w-full h-screen bg-black bg-opacity-30 top-0 left-0 flex justify-center items-center">
      <div className="relative rounded-md bg-white w-[80%] p-10">
        <button className="absolute right-3 top-2" onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default PlayModal;
