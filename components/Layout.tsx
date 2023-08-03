import styles from "/styles/Shared.module.css";
import Header from "./Header";
import { twMerge } from "tailwind-merge";
type Props = { children: React.ReactNode, className?: string }
const Layout = (props: Props) => (
  <>
    <Header />
    <main className={twMerge(styles.container, props.className)}>{props.children}</main>
  </>
);

export default Layout;
