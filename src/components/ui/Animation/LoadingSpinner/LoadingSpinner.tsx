import React from "react";
import classes from "./LoadingSpinner.module.css";

const loadingAnimation = () => {
  return (
    <div className={classes.ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default loadingAnimation;
