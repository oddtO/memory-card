import styles from "./styles.module.scss";
import type { Preloader } from "../../use-preload-img";
import ProgressBar from "../progress-bar/component";
export default function LoadingScreen({ preloader }: { preloader: Preloader }) {
  let detailedText;

  if (preloader.isError) {
    detailedText = "Network error occured while loading";
  } else if (!preloader.isFullBytesKnown) {
    detailedText = "Calculating content size...";
  } else if (preloader.bytesLoaded < preloader.totalBytesToLoad) {
    detailedText = "Loading images...";
  }
  return (
    <div className={styles.loadingScreen}>
      <div
        className={styles.textInfo}
      >{`${convertToKb(preloader.bytesLoaded)} / ${preloader.isFullBytesKnown ? convertToKb(preloader.totalBytesToLoad) : "???"}`}</div>
      <ProgressBar
        className={styles.progressBar}
        value={preloader.bytesLoaded}
        max={preloader.isFullBytesKnown ? preloader.totalBytesToLoad : Infinity}
      ></ProgressBar>
      <div
        className={
          styles.textInfo + (preloader.isError ? " " + styles.error : "")
        }
      >
        {detailedText}
      </div>

      {preloader.isError && (
        <div className={styles.textInfo}>
          Check your internet connection and refresh the page
        </div>
      )}
    </div>
  );
}

function convertToKb(bytes: number): string {
  return `${(bytes / 1024).toFixed(2)} kb`;
}
