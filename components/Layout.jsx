import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { Store } from "../utils/Store";
import Footer from "./Footer";

export default function Layout({ pageTitle, children }) {
  const { state } = useContext(Store);
  const value = state.cart.cartItems.length;

  return (
    <>
      <Head>
        <title>
          {pageTitle
            ? pageTitle + " | নিয়তি রকমারি স্টোর"
            : "স্বাগতম নিয়তি রকমারি স্টোর"}
        </title>
      </Head>
      <marquee behavior="scroll" direction="left" width="80%">
        নিয়তি রকমারি স্টোর প্রোপাইটরঃ এ এস এম আলমগির হোসেন । মোবাইলঃ ০১৯৬৯০৯৬৯৭১
        । এখানে মোনহারি, ইলেক্ট্রনিস, মেডিসিন, কস্মেটিক্স , লাইব্রেরি, প্লাস্টিক
        , পোল্ট্রি, পেট্রোল , ডিজেল , সার -বিষ, কীটনাশক, কফি সহ যাবতীয় মালামাল
        পাইকারি ও খুচরা বিক্রয় করা হয়। তাছাড়া এখানে কম্পিটাররের যাবতীয় কাজ করা
        হয় । বিঃদ্রঃ এখানে বিকাশ ,নগদ, রকেট ও রিচারজ এর সুবিধা রয়েছে এবং
        বিদ্যুৎবিল নেয়া হয়।
      </marquee>
      <Navbar></Navbar>
      <Slider></Slider>
      <main style={{ width: "98%", margin: "auto" }}>
        <h1 className="text-center mt-5">
          নিচে সকল পণ্য দেখানো হয়েছে।
          <Link href="/cart" passHref>
            <a
              style={{ color: "#F9B12D" }}
              className="fas fa-shopping-cart"
            ></a>
          </Link>
          <sup style={{ color: "#F9B12D" }}>{value ? value : 0}</sup>
        </h1>
        {children}
      </main>
      <Footer></Footer>
    </>
  );
}
