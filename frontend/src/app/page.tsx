import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import Testimonial from "@/components/Testimonial";
import { Welcome } from "@/components/Welcome";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between py-7">
      <Welcome />
      <Hero />
      <Mission />
      <Testimonial />
    </main>
  );
}
