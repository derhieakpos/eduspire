# EduSpire Backend

The backend API for the EduSpire student management system. It provides student registration, login, JWT authentication, and communication with a PostgreSQL database.

## Technology Stack

- Node.js and Express.js
- PostgreSQL and `pg`
- `bcrypt` for password hashing
- `jsonwebtoken` for JWT authentication
- `cors` for frontend access during development
- `dotenv` for environment variables
- Nodemon for development

## Folder Structure

```text
backend/
├── src/
│   ├── config/database.js
│   ├── controllers/authController.js
│   ├── middleware/authMiddleware.js
│   ├── routes/authRoutes.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Requirements

Install Node.js, npm, and PostgreSQL. Check installation:

```bash
node --version
npm --version
psql --version
```

## 1. Install Dependencies

From the EduSpire repository root:

```bash
cd backend
npm install
```

If the backend has no `package.json` yet, initialize it and install dependencies:

```bash
npm init -y
npm install express pg dotenv bcrypt jsonwebtoken cors
npm install --save-dev nodemon
```

Make sure `backend/package.json` contains these scripts:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

Keep the backend's `package.json` separate from the React frontend's root `package.json`.

## 2. Set Up PostgreSQL

Open PostgreSQL with an account that can create databases:

```bash
psql -U postgres
```

Create and connect to the database:

```sql
CREATE DATABASE eduspire;
\c eduspire
```

If `eduspire` already exists, just connect to it.

Create the programs table:

```sql
CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Seed the programs once:

```sql
INSERT INTO programs (name, description)
VALUES
('Frontend Development', 'Learn how to build modern websites and user interfaces.'),
('Backend Development', 'Learn server-side programming, APIs, databases and backend systems.'),
('Cloud Engineering', 'Learn cloud infrastructure, deployment and cloud technologies.'),
('Cybersecurity', 'Learn the fundamentals of protecting systems, networks and applications.'),
('Data Analysis', 'Learn how to collect, process and analyze data.'),
('UI/UX Design', 'Learn how to design user-friendly digital products and experiences.')
ON CONFLICT (name) DO NOTHING;
```

Create the students table:

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    program_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_program
        FOREIGN KEY (program_id)
        REFERENCES programs(id)
        ON DELETE RESTRICT
);
```

Check the tables and programs:

```sql
\dt
SELECT id, name FROM programs ORDER BY id;
```

If the tables already exist, do not run their `CREATE TABLE` statements again. Confirm their columns match the schema above.

## 3. Configure Environment Variables

Create `backend/.env`:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/eduspire
JWT_SECRET=REPLACE_WITH_A_LONG_RANDOM_SECRET
```

Replace the example database credentials with your own PostgreSQL credentials, and use a long, random JWT secret.

**Never commit `.env` or real credentials to GitHub.** Add the following to `backend/.gitignore`:

```gitignore
node_modules/
.env
```

## 4. Start the Backend

Make sure PostgreSQL is running. From the `backend/` directory:

```bash
npm run dev
```

For a normal start without Nodemon:

```bash
npm start
```

The backend should run at `http://localhost:3000`.

Visit `http://localhost:3000/` to test the root endpoint. Expected response:

```json
{
  "message": "Welcome to EduSpire API"
}
```

## 5. How the Frontend and Backend Communicate

During local development, the React frontend and backend run separately:

- Frontend (Vite): `http://localhost:5173`
- Backend (Express): `http://localhost:3000`

React sends HTTP requests to the backend using `fetch()`. Express validates each request, communicates with PostgreSQL, and returns a JSON response. **The frontend must never connect directly to PostgreSQL or contain database credentials.**

The backend's `src/app.js` should enable JSON parsing and CORS before mounting routes. For local development, `app.use(cors())` allows cross-origin requests. For production, restrict CORS to the deployed frontend origin.

### Example signup request from React

```javascript
const response = await fetch(
  'http://localhost:3000/api/auth/register',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      programId: Number(formData.programId)
    })
  }
);

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || 'Registration failed');
}

// Use data.message or data.student to update the UI.
console.log(data);
```

