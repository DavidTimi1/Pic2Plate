import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Browse | Pic2Plate",
  description: "Upload an Image and Get the recipe",
};


export default function UploadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
        {children}
    </div>
  );
}
