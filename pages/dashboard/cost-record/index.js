import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { db } from "../../../firebase";

import { collection, getDocs } from "firebase/firestore";

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
      <div className="container">
        <h1>সকল খরচ</h1>
        {costRecord
          ? costRecord.map((x) => (
              <div key={x.id}>
                <div className="alert alert-success text-black">
                  <strong>
                    {" "}
                    {"খরচের পরিমাণ: " +
                      x.cost +
                      "        বাবদ: " +
                      x.category +
                      "        বিস্তারিত: " +
                      x.description +
                      "        তারিখ: " +
                      x.date}
                  </strong>
                </div>
              </div>
            ))
          : null}
      </div>
    </DashboardLayout>
  );
}
