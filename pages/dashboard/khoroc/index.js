import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { db } from "../../../firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import Link from "next/link";
export default function Index() {
  const [msg, setMsg] = useState("");
  const [costInfo, setCostInfo] = useState({
    category: String,
    cost: Number,
    description: String,
    date: new Date(),
  });

  const usersCollectionRef = collection(db, "khoroc");

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const responce = await addDoc(usersCollectionRef, { ...costInfo });

    setMsg("Your data successfully saved in database");
  };
  return (
    <DashboardLayout>
      <h1 className="text-center">খরচের হিসাব</h1>
      <div className="container">
        <Link href={"cost-record"} passHref>
          <a className="btn btn-info text-bolder mb-3">আগের খরচ দেখুন</a>
        </Link>
        <form onSubmit={submitHandler}>
          <div className="text-info">{msg ? msg : null}</div>
          <div className="form-group">
            <label style={{ fontSize: "20px", fontweight: "700" }}>
              ক্যটাগরি নির্বাচন করুন
            </label>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              required
              onChange={(e) =>
                setCostInfo({ ...costInfo, category: e.target.value })
              }
            >
              <option defaultValue>
                সতর্কতার সাথে খরচের ক্যটাগরি নির্বাচন করুন
              </option>
              <option value="productCost">মালামাল ক্রয়</option>
              <option value="vara">গারি ভাড়া</option>
              <option value="others">অন্যান্য খরচ</option>
            </select>
          </div>
          <div className="form-group">
            <label style={{ fontSize: "20px", fontweight: "700" }}>
              খরচের পরিমাণ
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="খরচের পরিমাণ"
              required
              onChange={(e) =>
                setCostInfo({ ...costInfo, cost: e.target.value })
              }
            ></input>
          </div>
          <div className="form-group">
            <label style={{ fontSize: "20px", fontweight: "700" }}>
              বিস্তারিত লিখুন
            </label>
            <textarea
              type="text"
              className="form-control"
              placeholder="বিস্তারিত লিখুন"
              required
              onChange={(e) =>
                setCostInfo({ ...costInfo, description: e.target.value })
              }
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={
              !costInfo.category || !costInfo.cost || !costInfo.description
            }
          >
            Save
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
