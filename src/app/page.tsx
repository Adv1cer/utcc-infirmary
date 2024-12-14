
import Form from "@/components/Landingpage/Form/Form";
import Navbar from "@/components/Navbar/Navbar";
import Image from 'next/image';
import { Open_Sans } from "next/font/google";

const english = Open_Sans({
  subsets: ["latin"],
  weight: "400",
});
export default function Landingpage() {
  return (
    <section className={english.className}>
      <div className="relative h-screen w-screen">
        <Image
          src="/landing_bg.jpg"
          alt="UTCC Logo"
          layout="fill"
          objectFit="cover"
          className="hover:scale-110 transition-transform duration-300 opacity-100"
          style={{ filter: "brightness(40%)" }}
        />
        <Navbar />
        <div className="absolute inset-0 flex items-center justify-center">
          <Form />
        </div>
      </div>
    </section>


  );
}
