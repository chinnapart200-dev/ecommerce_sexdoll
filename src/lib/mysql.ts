import { pool } from "@/lib/db";
import type { ExecuteValues, RowDataPacket } from "mysql2/promise";

export async function query<T extends RowDataPacket = RowDataPacket>(sql: string, values: ExecuteValues = []) {
  const [rows] = await pool.execute<RowDataPacket[]>(sql, values);
  return rows as T[];
}

export async function queryFirst<T extends RowDataPacket = RowDataPacket>(sql: string, values: ExecuteValues = []) {
  const rows = await query<T>(sql, values);
  return rows[0] ?? null;
}
