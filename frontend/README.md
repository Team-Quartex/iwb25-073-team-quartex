# Citizen Desk

![Next.js](https://img.shields.io/badge/Next.js-13.4-blue?logo=next.js)
![Ballerina](https://img.shields.io/badge/Ballerina-2201.0.0-orange?logo=ballerina)
![License](https://img.shields.io/badge/License-MIT-green)

**Citizen Desk** is a modern web application that allows citizens to submit complaints and feedback to the government and other organizations. Administrators can respond efficiently, track statuses, and manage user submissions.  

Live Demo: [https://your-vercel-deployment-url.com](https://your-vercel-deployment-url.com)

---

## Features

### User Features
- Secure user registration and login
- Submit complaints or feedback with title & description
- View submitted complaints and their statuses
- Read responses from admins in a styled format
- Responsive UI for desktop, tablet, and mobile

### Admin Features
- Secure admin login
- View all submitted complaints
- Filter complaints by user, date, category, or status
- Respond to complaints with styled messages
- Track complaint status (Pending, In Progress, Resolved)
- Support multiple admins

### General Features
- Role-based access control
- Persistent authentication via localStorage
- Modern UI/UX using Tailwind CSS
- Clean architecture with separate models for complaints and admin responses
- Scalable and maintainable design

---

## Technology Stack
- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Ballerina (HTTP services, REST API)  
- **Storage:** In-memory (demo) / easily replaceable with database  
- **Authentication:** LocalStorage/session-based (demo)  
- **Hosting:** Vercel (frontend), Ballerina cloud/local deployment (backend)

---

## Screenshots
*(Add screenshots of the landing page, dashboard, user complaint view, admin dashboard, etc.)*

---

## Getting Started

### Prerequisites
- Node.js >= 18
- NPM or Yarn
- Ballerina >= 2201.0.0

### Setup Frontend (Next.js)
```bash
git clone https://github.com/your-username/gov-feedback-platform.git
cd gov-feedback-platform
npm install
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) to view the app.

### Setup Backend (Ballerina)
```bash
cd backend
bal run
```
- Backend runs on port `9090` by default.
- Frontend communicates via RESTful API with CORS enabled.

---

## Deployment

### Frontend Deployment (Vercel)
1. Push your Next.js project to GitHub.
2. Go to [Vercel](https://vercel.com/) → Import Project.
3. Select your repository.
4. Set environment variables if needed (API endpoints).
5. Deploy → Visit your live app URL.

### Backend Deployment (Ballerina Cloud / Server)
1. Install Ballerina runtime on your server.
2. Run backend service using:
```bash
bal run backend_service.bal
```
3. Ensure port `9090` is open and accessible to frontend.
4. Update frontend `.env` with the deployed backend URL.

---

## Folder Structure
```
gov-feedback-platform/
├─ app/                   # Next.js frontend
│  ├─ components/         # Navbar, modals, layouts, etc.
│  ├─ pages/              # Pages (login, dashboard, landing)
│  └─ globals.css
├─ backend/               # Ballerina backend
│  ├─ services/
│  └─ main.bal
├─ README.md
└─ package.json
```

---

## Future Enhancements
- Database integration (PostgreSQL / MySQL)
- JWT-based authentication
- Email/SMS notifications for responses
- Analytics dashboard for admins
- Multi-organization support
- Barcode / QR-code based complaint tracking

---

## Contributing
1. Fork the repository  
2. Create a new branch (`git checkout -b feature-name`)  
3. Make your changes  
4. Commit (`git commit -m 'Add feature'`)  
5. Push (`git push origin feature-name`)  
6. Create a Pull Request

---

## License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

