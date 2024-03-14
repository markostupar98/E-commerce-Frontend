import React, { useCallback, useReducer } from "react";
import { Input } from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "../components/ProductForm.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/Validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputIds) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};
const NewProduct = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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
    isValid: false,
  });

  const inputChange = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

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
        errorText="Please enter a valid description al least 5 charcacters"
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
