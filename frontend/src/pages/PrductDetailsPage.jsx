import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";
import { productData } from "../static/data";

const ProductDetailsPage = () => {
  const { name } = useParams();
  console.log(name);
  const [ data, setData ] = useState(null);
  const productName = name.replace(/-/g, " ");
  console.log(productName);

  // const { allProducts } = useSelector((state) => state.products);
  // const { allEvents } = useSelector((state) => state.events);
  // const { id } = useParams();
  // const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  // const eventData = searchParams.get("isEvent");

  useEffect(() => {
      const fdata = productData.find((i) => i.name === productName);
      setData(fdata);
  }, []);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
