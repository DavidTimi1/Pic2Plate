
"use client"

import { CldImage } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";


interface ConvoItemProps {
    id: string,
    mealName: string,
    imgSrc?: string
}

export function HistoryConvoItem({ id, mealName, imgSrc }: ConvoItemProps) {
    const linkTo = `/recipe/${id}`;
    const alt = "image showing " + mealName;

    return (
        <div className="w-full h-60  border-gray-800 rounded-xl">
            <Link href={linkTo} className="w-full h-full hover:bg-pink-500 duration-300 flex gap-5 items-center rounded-xl">
                {/* image */}
                <div className="h-3/4 aspect-square bg-gray-700 rounded-xl">
                    {
                        imgSrc ?

                        <CldImage
                            alt={alt}
                            src={imgSrc} // Use this sample image or upload your own via the Media Explorer
                            width="500" // Transform the image: auto-crop to square aspect_ratio
                            height="500"
                            crop={{
                                type: 'auto',
                                source: true
                            }}
                            className="w-full h-full object-cover object-center rounded-xl"
                        />
                        :
                        <Image
                            src="/images/food-placeholder.webp"
                            width={528}
                            height={528}
                            alt="No image uploaded for this recipe"
                            className="w-full h-full object-cover object-center rounded-xl"
                        />
                    }
                </div>
                <div className="text-2xl">
                    {mealName}
                </div>
            </Link>
        </div>
    )
}