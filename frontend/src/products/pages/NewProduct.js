import React, { useContext } from "react";
import { Input } from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { ImageUpload } from "../../shared/components/FormElements/ImageUpload";
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
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const addProductSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value);

      await sendRequest("http://localhost:5000/api/products", "POST", formData);
      history.push("/");
    } catch (err) {}

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
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid description at least 6 characters"
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
        <ImageUpload
          id="image"
          onInput={inputChange}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add product
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewProduct;
