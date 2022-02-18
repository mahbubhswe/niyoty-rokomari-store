import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import NotFound from "../../../components/NotFound";
import styles from "../../../styles/store.module.css";
import { db } from "../../../firebase";
import {
  collection,
  updateDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import DashboardLayout from "../../../components/DashboardLayout";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

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
    router.reload(window.location.pathname);
  };
  const updateProduct = async (item) => {
    let a, b, c;
    a = prompt("Enter new price:");
    b = prompt("Unit based on price:");
    c = prompt("Stock:");

    const userDoc = doc(db, "products", item.id);
    const newFields = {
      price: a ? Number(a) : item.price,
      unit: b ? b : item.unit,
      qty: c ? Number(c) : item.qty,
    };
    if (confirm("Do you want to update?") == true) {
      await updateDoc(userDoc, newFields);
      router.reload(window.location.pathname);
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
                  onClick={() => updateProduct(item)}
                  type="button"
                  className="btn btn-primary mr-5"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteProduct(item.id)}
                  type="button"
                  className="btn btn-danger"
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
