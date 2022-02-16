import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import NotFound from "../../components/NotFound";
import Layout from "../../components/Layout";
import styles from "../../styles/store.module.css";
import { Store } from "../../utils/Store";

import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
export default function Home() {
  const { dispatch } = useContext(Store);
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      const q = query(
        productsCollectionRef,
        where("category", "==", "medicine")
      );
      const data = await getDocs(q);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);
  return (
    <Layout pageTitle={"মেডিসিন"}>
      <div className={styles.container}>
        {products.length != 0 ? (
          products.map((item) => (
            <div key={item.id} className={styles.item}>
              <div>
                <Image
                  src={item.img}
                  height={220}
                  width={280}
                  alt="Picture of the author"
                />
              </div>
              <div>
                <div className={styles.productInfo}>
                  <p>
                    <strong>দাম: ৳</strong>
                    {item.price}
                  </p>
                  <p>
                    <strong>পরিমাণ: </strong>
                    {item.unit}
                  </p>
                </div>
                <button
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", payload: item })
                  }
                  type="button"
                  className={styles.btn}
                >
                  বেগে রাখুন
                </button>
              </div>
            </div>
          ))
        ) : (
          <NotFound></NotFound>
        )}
      </div>
    </Layout>
  );
}
