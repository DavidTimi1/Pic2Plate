
"use client";

import "@/app/ui/scan-image.css";

import { useState, useEffect } from "react";
import { TextArea } from "./inputs";
import { ExclamationCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Button from "./button";
import RecipeAction from "../actions/recipe_action";
import { deduceFromImage } from "../actions/scan_action";
import { useRouter, useSearchParams } from "next/navigation";
import { IngredientLocation } from "../lib/definitions";
import { CldImage } from "next-cloudinary";



interface DeducedInfo {
    name: string,
    details: string,
    ingredients: IngredientLocation
}



export default function ScanImage(){
    
    // get the query parameter value of image
    const imgSrc = useSearchParams().get("image");

    const [loading, setLoading] = useState<'scanning'| false | 'generating'>(imgSrc? 'scanning': false);
    const [deduced, setDeduced] = useState<DeducedInfo>();
    const [error, setError] = useState('');
    const [rerender, setRerender] = useState(false);

    // run when the component mounts initially
    // use the server action to deduce form image
    // print results form server
    useEffect(() => {
        if (!imgSrc) return;

        const tmpFile = window.location.hash.slice(1);

        deduceFromImage({imageSrc: imgSrc, tmpSrc: tmpFile})
            .then(res => {
                if (res.success && res.data){
                    setTimeout( 
                        () => setDeduced({...res.data, details: ''})
                    , 1000 )

                } else {
                    if (res.error) setError(res.error);
                }
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [rerender, imgSrc]);
    

    return (

        <div className="w-full h-full max-h-[700px]">

            <div className="rounded-xl w-full h-full">
                {
                    imgSrc ?
                        <>
                        <CldImage
                            alt=""
                          src={imgSrc} // Use this sample image or upload your own via the Media Explorer
                          width="500" // Transform the image: auto-crop to square aspect_ratio
                          height="500"
                          crop={{
                            type: 'auto',
                            source: true
                          }}
                           className="w-full h-full object-cover rounded-xl"
                        />
                        {/* <img src={imgSrc} alt="" className="w-full h-full object-cover rounded-xl" /> */}
                        { 
                            loading === "scanning" &&
                            <div className="w-full h-4 absolute bg-white blur-sm top-0 left-0 scan-beam"></div>
                        }
                        </>
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
                loading === "generating" ?
                    <div className="fixed top-0 left-0 w-full h-full bg-pink-500 flex items-center justify-center gap-2">
                        <SparklesIcon className="w-16 h-16 animate-spin" />
                        <span>
                            Generating Recipe ....
                        </span>
                    </div>
                :
                loading === false?
                    <PopUpWithDetails 
                        deduced={deduced} 
                        updateDetails={updateDetails} 
                        error={error} 
                        imgSrc={imgSrc} 
                        showError={setError} 
                        showLoading={setLoading} 
                    />
                : 
                <></>
            }
        </div>
    )

    function updateDetails(value: string | null){
        if (value !== null){
            setDeduced({...deduced, details: value} as DeducedInfo)
            
        } else {
            // trigger rescan image
            setLoading("scanning")
            setRerender(!rerender)
        }
    }

}


interface PopUpProps {
    imgSrc: string | null,
    deduced: DeducedInfo | undefined,
    error: string,
    updateDetails: (value: string | null) => void,
    showError: (err: string) => void,
    showLoading: (state: "generating" | "scanning" | false) => void
}


function PopUpWithDetails({deduced, error, showError, imgSrc, updateDetails, showLoading}: PopUpProps){
    const ingredients = Object.keys(deduced?.ingredients ?? {} );
    const router = useRouter();


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-300 bg-opacity-20">
            <form onSubmit={handleSubmit} className={`absolute bg-black flex items-center justify-center flex-col rounded-t-2xl py-2 w-full bottom-0 px-3 md:px-10 max-h-[min(700px,80vh)] ${ error? "min-h-60" : "min-h-96" } overflow-hidden`}>
                <div className="w-full h-5">
                    <div className="mx-auto my-1 h-1 bg-white w-16 rounded-full"></div>
                </div>
                <div className="w-full flex justify-center flex-col gap-5 overflow-y-auto flex-grow">

                {
                    error ?
                        <div className="p-5 flex w-full flex-col gap-2 align-center justify-center">
                            <div className="bg-red-500 text-white p-3 rounded-xl">
                                {error}
                            </div>
                            <Button onClick={retryAction}>
                                Try Again 
                            </Button>
                        </div>

                    : 
                    <>
                    {
                        deduced?.ingredients ?
                            <>
                            <TextArea label="Details"
                                rows={2}
                                placeholder="Meal name, your budget ..."
                                value={deduced.details}
                                onChange={(e) => updateDetails(e.target.value)}
                            >
                                Give more information about the meal for accurate response
                            </TextArea>

                            <div className="flex-grow overflow-y-auto gap-3">
                                <DetailSection title="Meal Name" value={deduced?.name} />

                                <DetailSection title="Ingredients" value={ ingredients.join("\n") } />

                            </div>
                            </>
                        : 
                        <TextArea label="Details"
                            rows={4}
                            placeholder="Meal name, your budget ..."
                            value={deduced?.details ?? ""}
                            onChange={(e) => updateDetails(e.target.value)}
                        >
                            Give a full description of the meal
                        </TextArea>
                    }
                        <Button type="submit">
                            <div className="flex gap-2 items-center justify-center">
                                <span>
                                    Prepare Recipe
                                </span>
                                <SparklesIcon className="h-6 w-6" />
                            </div>
                        </Button>
                    </>
                }
                </div>
            </form>
        </div>
    )
    
    
    async function handleSubmit(e?: React.FormEvent<HTMLFormElement>){
        e?.preventDefault?.();
        const tmpFile = window.location.hash.slice(1);

        if ((!imgSrc && !deduced?.details || !deduced)){
            showError("You must set at least a description text or upload an image");
            showLoading(false);
            return
        }

        showError('');
        showLoading('generating');

        const res = await RecipeAction({
            imgSrc, ingredients, tmpFile,
            mealName: deduced.name,
            details: deduced.details,
        })
        if (res.success){
            // navigate to view the full recipe
            router.push(`/recipe/${res.id}`);

        } else {
            if (res.error) showError(res.error);
            showLoading(false);
        }
        
        
    }

    function retryAction(){
        // if scan failed rescan
        // if scan successful, retry recipe generation
        // if no image retry recipe generation
        showError('');

        if (!imgSrc || ingredients.length){
            console.log("Generating recipe again")
            handleSubmit();

        } 
        else {
            updateDetails(null);
        }
    }
}


const DetailSection = ({title, value}: {title: string; value: string}) => (
    <>
    <div className="w-full flex flex-col gap-1">
        <small className="text-gray-200"> {title} </small>
        <p className="text-white">
            {value}
        </p>
    </div>
    <hr></hr>
    </>
)

export function LoadingPage(){

    return (
        <div className="w-full h-full max-h-[700px]">
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-white mt-2">Loading...</span>
                </div>
            </div>
        </div>
    )
}