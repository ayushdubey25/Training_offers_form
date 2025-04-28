📚 Training Offers Management System
A ReactJS + Node.js project that allows HR administrators to create, preview, and publish new training offers with PDF uploads, validation, authentication, and SQL database storage.

✨ Features
Multi-step React form (Basic Details → Requirements → Upload Materials)

Real-time form validation and dynamic field updates

PDF preview before submission

Confirmation modal summarizing all entered details

JWT-based authentication for secure admin access

Backend API using Express.js with file upload via Multer

SQL database (SQLite with Knex.js) for persistent storage

Fully responsive UI styled with Tailwind CSS

Separate GET endpoint to fetch submitted offers

🚀 Technologies Used

Frontend	Backend	Database	Authentication
React.js (TypeScript)	Node.js + Express.js	SQLite (Knex.js ORM)	JWT (JSON Web Tokens)
Tailwind CSS	Multer (for uploads)	SQL Schema via Migration	Role-based access control
📂 Project Structure
pgsql
Copy
Edit
training_offers_project/
├── frontend/ (React App)
│    └── src/
│         └── components/
│         └── pages/
│         └── services/
│         └── utils/
├── backend/ (Node API)
│    └── server.js
│    └── knexfile.js
│    └── migrations/
│    └── uploads/
├── training.db (SQLite Database)
├── README.md
⚙️ Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/training-offers-project.git
cd training-offers-project
2. Set up Backend
bash
Copy
Edit
cd backend
npm install
npx knex migrate:latest
npm start
Server runs at http://localhost:5000

Uploads saved in /uploads/ folder

SQLite DB file created at /training.db

JWT secret configured in .env

3. Generate JWT Token
Inside Node.js REPL:

javascript
Copy
Edit
const jwt = require('jsonwebtoken');
const token = jwt.sign({ role: 'admin' }, 'mysecretkey');
console.log(token);
Copy this token and use it in frontend API requests.

4. Set up Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
App runs at http://localhost:3000

Submit training offers through the form.

📬 API Endpoints

Method	Endpoint	Description
POST	/api/training-offers	Submit a new training offer (secured with JWT)
GET	/api/training-offers	Retrieve all training offers (public)
🗃️ Database Schema
Tables:
categories (id, name)

training_offers (id, title, description, category_id, start_date, duration, prerequisites)

training_materials (id, offer_id, file_url)

Migration scripts located inside /backend/migrations/.

🎯 How to Verify Backend Saving
Use /api/training-offers endpoint to fetch all offers.

Open training.db using DB Browser for SQLite to view saved records.

📋 Sample Postman Collection
(Exported collection available inside the repo at /postman_collection.json)

Test POST and GET endpoints easily!

📤 Deployment (Optional for Bonus Points)

Frontend Deployment	Backend Deployment	Database Hosting
Vercel / Netlify	Render / Fly.io / Railway	SQLite (Local) or migrate to AWS RDS
🧠 Design Decisions
React Hook Form manually handled to maintain flexibility

Tailwind CSS chosen for rapid responsive design

Multer used for efficient file uploads

JWT for secure admin-only access to APIs

Knex.js to simplify SQL query writing and migrations

SQLite chosen for quick local setup (can upgrade to cloud DB)

✅ Current Status
 Frontend form built and validated

 Backend API running

 SQL database integration complete

 Authentication secured

 Full working prototype

🏅 Bonus Suggestions
Add unit tests (e.g., Jest for React, Supertest for APIs)

Add live PDF file URL view (after upload)

Integrate real cloud storage (e.g., AWS S3)

Enable OAuth login (e.g., Auth0)

🔥 Thank you!
Happy to answer any queries or demonstrate the project live!
