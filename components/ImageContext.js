import { createContext, useState } from "react";

const ImageContext = createContext(0, () => {});
export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  return (
    <ImageContext.Provider value={[images, setImages]}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;
