import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/models/schema.prisma",
  migrations: {
    path: "src/models/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL || "",
  },
});