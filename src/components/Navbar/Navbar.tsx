import Link from 'next/link';
import { Button } from '@mantine/core';

export default function Navbar() {
  return (
    <div className="flex justify-end p-6 relative z-10">
      <Link href="/Login" passHref>
        <Button>Login</Button>
      </Link>
    </div>
  );
}