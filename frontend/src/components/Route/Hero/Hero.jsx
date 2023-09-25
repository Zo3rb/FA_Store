import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import hero from "../../../Assests/images/hero.jpg";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] bg-cover bg-no-repeat w-full ${styles.noramlFlex}`}
      style={{
        // backgroundImage:
        //   "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
        backgroundImage: `url(${hero})`,
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#25274D] font-[600] capitalize flex place-content-center mt-14`}
        >
          Welcome To FASTORE <br /> Home Of Quality Products
        </h1>
        <p className="pt-5 text-[25px] font-[Poppins] font-[500] text-[#05386B]">
          Step into the realm of excellence at FASTORE, where a curated selection of 
          top-tier products awaits. Our commitment to quality knows no bounds, making 
          us your ultimate destination for premium goods. Welcome to the Home of Quality 
          Products – Your shopping journey begins here. 
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-10 mb-10`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
