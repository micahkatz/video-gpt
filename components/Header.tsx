import styles from "/styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import UsesLeft from "./UsesLeft";
import { twMerge } from "tailwind-merge";
import { MdKey } from "react-icons/md";
 'react-icons/fi'

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
type Props = {
  className?: string;
}
const Header = (props: Props) => (
  <header className={twMerge(styles.header, props.className)}>
    <div className={styles.left}>
      <Link href="/" className={styles.logo}>
        {/* <Image className='fill-primary' src="/logo.svg" width="32" height="32" alt="Logo" /> */}
        <Logo />
        <span className="ml-3 font-bold text-primary">Scratch AI</span>
      </Link>
    </div>
    <div className={styles.right}>
      <SignedOut>{/* <Link href="/sign-in" className='text-primary font-bold'>Sign in</Link> */}</SignedOut>
      <SignedIn>
        {/* <UsesLeft /> */}
        <Link href="/user/apikeys">
          <MdKey size={25} color={"#5b2786"} />
        </Link>
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
