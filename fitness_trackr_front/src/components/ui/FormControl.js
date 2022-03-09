import { useState, useEffect } from "react";

import classes from "./FormControl.module.css";

const FormControl = ({ value, onInputChange, label, type = "text" }) => {
  const [inputFocused, setInputFocused] = useState(Boolean(value.length));

  const onFocusHandler = (event) => {
    setInputFocused(true);
  };
  const onBlurHandler = (event) => {
    if (value.length === 0) {
      setInputFocused(false);
    }
  };

  useEffect(() => {
    if (value.length === 0) {
      setInputFocused(false);
    } else {
      setInputFocused(true);
    }
  }, [value.length]);
  return (
    <div className={classes.container}>
      <label
        className={`${classes.label} ${inputFocused ? classes.focused : ""}`}
      >
        {label}
      </label>
      <input
        className={classes.input}
        type={type}
        value={value}
        onChange={onInputChange}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        autoComplete="off"
      />
    </div>
  );
};

export default FormControl;
