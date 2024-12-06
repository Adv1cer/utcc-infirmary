import Form from "@/components/Landingpage/Form/Form";
import Image from 'next/image';
export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <Image
        src="/landing_bg.jpg"
        alt="UTCC Logo"
        layout="fill"
        objectFit="cover"
        className="hover:scale-110 transition-transform duration-300 opacity-60"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Form />
      </div>
    </div>
  );
}
