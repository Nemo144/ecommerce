//slug; the unique identifier that belongs to each products
import React from "react";
import { urlFor, client } from "../../lib/client";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";

const ProductDetails = ({
  product: { image, name, details, price },
  products,
}) => {
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} />
          </div>

          {/* <div className="small-images-container">
            {image?.map((item, index) => (
              <img src={urlFor(item)} className="" onMouseEnter="" />
            ))}
          </div> */}
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick="">
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                0
              </span>
              <span className="minus" onClick="">
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button type="button" className="add-to-cart" onClick="">
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//using getStaticPaths to statically generate the respective pages
export const getStaticPaths = async () => {
  //to get the current slug property of each one of the product
  const query = `*[_type == 'product'] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

//using getStaticProps because the data required is available ahead of build time
export const getStaticProps = async ({ params: { slug } }) => {
  //grabing the first products' slug
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
  //grabbing the product from sanity dashboard
  const productQuery = "*[_type == 'product']";

  //to get the individual products
  const product = await client.fetch(query);

  const products = await client.fetch(productQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};

export default ProductDetails;