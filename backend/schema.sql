-- schema.sql
CREATE DATABASE IF NOT EXISTS news_db;
USE news_db;

CREATE TABLE IF NOT EXISTS allowed_emails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  article_url VARCHAR(1000) NOT NULL,
  email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved BOOLEAN DEFAULT TRUE
);

-- example allowed email
INSERT IGNORE INTO allowed_emails (email) VALUES ('user@example.com');
SHOW TABLES;
DESCRIBE allowed_emails;
DESCRIBE comments;
-- إضافة 30 إيميل جديد إلى allowed_emails
INSERT IGNORE INTO allowed_emails (email) VALUES
('riariazakaria6@gmail.com'),
('email1@example.com'),
('email2@example.com'),
('email3@example.com'),
('email4@example.com'),
('email5@example.com'),
('email6@example.com'),
('email7@example.com'),
('email8@example.com'),
('email9@example.com'),
('email10@example.com');

USE news_db;  -- أو اسم القاعدة ديالك
SELECT * FROM comments ORDER BY created_at DESC;