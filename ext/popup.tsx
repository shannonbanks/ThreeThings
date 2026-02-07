import { useEffect, useState } from "react";
import CaptureView from "~components/CaptureView";
import ConfirmationView from "~components/ConfirmationView";
import { getEntryForDate, saveEntry, updateEntry } from "~lib/storage";
import { getTodayKey } from "~lib/dateUtils";
import styles from "~styles/Popup.module.css";

function IndexPopup() {
  const [isLoading, setIsLoading] = useState(true);
  const [entry, setEntry] = useState(null);
  const [currentView, setCurrentView] = useState<"capture" | "confirmation">("capture");

  // Load entry on mount
  useEffect(() => {
    const loadEntry = async () => {
      const todayKey = getTodayKey();
      const existingEntry = await getEntryForDate(todayKey);
      setEntry(existingEntry);
      setCurrentView(existingEntry ? "confirmation" : "capture");
      setIsLoading(false);
    };

    loadEntry();
  }, []);

  const handleCaptureViewSave = async (thing1: string, thing2: string, thing3: string) => {
    const todayKey = getTodayKey();
    const existing = await getEntryForDate(todayKey);

    if (existing) {
      // Update existing entry
      await updateEntry({
        date: todayKey,
        thing1,
        thing2,
        thing3,
        updatedAt: Date.now()
      });
    } else {
      // Create new entry
      await saveEntry({
        date: todayKey,
        thing1,
        thing2,
        thing3
      });
    }

    // Reload entry and switch view
    const updatedEntry = await getEntryForDate(todayKey);
    setEntry(updatedEntry);
    setCurrentView("confirmation");
  };

  const handleConfirmationViewEdit = () => {
    setCurrentView("capture");
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {currentView === "capture" ? (
        <CaptureView
          initialThing1={entry?.thing1 || ""}
          initialThing2={entry?.thing2 || ""}
          initialThing3={entry?.thing3 || ""}
          onSaved={handleCaptureViewSave}
        />
      ) : (
        <ConfirmationView
          thing1={entry?.thing1 || ""}
          thing2={entry?.thing2 || ""}
          thing3={entry?.thing3 || ""}
          onEdit={handleConfirmationViewEdit}
        />
      )}
    </div>
  );
}

export default IndexPopup;
