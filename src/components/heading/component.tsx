import styles from "./styles.module.scss";
import HomeLink from "../home-link/component";
import ScoreViewer from "../score-viewer/component";
export default function Heading() {
  return (
    <div className={styles.heading}>
      <HomeLink></HomeLink>
      <ScoreViewer></ScoreViewer>
    </div>
  );
}
