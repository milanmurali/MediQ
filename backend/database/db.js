import Database from "better-sqlite3";

const db = new Database("./database/mediq.db");
db.pragma("journal_mode = WAL");
// db.pragma("foreign_keys = ON");
db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL CHECK(age BETWEEN 1 AND 120),
    gender TEXT NOT NULL,
    mobile TEXT NOT NULL,
    address TEXT,
    department TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT (datetime('now', '+5 hours', '+30 minutes')
)
  );

  CREATE INDEX IF NOT EXISTS idx_patients_name
  ON patients(name);

  CREATE INDEX IF NOT EXISTS idx_patients_department
  ON patients(department);
`);

console.log("SQLite connected");

export default db;