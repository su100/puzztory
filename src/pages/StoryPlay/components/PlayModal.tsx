import React, { useEffect } from 'react';

interface PlayModalProps {
  children: React.ReactNode;
  handleClose: () => void;
}

function PlayModal({ children, handleClose }: PlayModalProps) {
  const closeModal = () => {
    document.body.style.overflow = 'visible';
    handleClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div className="fixed w-full h-screen bg-black bg-opacity-30 top-0 left-0 flex justify-center items-center">
      <div className="relative rounded-md bg-white w-[80%] max-h-[70%] p-10">
        <button
          className="absolute right-4 top-3 font-bold text-gray-700"
          onClick={closeModal}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default PlayModal;
