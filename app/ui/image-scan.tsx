"use client";

import "@/app/ui/scan-image.css";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, InfoIcon, Loader2 } from "lucide-react";
import { CldImage } from "next-cloudinary";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { deduceFromImage } from "@/app/actions/scan_action";
import RecipeAction from "@/app/actions/recipe_action";
import { IngredientLocation } from "@/lib/definitions";

import ImagePlacer from "./image-placer";
import { Badge } from "../components/ui/badge";

interface DeducedInfo {
    name: string;
    details: string;
    ingredients: IngredientLocation;
}

export default function ScanImage() {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const imgSrc = searchParams.get("image");
    const query = searchParams.get("description");

    const [deduced, setDeduced] = useState<DeducedInfo | undefined>(undefined);
    const [loading, setLoading] = useState<'scanning' | false | 'generating'>(imgSrc ? 'scanning' : false);
    const [deducedDetails, setDeducedDetails] = useState(query ?? '');
    const [scanError, setScanError] = useState('');
    
    useEffect(() => {
        if (!imgSrc) {
            toast({
                title: "No image selected",
                description: "Please go back and upload an image.",
                variant: "destructive",
            });
            return;
        }

        processImageScan();

    }, [imgSrc]);

    const handleGenerateRecipe = async () => {
        setLoading('generating');
        const tmpFile = window.location.hash.slice(1);
        const ingredients = Object.keys(deduced?.ingredients ?? {});

        if ((!imgSrc && !deducedDetails) || !deduced) {
            toast({
                title: "Incomplete Information",
                description: "You must provide a description or upload an image.",
                variant: "destructive",
            });
            setLoading(false);
            return;
        }

        try {
            const res = await RecipeAction({
                imgSrc,
                ingredients,
                tmpFile,
                mealName: deduced.name,
                details: deducedDetails,
            });

            if (res.success) {
                toast({
                    title: "Recipe Generated!",
                    description: "Redirecting you to the full recipe...",
                });
                router.push(`/recipe/${res.id}`);
            } else {
                toast({
                    title: "Recipe Generation Failed",
                    description: res.error || "An unknown error occurred.",
                    variant: "destructive",
                });
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Recipe Generation Failed",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <ImageDisplay
                    imgSrc={imgSrc}
                    loading={loading}
                    deduced={deduced}
                    scanError={scanError}
                />
                <DetailsPanel
                    deduced={deduced}
                    deducedDetails={deducedDetails}
                    setDeducedDetails={setDeducedDetails}
                    loading={loading}
                    handleGenerateRecipe={handleGenerateRecipe}
                    scanError={scanError}
                    onRetry={processImageScan}
                />
            </div>
        </div>
    );

    function processImageScan(){
        const tmpFile = window.location.hash.slice(1);

        setLoading('scanning');
        setScanError('');

        deduceFromImage({ imageSrc: imgSrc, tmpSrc: tmpFile })
            .then(res => {
                if (res.success && res.data) {
                    setTimeout(() => {
                        setDeduced({ ...res.data, details: '' });
                    }, 1000);
                } else {
                    setScanError(res.error || "An unknown error occurred during scanning.");
                    toast({
                        title: "Scanning Failed",
                        description: res.error || "An unknown error occurred.",
                        variant: "destructive",
                    });
                }
            })
            .catch(error => {
                console.error(error);
                setScanError("Failed to scan image. Please try again.");
                toast({
                    title: "Scanning Failed",
                    description: "Failed to scan image. Please try again.",
                    variant: "destructive",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }
}

// Separate components for better organization

// Renders the image and its overlay
function ImageDisplay({ imgSrc, loading, deduced, scanError }: {
    imgSrc: string | null;
    loading: 'scanning' | false | 'generating';
    deduced: DeducedInfo | undefined;
    scanError: string;
}) {
    return (
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            {imgSrc && !scanError ? (
                <>
                    <CldImage
                        alt="Scanned meal"
                        src={imgSrc}
                        width="800"
                        height="600"
                        crop={{ type: 'auto', source: true }}
                        className="w-full h-full object-cover"
                    />
                    {loading === "scanning" && (
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center p-8">
                            <div className="w-full h-2 absolute bg-primary blur-sm top-0 left-0 scan-beam"></div>
                            <div className="text-center">
                                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                                <p className="mt-2 text-white text-lg font-semibold">Scanning image...</p>
                            </div>
                        </div>
                    )}
                    {deduced && (
                        <ImagePlacer 
                            ingredients={deduced.ingredients}
                            mealName={deduced.name}
                        />
                    )}
                </>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-muted/50 p-8 text-center">
                    <InfoIcon className="h-16 w-16 text-muted-foreground" />
                    <p className="mt-4 text-xl text-muted-foreground">
                        {scanError || "No Image selected"}
                    </p>
                </div>
            )}
        </div>
    );
}

// Renders the input fields and buttons
function DetailsPanel({ deduced, deducedDetails, setDeducedDetails, loading, handleGenerateRecipe, scanError, onRetry }: {
    deduced: DeducedInfo | undefined;
    deducedDetails: string;
    setDeducedDetails: (value: string) => void;
    loading: 'scanning' | false | 'generating';
    handleGenerateRecipe: () => void;
    scanError: string;
    onRetry: () => void;
}) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                {scanError ? (
                    <>
                        <CardTitle className="text-3xl text-destructive">Scan Failed</CardTitle>
                        <CardDescription className="text-destructive">{scanError}</CardDescription>
                        <Button onClick={onRetry} className="mt-4">
                            Try Again
                        </Button>
                    </>
                ) : (
                    <>
                        <CardTitle className="text-3xl font-bold">
                            {deduced?.name || "Enter Meal Details"}
                        </CardTitle>
                        <CardDescription>
                            Review the details and add more information for a more accurate recipe.
                        </CardDescription>
                    </>
                )}
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-6 overflow-y-auto">
                <Textarea
                    placeholder="E.g., Low-carb, gluten-free, ready in 30 minutes, etc."
                    value={deducedDetails}
                    onChange={(e) => setDeducedDetails(e.target.value)}
                    rows={4}
                    className="flex-grow resize-none"
                    disabled={loading !== false || !!scanError}
                />
                {deduced?.ingredients && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Deduced Ingredients:</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(deduced.ingredients).map((ingredient, index) => (
                                <Badge key={index} variant="secondary">
                                    {ingredient}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleGenerateRecipe}
                    disabled={loading !== false || !!scanError}
                    className="w-full h-12 text-lg"
                >
                    {loading === 'generating' ? (
                        <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Preparing Recipe...
                        </>
                    ) : (
                        <>
                            Prepare Recipe
                            <Sparkles className="h-5 w-5 ml-2" />
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}