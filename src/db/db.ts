import { PostgresDialect } from "kysely";
import { Pool } from "pg";
import { KyselyAuth, type Codegen } from "@auth/kysely-adapter";
import { type DB } from "@/db/types";

export const db = new KyselyAuth<DB, Codegen>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    }),
  }),
});
