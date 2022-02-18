import DashboardLayout from "../../../components/DashboardLayout";
import React, { useEffect, useState } from "react";

import { db } from "../../../firebase";
import { collection, query, where, updateDoc,doc } from "firebase/firestore";
import Screen from "../screen";
export default function Index() {
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "selling");

  useEffect(() => {
    const getProducts = async () => {
      const q = query(productsCollectionRef, where("type", "==", "due"));
      const data = await getDocs(q);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);
  return (
    <DashboardLayout>
      <div className="container">
        <h1 className="text-center">বাকির খাতা</h1>
        <Screen products={products}></Screen>
      </div>
    </DashboardLayout>
  );
}
