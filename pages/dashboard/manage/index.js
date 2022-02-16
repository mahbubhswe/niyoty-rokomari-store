import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import NotFound from "../../../components/NotFound";
import styles from "../../../styles/store.module.css";
import { db } from "../../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import DashboardLayout from "../../../components/DashboardLayout";
import Link from "next/link";
import { Store } from "../../../utils/Store";

export default function Home() {
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);
  const deleteProduct = async (id) => {
    const userDoc = doc(db, "products", id);

    if (confirm("ডাটাবেজ থেকে পণ্যটি মুঝে যাবে?") == true) {
      await deleteDoc(userDoc);
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className="w-100 text-center">পণ্য মেনেজ করুন</h1>
        {products ? (
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
                  <p>
                    <strong>স্টকে আছে: </strong>
                    {item.qty}
                  </p>
                </div>

                <button
                  onClick={() => deleteProduct(item.id)}
                  type="button"
                  className={styles.btn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <NotFound></NotFound>
        )}
      </div>
    </DashboardLayout>
  );
}
