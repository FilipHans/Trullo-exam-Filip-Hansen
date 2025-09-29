# Trullo-exam-Filip-Hansen

## Teoretiska resonemang

### Motivera ditt val av databas 

Mitt val av databas drevs huvudsakligen utav en vilja att arbeta vidare i NoSQL för att utöka min kunskap av en mer ofamiljär teknik. 

### Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen

Apollo + Graphql för att skapa min GraphQL API

bcrypt för att hasha mina lösenord innan de sparades i databasen

JWT för att kunna "logga in" användera och använda för att addera authentication och authorization till mina rutter

mongoose som ODM till mongoDB för att definera schemas

Zod för att addera validering till datan som går igenom mina rutter 


### Redogör översiktligt hur applikationen fungerar

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

* All protected routes that require a JWT token

| Mutation Name     | Description                            | Access Role Required |
| ----------------- | -------------------------------------- | -------------------- |
| `adminDeleteUser` | Delete a user by admin                 | `Role.ADMIN`         |
| `adminUpdateUser` | Update a user by admin                 | `Role.ADMIN`         |
| `UpdateUser`      | Authenticated user updates own profile | Authenticated user   |
| `DeleteUser`      | Authenticated user deletes own account | Authenticated user   |
| `updatePassword`  | Authenticated user updates password    | Authenticated user   |
| `UpdateTask`      | Update task status/title/description   | Authenticated user   |

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

