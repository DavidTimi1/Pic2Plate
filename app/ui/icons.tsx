import { ForwardRefExoticComponent, SVGProps } from "react"

interface IconProps {
    Icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
}


export default function HeroIcons({Icon}: IconProps){

    return (
        <Icon className="h-5 w-5" />
    )
}