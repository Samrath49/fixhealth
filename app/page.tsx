import MainBanner from "@/components/banner";
import Consultation from "@/components/consultation";
import Header from "@/components/header";
import SeedData from "@/components/seed-data";
import TestimonialsSection from "@/components/testimonial-section";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-sky-50 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <SeedData />
      <main className="flex flex-col pt-10">
        <MainBanner />
        <TestimonialsSection />
        <Suspense fallback={<div>Loading...</div>}>
          <Consultation />
        </Suspense>
      </main>
    </div>
  );
}
