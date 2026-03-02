// test-db-connection.ts
import { createConnection } from 'mysql2/promise';

async function testDB() {
  try {
    const connection = await createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'u649944302_ecom',
      password: '+nE6G+p+tmE9', // your password
      database: 'u649944302_ecom',
    });

    console.log('✅ MySQL connection successful!');
    await connection.end();
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
  }
}

testDB();