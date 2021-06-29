import React, { useState, Component } from "react";
import FileUpload from "../components/FileUpload";
import LoadingIndicator from "../components/LoadingIndicator";
import styles from "../styles/Home.module.css";

const UploadForm = (props) => {
  return (
    <div
      style={{
        maxWidth: 600,
      }}
      id="uploadForm"
    >
      <h1 className={styles.title}>Pitch Deck Uploader</h1>
      <p className={styles.description}>
        Get started by uploading your pitch deck PDF
      </p>

      <div className={styles.grid}>
        <FileUpload />
        <LoadingIndicator />
      </div>
    </div>
  );
};

export default UploadForm;
