import styles from "./styles.module.scss";
import type { Preloader } from "../../use-preload";
import ProgressBar from "../progress-bar/component";
export default function LoadingScreen({
  preloaders,
}: {
  preloaders: Preloader[];
}) {
  let detailedText;

  const isAnyError = preloaders.some((preloader) => preloader.isError);
  const isTotalFullBytesKnown = preloaders.every(
    (preloader) => preloader.isFullBytesKnown,
  );
  if (isAnyError) {
    detailedText = "Network error occured while loading";
  } else if (!isTotalFullBytesKnown) {
    detailedText = "Calculating content size...";
  } else {
    detailedText = "Loading assets...";
  }

  const totalBytesLoaded = preloaders.reduce(
    (acc, preloader) => acc + preloader.bytesLoaded,
    0,
  );

  const totalBytesToLoad = preloaders.reduce(
    (acc, preloader) => acc + preloader.totalBytesToLoad,
    0,
  );

  return (
    <div className={styles.loadingScreen}>
      <div
        className={styles.textInfo}
      >{`${convertToKb(totalBytesLoaded)} / ${isTotalFullBytesKnown ? convertToKb(totalBytesToLoad) : "???"}`}</div>
      <ProgressBar
        className={styles.progressBar}
        value={totalBytesLoaded}
        max={isTotalFullBytesKnown ? totalBytesToLoad : Infinity}
      ></ProgressBar>
      <div className={styles.textInfo + (isAnyError ? " " + styles.error : "")}>
        {detailedText}
      </div>

      {isAnyError && (
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
