import React from "react";
import GradientText from "./GradientText";
import Link from "next/link";
import ReactPlayer from "react-player";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <main className="flex flex-1 gap-4 items-center justify-center min-h-screen">
      <div className="flex flex-col flex-[2] bg-background items-center justify-center min-h-screen p-8">
        <div>
          <h1 className="text-3xl mb-8">
            Create Educational Videos <GradientText>from scratch</GradientText> with AI
          </h1>
          {/* <h3 className="text-xl">Examples</h3> */}
          <div className="grid grid-cols-2">
            <div>
              <p className="mb-2">How to tie a tie?</p>
              <ReactPlayer url={'https://video-gpt-results.s3.amazonaws.com/055c50f0-63d5-4455-9e6e-5231d9c72717.mp4 '} controls height={'12rem'} width={'20rem'}/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-primary-600 items-center justify-center min-h-screen p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Get Started</h1>
        <div className="flex gap-2 items-center">
          <Link href="/sign-in" className="text-primary bg-background py-2 px-4 rounded-lg">
            Sign in
          </Link>
          <span className="text-primary-50">or</span>
          <Link href="/sign-up" className="text-white bg-primary-950 py-2 px-4 rounded-lg">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
