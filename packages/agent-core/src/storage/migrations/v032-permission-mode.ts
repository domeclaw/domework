import type { Database } from 'better-sqlite3';
import type { Migration } from './index.js';

/**
 * v032 — Add `permission_mode` column to `app_settings`.
 *
 * Controls whether permission dialogs are shown ('ask') or auto-approved ('allow_all').
 * Default is 'ask' for security.
 */
export const migration: Migration = {
  version: 32,
  up: (db: Database) => {
    const cols = db.prepare('PRAGMA table_info(app_settings)').all() as Array<{ name: string }>;
    if (!cols.some((c) => c.name === 'permission_mode')) {
      db.exec("ALTER TABLE app_settings ADD COLUMN permission_mode TEXT NOT NULL DEFAULT 'ask'");
    }
  },
};
