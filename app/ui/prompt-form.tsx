"use client"

import { useRef, useState } from "react";
import { ArrowRightIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "./button";
import { useRouter } from "next/navigation";
import axios from "axios";


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
                            <div className="flex gap-3 items-center">
                                <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="text-white mt-2">Loading...</span>
                            </div>
                        </span>
                    }
                </Button>

            </div>
        </div>
    )

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { target: { files } } = e;
        if (files?.[0]) setImage(files[0]);
    }

    function handleDragLeave(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        if (dropzoneRef.current) dropzoneRef.current.classList.remove("border-gray-700", "bg-gray-400");
    }

    function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault()
        if (dropzoneRef.current) dropzoneRef.current.classList.add("border-gray-700", "bg-gray-400");
    }

    function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
        handleDragLeave(e);

        const files = e.dataTransfer.files;
        if (files?.[0]) setImage(files[0]);
    }

    async function handleBtnClick() {
        const formData = new FormData();
        console.log("Uploading image...");
        const uploadUrl = "/api/upload";

        if (!image) return

        setLoading(true);
        formData.append("image", image as Blob);

        axios.post(uploadUrl, formData)
        .then( res => {
            const data = res.data;

            if (data.message && data.url) {
                console.log("Upload successful!");
                // Redirect to the next page
                router.push(`${nextRoute}?image=${data.url}`);
    
            } else {
                showError("An error occured")
            }
        })
        .catch(showError)
        
        function showError(err: string){
            setError("Failed to upload image");
            console.log(err);
            setLoading(false);
        }
    }
}
