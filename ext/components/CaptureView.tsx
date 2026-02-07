import { useState } from "react";
import { getYesterdayLabel } from "~lib/dateUtils";
import styles from "~styles/CaptureView.module.css";

interface CaptureViewProps {
  initialThing1?: string;
  initialThing2?: string;
  initialThing3?: string;
  onSaved: (thing1: string, thing2: string, thing3: string) => void;
}

export default function CaptureView({
  initialThing1 = "",
  initialThing2 = "",
  initialThing3 = "",
  onSaved
}: CaptureViewProps) {
  const [thing1, setThing1] = useState(initialThing1);
  const [thing2, setThing2] = useState(initialThing2);
  const [thing3, setThing3] = useState(initialThing3);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate a brief save operation for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));
    onSaved(thing1, thing2, thing3);
    setIsSaving(false);
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Three things I appreciated yesterday</h1>
        <p className={styles.subtitle}>{getYesterdayLabel()}</p>
      </div>

      <div className={styles.inputsContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="Thing 1"
          value={thing1}
          onChange={(e) => setThing1(e.target.value)}
          disabled={isSaving}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Thing 2"
          value={thing2}
          onChange={(e) => setThing2(e.target.value)}
          disabled={isSaving}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Thing 3"
          value={thing3}
          onChange={(e) => setThing3(e.target.value)}
          disabled={isSaving}
        />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryButton}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button
          className={styles.secondaryButton}
          onClick={handleClose}
          disabled={isSaving}
        >
          Close
        </button>
      </div>
    </div>
  );
}
