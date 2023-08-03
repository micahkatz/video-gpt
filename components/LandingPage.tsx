import React from "react";
import GradientText from "./GradientText";
import Link from "next/link";

type Props = {};

const LandingPage = (props: Props) => {
  return (

    <main className="flex flex-1 gap-4 items-center justify-center min-h-screen">
      <div className="flex flex-[2] bg-background items-center justify-center min-h-screen">
        <h1 className="text-3xl">Create Educational Videos <GradientText>from scratch</GradientText> with AI</h1>
      </div>
      <div className="flex flex-1 flex-col bg-primary-600 items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-8">Get Started</h1>
        <div className='flex gap-2 items-center'>
        <Link href="/sign-in" className='text-primary bg-background py-2 px-4 rounded-lg'>Sign in</Link>
        <span className="text-primary-50">or</span>
        <Link href="/sign-up" className='text-white bg-primary-950 py-2 px-4 rounded-lg'>Sign up</Link>
        </div>

      </div>
    </main>
  );
};

export default LandingPage;
