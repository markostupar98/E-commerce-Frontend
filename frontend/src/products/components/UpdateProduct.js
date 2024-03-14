import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Input } from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./ProductForm.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/Validators";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

export const UpdateProduct = () => {
  const productId = useParams().productId;
  const product = DUMMY_PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    return (
      <div className="center">
        <h2>Could not find product</h2>
      </div>
    );
  }
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please enter a valid title"
        onInput={() => {}}
        value={product.title}
        valid={true}
      />
      <Input
        id="description"
        element="textare"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 char)"
        onInput={() => {}}
        value={product.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        Update product
      </Button>
    </form>
  );
};
