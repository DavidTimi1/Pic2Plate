import Link from "next/link"


interface ConvoItemProps {
    id: string,
    mealName: string,
    imgSrc?: string
}

export function HistoryConvoItem({id, mealName, imgSrc}: ConvoItemProps){
    const linkTo = `/recipe/${id}`;
    const alt = "image showing " + mealName;

    return(
        <div className="w-full h-60  border-gray-800 rounded-xl">
            <Link href={linkTo} className="w-full h-full hover:bg-pink-500 duration-300 flex gap-5 items-center rounded-xl">
                {/* image */}
                <div className="h-3/4 aspect-square bg-gray-700 rounded-xl">
                    {
                        imgSrc &&
                        <img src={imgSrc} alt={alt} className="w-full h-full object-cover" />
                    }
                </div>
                <div className="text-2xl">
                    {mealName}
                </div>
            </Link>
        </div>
    )
}