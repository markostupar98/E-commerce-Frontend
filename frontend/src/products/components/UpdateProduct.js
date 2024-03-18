import React, { useEffect, useState, useContext } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { Input } from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/components/hooks/formHook";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/components/context/AuthContext";
import { useFetchHook } from "../../shared/components/hooks/fetchHook";
import Card from "../../shared/components/UIElements/Card";
import "./ProductForm.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/Validators";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

export const UpdateProduct = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useFetchHook();
  const [loadedProduct, setLoadedProduct] = useState();
  const productId = useParams().productId;
  const history = useHistory();

  const [formState, inputChange, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `http:// localhost:5000/api/products/${productId}`
        );
        setLoadedProduct(responseData.product);
        setFormData(
          {
            title: {
              value: responseData.product.title,
              isValid: true,
            },
            description: {
              value: responseData.product.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };

    fetchProduct();
  }, [sendRequest, productId]);

  const productSubmitUpdate = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/products/${productId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/" + auth.userId + "/products");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedProduct && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find product</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedProduct && (
        <form className="place-form" onSubmit={productSubmitUpdate}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a valid title"
            onInput={inputChange}
            initialValue={loadedProduct}
            initialValid={true}
          />
          <Input
            id="description"
            element="textare"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min 5 char)"
            onInput={inputChange}
            initialValue={loadedProduct}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update product
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};
