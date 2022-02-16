import Head from "next/head";
import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import Tab from ".././components/Tab";
import styles from "../styles/dashboardLayout.module.css";
export default function DashboardLayout({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  function setUser() {
    const user = localStorage.getItem("niyoty")
      ? JSON.parse(localStorage.getItem("niyoty"))
      : null;
    setUserInfo(user);
  }
  useEffect(() => {
    setUser();
  }, []);
  if (!userInfo) {
    return <Login></Login>;
  }
  return (
    <>
      <Head>
        <title>নিয়তি রকমারি স্টোর</title>
      </Head>
      <Tab></Tab>
      <main className={styles.mainContantbg}>
        <div className={styles.mainContant}>{children}</div>
      </main>
    </>
  );
}
