# Events Platform – Frontend

Live Site: [https://fabulous-salamander-321bab.netlify.app](https://fabulous-salamander-321bab.netlify.app)


This is the **frontend** for the Events Platform application. It is a React-based single-page application that interacts with a RESTful API backend to allow users to manage and sign up for events.

---

## ✨ Project Overview

The Events Platform is a full-stack web application that enables users to:

* View upcoming events
* Sign up for events
* Manage events (admin/owner)
* Update personal settings
* Reset forgotten passwords

### 🔐 User Roles

There are **three distinct user roles**:

1. **Owner**

   * Has full privileges
   * Can appoint new admins (via backend logic)
   * Can create, update, delete events
   * Can manage their created events

2. **Admin**

   * Can create and manage their own events
   * Can sign up and cancel their attendance to events
   * Can update their personal profile and password

3. **Customer**

   * Can view all events
   * Can sign up and cancel attendance
   * Can add events to their calendar
   * Can update personal profile and password

---

## ✉ Test Account Details

| Role     | Email                                                                 | Password     |
| -------- | --------------------------------------------------------------------- | ------------ |
| Owner    | [ownereventsplatform@gmail.com](mailto:ownereventsplatform@gmail.com) | Password123! |
| Admin    | [eventsplatformuser1@gmail.com](mailto:eventsplatformuser1@gmail.com) | Password123! |
| Customer | Create your own via the Register page                                 | N/A          |

To test as a customer, use the **Register** form to quickly create an account.

---

## ⚡ Key Features

* User registration and authentication
* Role-based access control
* Secure password reset with email verification
* Event listing and details
* Event creation and management (for admins/owners)
* Calendar integration (add to Google Calendar)
* Responsive and user-friendly interface

---

## 📅 Setup Instructions (Frontend)

### 1. Clone the repository

```bash
git clone https://github.com/iretunde/events-platform-frontend.git
cd events-platform-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

No `.env` file is required for the frontend.

However, note:
To run locally, you'll need to **connect the frontend to your local backend**:

* Run a global find/replace for:

```
https://fabulous-salamander-321bab.netlify.app/
```

* Replace it with:

```
http://localhost:3000/  (or wherever your backend is running)
```

### 4. Start the development server

```bash
npm start
```

---

## 🚀 Deployment

This project is deployed via **Netlify**.

When deploying, ensure that:

* Node version is set correctly (e.g., `16`) in `netlify.toml`
* Any invalid route fallback is handled with redirect (optional but recommended)

---

## 📂 Project Structure

```
src/
  components/     # Reusable UI components
  pages/          # Page-level components (Login, Register, AllEvents etc.)
  context/        # React Context API (Auth context)
  utils/          # Utility functions
```

---

## 🚩 Notes

* This frontend consumes APIs provided by the separately deployed backend (see backend README).
* Ensure CORS settings on backend allow your frontend domain in production.
