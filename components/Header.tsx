import styles from "/styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import UsesLeft from "./UsesLeft";

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Header = () => (
  <header className={styles.header}>
    <div className={styles.left}>
      <Link href="/" className={styles.logo}>
        {/* <Image className='fill-primary' src="/logo.svg" width="32" height="32" alt="Logo" /> */}
        <Logo />
        <span className='ml-3 font-bold text-primary'>Video GPT</span>
      </Link>
    </div>
    <div className={styles.right}>
      <SignedOut>
        <Link href="/sign-in" className='text-primary font-bold'>Sign in</Link>
      </SignedOut>
      <SignedIn>
        <UsesLeft />
        <UserButton
          userProfileMode="navigation"
          userProfileUrl="/user"
          afterSignOutUrl="/"
          afterMultiSessionSingleSignOutUrl="/"
        />
      </SignedIn>
    </div>
  </header>
);

export default Header;
