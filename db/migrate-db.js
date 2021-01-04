const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

console.log({ envPath })

require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  },
})

async function query(q) {
  try {
    const results = await db.query(q)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await query(`
    CREATE TABLE IF NOT EXISTS about (
      a_id INT AUTO_INCREMENT PRIMARY KEY,
      a_title TEXT NOT NULL,
      a_title_ar TEXT NOT NULL,
      a_description TEXT NOT NULL,
      a_description_ar TEXT NOT NULL,
      a_details TEXT NOT NULL,
      a_details_ar TEXT NOT NULL,
      a_main_img TEXT NOT NULL,
      a_keywords TEXT NOT NULL,
      a_isDeleted BOOLEAN NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `)
    await query(`
    CREATE TABLE IF NOT EXISTS roles (
      r_id INT AUTO_INCREMENT PRIMARY KEY,
      r_role TEXT NOT NULL,
      r_role_ar TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `)
    await query(`
    CREATE TABLE IF NOT EXISTS users (
      u_id INT AUTO_INCREMENT PRIMARY KEY,
      u_name TEXT NOT NULL,
      u_password TEXT NOT NULL,
      u_email TEXT NOT NULL,
      u_r_id TEXT NOT NULL,
      u_isDeleted BOOLEAN NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `)
    await query(`
    CREATE TABLE IF NOT EXISTS categories (
      ct_id INT AUTO_INCREMENT PRIMARY KEY,
      ct_title TEXT NOT NULL,
      ct_title_ar TEXT NOT NULL,
      ct_isDeleted BOOLEAN NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `)
    await query(`
    CREATE TABLE IF NOT EXISTS brands (
      br_id INT AUTO_INCREMENT PRIMARY KEY,
      br_title TEXT NOT NULL,
      br_title_ar TEXT NOT NULL,
      br_image TEXT NOT NULL,
      br_isDeleted BOOLEAN NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `)
    await query(`
    CREATE TABLE IF NOT EXISTS products (
      pr_id INT AUTO_INCREMENT PRIMARY KEY,
      pr_title TEXT NOT NULL,
      pr_title_ar TEXT NOT NULL,
      pr_description TEXT NOT NULL,
      pr_description_ar TEXT NOT NULL,
      pr_details TEXT NOT NULL,
      pr_details_ar TEXT NOT NULL,
      pr_ct_id INT NOT NULL,
      pr_br_id INT NOT NULL,
      pr_main_img TEXT NOT NULL,
      pr_keywords TEXT NOT NULL,
      pr_isDeleted BOOLEAN NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `)
    await query(`
    CREATE TABLE IF NOT EXISTS contact (
      co_id INT AUTO_INCREMENT PRIMARY KEY,
      co_address TEXT NOT NULL,
      co_address_ar TEXT NOT NULL,
      co_phones TEXT NOT NULL,
      co_emails TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `)
    await query(`
    CREATE TABLE IF NOT EXISTS sliders (
      sl_id INT AUTO_INCREMENT PRIMARY KEY,
      sl_title TEXT NOT NULL,
      sl_title_ar TEXT NOT NULL,
      sl_description TEXT NOT NULL,
      sl_description_ar TEXT NOT NULL,
      sl_img TEXT NOT NULL,
      sl_isDeleted BOOLEAN NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `)
    await query(`
      INSERT INTO roles (r_role,r_role_ar) VALUES ('Admin', 'مدير الموقع')
    `)
    await query(`
      INSERT INTO roles (r_role,r_role_ar) VALUES ('Content Admin', 'مدير محتوى')
    `)
    await query(`
      INSERT INTO users (u_name, u_password, u_email, u_r_id) VALUES ('Abdelrahman', 'arahman1783@yahoo.com', '12oglg8e', 1)
    `)
    console.log('migration ran successfully')
  } catch (e) {
    console.error('could not run migration, double check your credentials.')
    process.exit(1)
  }
}

migrate().then(() => process.exit())
