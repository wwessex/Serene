export interface MoodEntry {
  date: string;
  mood: string;
  timestamp: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
  mode: "gratitude" | "reframe" | "reflection";
  prompt: string;
}

export interface SleepLog {
  id: string;
  date: string;
  quality: number;
  duration: number;
  bedtime: string;
  notes: string;
}

export interface ThoughtRecord {
  id: string;
  date: string;
  situation: string;
  thought: string;
  emotion: string;
  distortion: string;
  evidence: string;
  reframe: string;
}

export interface SereneSettings {
  name: string;
  lastCheckIn: string;
}

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`serene_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`serene_${key}`, JSON.stringify(value));
}

export const store = {
  getMoods: (): MoodEntry[] => getItem("moods", []),
  saveMood: (entry: MoodEntry) => {
    const moods = store.getMoods();
    moods.push(entry);
    setItem("moods", moods);
  },
  getTodayMood: (): MoodEntry | undefined => {
    const today = new Date().toISOString().split("T")[0];
    return store.getMoods().find((m) => m.date === today);
  },

  getJournalEntries: (): JournalEntry[] => getItem("journal", []),
  saveJournalEntry: (entry: JournalEntry) => {
    const entries = store.getJournalEntries();
    entries.unshift(entry);
    setItem("journal", entries);
  },

  getSleepLogs: (): SleepLog[] => getItem("sleep", []),
  saveSleepLog: (log: SleepLog) => {
    const logs = store.getSleepLogs();
    logs.unshift(log);
    setItem("sleep", logs);
  },

  getThoughtRecords: (): ThoughtRecord[] => getItem("thoughts", []),
  saveThoughtRecord: (record: ThoughtRecord) => {
    const records = store.getThoughtRecords();
    records.unshift(record);
    setItem("thoughts", records);
  },

  getSettings: (): SereneSettings => getItem("settings", { name: "", lastCheckIn: "" }),
  saveSettings: (settings: SereneSettings) => setItem("settings", settings),

  getStreak: (): number => {
    const moods = store.getMoods().sort((a, b) => b.timestamp - a.timestamp);
    if (moods.length === 0) return 0;
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      if (moods.some((m) => m.date === dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  },
};
