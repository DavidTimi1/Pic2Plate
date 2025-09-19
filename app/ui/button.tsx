import React from "react";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    deEmphasize?: true | false;
}


export default function Button ({ children, className, deEmphasize = false, type = "button", ...props }: ButtonProps) {
    const importanceStyles = deEmphasize? "border-primary bg-transparent hover:bg-primary" : "border-transparent bg-primary hover:bg-pink-900"

    return (
        <button {...props} type={type} className={`rounded-xl border border-solid transition-colors flex items-center justify-center text-white text-lg sm:text-base p-3 ${importanceStyles} ${className}`}>
            {children}
        </button>
    )
}

