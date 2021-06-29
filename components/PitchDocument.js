import router from "next/router";
import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import styles from "../styles/Home.module.css";

class PitchDocument extends Component {
  resetForm() {
    router.push("/");
  }
  render() {
    return (
      <div
        style={{
          maxWidth: 600,
        }}
        className={styles.grid}
        id="pitchDocument"
      >
        <h1
          className={styles.title}
          style={{
            marginBottom: ".5em",
          }}
        >
          Pitch Deck Viewer
        </h1>
        <ImageGallery items={this.props.images} showPlayButton={false} />
        <div
          style={{
            marginTop: "1em",
            textAlign: "center",
            width: "100%",
          }}
        >
          <button onClick={this.resetForm}>Upload Again</button>
        </div>
      </div>
    );
  }
}

export default PitchDocument;
