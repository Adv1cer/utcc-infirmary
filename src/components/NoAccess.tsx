import Link from 'next/link';

function NoAccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-4">You do not have permission to access this page.</p>
      <Link href="/Login" className="text-blue-500 underline">
        Go to Login
      </Link>
    </div>
  );
}

export default NoAccess;