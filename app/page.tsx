import Image from "next/image";
import BackgroundImage from "@/public/hero-bg.2dabb17ca742c571dbb3.webp";

export default function Home() {
  return (
    <main className="relative min-h-190 overflow-hidden bg-foreground">
      <div className="absolute inset-0">
        <Image
          src={BackgroundImage}
          alt="main-background-image"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "top" }}
        />
      </div>

     
    </main>
  );
}
