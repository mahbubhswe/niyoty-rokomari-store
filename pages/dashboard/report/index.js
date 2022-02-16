import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { db } from "../../../firebase";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function Index() {
  const [sellingReport, setSellingReport] = useState([]);
  const productsCollectionRef = collection(db, "selling");
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setSellingReport(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);
  return (
    <DashboardLayout>
      <h1 className="text-center">আজকের মোট হিসাব</h1>
      <div className="container">
        <h3>
          Total: {sellingReport.reduce((a, c) => a + Number(c.price), 0)} tk
        </h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Customer name</th>
              <th scope="col">Cash</th>
              <th scope="col">Due</th>
            </tr>
          </thead>
          <tbody>
            {sellingReport.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type.startsWith("c") ? item.price : 0}</td>
                <td>{item.type.startsWith("d") ? item.price : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
