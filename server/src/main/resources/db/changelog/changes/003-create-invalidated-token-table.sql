-- liquibase formatted sql
-- changeset sangnt:create-invalidated-token-table runOnChange:false
-- comment: Create table for storing logged out tokens
CREATE TABLE invalidated_token (
    id VARCHAR(255) PRIMARY KEY,
    expiry_time TIMESTAMP(6) NOT NULL
);
