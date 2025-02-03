<!-- @format -->

# AdminApp

AdminApp is a role-based ticket management system where customers can raise tickets, agents can manage them, and admins have full control over users and tickets.

## 🚀 Live Demo

- **Frontend:** [AdminApp](https://admin-app-black-ten.vercel.app)

## 🛠 Tech Stack

### Frontend:

- React
- Tailwind CSS
- Context API
- Axios
- React Router

### Backend:

- Node.js
- Express
- MongoDB
- JWT Authentication

## 🔑 User Roles & Features

### 1️⃣ Customer:

- Raise a ticket
- Edit own profile
- Add notes to tickets

### 2️⃣ Agent:

- Change ticket status
- Reply to ticket notes
- View all users
- Edit own profile

### 3️⃣ Admin:

- View all users
- Edit any user's profile
- Edit any ticket's status
- Reply to ticket notes
- Edit own profile

## 📡 API Endpoints (Backend)

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| POST   | /api/auth/login    | User login                         |
| POST   | /api/auth/register | User registration                  |
| GET    | /api/tickets       | Get all tickets                    |
| POST   | /api/tickets       | Create a new ticket                |
| PUT    | /api/tickets/:id   | Update a ticket (Admin/Agent only) |
| GET    | /api/users         | Get all users (Admin only)         |
| PUT    | /api/users/:id     | Edit user details (Admin only)     |

## 🌍 Deployment

- **Frontend:** Hosted on Vercel
- **Backend:** Deployed on Render

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

Developed by [Anurag](https://github.com/anurag090697) 🚀
