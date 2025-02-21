

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children: React.ReactNode;
    label: string;
    placeholder: string;
}


export default function Input({label, placeholder, children}: InputProps){

    return (
        <label className="mx-auto max-w-2xl p-2 flex flex-col rounded-full gap-2">
            <small className="">
                {label}
            </small>
            <input className="w-full border-none outline-none" 
                placeholder={placeholder}>
            </input>
            <small className="">
                {children}
            </small>
        </label>
    )
}