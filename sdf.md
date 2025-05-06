# Events Platform – Frontend

Live Site: [https://fabulous-salamander-321bab.netlify.app](https://fabulous-salamander-321bab.netlify.app)

## Overview

This is the **frontend** for the Events Platform web application, built with **React**. The application allows users to create, manage, and sign up for events. The platform supports three types of user roles: **owner**, **admin**, and **customer**.

---

## Key Features

### Role-based Access
- **Owner**: Full access. Can create events, manage their own events, view signups, and appoint admins.
- **Admin**: Can create and manage events they have created. Can do everything a customer can.
- **Customer**: Can view all events, sign up for events, add events to their calendar, and cancel their signups.

### General Features for All Users
- View all available events.
- View signed-up events.
- View and update personal account details.
- Reset password via email.
- Add signed-up events to calendar (via .ics file).
- Responsive design for both desktop and mobile.

---

## Test Accounts

You can use the following credentials to log in and test the app:

### Admin
- **Email**: `eventsplatformuser1@gmail.com`
- **Password**: `Password123!`

### Owner
- **Email**: `ownereventsplatform@gmail.com`
- **Password**: `Password123!`

### Customer
You can create your own test customer account by signing up on the register page.

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/iretunde/events-platform-frontend.git
cd events-platform-frontend