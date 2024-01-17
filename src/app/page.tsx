"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Snowfall from "react-snowfall";

export default function Home() {
  const { data } = useSession();
  const [showSnowfall, setShowSnowfall] = useState(false);

  useEffect(() => {
    if (data) {
      setShowSnowfall(true);
      setTimeout(() => {
        setShowSnowfall(false);
      }, 15 * 1000);
    }
  }, [data]);

  const BodyTexts = () => {
    if (data)
      return (
        <>
          <h1 className="text-4xl font-bold my-6 text-center">
            Welcome back <span>{data.profile.preferred_username}</span>
          </h1>
          <p className="text-center">
            You have been successfully authenticated.
          </p>
        </>
      );
    else
      return (
        <>
          <h1 className="text-4xl font-bold my-6 text-center">
            Welcome to Biopass
          </h1>
          <p className="text-center">
            Try clicking the Login button in the navbar.
          </p>
        </>
      );
  };

  return (
    <div className="container mx-auto px-4 mt-24">
      {showSnowfall && <Snowfall />}
      {BodyTexts()}
    </div>
  );
}
