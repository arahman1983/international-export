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
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL,
      title_ar TEXT NOT NULL,
      description TEXT NOT NULL,
      description_ar TEXT NOT NULL,
      details TEXT NOT NULL,
      details_ar TEXT NOT NULL,
      image LONGTEXT NOT NULL,
      keyWords TEXT NOT NULL,
      isDeleted BOOLEAN NOT NULL DEFAULT 0,
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
      r_isDeleted BOOLEAN NOT NULL DEFAULT 0,
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
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL,
      title_ar TEXT NOT NULL,
      isDeleted BOOLEAN NOT NULL DEFAULT 0,
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
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL,
      title_ar TEXT NOT NULL,
      image LONGTEXT NOT NULL,
      isDeleted BOOLEAN NOT NULL DEFAULT 0,
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
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL,
      title_ar TEXT NOT NULL,
      description TEXT NOT NULL,
      description_ar TEXT NOT NULL,
      details TEXT NOT NULL,
      details_ar TEXT NOT NULL,
      ct_id INT NOT NULL,
      br_id INT NOT NULL,
      image LONGTEXT NOT NULL,
      keyWords TEXT NOT NULL,
      isDeleted BOOLEAN NOT NULL DEFAULT 0,
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
      id INT AUTO_INCREMENT PRIMARY KEY,
      address TEXT NOT NULL,
      address_ar TEXT NOT NULL,
      phones TEXT NOT NULL,
      emails TEXT NOT NULL,
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
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL,
      title_ar TEXT NOT NULL,
      description TEXT NOT NULL,
      description_ar TEXT NOT NULL,
      image LONGTEXT NOT NULL,
      isDeleted BOOLEAN NOT NULL DEFAULT 0,
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
      INSERT INTO users (u_name, u_email,  u_password, u_r_id) VALUES ('Abdelrahman', 'arahman1783@yahoo.com', '12oglg8e', 1)
    `)
    await query(`
      INSERT INTO about (title, title_ar, description, description_ar, details, details_ar, image, keyWords) VALUES ('About Expo', 'عن الشركة' , 'About Description', 'ملخص عن الشركة',  'About Details', 'تفاصيل عن الشركة', '/images/logo.png', 'cars, spare parts')
      `)
      await query(`
      INSERT INTO contact (address, address_ar, phones, emails ) VALUES ('address address ', 'العنوان العربي' , '0102055121212', 'info@interational-expo.com' )
      `)
    console.log('migration ran successfully')
  } catch (e) {
    console.error('could not run migration, double check your credentials.')
    process.exit(1)
  }
}

migrate().then(() => process.exit())
