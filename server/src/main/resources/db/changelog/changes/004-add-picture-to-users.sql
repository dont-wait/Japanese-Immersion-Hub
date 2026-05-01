-- liquibase formatted sql
-- changeset sangnt:add-picture-to-users runOnChange:false
-- comment: Add picture column to users table
ALTER TABLE users ADD COLUMN picture VARCHAR(255);