`programId` must be the numeric ID of an existing program in PostgreSQL.

### Example login request from React

```javascript
const response = await fetch(
  'http://localhost:3000/api/auth/login',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }
);

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || 'Login failed');
}

// The successful response includes a JWT and student information.
console.log(data);
```

Only treat a request as successful when `response.ok` is true. Show the returned error message in the UI when it is false.

## 6. API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| GET | `/` | Check that the API is running | No |
| POST | `/api/auth/register` | Register a student | No |
| POST | `/api/auth/login` | Log in a student | No |
| GET | `/api/auth/profile` | Test authenticated access | Bearer JWT |

### Register a student

`POST /api/auth/register`

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "ChooseYourOwnPassword123",
  "programId": 2
}
```

The backend validates required fields, checks for duplicate email and a valid program, hashes the password with bcrypt, stores the student, and returns JSON. A successful response uses HTTP `201` and does not include the password or password hash. Duplicate email returns `409`; missing fields return `400`; an unknown program ID returns `404`.

### Log in a student

`POST /api/auth/login`

```json
{
  "email": "jane@example.com",
  "password": "ChooseYourOwnPassword123"
}
```

On success, the backend returns HTTP `200`, a JWT token, and public student information. Incorrect credentials return HTTP `401`.

### Access the protected profile endpoint

`GET /api/auth/profile`

Send the token from the login response in this header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Example:

```javascript
const token = localStorage.getItem('token');

const response = await fetch(
  'http://localhost:3000/api/auth/profile',
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || 'Could not load profile');
}

console.log(data);
```

The token lifetime configured in the current backend is one hour. If it is missing, invalid, or expired, log in again to get a new token.

## 7. Run and Test the Full Application

Use two terminals.

**Terminal 1 — backend**, from the repository root:

```bash
cd backend
npm run dev
```

**Terminal 2 — frontend**, from the repository root:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

1. Register with a new email and select an existing program.
2. Confirm the backend returns a successful JSON response and the frontend shows a success message.
3. Log in with that email and password.
4. Confirm the frontend receives a JWT and student information.
5. Test `/api/auth/profile` with the token in the `Authorization` header.
6. Try an incorrect password and confirm the frontend shows an error rather than redirecting as if login succeeded.

You can also test the API independently with Postman or another HTTP client.

## 8. Troubleshooting

- **`password authentication failed for user`** — check the PostgreSQL username/password in `.env`; restart the backend after changes.
- **`database "eduspire" does not exist`** — create the database or correct `DATABASE_URL`.
- **`relation "students" does not exist`** — connect to `eduspire` and create the required tables.
- **`Cannot POST /api/auth/register`** — confirm `src/app.js` mounts `app.use('/api/auth', authRoutes)` and `src/routes/authRoutes.js` defines `router.post('/register', registerUser)`.
- **CORS error in the browser** — ensure CORS middleware is enabled before the routes and the backend is running.
- **Cannot connect to server** — make sure both apps are running and the frontend URL points to the correct backend host and port.
- **Invalid or expired token** — log in again and send `Authorization: Bearer <token>`.

## 9. Security Notes

- Keep `.env` out of Git.
- Never return passwords or password hashes in API responses.
- Store passwords as bcrypt hashes, never as plaintext.
- Use a strong, random JWT secret.
- Use HTTPS and restrict CORS in production.
- Validate and normalize user input.
- `localStorage` is convenient for learning, but JavaScript on the page can access it. Consider secure `HttpOnly` cookies and other production protections before handling real users.

## 10. Current Scope and Future Work

The current backend supports student registration, login, and a JWT-protected profile test route. Possible future additions include a programs-list endpoint, protected dashboard data, course enrollment, assignments, results, admin tools, email verification, and password reset.

## Summary

The backend accepts requests from the React frontend, validates them, communicates with PostgreSQL, and sends JSON responses back. The frontend and backend are separate applications that work together through the API endpoints documented above.