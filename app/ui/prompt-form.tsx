"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, Trash, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function ImageUploadForm() {
  const nextRoute = "/browse";
  const dropzoneRef = useRef<HTMLLabelElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const router = useRouter();
  const { toast } = useToast();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (files?.[0]) setImage(files[0]);
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.add("border-primary", "bg-muted");
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.remove("border-primary", "bg-muted");
    }
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    handleDragLeave(e);
    const files = e.dataTransfer.files;
    if (files?.[0]) setImage(files[0]);
  }

  function handleFileSelect() {
    fileInputRef.current?.click();
  }

  function handleRemoveImage() {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setUploadProgress(0);
  }

  async function handleBtnClick() {
    if (!image) {
      return toast({
        title: "No image selected",
        description: "Please upload an image to continue.",
        variant: "destructive",
      });
    }

    setLoading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("image", image as Blob);

    try {
      const uploadUrl = "/api/upload";
      const res = await axios.post(uploadUrl, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      });

      const { url } = res.data;
      if (url) {
        toast({
          title: "Image uploaded successfully!",
          description: "Redirecting to your recipe...",
        });
        router.push(`${nextRoute}?image=${url}`);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setUploadProgress(0);
      toast({
        title: "Upload Failed",
        description: "An error occurred while uploading your image. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 md:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="relative">
          <Button asChild variant="ghost" className="absolute top-4 right-4">
            <Link href={nextRoute}>
              Skip <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <CardTitle className="text-3xl font-bold">Upload an Image</CardTitle>
          <CardDescription>
            Take a picture of a meal and get the recipe instantly.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!image ? (
            <label
              htmlFor="file-upload"
              ref={dropzoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileSelect}
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-xl cursor-pointer transition-colors duration-300 relative aspect-video"
            >
              <UploadCloud className="h-16 w-16 text-muted-foreground" />
              <div className="mt-4 text-center">
                <p className="text-sm font-medium">
                  <span className="text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, JPEG up to 10MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                id="file-upload"
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                hidden
              />
            </label>
          ) : (
            <div className="relative aspect-video rounded-xl overflow-hidden group">
              <Image
                src={URL.createObjectURL(image)}
                alt="uploaded meal"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                <Button variant="ghost" size="icon" onClick={handleRemoveImage} className="text-white hover:bg-white/20">
                  <Trash className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          {image && (
            <Progress value={uploadProgress} className="w-full h-2 transition-all duration-300" />
          )}
          <Button
            onClick={handleBtnClick}
            disabled={!image || loading}
            className="w-full text-lg h-12 relative"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 animate-pulse" />
                <span className="text-white">Processing...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Next
                <ArrowRight className="h-5 w-5" />
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}