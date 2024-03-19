import React from "react";
import Card from "../../shared/components/UIElements/Card";
import "./ProductsList.css";
import ProductItem from "./ProductItem";
import Button from "../../shared/components/FormElements/Button";

export const ProductsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No products found</h2>
          <Button to="/products/new">Share place</Button>
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
          image={product.image}
          title={product.title}
          description={product.description}
          address={product.address}
          creatorId={product.creator}
          coordinates={product.location}
          onDelete={props.onDeleteProduct}
        />
      ))}
    </ul>
  );
};
