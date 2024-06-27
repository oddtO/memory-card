import styles from "./styles.module.scss";

type ProgressBarCSS = {
  "--ratio": number;
} & React.CSSProperties;
export default function ProgressBar({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className: typeof styles.totalArea;
}) {
  const ratio = value / max;
  const style: ProgressBarCSS = {
    "--ratio": Number.isFinite(ratio) ? ratio : 0,
  };
  return (
    <div className={styles.totalArea + " " + className}>
      <div className={styles.completedArea} style={style}></div>
    </div>
  );
}
