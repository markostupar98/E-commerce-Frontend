import React, { useState, useContext } from "react";
import axios from "axios";
import Card from "../../../shared/components/UIElements/Card";
import "./Auth.css";
import { Input } from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/Validators";
import { useForm } from "../../../shared/components/hooks/formHook";
import { AuthContext } from "../../../shared/components/context/AuthContext";

export const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputChange, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmit = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/signup",
          {
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }

    auth.login();
  };

  const swithMode = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((previousMode) => !previousMode);
  };
  return (
    <Card className="authentication">
      <h2>Login required</h2>
      <hr />
      <form onSubmit={authSubmit}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a name"
            onInput={inputChange}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL]}
          errorText="Please enter valid email address"
          onInput={inputChange}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter valid password , at least 5 char long"
          onInput={inputChange}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "Sign up"}
        </Button>
      </form>
      <Button inverse onClick={swithMode}>
        {isLoginMode ? "Swith to Signup" : "Switch to Login"}
      </Button>
    </Card>
  );
};
