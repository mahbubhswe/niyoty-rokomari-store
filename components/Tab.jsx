import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/tab.module.css";
export default function Tab() {
  const router = useRouter();

  const logout = () => {
    if (confirm("Do you want to logout?") == true) {
      localStorage.removeItem("niyoty");
      router.push("dashboard/login");
    }
  };
  return (
    <>
      <header>
        <nav className={styles.navBar}>
          <Link href="/dashboard/addItem" passHref>
            <a className={styles.navItems}>নতুন পণ্য যুক্ত</a>
          </Link>
          <Link href="/dashboard/selling" passHref>
            <a className={styles.navItems}>বিক্রি</a>
          </Link>
          <Link href="/dashboard/due-checking-system" passHref>
            <a className={styles.navItems}>বাকির খাতা</a>
          </Link>
          <Link href="/dashboard/report" passHref>
            <a className={styles.navItems}>আজকের বেচা-কেনা</a>
          </Link>
          <Link href="/dashboard/check-order" passHref>
            <a className={styles.navItems}>অর্ডার দেখুন</a>
          </Link>
          <Link href="/dashboard/manage" passHref>
            <a className={styles.navItems}>পণ্য মেনেজ করুন</a>
          </Link>
          <Link href="/dashboard/khoroc" passHref>
            <a className={styles.navItems}>দৈনিক খরচ</a>
          </Link>
          <Link href="/" passHref>
            <a className={styles.navItems}>হোম পেইজে যান</a>
          </Link>

          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </nav>
      </header>
    </>
  );
}
