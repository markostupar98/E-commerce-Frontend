import React, { useContext } from "react";
import { Input } from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/components/hooks/formHook";
import { useFetchHook } from "../../shared/components/hooks/fetchHook";
import { AuthContext } from "../../shared/components/context/AuthContext";
import "../components/ProductForm.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/Validators";

const NewProduct = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useFetchHook();
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

  const history = useHistory();

  const addProductSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/products",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
      history.push('/');
    } catch (err) {}

    // Still need to add more logic console.log(formState.inputs);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={addProductSubmit}>
        {isLoading && <LoadingSpinner asOverlay />}
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
      </form>{" "}
    </React.Fragment>
  );
};

export default NewProduct;
