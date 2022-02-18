import React, { useEffect, useState } from "react";

import { db } from "../firebase";
import { query, where, collection, getDocs } from "firebase/firestore";
export default function TodayReport() {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

  const [totalSell, setTotalSell] = useState([]);
  const [due, setDue] = useState([]);
  const [cash, setCash] = useState([]);
  const productsCollectionRef = collection(db, "selling");
  useEffect(() => {
    const getSellingInfo = async () => {
      const q = query(productsCollectionRef, where("date", "==", date));
      const data = await getDocs(q);
      setTotalSell(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getDue = async () => {
      const q = query(
        productsCollectionRef,
        where("type", "==", "due"),
        where("date", "==", date)
      );

      const data = await getDocs(q);
      setDue(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getCash = async () => {
      const q = query(
        productsCollectionRef,
        where("type", "==", "cash"),
        where("date", "==", date)
      );
      const data = await getDocs(q);
      setCash(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getSellingInfo();
    getDue();
    getCash();
  });
  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        textAlign: "center",
        padding: "5px",
        fontSize: "21px",
        fontWeight: "800",
        marginTop: "5px",
        color: "white",
        borderRadius: "5px",
        boxShadow: "0 1px 4px 0 rgb(0 0 0 / 50%)",
      }}
    >
      আজকের মোট বিক্রি: {totalSell.reduce((a, c) => a + Number(c.price), 0)}{" "}
      টাকা, নগদ: {cash.reduce((a, c) => a + Number(c.price), 0)} এবং বাকি:{" "}
      {due.reduce((a, c) => a + Number(c.price), 0)}{" "}
    </div>
  );
}
