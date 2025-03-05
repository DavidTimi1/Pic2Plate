
"use client"

import { useRef, useState, useEffect } from "react";
import Input from "./inputs";
import { ExclamationCircleIcon, SparklesIcon, StarIcon } from "@heroicons/react/24/outline";
import Button from "./button";
import Image from "next/image";
import RecipeAction from "../actions/recipe_action";
import { deduceFromImage } from "../actions/scan_action";


export default function ScanImage(){
    
    // get the query parameter value of image
    const location = new URL(window.location.href);
    const imgSrc = location.searchParams.get('image');

    const [loading, setLoading] = useState(true);
    const [deduced, setDeduced] = useState<any>({});
    const [details, setDetails] = useState('');
    const [error, setError] = useState('');

    // run when the component mounts initially
    // use the server action to deduce form image
    // print results form server
    useEffect(() => {
        if (!imgSrc) return;

        deduceFromImage({imageSrc: imgSrc})
            .then(res => {
                if (res.success){
                    setDeduced(res.data);

                } else {
                    res.error && setError(res.error);
                }
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [imgSrc]);
    

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
                loading ?
                    <PopUpWithDetails deduced={deduced} updateDetails={updateDetails} error={error} imgSrc={imgSrc} showError={setError} showLoading={setLoading} />
                :
                <div className="w-full h-full bg-pink-500 flex items-center justify-center gap-2">
                    <SparklesIcon className="w-8 h-8" />
                    <span>
                        Generating Recipe .... 
                    </span>
                </div>
            }
        </div>
    )

    function updateDetails(value: string){
        setDeduced({...deduced, details: value})
    }

}


interface PopUpProps {
    imgSrc: string | null,
    deduced: any,
    error: string,
    updateDetails: Function,
    showError: Function,
    showLoading: Function
}


function PopUpWithDetails({deduced, error, showError, imgSrc, updateDetails, showLoading}: PopUpProps){

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
                    value={deduced.details}
                    onChange={(e) => updateDetails(e.target.value)}
                >
                    Give more information about the meal for accurate response
                </Input>

                <div className="flex-grow overflow-y-auto gap-3">
                    {
                        Object.keys(deduced).map(
                            // making sure details doesnt get repeated
                            (key:string) => key === "details"? <></> : <DetailSection key={key} title={key} value={deduced[key]} />
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
    
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if (!imgSrc && !deduced.details){
            showError("You must set at least a description text or upload an image");
            return
        }

        showError('');
        showLoading(true);

        const res = RecipeAction({details: deduced.details})
        if (res.success){
            console.log(res.data)
            // artificial delay
            setTimeout(()=>{}, 2000)
        }
        
        
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