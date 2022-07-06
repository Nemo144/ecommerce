import React from "react";
import { client } from "../lib/client";

import { FooterBanner, HeroBanner, Product } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log(bannerData)} */}

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
        {console.log(products)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  //to grab all the products from the sanity dashboard
  const query = "*[_type == 'product']";
  //after grabbing the products, then :
  const products = await client.fetch(query);
  console.log(products);

  //to grab all the banners from the sanity dashboard
  const bannerQuery = "*[_type == 'banner']";
  //after grabbing the banners, then :
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
