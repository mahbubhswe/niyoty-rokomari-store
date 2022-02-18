import React from "react";
import { useRouter } from "next/router";

import { db } from "../../firebase";
import { deleteDoc, query, where, updateDoc, doc } from "firebase/firestore";
export default function Screen({ products }) {
  const router = useRouter();

  const pay = async (price, id) => {
    let amount = prompt("Please enter your amount:");

    const userDoc = doc(db, "selling", id);
    const newFields = { price: price - Number(amount) };
    await updateDoc(userDoc, newFields);
    router.reload(window.location.pathname);
  };
  const deleteUser = async (id) => {
    if (confirm("Delete this record?") == true) {
      const userDoc = doc(db, "selling", id);
      await deleteDoc(userDoc);
    }
    router.reload(window.location.pathname);
  };
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <td>Customer Name</td>
            <td>Number</td>
            <td>Due</td>
            <td>Update</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {products
            ? products.map((x) => (
                <tr key={x.id}>
                  <td>{x.name}</td>
                  <td>{x.number}</td>
                  <td>{x.price}</td>
                  <td>
                    <button
                      onClick={() => pay(x.price, x.id)}
                      className="btn btn-primary"
                    >
                      Pay Now
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteUser(x.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
