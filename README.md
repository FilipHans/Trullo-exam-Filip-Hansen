# Trullo-exam-Filip-Hansen

## 🛠 Setup Instructions

### 1. 📦 Install Dependencies

```bash
npm install
```

---

### 2. 🔐 Create `.env` File

Create a `.env` file in the root directory and follow the structure provided in `.env.example`:

```bash
cp .env.example 
```

Then update the keys in `.env` as needed.

---

### 3. 🌱 Seed the Database

Run the seed script to populate the database with fake users and tasks:

```bash
npm run seed
```

* ✅ Passwords will be **hashed** in the database.
* 🔓 **Unencrypted passwords** will be printed to your terminal so you can use them for the login route, the login route will provide the JWT token which can be entered as a bearer token to access protected routes.

---

### 👤 Admin User

After seeding a static admin user is created:

| Field    | Value               |
| -------- | ------------------- |
| Name     | `admin`             |
| Email    | `admin@example.com` |
| Password | `admin1234`         |

* Admin routes still require a JWT token since the role is stored as a value in it
---

### 4. 🚀 Start the Server

```bash
npm run dev
```

Then go to:

```
http://localhost:3000/graphql
```

to interact with the GraphQL API.

---

