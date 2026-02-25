🎓 CampusEvent Website

A modern campus event and opportunity management platform where administrators can create and manage programs, and students can explore and apply for them.

🚀 Overview

CampusEvent is a role-based web application designed for educational institutions.

It includes:

👨‍💼 Admin Dashboard

Create new programs / events

Edit and manage opportunities

Post announcements

🎓 Student Dashboard

Browse opportunities

Search & filter by category

Save programs

View deadlines & details

🛠 Tech Stack
Frontend

React / Next.js

TypeScript

Tailwind CSS

Zustand / Context API (for state management)

Lucide React Icon

📂 Project Structure
campusEvent/
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── OpportunityCard.tsx
│   │
│   ├── pages/ (or app/)
│   │   ├── admin/
│   │   ├── student/
│   │
│   ├── store/
│   │   └── programStore.ts
│   │
│   ├── context/
│   │   └── ProgramContext.tsx
│   │
│   └── types/
│       └── program.ts
│
├── package.json
└── README.md
🔑 Features
👨‍💼 Admin Features

Add new event/program

Edit existing program

Set deadline, skills, category

Real-time update (without database)

🎓 Student Features

Explore opportunities

Search functionality

Category filtering

Save/Bookmark feature

View days left & deadline status

Alternate card layout with images

🔄 Data Flow (Without Database)
Admin Dashboard
       ↓
Global State (Zustand / Context API)
       ↓
Student Dashboard

Programs are stored in global state.

When admin adds a new program → it instantly appears in student dashboard.

Optional: localStorage can be used to persist data after refresh.

📌 Usage
Admin Dashboard

Navigate to /admin

Fill program details

Submit form

Program will appear instantly on student dashboard

Student Dashboard

Navigate to /student

Browse available opportunities

Use search & filter options

Bookmark programs

🎨 UI Design Highlights

Responsive layout

Alternating image card design

Clean modern dashboard UI

Soft shadows and hover animations

Professional typography

Tailwind utility-first styling

🧠 Future Improvements

Backend integration (NestJS + PostgreSQL)

Authentication with role-based access

JWT Authorization

Real-time notifications

Application submission system

Email alerts

File upload support

🔒 Role-Based Access (Planned)
Role	Access
Admin	Create, Edit, Delete Programs
Student	View, Search, Save Programs
