import Head from "next/head";
import styles from "../styles/Home.module.css";
import UploadForm from "../components/UploadForm";

import React, { Component } from "react";

class Home extends Component {
  state = { images: [] };
  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Pitch Deck Uploader</title>
        </Head>

        <main className={styles.main}>
          <UploadForm />
        </main>
      </div>
    );
  }
}

export default Home;
