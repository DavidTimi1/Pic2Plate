import React from "react";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    deEmphasize?: true | false;
}


export default function Button ({ children, className, deEmphasize = false, type = "button", ...props }: ButtonProps) {
    const importanceStyles = deEmphasize? "border-pink-800 bg-transparent hover:bg-pink-800" : "border-transparent bg-pink-600 hover:bg-pink-900"

    return (
        <button {...props} type={type} className={`rounded-full border border-solid transition-colors flex items-center justify-center text-white text-lg sm:text-base px-3 py-2 ${importanceStyles} ${className}`}>
            {children}
        </button>
    )
}

