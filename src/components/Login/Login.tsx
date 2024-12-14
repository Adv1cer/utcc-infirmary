"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "@mantine/core";
import Loading from "@/components/Loading";

const english = Open_Sans({
  subsets: ["latin"],
  weight: "400",
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (session) {
      router.push("/homepage");
    }
  }, [session, status, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("อีเมล หรือ รหัสผ่านไม่ถูก", {
          duration: 2000,
        });
        return;
      }

      toast.success("กำลังเข้าสู่ระบบ", {
        duration: 2000,
      });

      router.push("/homepage");
    } catch (error) {
      console.log("Error during sign-in:", error);
      setError("An error occurred during sign-in");
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <section className={english.className}>
      <Toaster />
      <div className="grid grid-cols-5 grid-rows-5">
        <div className="flex justify-center items-center col-span-1 row-span-1">
          <Image
            src="/utcc_logo.png"
            alt="UTCC Logo"
            width={80}
            height={80}
            className="hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h1 className="grid text-white col-span-4 place-items-center text-4xl md:text-6xl text-center hover:scale-110 transition-transform duration-300">
          UTCC Infirmary
        </h1>
        <div className="bg-white grid grid-cols-1 col-span-5 row-span-4 rounded-lg max-w-lg mx-auto p-14">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center justify-center w-80">
                <div className="text-center">
                  <h3 className="text-3xl font-mono">Login</h3>
                </div>
              </div>
              <div className="w-full">
                <label className="block text-gray-700 font-mono">Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700 font-mono">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-center">
                <Button type="submit" className="w-full md:w-auto">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}