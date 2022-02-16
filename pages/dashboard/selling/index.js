import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { db } from "../../../firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
export default function Index() {
  const [smg, setSmg] = useState("");
  const [number, setNumber] = useState();
  const [sellingInfo, setSellingInfo] = useState({
    name: String,
    number: String,
    product: String,
    type: String,
    price: Number,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const contactNumber = {
      name: sellingInfo.name,
      number: number,
      product: sellingInfo.product,
      type: sellingInfo.type,
      price: sellingInfo.price,
      date: new Date(),
    };
    const usersCollectionRef = collection(db, "selling");
    await addDoc(usersCollectionRef, { ...contactNumber });

    setSmg("Your data successfully saved in database");
  };
  return (
    <DashboardLayout>
      <h1 className="text-center">পণ্য বিক্র রেকর্ড করুন</h1>
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="text-info">{smg ? smg : null}</div>
          <div className="form-group">
            <label>Customer name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer name"
              required
              onChange={(e) =>
                setSellingInfo({ ...sellingInfo, name: e.target.value })
              }
            ></input>
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <PhoneInput
              className="form-control"
              international
              countryCallingCodeEditable={false}
              defaultCountry="BD"
              placeholder="Enter phone number"
              value={number}
              onChange={setNumber}
            />
          </div>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Product name"
              required
              onChange={(e) =>
                setSellingInfo({ ...sellingInfo, product: e.target.value })
              }
            ></input>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              required
              onChange={(e) =>
                setSellingInfo({ ...sellingInfo, type: e.target.value })
              }
            >
              <option defaultValue>Please select carefully</option>
              <option value="cash">Cash</option>
              <option value="due">Due</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="price"
              required
              onChange={(e) =>
                setSellingInfo({ ...sellingInfo, price: e.target.value })
              }
            ></input>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={
              !sellingInfo.name ||
              !sellingInfo.number ||
              !sellingInfo.product ||
              !sellingInfo.type ||
              !sellingInfo.price
            }
          >
            Sell
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
