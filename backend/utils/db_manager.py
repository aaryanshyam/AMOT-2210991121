import sqlite3
import json
from datetime import datetime
import os

class DatabaseManager:
    def __init__(self, db_path="scans.db"):
        self.db_path = db_path
        self._init_db()

    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def _init_db(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS scan_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    file_id TEXT,
                    filename TEXT,
                    file_size INTEGER,
                    threat_score REAL,
                    verdict TEXT,
                    timestamp DATETIME,
                    full_report TEXT
                )
            ''')
            conn.commit()

    def save_scan(self, file_info, verdict, threat_score, full_report):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO scan_history 
                (file_id, filename, file_size, threat_score, verdict, timestamp, full_report)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                file_info["id"],
                file_info["filename"],
                file_info["size"],
                threat_score,
                verdict,
                datetime.now().isoformat(),
                json.dumps(full_report)
            ))
            conn.commit()

    def get_history(self, limit=20):
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM scan_history ORDER BY timestamp DESC LIMIT ?', (limit,))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    def delete_scan(self, scan_id):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM scan_history WHERE id = ?', (scan_id,))
            conn.commit()
            return cursor.rowcount > 0
