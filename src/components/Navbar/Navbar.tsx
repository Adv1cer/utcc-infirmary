"use client";

import React from "react";
import Link from "next/link";
import { Button } from '@mantine/core';
import { signOut, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.error("Logging out... You are being signed out.", {
      duration: 5000,
    });

    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="flex justify-end p-6 relative z-10">
      <Toaster />
      <ul className="flex space-x-4 ml-auto mx-10">
        {!session ? (
          <li>
            <Link
              href="/Login"
              className="text-2xl px-2 py-2 no-underline hover:underline"
            >
              Login
            </Link>
          </li>
        ) : (
          <li>
            <Button
              variant="destructive"
              onClick={handleSignOut}
              className=" "
            >
              Logout
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
}