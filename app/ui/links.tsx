import Link, { LinkProps } from "next/link";


interface BtnUILinkProps extends LinkProps {
    className?: string,
    children: React.ReactNode;
    deEmphasize?: true | false;
}


export default function LinkAsButton({children, className, deEmphasize=false, ...props}: BtnUILinkProps){
    const importanceStyles = deEmphasize? "border-pink-800 bg-transparent hover:bg-pink-800" : "border-transparent bg-pink-600 hover:bg-pink-900"

    return (
        <Link {...props} className={`rounded-full border border-solid transition-colors flex items-center justify-center text-white text-sm sm:text-base px-3 py-2 ${importanceStyles} ${className}`}>
            {children}
        </Link>
    )
}

