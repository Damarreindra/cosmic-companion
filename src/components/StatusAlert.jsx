import React, { useEffect } from "react";

function StatusAlert({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);
  
  return (
    <div className="absolute right-36 top-20 bg-green-500 font-bold text-white rounded p-4">
      <p>{message}</p>
    </div>
  );
}

export default StatusAlert;
