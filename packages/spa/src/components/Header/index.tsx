import React from "react";
import Lottie from "react-lottie";
import animationData from "./animationData.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
export default () => (
  <header>
    <Lottie options={defaultOptions} height={300} width={300} />
  </header>
);
