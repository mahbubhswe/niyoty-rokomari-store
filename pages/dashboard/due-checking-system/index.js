import DashboardLayout from "../../../components/DashboardLayout";
import React, { useEffect, useState } from "react";

import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
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
        <h1>বাকির খাতা</h1>
        {products
          ? products.map((x) => (
              <div key={x.id}>
                <div className="alert alert-success text-black">
                  <strong>
                    {" "}
                    {"নাম: " +
                      x.name +
                      "     নম্বর: " +
                      x.number +
                      "     পণ্য: " +
                      x.product +
                      "     বাকি: " +
                      x.price}
                  </strong>
                </div>
              </div>
            ))
          : null}
      </div>
    </DashboardLayout>
  );
}
