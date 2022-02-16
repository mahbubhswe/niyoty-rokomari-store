import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { db } from "../../../firebase";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function Index() {
  const [costRecord, setCostRecord] = useState([]);
  const productsCollectionRef = collection(db, "khoroc");
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setCostRecord(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);
  return (
    <DashboardLayout>
      <h1 className="text-center">সকল খরচ</h1>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">খরচের পরিমাণ</th>
              <th scope="col">বাবদ</th>
              <th scope="col">বিবরণ</th>
              <th scope="col">তারিখ</th>
            </tr>
          </thead>
          <tbody>
            {costRecord.map((item) => (
              <tr key={item.id}>
                <td>{item.cost}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
