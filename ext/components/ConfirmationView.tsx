import { getYesterdayLabel } from "~lib/dateUtils";
import styles from "~styles/ConfirmationView.module.css";

interface ConfirmationViewProps {
  thing1: string;
  thing2: string;
  thing3: string;
  onEdit: () => void;
}

export default function ConfirmationView({
  thing1,
  thing2,
  thing3,
  onEdit
}: ConfirmationViewProps) {
  const handleClose = () => {
    window.close();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Saved for yesterday</h1>
        <p className={styles.subtitle}>{getYesterdayLabel()}</p>
      </div>

      <div className={styles.listContainer}>
        <ol className={styles.list}>
          <li className={styles.listItem}>{thing1}</li>
          <li className={styles.listItem}>{thing2}</li>
          <li className={styles.listItem}>{thing3}</li>
        </ol>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryButton} onClick={onEdit}>
          Edit
        </button>
        <button className={styles.secondaryButton} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}
