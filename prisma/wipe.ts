import database from '../src/database'
import log, { LogType } from '../src/utils/log'

async function main() {
  const tablenames = await database.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  const filteredTables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ')

  await database.$executeRawUnsafe(`TRUNCATE TABLE ${filteredTables} CASCADE;`)

  log(LogType.SUCCESS, 'WIPE', 'Database wiped')
}

main()
