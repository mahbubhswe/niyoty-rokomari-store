import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import p3 from "../public/img/p3.jpg";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Slider.module.css";
export default function Slider() {
  return (
    <>
      <Carousel
        showThumbs={false}
        infiniteLoop="true"
        autoPlay="true"
        autoFocus="true"
      >
        <div>
          <Image src={p3} alt="Picture of the author" quality={100} />
          <div
            className={styles.textBlock}
            data-aos="flip-down"
            data-aos-offset="-40"
            data-aos-delay="30"
            data-aos-duration="1600"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            <div className={styles.container}>
              প্রয়োজনীয় সব কিনাকাটা হবে এখান থেকেই, হাতের নাগালে ও খুব সহজেই!
            </div>
            <Link href="#items" passHref>
              <a className={styles.btn}>শুরু করুন এখনি!</a>
            </Link>
          </div>
        </div>
        <div>
          <Image src={p3} alt="Picture of the author" quality={100} />
          <div
            className={styles.textBlock}
            data-aos="flip-down"
            data-aos-offset="-40"
            data-aos-delay="30"
            data-aos-duration="1600"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            <div className={styles.container}>
              অনলাইনে কিনাকাটা একদম সহজ! আর দেরি কেন?{" "}
            </div>
            <Link href="#items" passHref>
              <a className={styles.btn}>শুরু করুন এখনি!</a>
            </Link>
          </div>
        </div>
      </Carousel>
      <section id="items"></section>
    </>
  );
}
