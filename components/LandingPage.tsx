import React from "react";
import GradientText from "./GradientText";
import Link from "next/link";
import ReactPlayer from "react-player";
import Video from "./Video";
import Header from "./Header";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <>
      <Header className='absolute'/>
    <main className="flex flex-1 gap-4 items-center justify-center min-h-screen">
      <div className="flex flex-col flex-[2] bg-background items-center justify-center min-h-screen p-8">
        <div>
          <h1 className="text-3xl">
            Create Educational Videos <GradientText>from scratch</GradientText> with AI
          </h1>
          {/* <h3 className="text-lg mb-2">Examples</h3>
          <div className="flex">
            <div className='bg-primary-200 rounded-lg p-4'>
              <p className="mb-4">How to get a job?</p>
              <Video className='overflow-hidden' url={'get-a-job.mp4'} height={'auto'} width={'20rem'}/>
            </div>
          </div> */}
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
    </>
  );
};

export default LandingPage;
