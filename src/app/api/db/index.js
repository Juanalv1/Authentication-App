import { Pool } from 'pg'
 
const dbPool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

dbPool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
 
export default dbPool