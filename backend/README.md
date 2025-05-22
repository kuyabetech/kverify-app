# KSUSTADOCS Backend (Node.js/Express)

## Getting Started

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Start the server:
   ```bash
   node index.js
   ```

## Tech Stack
- Node.js
- Express
- CORS
- dotenv

## API Endpoints

- `POST /auth` — User authentication (dummy logic for demo)
- `GET /resources?department=CSC&level=300` — Get filtered resources (dummy data)

## Next Steps
- Implement real API proxy logic
- Add authentication logic
- Integrate with Firebase for notifications
