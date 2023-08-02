import styles from "/styles/Shared.module.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";

const ClerkFeatures = () => (
  <Link href="/user" className={styles.cardContent}>
    <img alt="Explore Clerk components" src="/icons/layout.svg" />
    <div>
      <h3>Explore features provided by Clerk</h3>
      <p>Interact with the user button, user profile, and more to preview what your users will see</p>
    </div>
    <div className={styles.arrow}>
      <img src="/icons/arrow-right.svg" />
    </div>
  </Link>
)

const SignupLink = () => (
  <Link href="/sign-up" className={styles.cardContent}>
    <img alt="Sign up" src="/icons/user-plus.svg" />
    <div>
      <h3>Sign up for an account</h3>
      <p>Sign up and sign in to explore all the features provided by Clerk out-of-the-box</p>
    </div>
    <div className={styles.arrow}>
      <img src="/icons/arrow-right.svg" />
    </div>
  </Link>
);

const apiSample = `
import { getAuth } from "@clerk/nextjs/server";

export default function handler(req, res) {
  const { sessionId, userId } = getAuth(req);

  if (!sessionId) {
    return res.status(401).json({ id: null });
  }
  return res.status(200).json({ id: userId });
};
`.trim();

// Main component using <SignedIn> and <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering
// depending on whether or not a visitor is signed in.
//
// https://clerk.dev/docs/component-reference/signed-in
const Main = (() => {
  const [queryInput, setQueryInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
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

      setResult(data.result);
      setQueryInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  return (

    <main className={styles.main}>
      <h1 className='text-2xl font-bold'>Welcome to VideoGPT</h1>
      <SignedIn>
        <p className='text-xl mb-2'>What would you like to learn today?</p>
      </SignedIn>
      <SignedIn>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="learn"
            // placeholder="Type something you want to learn"
            tabIndex={0}
            autoFocus
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            className="min-w-[20rem] mb-2 text-3xl"
          />
          <input type="submit" value="Generate video" />
        </form>
        <div className={styles.result}>{result}</div>
      </SignedIn>
      <SignedOut>
        <p className={styles.description}>Sign up for an account to get started</p>
      </SignedOut>

      <div className={styles.cards}>

        <SignedOut>
          <div className={styles.card}>
            <SignupLink />
          </div>
        </SignedOut>


      </div>

      <SignedIn>
        {/* <APIRequest /> */}
      </SignedIn>
    </main>
  )
});

// Footer component
const Footer = () => (
  <footer className={styles.footer}>
    Powered by{" "}
    <a
      href="https://clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
      target="_blank"
      rel="noopener"
    >
      <img src="/clerk.svg" alt="Clerk" className={styles.logo} />
    </a>
    +
    <a href="https://nextjs.org/" target="_blank" rel="noopener">
      <img src="/nextjs.svg" alt="Next.js" className={styles.logo} />
    </a>
  </footer>
);

const Home = () => (
  <div className={styles.container}>
    <Main />
    <Footer />
  </div>
);

export default Home;
