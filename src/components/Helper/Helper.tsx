import styles from './Helper.module.css';

export const Helper: React.FC<{ helperText: string; mainText: string }> = ({
  helperText,
  mainText,
}) => {
  return (
    <div className={styles.tooltip}>
      {mainText}
      <span className={styles.tooltipText}>{helperText}</span>
    </div>
  );
};
export default Helper;
