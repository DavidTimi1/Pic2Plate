"use client"

import { useRef, useState } from "react";
import axios from "axios";
import { ArrowRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Button from "./button";


export default function ImageUploadForm(){
    const scanImageUrl = "/api/scan-image";
    const nextRoute = "/browse";
    const dropzoneRef = useRef<HTMLLabelElement>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [image, setImage] = useState<File | null>(null);

    return (
        <form onSubmit={handleSubmit} action={scanImageUrl} className="w-full h-full max-h-[700px]">
            <div className="w-full h-full flex flex-col gap-5">
                <div className="w-full flex flex-end">
                    <a href={nextRoute} className="flex gap-2 align-center">
                        <span> Next </span>
                    </a>
                </div>

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

                <Button disabled={!image}>
                    <span className={loading ? "opacity-30": ''}>
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
        </form>
    )

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){
        const {target: {files}} = e;
        files?.[0] && setImage(files[0])
    }

    function handleDragLeave(e: React.DragEvent<HTMLLabelElement>){
        e.preventDefault();
        dropzoneRef.current && dropzoneRef.current.classList.remove("border-gray-700", "bg-gray-400")
    }

    function handleDragOver(e: React.DragEvent<HTMLLabelElement>){
        e.preventDefault()
        dropzoneRef.current && dropzoneRef.current.classList.add("border-gray-700", "bg-gray-400")
    }
    
    function handleDrop(e: React.DragEvent<HTMLLabelElement>){
        handleDragLeave(e);

        const files = e.dataTransfer.files;
        files?.[0] && setImage(files[0])
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        
        const fd = new FormData(e.target as HTMLFormElement); // Create FormData from the form

        setLoading(true);
        setError('');

        axios.post(scanImageUrl, fd)
            .then(res => {
                // handle success
                console.log(res.data);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
        
    }
}