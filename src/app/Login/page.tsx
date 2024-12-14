
import Image from "next/image"
import Navbar from "@/components/Navbar/Navbar"
import Login from "@/components/Login/Login"
export default function Loginpage() {
    return (
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
          <Login />
        </div>
      </div>
    )
}