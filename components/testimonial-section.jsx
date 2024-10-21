import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "@/constants";

export default function TestimonialsSection() {
  return (
    <div className="min-w-screen bg-background min-h-screen flex justify-center">
      <div className="w-full bg-card border-t border-b border-border px-5 py-16 md:py-24 text-foreground">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Heart Warming</span>
              <br />
              <span className="text-sky-500">Patient Tales</span>
            </h2>
            <h3 className="text-xl mb-5 font-light">
              <span className="text-sky-500">Fixing Health</span> patient
              testimonies.
            </h3>
          </div>
          <div className="-mx-3 md:flex items-start">
            {[0, 1, 2].map((columnIndex) => (
              <div key={columnIndex} className="px-3 md:w-1/3">
                {testimonials
                  .slice(columnIndex * 2, columnIndex * 2 + 2)
                  .map((testimonial, index) => (
                    <Card
                      key={index}
                      className="w-full mx-auto rounded-lg bg-card border border-border p-5 text-foreground font-light mb-6"
                    >
                      <div className="w-full flex mb-4 items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow pl-3">
                          <h6 className="font-bold text-sm uppercase text-foreground">
                            {testimonial.name}
                          </h6>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-sm leading-tight">
                          <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                            &quot;
                          </span>
                          {testimonial.content}
                          <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                            &quot;
                          </span>
                        </p>
                      </div>
                    </Card>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
