import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Pic2Plate is amazing! I love how easy it is to use and the recipes are always spot on.",
    author: "Jane Doe",
  },
  {
    quote: "A game changer for food enthusiasts. Highly recommend Pic2Plate!",
    author: "John Smith",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        What Our Users Say
      </h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardHeader>
              <p className="text-lg italic text-muted-foreground">
                &quot;{testimonial.quote}&quot;
              </p>
            </CardHeader>
            <CardContent className="text-right">
              <p className="font-semibold text-foreground">- {testimonial.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}