import { useSelector } from "react-redux";

import classes from "./Loader.module.css";

const Loader = (props) => {
  const loader = useSelector((state) => state.ui.loader);
  return (
    <div className={`${classes.container} ${loader ? classes.active : ""}`}>
      <div className={classes.backdrop}></div>
      <div className={classes.loader}></div>
    </div>
  );
};

export default Loader;
