import React, { useEffect, useState } from 'react'

function StatusAlert({text, variant}) {
   const [close, setClose] = useState(false)
   useEffect(() => {
    setClose(false);
    const timer = setTimeout(() => {
      setClose(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [text]); 
  return (
    <div
    className={`absolute top-16 right-0 px-12 py-6 text-white font-bold overflow-hidden transition-all duration-300 
    ${variant === "success" ? "bg-green-500" : "bg-red-500"} 
    ${close ? "h-0 w-0 p-0 opacity-0" : "opacity-100"}`}
  >        {text}
    </div>
  )
}

export default StatusAlert