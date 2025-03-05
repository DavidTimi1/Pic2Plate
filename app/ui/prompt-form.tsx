"use client"

import { useRef, useState } from "react";
import { ArrowRightIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "./button";
import { uploadImageAction } from "../actions/upload_action";
import { useRouter } from "next/navigation";


export default function ImageUploadForm() {
    const nextRoute = "/browse";
    const dropzoneRef = useRef<HTMLLabelElement>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const [image, setImage] = useState<File | null>(null);

    return (
        <div className="w-full h-full max-h-[700px]">
            <div className="w-full h-full flex flex-col gap-5">
                <div className="w-full flex justify-end">
                    <a href={nextRoute} className="flex gap-2">
                        <span> Skip </span>
                        <ArrowRightIcon className="h-5 w-5" />
                    </a>
                </div>

                {
                    error &&
                    <div className="bg-red-500 text-white p-3 rounded-xl">
                        {error}
                    </div>
                }

                {
                    image ?
                        <>
                            <img src={URL.createObjectURL(image)} alt="uploaded" className="w-full h-full max-h-full object-cover rounded-xl" />

                            <Button onClick={() => setImage(null)} disabled={loading} deEmphasize>
                                <span className={`flex gap-2 ${loading ? "opacity-30" : ''}`}>
                                    Remove Image
                                    <TrashIcon className="h-5 w-5" />
                                </span>
                            </Button>
                        </>
                    :
                        
                        <label
                            className="border-dashed border-2 rounded-xl w-full flex-grow bg-gray-200 border-gray-400 cursor-pointer"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            ref={dropzoneRef}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black">
                                <div className="flex flex-col align-center justify-center">
                                    <PhotoIcon className="h-10 w-10" />
                                    <span> Click or <br></br> Drag and Drop to Upload </span>
                                </div>
                            </div>

                            <input onChange={handleImageChange} type="file" name="" accept="image/*" hidden multiple={false} />

                        </label>

                }


                <Button onClick={handleBtnClick} disabled={!image}>
                    <span className={`flex gap-2 ${loading ? "opacity-30" : ''}`}>
                        Next
                        <ArrowRightIcon className="h-5 w-5" />
                    </span>
                    {
                        loading &&
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            Loading...
                        </span>
                    }
                </Button>

            </div>
        </div>
    )

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { target: { files } } = e;
        files?.[0] && setImage(files[0])
    }

    function handleDragLeave(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        dropzoneRef.current && dropzoneRef.current.classList.remove("border-gray-700", "bg-gray-400")
    }

    function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault()
        dropzoneRef.current && dropzoneRef.current.classList.add("border-gray-700", "bg-gray-400")
    }

    function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
        handleDragLeave(e);

        const files = e.dataTransfer.files;
        files?.[0] && setImage(files[0])
    }

    async function handleBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
        const formData = new FormData();
        console.log("Uploading image...");

        if (!image) return

        setLoading(true);
        formData.append("image", image as Blob);
    
        const res = await uploadImageAction(formData);
        if (res.success && res.url) {
            console.log("Upload successful!");
            // Redirect to the next page
            router.push(`${nextRoute}?image=${res.url}`);

        } else {
            setError(res.error || "Failed to upload image");
            console.error(res.error);
            setLoading(false);
        }
    }
}