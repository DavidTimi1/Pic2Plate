
"use client";

import "@/app/ui/scan-image.css";

import { useRef, useState, useEffect } from "react";
import Input, { TextArea } from "./inputs";
import { ExclamationCircleIcon, SparklesIcon, StarIcon } from "@heroicons/react/24/outline";
import Button from "./button";
import RecipeAction from "../actions/recipe_action";
import { deduceFromImage } from "../actions/scan_action";
import { useRouter, useSearchParams } from "next/navigation";


export default function ScanImage(){
    
    // get the query parameter value of image
    const imgSrc = useSearchParams().get("image");

    const [loading, setLoading] = useState<'scanning'| false | 'generating'>(imgSrc? 'scanning': false);
    const [deduced, setDeduced] = useState<any>({});
    const [error, setError] = useState('');
    const [rerender, setRerender] = useState(false);

    // run when the component mounts initially
    // use the server action to deduce form image
    // print results form server
    useEffect(() => {
        console.log(imgSrc);
        if (!imgSrc) return;

        deduceFromImage({imageSrc: imgSrc})
            .then(res => {
                if (res.success){
                    setTimeout( 
                        () => setDeduced({...res.data, id: res.id})
                    , 1000 )

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
    }, [rerender]);
    

    return (

        <div className="w-full h-full max-h-[700px]">

            <div className="rounded-xl w-full h-full">
                {
                    imgSrc ?
                        <>
                        <img src={imgSrc} alt="" className="w-full h-full size-cover rounded-xl" />
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
                        <SparklesIcon className="w-8 h-8" />
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
            setDeduced({...deduced, details: value})
            
        } else {
            // trigger rescan image
            setLoading("scanning")
            setRerender(!rerender)
        }
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
    const ingredients = Object.keys(deduced?.["ingredients"] ?? {} )
    const router = useRouter();


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-300 bg-opacity-20">
            <form onSubmit={handleSubmit} className="absolute bg-black flex items-center justify-center flex-col rounded-t-2xl py-2 w-full bottom-0 px-3 md:px-10 max-h-[min(700px,80vh)] min-h-60 overflow-hidden">
                <div className="w-full h-5">
                    <div className="mx-auto my-1 h-1 bg-white w-16 rounded-full"></div>
                </div>
                <div className="w-full flex justify-center flex-col gap-2 overflow-y-auto flex-grow">

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
                        <TextArea label="Details"
                            rows={2}
                            placeholder="Meal name, your budget ..."
                            value={deduced.details}
                            onChange={(e) => updateDetails(e.target.value)}
                        >
                            Give more information about the meal for accurate response
                        </TextArea>

                        <div className="flex-grow overflow-y-auto gap-3">
                            <DetailSection title="Meal Name" value={deduced["name"]} />

                            <DetailSection title="Ingredients" value={ ingredients.join("\n") } />

                        </div>
                        
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

        if (!imgSrc && !deduced.details){
            showError("You must set at least a description text or upload an image");
            showLoading(false);
            return
        }

        showError('');
        showLoading('generating');

        const res = await RecipeAction({
            id: deduced.id,
            imgSrc, ingredients,
            mealName: deduced.name,
            details: deduced.details,
        })
        if (res.success){
            // navigate to view the full recipe
            router.push(`/recipe/${res.id}`);

        } else {
            showError(res.error);
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