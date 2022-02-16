import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

import DashboardLayout from "../../../components/DashboardLayout";
export default function Index() {
  // const [products, setProducts] = useState([]);
  const customers = [];
  const productsCollectionRef = collection(db, "selling");
  useEffect(() => {
    const getProducts = async () => {
      const q = query(productsCollectionRef, where("type", "==", "due"));
      const data = await getDocs(q);
      // setProducts(data.docs.map((doc) => ({ ...doc.data() })));
      data.docs.forEach((element) => {
        console.log("customers");
        console.log(customers);

        customers.push({ ...element.data(), id: element.id });
      });
    };
    getProducts();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-center">বাকির খাতা</h1>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">নাম</th>
              <th scope="col">নম্বর</th>
              <th scope="col">পণ্য</th>
              <th scope="col">বাকি</th>
              <th scope="col">তারিখ</th>
            </tr>
          </thead>
          <tbody>
            {customers
              ? customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.number}</td>
                    <td>{customer.customer}</td>
                    <td>{customer.price}</td>
                    <td>{customer.date}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
