"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

const Navbar = () => {
  const { data } = useSession();
  useEffect(() => {
    console.log(data);
  }, [data]);

  const buttonText = () => {
    if (typeof data === "undefined") return "waiting...";
    else if (data) return "Sign out";
    return "Login";
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Biopass</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link legacyBehavior href="/">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
              Home
            </a>
          </Link>
          <Link legacyBehavior href="/">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
              Blog
            </a>
          </Link>
          <Link legacyBehavior href="/">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
              Shop
            </a>
          </Link>
          <Link legacyBehavior href="/">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300">
              Docs
            </a>
          </Link>
        </div>
        <div>
          <button
            onClick={() => {
              if (typeof data === "undefined") return;
              else if (!data) signIn("biopass");
              else signOut();
            }}
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
          >
            {buttonText()}{" "}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
