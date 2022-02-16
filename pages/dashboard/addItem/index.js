import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import FileBase64 from "react-file-base64";
import { db } from "../../../firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
export default function Index() {
  const [msg, setMsg] = useState("");
  const [productInfo, setProductInfo] = useState({
    name: String,
    category: String,
    price: Number,
    unit: String,
    qty: Number,
    img: String,
    date: new Date(),
  });

  const usersCollectionRef = collection(db, "products");

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const responce = await addDoc(usersCollectionRef, { ...productInfo });

    setMsg("Your data successfully saved in database");
  };
  return (
    <DashboardLayout>
      <h1 className="text-center">নতুন পণ্য যুক্ত করুন</h1>
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="text-info">{msg ? msg : null}</div>

          <div className="form-group">
            <FileBase64
              onDone={(e) => setProductInfo({ ...productInfo, img: e.base64 })}
            />
          </div>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              required
              onChange={(e) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
            ></input>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              required
              onChange={(e) =>
                setProductInfo({ ...productInfo, category: e.target.value })
              }
            >
              <option defaultValue>Please select carefully</option>
              <option value="grocery">মোনহারি</option>
              <option value="electronics">ইলেক্ট্রনিস</option>
              <option value="medicine">মেডিসিন</option>
              <option value="cosmetics">কস্মেটিক্স</option>
              <option value="library">লাইব্রেরি</option>
              <option value="plastic">প্লাস্টিক</option>
              <option value="boyler">পোল্ট্রি</option>
              <option value="petrol">পেট্রোল</option>
              <option value="diesel">ডিজেল</option>
              <option value="coffee">কফি</option>
              <option value="agriculture">কৃষি পণ্য</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              required
              onChange={(e) =>
                setProductInfo({ ...productInfo, price: e.target.value })
              }
            ></input>
          </div>
          <div className="form-group">
            <label>Unit based on price</label>
            <input
              type="text"
              className="form-control"
              placeholder="Unit based on price"
              required
              onChange={(e) =>
                setProductInfo({ ...productInfo, unit: e.target.value })
              }
            ></input>
          </div>
          <div className="form-group">
            <label>Total Quantity</label>
            <input
              type="number"
              className="form-control"
              placeholder="Quantity"
              required
              onChange={(e) =>
                setProductInfo({ ...productInfo, qty: e.target.value })
              }
            ></input>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={
              !productInfo.name ||
              !productInfo.category ||
              !productInfo.price ||
              !productInfo.qty ||
              !productInfo.img
            }
          >
            Add to Store
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
