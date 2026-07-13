require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const EMAIL = "admin@mycateringchennai.com";
const PASSWORD = "Admin@123";
const NAME = "Admin";

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const hash = await bcrypt.hash(PASSWORD, 10);
  const [rows] = await conn.query("SELECT id FROM users WHERE email = ?", [EMAIL]);

  if (rows.length) {
    await conn.query("UPDATE users SET password_hash = ?, is_active = 1, role = ? WHERE email = ?", [hash, "admin", EMAIL]);
    console.log("Password reset for existing user:", EMAIL);
  } else {
    await conn.query("INSERT INTO users (name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, 1)", [NAME, EMAIL, hash, "admin"]);
    console.log("Admin user created:", EMAIL);
  }

  const [check] = await conn.query("SELECT password_hash FROM users WHERE email = ?", [EMAIL]);
  console.log("Verify:", await bcrypt.compare(PASSWORD, check[0].password_hash));
  console.log("Login -> Email: " + EMAIL + " | Password: " + PASSWORD);
  await conn.end();
})().catch(e => { console.error("ERROR:", e.message); process.exit(1); });
