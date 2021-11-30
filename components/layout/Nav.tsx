import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import * as Avatar from '@radix-ui/react-avatar';

export const Nav = () => {
  const { data: session } = useSession();
  return (
    <header className="text-gray-600 body-font">
      <div className="max-w-screen-2xl px-28 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="ml-3 text-xl">Epic Board</span>
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/about">
            <a className="mr-5 hover:text-gray-900">About</a>
          </Link>
        </nav>

        {session ? (
          <div className="flex items-center space-x-5">
            <button
              onClick={() => signOut()}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Logout
            </button>
            <Avatar.Root>
              <Avatar.Image
                className="w-12 h-12 rounded-full"
                src={`${session.user?.image}`}
                alt={`${session.user?.name}`}
              />
              <Avatar.Fallback delayMs={600}>You</Avatar.Fallback>
            </Avatar.Root>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};
