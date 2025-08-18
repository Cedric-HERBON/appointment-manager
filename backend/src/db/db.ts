import pg from "pg";

const { Pool } = pg;

const client = new Pool({
  connectionString: process.env.PG_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  application_name: "appointment-manager-db",
});

export { client };
