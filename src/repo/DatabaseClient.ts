'use server';

import { neon } from '@neondatabase/serverless';

export async function executeSql(query: string) {
  const sql = neon(process.env.DATABASE_URL as string);

  console.log('==> SQL', query);
  const res = await sql(query);
  console.log('<== SQL', res);
}
