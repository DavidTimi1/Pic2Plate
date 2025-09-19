import Image from "next/image";

const steps = [
  {
    title: "Take a Picture",
    description: "Snap a photo of any meal that catches your eye.",
    image: "/images/step1.webp",
  },
  {
    title: "Upload & Analyze",
    description: "Our AI instantly analyzes the image to identify the dish.",
    image: "/images/step2.webp",
  },
  {
    title: "Get the Recipe",
    description: "Receive a detailed, step-by-step recipe instantly!",
    image: "/images/step3.webp",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-xl">
            <div className="relative w-48 h-48 mb-6">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-contain rounded-lg"
              />
              <div className="absolute inset-0 bg-primary opacity-20 rounded-lg blur-xl"></div>
            </div>
            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}