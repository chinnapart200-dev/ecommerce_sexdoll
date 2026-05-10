import mysql from "mysql2/promise";

type GlobalWithPool = typeof globalThis & {
  mysqlPool?: mysql.Pool;
};

const globalForMySQL = globalThis as GlobalWithPool;

const databaseName = process.env.DB_NAME ?? "ecommerce_sexdoll";
const databaseHost = process.env.DB_HOST ?? "localhost";
const databasePort = Number(process.env.DB_PORT ?? 3306);
const databaseUser = process.env.DB_USER ?? "root";
const databasePassword = process.env.DB_PASSWORD ?? "";

export const pool =
  globalForMySQL.mysqlPool ??
  mysql.createPool({
    host: databaseHost,
    port: Number.isNaN(databasePort) ? 3306 : databasePort,
    user: databaseUser,
    password: databasePassword,
    database: databaseName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMySQL.mysqlPool = pool;
}

