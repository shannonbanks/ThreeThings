/**
 * Entry data model
 */
export interface Entry {
  date: string; // YYYY-MM-DD format
  thing1: string;
  thing2: string;
  thing3: string;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

/**
 * Get an entry for a specific date
 */
export async function getEntryForDate(date: string): Promise<Entry | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get([date], (result) => {
      if (result[date]) {
        resolve(result[date] as Entry);
      } else {
        resolve(null);
      }
    });
  });
}

/**
 * Save a new entry
 */
export async function saveEntry(entry: Omit<Entry, "createdAt" | "updatedAt">): Promise<Entry> {
  const now = Date.now();
  const fullEntry: Entry = {
    ...entry,
    createdAt: now,
    updatedAt: now
  };

  return new Promise((resolve) => {
    chrome.storage.local.set({ [entry.date]: fullEntry }, () => {
      resolve(fullEntry);
    });
  });
}

/**
 * Update an existing entry
 */
export async function updateEntry(entry: Omit<Entry, "createdAt">): Promise<Entry> {
  const existing = await getEntryForDate(entry.date);
  const fullEntry: Entry = {
    ...entry,
    createdAt: existing?.createdAt || Date.now(),
    updatedAt: Date.now()
  };

  return new Promise((resolve) => {
    chrome.storage.local.set({ [entry.date]: fullEntry }, () => {
      resolve(fullEntry);
    });
  });
}
