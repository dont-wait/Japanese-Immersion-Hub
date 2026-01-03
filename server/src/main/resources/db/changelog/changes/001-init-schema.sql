-- liquibase formatted sql

-- changeset sangnt:init-schema runOnChange:false
-- comment: Initial schema for Japanese Immersion Hub

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    role_description TEXT,
    CONSTRAINT uk_roles_name UNIQUE (role_name)
);

CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    CONSTRAINT uk_users_username UNIQUE (user_name),
    CONSTRAINT uk_users_email UNIQUE (email),
    CONSTRAINT uk_users_phone UNIQUE (phone),
    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE permissions (
    permission_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    permission_name VARCHAR(50) NOT NULL,
    permission_description TEXT,
    CONSTRAINT uk_permissions_name UNIQUE (permission_name)
);

CREATE TABLE role_permission (
    role_permission_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id BIGINT NOT NULL,
    CONSTRAINT fk_rp_role
        FOREIGN KEY (role_id) REFERENCES roles(role_id),
    CONSTRAINT fk_rp_permission
        FOREIGN KEY (permission_id) REFERENCES permissions(permission_id)
);

CREATE TABLE auth_providers (
    auth_provider_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    provider_type VARCHAR(50) NOT NULL,
    provider_name VARCHAR(100) NOT NULL,
    CONSTRAINT uk_auth_provider_name UNIQUE (provider_name)
);

CREATE TABLE user_auth_providers (
    user_auth_provider_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    auth_provider_id BIGINT,
    CONSTRAINT fk_uap_user
        FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_uap_provider
        FOREIGN KEY (auth_provider_id) REFERENCES auth_providers(auth_provider_id)
);

CREATE TABLE audit_logs (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    user_id VARCHAR(255),
    timestamp DATETIME(6) NOT NULL,
    CONSTRAINT fk_audit_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE vocabs_pos (
    vocab_pos_name VARCHAR(20) PRIMARY KEY,
    vocab_pos_description LONGTEXT
);

CREATE TABLE vocabs (
    vocab_id INT AUTO_INCREMENT PRIMARY KEY,
    vocab_pos_name VARCHAR(20),
    vocab_kana VARCHAR(150) NOT NULL,
    vocab_furigana VARCHAR(150) NOT NULL,
    vocab_ex VARCHAR(150) NOT NULL,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    CONSTRAINT fk_vocab_pos
        FOREIGN KEY (vocab_pos_name) REFERENCES vocabs_pos(vocab_pos_name)
);

CREATE TABLE meanings (
    meaning_id INT AUTO_INCREMENT PRIMARY KEY,
    vocab_id INT,
    lang_code VARCHAR(5) NOT NULL,
    meaning_text VARCHAR(30) NOT NULL,
    CONSTRAINT fk_meaning_vocab
        FOREIGN KEY (vocab_id) REFERENCES vocabs(vocab_id)
);

CREATE TABLE vocab_sentence (
    vocab_sentence_id INT AUTO_INCREMENT PRIMARY KEY,
    vocab_id INT,
    vocab_sentence_kana TEXT NOT NULL,
    vocab_sentence_furigana TEXT NOT NULL,
    vocab_sentence_cloze TEXT,
    vocab_sentence_image VARCHAR(255) NOT NULL,
    CONSTRAINT fk_vs_vocab
        FOREIGN KEY (vocab_id) REFERENCES vocabs(vocab_id)
);

CREATE TABLE translate_sentence (
    translate_sentence_id INT AUTO_INCREMENT PRIMARY KEY,
    vocab_sentence_id INT,
    lang_code VARCHAR(5) NOT NULL,
    translate_text TEXT NOT NULL,
    CONSTRAINT fk_ts_sentence
        FOREIGN KEY (vocab_sentence_id) REFERENCES vocab_sentence(vocab_sentence_id)
);
