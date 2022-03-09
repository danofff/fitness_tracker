import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginUserAct, registerUserAct } from "../store/userActions";
import FormControl from "../components/ui/FormControl";
import StyledCheckbox from "../components/ui/StyledCheckbox";

import classes from "./LoginRegister.module.css";
import { uiActions } from "../store/uiSlice";

const LoginRegister = (props) => {
  const dispatch = useDispatch();
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isSignUp, setSignUp] = useState(false);

  const [mode, setMode] = useState("Log In");

  const navigate = useNavigate();

  const onUserNameInputChange = (event) => {
    setUserNameInput(event.target.value);
  };

  const onPasswordInputChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const onSwitchChange = (event) => {
    if (mode === "Log In") {
      setMode("Sign Up");
      setSignUp(true);
    } else {
      setMode("Log In");
      setSignUp(false);
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (mode === "Log In") {
      //call login api
      try {
        const isSuccess = await dispatch(
          loginUserAct(userNameInput, passwordInput)
        );
        console.log("success");
        if (isSuccess) {
          navigate("/myroutines", { replace: true });
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setUserNameInput("");
        setPasswordInput("");
      }
    } else {
      //call register api
      try {
        const isSuccess = await dispatch(
          registerUserAct(userNameInput, passwordInput)
        );
        if (isSuccess) {
          setMode("Log In");
          dispatch(
            uiActions.setSnackbar({
              type: "success",
              text: "You successfully registered, try to log in",
              isSnackbarOpen: true,
            })
          );
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setUserNameInput("");
        setPasswordInput("");
      }
    }
  };

  return (
    <div className={classes.loginRegister}>
      {mode === "Log In" ? (
        <div className={classes.loginPanel}>
          <h3>Welcome back!</h3>
          <p>Let's get this party started &#128548;&#128170;</p>
        </div>
      ) : (
        <div className={classes.registerPanel}>
          <h3>New here?</h3>
          <p>Sign up and get your workout on &#128526; &#128293;</p>
        </div>
      )}

      <form className={classes.form} onSubmit={onFormSubmit}>
        <h1>{mode === "Log In" ? "Log In" : "Sign up"}</h1>
        <div className={classes.inputContainer}>
          <FormControl
            type="text"
            value={userNameInput}
            onInputChange={onUserNameInputChange}
            label="Username"
          />
          <FormControl
            type="password"
            value={passwordInput}
            onInputChange={onPasswordInputChange}
            label="Password"
          />
        </div>

        <StyledCheckbox
          onChangeHandler={onSwitchChange}
          checked={isSignUp}
          label={`Switch to ${mode === "Log In" ? "Sign Up" : "Log In"}`}
        />
        <button className={classes.submitButton} type="submit">
          {mode}
        </button>
      </form>
    </div>
  );
};

export default LoginRegister;
