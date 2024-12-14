"use client";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loading from "@/components/Loading";
import NoAccess from "@/components/NoAccess";

export default function Homepage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return; 
    }

    if (!session) {
      router.push("/Login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return <NoAccess />;
  }

  return (
    <div>
      <Image
        src="/landing_bg.jpg"
        alt="UTCC Logo"
        layout="fill"
        objectFit="cover"
        className="opacity-100"
        style={{ filter: "brightness(40%)" }}
      />
      <Navbar />
      {/* Your page content here */}
    </div>
  );
}