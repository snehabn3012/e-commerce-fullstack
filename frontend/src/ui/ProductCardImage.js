import React from "react";
import { API } from "../utils/config";
import "./ProductCardImage.css";

function ProductCardImage({ product, url }) {
  return (
    <div className="product-image-wrapper">
      <img
        src={`${API}/products/photo/${product._id}`}
        alt={product.name}
        className="product-image"
      />
    </div>
  );
}

export default ProductCardImage;