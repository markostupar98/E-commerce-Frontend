import React from "react";
import { Input } from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {useForm} from "../../shared/components/hooks/formHook";
import "../components/ProductForm.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/Validators";

const NewProduct = () => {
  const [formState, inputChange] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const addProductSubmit = (event) => {
    event.preventDefault();
    // Still need to add more logic console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={addProductSubmit}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputChange}
      />
      <Input
        id="description"
        element="textarea"
        type="Description"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description at least 5 characters"
        onInput={inputChange}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter address"
        onInput={inputChange}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add product
      </Button>
    </form>
  );
};

export default NewProduct;

