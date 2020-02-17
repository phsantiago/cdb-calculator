import React from "react";
import Lottie from "react-lottie";
import animationData from "./animationData.json";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  z-index: 99;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

type Props = {
  active: boolean;
};
const LoadingOverlay: React.FC<Props> = ({ active, children }) => {
  if (active) {
    return (
      <Wrapper className="background">
        <Lottie options={defaultOptions} height={200} width={200} />
      </Wrapper>
    );
  }
  return <>{children}</>;
};

export default LoadingOverlay;
