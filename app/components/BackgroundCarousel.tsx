import Image from 'next/image';
import { cn } from '@/lib/utils';


const images = [
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
    '/images/Jollof-Rice-With-Chicken.jpg',
    '/images/plantain-and-ewa-agoyin.jpg',
    '/images/spaghetti-bolognese.jpg',
];

export const BackgroundCarousel = () => {
    // Divide the images into 3, 4, or 5 columns based on screen size
    const getColumns = () => {
        // Logic for dividing images into columns
        const numColumns = {
            mobile: 3,
            tablet: 4, // 720px screens
            desktop: 5, // larger screens
        };

        const mobileColumns = new Array(numColumns.mobile).fill(null).map((_, i) =>
            images.filter((_, index) => index % numColumns.mobile === i)
        );
        const tabletColumns = new Array(numColumns.tablet).fill(null).map((_, i) =>
            images.filter((_, index) => index % numColumns.tablet === i)
        );
        const desktopColumns = new Array(numColumns.desktop).fill(null).map((_, i) =>
            images.filter((_, index) => index % numColumns.desktop === i)
        );

        return {
            mobile: mobileColumns,
            tablet: tabletColumns,
            desktop: desktopColumns,
        };
    };

    const columns = getColumns();

    return (
        <div className="w-full absolute top-0 left-0 h-screen overflow-hidden p-0 -z-10 pointer-events-none">
            <div
                className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-3 h-full"
            >
                {/* Render columns based on screen size */}
                {columns.desktop.map((colImages, index) => (
                    <div key={index} className="hidden lg:block">
                        <Column images={colImages} direction={index % 2 === 0 ? 'up' : 'down'} />
                    </div>
                ))}
                {columns.tablet.map((colImages, index) => (
                    <div key={index} className="hidden md:block lg:hidden">
                        <Column images={colImages} direction={index % 2 === 0 ? 'up' : 'down'} />
                    </div>
                ))}
                {columns.mobile.map((colImages, index) => (
                    <div key={index} className="block md:hidden">
                        <Column images={colImages} direction={index % 2 === 0 ? 'up' : 'down'} />
                    </div>
                ))}
            </div>
            <div className="absolute w-full h-screen top-0 left-0 bg-black/50"></div>

        </div>
    );
};



interface ColumnProps {
    images: string[];
    direction: 'up' | 'down';
}

export const Column = ({ images, direction }: ColumnProps) => {
    // Duplicate the images to create an infinite loop effect
    const duplicatedImages = [...images, ...images];

    return (
        <div
            className={cn(
                "flex flex-col gap-4 overflow-hidden",
                direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'
            )}
            style={{ animationDuration: "10000ms" }}
        >
            {duplicatedImages.map((src, index) => (
                <ImageCard key={index} src={src} alt={`Image ${index + 1}`} />
            ))}
        </div>
    );
};



interface ImageCardProps {
    src: string;
    alt: string;
}

export const ImageCard = ({ src, alt }: ImageCardProps) => {
    return (
        <div className="relative w-full h-80 overflow-hidden rounded-2xl">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
        </div>
    );
};