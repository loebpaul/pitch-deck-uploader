import PitchDocument from "../components/PitchDocument";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import ImageContext from "../components/ImageContext";
import { useContext } from "react";

function View() {
  const [images] = useContext(ImageContext);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pitch Deck Viewer</title>
      </Head>

      <main className={styles.main}>
        <PitchDocument images={images} />
      </main>
    </div>
  );
}

export default View;
