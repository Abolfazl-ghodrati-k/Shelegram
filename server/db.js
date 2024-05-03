const {Pool} = require('pg')

const pool = new Pool({
   database: process.env.DATABASE_NAME ||"your_database_name",
   host: process.env.DATABASE_HOST || "localhost",
   password: process.env.DATABASE_PASSSWORD || "your_password",
   user: process.env.DATABASE_USER || "your_username",
   port: 5432,
})

module.exports = pool