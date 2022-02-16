import React from "react";
import { Navbar } from "responsive-navbar-react";
import "responsive-navbar-react/dist/index.css";
export default function Home() {
  const props = {
    items: [
      {
        text: "সকল",
        link: "/",
      },
      {
        text: "মোনহারি",
        link: "grocery",
      },

      {
        text: "কফি ",
        link: "coffee",
      },
      {
        text: "মেডিসিন",
        link: "medicine",
      },
      {
        text: "কস্মেটিক্স ",
        link: "cosmetics",
      },
      {
        text: "লাইব্রেরি",
        link: "library",
      },
      {
        text: "প্লাস্টিক ",
        link: "plastic",
      },
      {
        text: "পোল্ট্রি",
        link: "boyler",
      },
      {
        text: "পেট্রোল",
        link: "petrol",
      },
      {
        text: "ডিজেল ",
        link: "diesel",
      },
      {
        text: "ইলেক্ট্রনিস",
        link: "electronics",
      },
      {
        text: "কৃষি পণ্য",
        link: "agriculture",
      },
      {
        text: "ড্যাশবোর্ড",
        link: "/dashboard",
      },
    ],
    logo: {
      text: "নিয়তি রকমারি স্টোর",
    },
    style: {
      barStyles: {
        background: "#E67F2D",
      },
      sidebarStyles: {
        background: "#222",
        buttonColor: "white",
      },
    },
  };
  return <Navbar {...props} />;
}
