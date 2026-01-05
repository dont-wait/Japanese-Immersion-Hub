-- liquibase formatted sql
-- changeset sangnt:init-schema runOnChange:false
-- comment: Initial schema for Japanese Immersion Hub (PostgreSQL)
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
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
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

CREATE TABLE permissions (
    permission_id BIGSERIAL PRIMARY KEY,
    permission_name VARCHAR(50) NOT NULL,
    permission_description TEXT,
    CONSTRAINT uk_permissions_name UNIQUE (permission_name)
);

CREATE TABLE role_permission (
    role_permission_id BIGSERIAL PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id BIGINT NOT NULL,
    CONSTRAINT fk_rp_role FOREIGN KEY (role_id) REFERENCES roles (role_id),
    CONSTRAINT fk_rp_permission FOREIGN KEY (permission_id) REFERENCES permissions (permission_id),
    CONSTRAINT uk_role_permission UNIQUE (role_id, permission_id)
);

CREATE TABLE auth_providers (
    auth_provider_id BIGSERIAL PRIMARY KEY,
    provider_type VARCHAR(50) NOT NULL,
    provider_name VARCHAR(100) NOT NULL,
    CONSTRAINT uk_auth_provider_name UNIQUE (provider_name)
);

CREATE TABLE user_auth_providers (
    user_auth_provider_id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    auth_provider_id BIGINT NOT NULL,
    CONSTRAINT fk_uap_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT fk_uap_provider FOREIGN KEY (auth_provider_id) REFERENCES auth_providers (auth_provider_id),
    CONSTRAINT uk_user_provider UNIQUE (user_id, auth_provider_id)
);

CREATE TABLE audit_logs (
    log_id BIGSERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    user_id VARCHAR(255),
    timestamp TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE vocabs_pos (
    vocab_pos_name VARCHAR(20) PRIMARY KEY,
    vocab_pos_description TEXT
);

CREATE TABLE vocabs (
    vocab_id SERIAL PRIMARY KEY,
    vocab_pos_name VARCHAR(20),
    vocab_kana VARCHAR(150) NOT NULL,
    vocab_furigana VARCHAR(150) NOT NULL,
    vocab_ex VARCHAR(150) NOT NULL,
    created_at TIMESTAMP(6),
    updated_at TIMESTAMP(6),
    CONSTRAINT fk_vocab_pos FOREIGN KEY (vocab_pos_name) REFERENCES vocabs_pos (vocab_pos_name)
);

CREATE TABLE meanings (
    meaning_id SERIAL PRIMARY KEY,
    vocab_id INT NOT NULL,
    lang_code VARCHAR(5) NOT NULL,
    meaning_text VARCHAR(30) NOT NULL,
    CONSTRAINT fk_meaning_vocab FOREIGN KEY (vocab_id) REFERENCES vocabs (vocab_id),
    CONSTRAINT uk_vocab_lang UNIQUE (vocab_id, lang_code)
);

CREATE TABLE vocab_sentence (
    vocab_sentence_id SERIAL PRIMARY KEY,
    vocab_id INT NOT NULL,
    vocab_sentence_kana TEXT NOT NULL,
    vocab_sentence_furigana TEXT NOT NULL,
    vocab_sentence_cloze TEXT,
    vocab_sentence_image VARCHAR(255),
    CONSTRAINT fk_vs_vocab FOREIGN KEY (vocab_id) REFERENCES vocabs (vocab_id)
);

CREATE TABLE translate_sentence (
    translate_sentence_id SERIAL PRIMARY KEY,
    vocab_sentence_id INT NOT NULL,
    lang_code VARCHAR(5) NOT NULL,
    translate_text TEXT NOT NULL,
    CONSTRAINT fk_ts_sentence FOREIGN KEY (vocab_sentence_id) REFERENCES vocab_sentence (vocab_sentence_id),
    CONSTRAINT uk_sentence_lang UNIQUE (vocab_sentence_id, lang_code)
);