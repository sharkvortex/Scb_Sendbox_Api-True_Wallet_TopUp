-- 1️⃣ ตาราง users
CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2️⃣ ตาราง money (เก็บยอดเงินผู้ใช้)
CREATE TABLE money (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3️⃣ ตาราง categories (หมวดหมู่สินค้า)
CREATE TABLE categories (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4️⃣ ตาราง products (สินค้า)
CREATE TABLE products (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(15,2) NOT NULL,
    discount DECIMAL(5,2) DEFAULT 0.00,
    hot TINYINT(1) DEFAULT 0,
    category_id INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_hot_discount (hot, discount),
    INDEX idx_category_id (category_id)
);

-- 5️⃣ ตาราง transactions (สำหรับเก็บประวัติการเติมเงิน / Top-up)
CREATE TABLE transactions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    reference1 VARCHAR(100) NOT NULL,
    reference2 VARCHAR(100),
    authorization VARCHAR(255) NOT NULL,
    request_uid VARCHAR(100) NOT NULL,
    status ENUM('PENDING', 'SUCCESS', 'FAIL') DEFAULT 'PENDING',
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6️⃣ ตาราง vouchers (สำหรับ TrueWallet / Promo vouchers)
CREATE TABLE vouchers (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED,
    voucher_link VARCHAR(255) NOT NULL,
    amount DECIMAL(15,2) DEFAULT 0.00,
    status ENUM('PENDING', 'SUCCESS', 'FAIL') DEFAULT 'PENDING',
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
