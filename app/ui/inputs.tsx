

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children: React.ReactNode;
    label: string;
    placeholder: string;
}


export default function Input({label, placeholder, children}: InputProps){

    return (
        <label className="mx-auto w-full max-w-2xl flex flex-col rounded-full gap-2">
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



interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    children: React.ReactNode;
    label: string;
    placeholder: string;
}


export function TextArea({label, placeholder, children, ...props}: TextAreaProps){

    return (
        <label className="mx-auto w-full max-w-2xl flex flex-col rounded-full gap-2">
            <small className="">
                {label}
            </small>
            <textarea {...props} className={`w-full border-none outline-none rounded-xl`}
                placeholder={placeholder}>
            </textarea>
            <small className="">
                {children}
            </small>
        </label>
    )
}