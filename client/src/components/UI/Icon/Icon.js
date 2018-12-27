import React from "react";
import dreamerImg from "../../../assets/dreamer.svg";
import presentationImg from "../../../assets/presentation.svg";
import ReactSVG from "react-svg";

//Read SVG source via React-svg
export const DetailImage = () => {
  return <ReactSVG src={dreamerImg} />;
};

export const PresentationImage = () => {
  return <ReactSVG src={presentationImg} />;
};
