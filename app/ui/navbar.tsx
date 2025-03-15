import React from 'react';
import Link from 'next/link';
import { ClockIcon } from '@heroicons/react/24/outline';


const Navbar: React.FC = () => {
    return (
        <nav className="shadow-md fixed w-full top-0 z-10 left-0 bg-background p-0">
            <div className="container mx-auto px-8 py-6 flex justify-between items-center text-xl">
                <div className=" font-bold text-gray-300 hover:text-gray-100">
                    <Link href="/"> Pic2Plate </Link>
                </div>
                <div className="flex gap-5">
                    <Link href="/history" className="text-gray-400 hover:text-gray-200">
                        <ClockIcon className="w-8 h-8" />
                    </Link>
                    <Link href="https://github.com/DavidTimi1/Pic2Plate" target='_blank'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8 text-gray-400 hover:text-gray-200"
                        >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.332-1.755-1.332-1.755-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.805 1.305 3.49.998.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.125-.305-.535-1.54.115-3.205 0 0 1.005-.32 3.3 1.23.96-.265 1.98-.4 3-.405 1.02.005 2.04.14 3 .405 2.28-1.55 3.285-1.23 3.285-1.23.655 1.665.245 2.9.12 3.205.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.1.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .32.215.695.825.575C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
