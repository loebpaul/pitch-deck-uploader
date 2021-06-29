import React, { useState, useContext } from "react";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { useRouter } from "next/router";
import ImageContext from "./ImageContext";

function FileUpload() {
  const [images, setImages] = useContext(ImageContext);
  const [fileData, setFileData] = useState("");
  const router = useRouter();
  const getFile = (e) => {
    setFileData(e.target.files[0]);
  };
  const uploadFile = (e) => {
    let arrImages = [];
    e.preventDefault();
    const data = new FormData();
    data.append("file", fileData);
    trackPromise(
      axios({
        method: "POST",
        url: "http://localhost:5000/upload",
        data: data,
      }).then((res) => {
        if (res.data.numPages > 0) {
          res.data.images.forEach((element) => {
            element = "." + element.substring(8);
            arrImages.push({ original: element, thumbnail: element });
          });
          setImages(arrImages);
          router.push("/view");
        }
      })
    );
  };
  return (
    <form onSubmit={uploadFile}>
      <input
        type="file"
        name="file"
        id="file"
        onChange={getFile}
        accept=".pdf"
      />
      <input type="submit" name="upload" value="Upload" />
    </form>
  );
}

export default FileUpload;
