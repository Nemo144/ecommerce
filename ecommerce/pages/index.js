import React from "react";
import { client } from "../lib/client";

import { FooterBanner, HeroBanner, Product } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((product) => product.name)}
      </div>
      <FooterBanner />
    </>
  );
};

export const getServerSideProps = async () => {
  //to grab all the products from the sanity dashboard
  const query = "*[__type == 'Product']";
  //after grabbing the products, then :
  const products = await client.fetch(query);

  //to grab all the banners from the sanity dashboard
  const bannerquery = "*[__type == 'banner']";
  //after grabbing the banners, then :
  const bannerData = await client.fetch(bannerquery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
