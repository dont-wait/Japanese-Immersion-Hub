-- liquibase formatted sql
-- changeset sangnt:password-allow-null runOnChange:false
-- comment: password allow null
ALTER TABLE users alter column password set default null;
