# MCC Catering

Premium South Indian wedding and event catering website — My Chennai Catering Services.

## Tech Stack

**Frontend:**
- React 19 + TanStack Router + TanStack Start
- Tailwind CSS v4 + Framer Motion
- TypeScript + Vite 8

**Backend:**
- Express.js (Node.js)
- MySQL 8 (mysql2)
- JWT authentication, Multer file uploads

## Setup

### Frontend

```bash
npm install
npm run dev        # http://localhost:5174
```

### Backend

```bash
cd server
npm install
cp .env.example .env   # Edit with your DB credentials
npm run dev            # http://localhost:5000
```

### Database

Create a MySQL database and run the schema:

```bash
mysql -u root -p your_db < server/schema.sql
mysql -u root -p your_db < server/insert_menu_items.sql
```

Configure `server/.env` with your database credentials and JWT secret.

## Build

```bash
npm run build
npm run preview
```

## License

Private — My Chennai Catering Services
