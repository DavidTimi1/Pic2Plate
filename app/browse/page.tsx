import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ScanImage, { LoadingPage } from "../ui/image-scan";
import { Suspense } from "react";


export default function Query(){
    const prevRoute = "/browse/upload";

    return (
        <div className="w-full h-full flex flex-col gap-5">
            
            <div className="flex items-center justify-start">
                <a href={prevRoute} className="flex items-center gap-2 hover:underline hover:underline-offset-4">
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Back</span>
                </a>
            </div>

            <Suspense fallback={<LoadingPage />}>
                <ScanImage />
            </Suspense>
        </div>
    )
    
}
