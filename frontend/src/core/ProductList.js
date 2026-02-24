import React from "react";
import ProductCard from "../ui/ProductCard";
import "./ProductList.css";

const ProductList = ({ products, header }) => {
  return (
    <section className="product-section">
      <div className="product-container">
        <h2 className="product-title">{header}</h2>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;