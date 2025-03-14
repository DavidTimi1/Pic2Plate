import Image from "next/image";
import LinkAsButton from "./ui/links";

export default function Home() {
  return (

    <div className="w-full h-full" >
      <div className="w-full h-screen absolute top-0 left-0 bg-no-repeat bg-cover bg-center blur-lg brightness-50" style={{backgroundImage: "url(/images/hero.webp)"}}>
      </div>


      <main className="flex flex-col h-screen justify-center md:flex-row items-center w-full p-10 gap-10">
        <div className="w-full">
          <Image
            src="/images/hero.webp"
            alt="Delicious meal"
            width={500}
            height={300}
            className="rounded-lg shadow-lg max-w-full"
          />
        </div>
        
        <div className="flex flex-col gap-5 items-center md:justify-start p-4 w-full ">
          <header className="text-center my-8">
            <h1 className="text-5xl font-bold">Pic2Plate</h1>
            <p className="text-xl text-gray-300 mt-4">Take a picture of your meal and get the recipe instantly!</p>
          </header>

          <div className="w-full flex flex-col sm:flex-col gap-5 max-w-xl">
            <LinkAsButton href={"/browse/upload"} className="w-full text-white shadow-md">
              Upload Picture
            </LinkAsButton>

            <LinkAsButton href="/browse" deEmphasize className="w-full text-white shadow-md">
              Generate Recipe from text
            </LinkAsButton>
          </div>
        </div>

      </main>

      <section className="my-12 min-h-screen p-10 w-full">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="flex flex-col justify-center items-center mt-8 gap-5 w-full md:w-2/3 mx-auto">
          <div className="w-full flex flex-col gap-3 flex-shrink-0 items-center md:flex-row p-4">
            <Image
              src="/images/step1.webp"
              alt="Step 1"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <div className="flex-shrink-0">
              <h3 className="text-xl font-semibold text-center mt-4">Step 1</h3>
              <p className="text-center text-gray-400">Take a picture of your meal.</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 items-center md:flex-row-reverse p-4">
            <Image
              src="/images/step2.webp"
              alt="Step 2"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <div className="flex-shrink-0">
            <h3 className="text-xl font-semibold text-center mt-4">Step 2</h3>
            <p className="text-center text-gray-400">Upload the picture to our website.</p>
            </div>
          </div>
          <div className="w-full flex flex-col flex-shrink-0 gap-3 items-center md:flex-row p-4">
            <Image
              src="/images/step3.webp"
              alt="Step 3"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
            
            <div className="flex-shrink-0">
            <h3 className="text-xl font-semibold text-center mt-4">Step 3</h3>
            <p className="text-center text-gray-400">Get the recipe instantly!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-12 p-10">
        <h2 className="text-3xl font-bold text-center">Testimonials</h2>
        <div className="flex flex-wrap justify-center mt-8">
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-400">"Pic2Plate is amazing! I love how easy it is to use and the recipes are always spot on."</p>
              <p className="text-right text-gray-800 font-semibold mt-4">- Jane Doe</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-400">"A game changer for food enthusiasts. Highly recommend Pic2Plate!"</p>
              <p className="text-right text-gray-800 font-semibold mt-4">- John Smith</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center mt-12 flex flex-col">
        <p className="text-gray-400"> &copy; {new Date().getFullYear()} Pic2Plate. All rights reserved. </p>
        <span> Made with <a href={githubLink} target="_blank" className="text-pink-800 text-lg underline hover:text-gray-200"> ❤ by TimiDev </a> </span>
       
      </footer>
    </div>
  );
}



const githubLink = "https://github.com/DavidTimi1"