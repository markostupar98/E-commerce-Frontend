import React from "react";
import Card from "../../shared/components/UIElements/Card";
import "./ProductsList.css";
import ProductItem from "./ProductItem";

export const ProductsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found</h2>
          <button>Share place</button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.imageUrl}
          title={product.title}
          description={product.description}
          address={product.address}
          creatorId={product.creator}
          coordinates={product.location}
        />
      ))}
    </ul>
  );
};
