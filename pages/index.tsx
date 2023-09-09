import styles from "/styles/Shared.module.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "react-query";
import InQueue from "../components/InQueue";
import LandingPage from "../components/LandingPage";
import Header from "../components/Header";
import Layout from "../components/Layout";

const Main = () => {
  const [queryInput, setQueryInput] = useState("");
  const [isProcessingInBackground, setIsProcessingInBackground] = useState(false);
  const addToQueueMutation = useMutation(addToQueue);

  async function addToQueue(event) {
    // event.preventDefault();
    try {
      const response = await fetch("/api/queue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q: queryInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setIsProcessingInBackground(true)

      return data.result;
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      return error;
    }
  }
  return (
    <>
      <SignedIn>
        <Layout className="justify-center">
          {!isProcessingInBackground ? (
            <>
              <p className="text-text text-2xl font-bold mb-8">What would you like to learn today?</p>
              <input
                type="text"
                name="learn"
                autoComplete="off"
                // placeholder="Example: How to tie a tie"
                tabIndex={0}
                autoFocus
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className="mb-8 text-3xl border-none outline-none text-center w-fit bg-primary-200 py-2 px-4 rounded-xl"
              />
              <button
                onClick={addToQueueMutation.mutate}
                disabled={queryInput.length <= 0}
                type="button"
                className="cursor-pointer transition-all text-white bg-gradient-to-br from-secondaryAccent to-accent hover:shadow-xl hover:shadow-primary hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 disabled:opacity-50"
              >
                Generate Video
              </button>
              {addToQueueMutation.isLoading && <p>Loading...</p>}
              {/* <input type="submit" value="Generate video" /> */}
              {addToQueueMutation.data && <div className={styles.result}>{addToQueueMutation.data}</div>}
            </>
          ) : (
            <>
              <InQueue query={queryInput} setIsProcessingInBackground={setIsProcessingInBackground} />
            </>
          )}
        </Layout>

        <Footer />
      </SignedIn>
      <SignedOut>
        <LandingPage />
      </SignedOut>
    </>
  );
};

const Footer = () => (
  <footer className="flex mx-16 justify-center items-center">
    Powered by{" "}
    {/* <a
      href="https://clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
      target="_blank"
      rel="noopener"
    >
      <img src="/clerk.svg" alt="Clerk" className={styles.logo} />
    </a>
    + */}
    <a href="https://nextjs.org/" target="_blank" rel="noopener">
      <img src="/nextjs.svg" alt="Next.js" className={styles.logo} />
    </a>
  </footer>
);
export default Main;
