import React from "react";
import { ImageProvider } from "../components/ImageContext";
import "../styles/globals.css";

function PitchApp({ Component, pageProps }) {
  return (
    <ImageProvider>
      <Component {...pageProps} />
    </ImageProvider>
  );
}

export default PitchApp;
