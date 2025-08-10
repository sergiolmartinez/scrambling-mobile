import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("scrambling.db");

export function initDb() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT);
    CREATE TABLE IF NOT EXISTS current_round (id INTEGER PRIMARY KEY CHECK (id = 1), json TEXT);
    CREATE TABLE IF NOT EXISTS history_rounds (
      id TEXT PRIMARY KEY,
      course_name TEXT,
      date TEXT,
      stats_json TEXT
    );
  `);
}

export function kvSet(k: string, v: string) {
  db.runSync("INSERT OR REPLACE INTO kv (k,v) VALUES (?,?)", [k, v]);
}
export function kvGet(k: string): string | null {
  const r = db.getFirstSync<{ v: string }>("SELECT v FROM kv WHERE k=?", [k]);
  return r?.v ?? null;
}

export function saveCurrentRound(json: object) {
  db.runSync("INSERT OR REPLACE INTO current_round (id,json) VALUES (1,?)", [
    JSON.stringify(json),
  ]);
}
export function loadCurrentRound(): any | null {
  const r = db.getFirstSync<{ json: string }>(
    "SELECT json FROM current_round WHERE id=1"
  );
  return r?.json ? JSON.parse(r.json) : null;
}
