
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
        onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4 transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="mt-2">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
