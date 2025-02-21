
"use client"

import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Input from "./inputs";
import { ExclamationCircleIcon, SparklesIcon, StarIcon } from "@heroicons/react/24/outline";
import Button from "./button";
import Image from "next/image";


export default function ScanImage(){
    const scanImageUrl = "/api/scan-image";

    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [deduced, setDeduced] = useState<any>();
    const [error, setError] = useState('');
    
    useEffect(() => {
        const data = {
            url: imgSrc
        }

        axios.post(scanImageUrl, data)
        .then(res => {
            setLoading(false);
        })
        .catch(err => {
            setError(err)
        })
    }, []);

    return (

        <div className="w-full h-full max-h-[700px]">

            <div className="rounded-xl w-full h-full">
                {
                    imgSrc ?
                    <Image src={imgSrc} alt="" className="w-full h-full size-cover" />
                    :
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <ExclamationCircleIcon className="h-10 w-10" />
                        <p>
                            No Image selected
                        </p>
                    </div>
                }
            </div>

            {
                !loading && <PopUpWithDetails deduced={deduced} error={error} showError={setError}   />
            }
            
        </div>
    )


}


interface PopUpProps {
    deduced: any,
    error: string,
    showError: Function
}

function PopUpWithDetails({deduced, error, showError}: PopUpProps){
    const [details, setDetails] = useState('');
    const [loading, setLoading] = useState(true);
    const generateRecipeUrl = "/api/genearate-recipe";


    return (
        error ?
            <div className="p-5 flex flex-col align-center justify-center">
                {error}
                <Button onClick={() => showError('')}>
                    Try Again 
                </Button>
            </div>
        :
            <form onSubmit={handleSubmit} className="fixed flex flex-col rounded-t-2xl pb-0 w-full px-3 md:px-10 max-h-[min(500px,80vh)] overflow-hidden">
                <div className="w-full h-5">
                    <div className="mx-auto h-1 bg-white w-3 rounded-full"></div>
                </div>
                
                <Input label="Details" 
                    placeholder="Meal name, your budget ..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                >
                    Give more information about the meal for accurate response
                </Input>

                <div className="flex-grow overflow-y-auto gap-3">
                    {
                        Object.keys(deduced).map(
                            (key:string) => <DetailSection key={key} title={key} value={deduced[key]} />
                        )
                    }
                </div>
                
                <Button>
                    <div className="flex gap-2">
                        <span>
                            Prepare Recipe
                        </span>
                        <SparklesIcon />
                    </div>
                </Button>
            </form>
    )
    
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if (!imgSrc || !details){
            showError("You must set at least a description text or upload an image");
            return
        }
        
        const fd = new FormData(e.target as HTMLFormElement); // Create FormData from the form

        setLoading(true);
        showError('');

        axios.post(generateRecipeUrl, fd)
            .then(res => {
                // handle success
                console.log(res.data);
            })
            .catch(error => {
                showError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
        
    }
}


const DetailSection = ({title, value}: {title: string; value: string}) => (
    <>
    <div className="w-full flex flex-col gap-1">
        <small className="text-gray-400"> {title} </small>
        <p className="text-white">
            {value}
        </p>
    </div>
    <hr></hr>
    </>
)

const devDetails = [
    {name: "FishRoll"},
    {price: "#3,700"},
    {ingredients: "Rice, Beans, Eba, Semo, Egusi"},
    {OrderNow: "Savour, LaSpag, Chicken Rep"}

]