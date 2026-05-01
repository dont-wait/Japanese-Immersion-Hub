# 🇯🇵 Japanese Immersion Hub

A comprehensive platform for Japanese language learning and immersion, featuring vocabulary management, sentence examples, and user authentication.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Management](#database-management)
- [Project Structure](#project-structure)
- [Client (Frontend)](#client-frontend)
- [Contributing](#contributing)

## ✨ Features

- **User Authentication & Authorization**

  - Multi-provider authentication (Email, Google, etc.)
  - Role-based access control (RBAC)
  - JWT token-based authentication

- **Vocabulary Management**

  - Create and manage Japanese vocabulary entries
  - Multiple meanings per vocabulary
  - Part of speech categorization
  - Example sentences with translations

- **Audit Logging**
  - Track all user activities
  - Comprehensive audit trail

## 🛠 Tech Stack

- **Backend Framework**: Spring Boot 3.5.5
- **Language**: Java 17
- **Database**: PostgreSQL 16
- **ORM**: Hibernate/JPA
- **Database Migration**: Liquibase
- **API Documentation**: Swagger/OpenAPI 3.0
- **Object Mapping**: MapStruct
- **Security**: Spring Security + JWT
- **Build Tool**: Maven
- **Containerization**: Docker & Docker Compose

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17** or higher
- **Maven 3.8+**
- **Docker & Docker Compose** (for database)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Japanese-Immersion-Hub.git
cd Japanese-Immersion-Hub/server
```

### 2. Set Up Environment Variables

Copy the sample environment file and configure it:

```bash
cp .env.sample .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
POSTGRES_URL=jdbc:postgresql://localhost:5432/japanese_immersion_hub
POSTGRES_DB=japanese_immersion_hub
POSTGRES_USER=jhub
POSTGRES_PASSWORD=jhub123
POSTGRES_PORT=5432

# Application
PORT=8386

# PgAdmin (optional)
PGADMIN_EMAIL=admin@jhub.com
PGADMIN_PASSWORD=admin123
PGADMIN_PORT=5050
```

### 3. Set Up Liquibase Configuration

Copy the sample Liquibase properties:

```bash
cp liquibase.properties.sample liquibase.properties
```

Edit `liquibase.properties` with your database credentials (should match your `.env` file).

### 4. Start the Database

Using Docker Compose:

```bash
docker-compose up -d postgres
```

Verify the database is running:

```bash
docker ps
```

### 5. Run Database Migrations

```bash
mvn liquibase:update
```

Or preview the SQL that will be executed:

```bash
mvn liquibase:updateSQL
```

### 6. Build the Application

```bash
mvn clean install
```

Or skip tests if you want a faster build:

```bash
mvn clean install -DskipTests
```

### 7. Run the Application

**Option 1: Using Maven**

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**Option 2: Using Java**

```bash
java -jar target/server-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

The application will start on `http://localhost:8386` (or your configured PORT).

## 📚 API Documentation

Once the application is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8386/api/v1/swagger-ui/index.html
- **OpenAPI JSON**: http://localhost:8386/v3/api-docs

### Available Endpoints

#### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login with credentials
- `POST /api/v1/auth/refresh` - Refresh access token

#### Vocabulary

- `POST /api/v1/vocab` - Create new vocabulary entry
- `GET /api/v1/vocab` - Get all vocabulary entries
- `GET /api/v1/vocab/{id}` - Get vocabulary by ID
- `PUT /api/v1/vocab/{id}` - Update vocabulary
- `DELETE /api/v1/vocab/{id}` - Delete vocabulary

#### Users

- `GET /api/v1/users/me` - Get current user profile
- `GET /api/v1/users` - Get all users (admin only)

## 🗄 Database Management

### Using Liquibase

**Apply pending migrations:**

```bash
mvn liquibase:update
```

**Rollback last changeset:**

```bash
mvn liquibase:rollback -Dliquibase.rollbackCount=1
```

**Generate SQL without executing:**

```bash
mvn liquibase:updateSQL
```

**View migration status:**

```bash
mvn liquibase:status
```

### Using Docker Compose

**Start all services:**

```bash
docker-compose up -d
```

**Stop all services:**

```bash
docker-compose down
```

**View logs:**

```bash
docker-compose logs -f postgres
```

**Access PostgreSQL CLI:**

```bash
docker exec -it jp_postgres psql -U jhub -d japanese_immersion_hub
```

### Optional: PgAdmin

Uncomment the `pgadmin` service in `docker-compose.yml` and run:

```bash
docker-compose up -d pgadmin
```

Access PgAdmin at: http://localhost:5050

## 📁 Project Structure

```
server/
├── src/
│   ├── main/
│   │   ├── java/com/minori/server/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── request/     # Request DTOs
│   │   │   │   └── response/    # Response DTOs
│   │   │   ├── entity/          # JPA entities
│   │   │   ├── enums/           # Enumerations
│   │   │   ├── exception/       # Custom exceptions
│   │   │   ├── mapper/          # MapStruct mappers
│   │   │   ├── repository/      # JPA repositories
│   │   │   ├── service/         # Business logic
│   │   │   └── ServerApplication.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── db/
│   │           └── changelog/   # Liquibase migrations
│   └── test/                    # Test files
├── docker-compose.yml           # Docker services
├── pom.xml                      # Maven dependencies
├── .env                         # Environment variables (gitignored)
├── .env.sample                  # Environment template
├── liquibase.properties         # Liquibase config (gitignored)
└── liquibase.properties.sample  # Liquibase template
```

## 🔧 Development

### Running Tests

```bash
mvn test
```

### Code Quality

The project uses:

- **Lombok** - Reduce boilerplate code
- **MapStruct** - Type-safe bean mapping
- **Validation** - Bean validation with Hibernate Validator

### Adding New Database Changes

1. Create a new changeset file in `src/main/resources/db/changelog/changes/`
2. Add reference to `db.changelog-master.yml`
3. Run migration: `mvn liquibase:update`

Example changeset:

```sql
-- liquibase formatted sql
-- changeset author:002-add-new-table

CREATE TABLE new_table (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

## 📝 Environment Profiles

The application supports multiple profiles:

- **dev** - Development environment (default)
- **test** - Testing environment
- **prod** - Production environment

Switch profiles using:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

Or set environment variable:

```bash
export SPRING_PROFILES_ACTIVE=prod
java -jar target/server-0.0.1-SNAPSHOT.jar
```

## 🐛 Troubleshooting

### MapStruct Issues

If you encounter MapStruct errors during build, ensure the annotation processor configuration is correct in `pom.xml`:

```bash
mvn clean install
```

### Database Connection Issues

1. Verify PostgreSQL is running: `docker ps`
2. Check environment variables in `.env`
3. Test connection: `docker exec -it jp_postgres pg_isready`

### Port Already in Use

Change the port in `.env` file:

```env
PORT=8080
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Minori Team** - _Initial work_

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Japanese language learning community
- Contributors and testers

## 💻 Client (Frontend)

Võ đường Ngôn ngữ Hiện đại (Modern Language Dojo). Giao diện được thiết kế theo phong cách cực ngầu lấy cảm hứng từ **Zen-Modern**, **Zine-inspired** và đặc biệt là phong cách đồ họa của game **Persona 5**.

### ⛩️ Tính năng nổi bật
- **Giao diện Persona 5:** Trang chủ (Landing Page) bùng nổ, đậm chất nghệ thuật.
- **Dashboard Zen:** Hệ thống lưới Bento, theo dõi Streak và vòng tròn tiến độ Enso.
- **Trải nghiệm đắm mình:** Không gian học tập tối giản, tập trung tối đa vào kiến thức.
- **Guest Access:** Cho phép dùng thử ứng dụng ngay lập tức mà không cần đăng ký.

### 🚀 Hướng dẫn chạy thử (Local Development)

#### 1. Yêu cầu
- **Node.js** v18+
- **npm** hoặc **pnpm**

#### 2. Cài đặt
Di chuyển vào thư mục `client` (đã được đổi tên từ `fe`):
```bash
cd client
```

Cài đặt thư viện:
```bash
npm install
```

#### 3. Khởi chạy
```bash
npm run dev
```
Truy cập tại: `http://localhost:3000`

### 🛠️ Tech Stack Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (Modern Engine)
- **Icons:** Material Symbols (Google)
- **State:** React Context API (Auth, Theme)

---

Made with ❤️ for Japanese language learners
