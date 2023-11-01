import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Newsletter } from "@/components/Newsletter";
import { Welcome } from "@/components/welcome";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between py-7">
      <Welcome />
      <Hero />
      <Mission />
      <Newsletter />
    </main>
  );
}
