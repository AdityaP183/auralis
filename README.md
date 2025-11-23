# **Auralis — Music Streaming Backend API**

Auralis is a scalable and modular **NestJS-powered backend API** for a music streaming platform.
It provides structured modules for **artists, albums, songs, genres, authentication, and users**, with Prisma as the ORM and PostgreSQL as the database.

This backend is designed to support real-world streaming platforms with clean architecture, strict typing, and a future-ready module structure.

## **📌 Features**

### **Core Features**

* **Artist Management** — CRUD operations for artists.
* **Album Management** — Manage albums related to artists.
* **Song Management** — Add and manage songs across albums & genres.
* **Genres Module** — Organize songs/albums by genres.
* **User Accounts** — User CRUD + profile management.
* **Authentication**

  * JWT-based login/register
  * Secure password hashing
  * Auth guards & protected routes

### **System / Dev Features**

* **NestJS Modular Architecture**
* **Prisma ORM** with migrations
* **Typescript-first codebase**
* **Scalable folder structure**
* **Custom utilities** (token generator, hashing helpers)
* **Integration-ready** for frontend (Next.js), microservices, or mobile apps

---

## **📁 Project Structure**

```
/src
 ├── common/          # Shared utilities & common module
 ├── modules/
 │    ├── auth/       # Login, register, JWT
 │    ├── user/       # User profiles
 │    ├── artists/    # Artists module
 │    ├── albums/     # Albums module
 │    ├── songs/      # Songs module
 │    └── genres/     # Genres module
 ├── prisma.service.ts
 └── main.ts
/prisma
 ├── schema.prisma
 └── migrations/
```

## **🚀 Getting Started**

### **Prerequisites**

* Node.js ≥ 18
* PNPM ≥ 8
* PostgreSQL (or your selected Prisma provider)
* Nest CLI installed globally

## **🔧 Installation**

Clone the project:

```bash
git clone https://github.com/your-username/auralis-api.git
cd auralis-api
```

Install dependencies:

```bash
pnpm install
```

Setup environment variables:

```
DATABASE_URL="postgresql://user:password@localhost:5432/auralis"
JWT_SECRET="your-secret-key"
```

## **🗄️ Database Setup**

Run database migrations:

```bash
pnpm prisma migrate dev
```

Optional: Generate Prisma Client

```bash
pnpm prisma generate
```

---

## **▶️ Running the Server**

### **Development**

```bash
pnpm dev
```

### **Production**

```bash
pnpm build
pnpm prod
```

---

## **🧪 Testing**

Run all tests:

```bash
pnpm test
```

Run E2E tests:

```bash
pnpm test:e2e
```

Watch mode:

```bash
pnpm test:watch
```

---

## **📚 API Documentation**

Auralis will include API documentation using industry-standard tools such as:

* **Swagger (OpenAPI)** → planned
* **Fumadocs** for docs site → planned

Routes are structured under:

```
/api/auth
/api/users
/api/artists
/api/albums
/api/songs
/api/genres
```

---

## **🧱 Tech Stack**

| Tool           | Purpose           |
| -------------- | ----------------- |
| **NestJS**     | Backend framework |
| **Prisma ORM** | Database ORM      |
| **PostgreSQL** | Primary database  |
| **Typescript** | Language          |
| **JWT**        | Authentication    |
| **PNPM**       | Package manager   |

---

## **🧩 Future Enhancements**

* Song streaming endpoints
* Media storage + CDN (S3, Cloudflare R2)
* Playlist module
* User preferences & library system
* Rate limiting
* Caching with Redis
* Microservices support for the Nocturne project

## **📄 License**

This project is licensed under the **MIT License**.


## **🤝 Contributing**

Contributions are welcome!
Feel free to open issues or pull requests.

