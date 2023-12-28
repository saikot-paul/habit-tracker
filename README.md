# Habit Tracker WebApp 

## Purpose
We aim to develop a productivity application focused on aiding individuals, especially students, to enhance their time management and organizational skills. The application is designed to address challenges related to stress and academic performance by structuring various daily activities, including academic classes, meetings, and personal events.

## Core Functionalities
### 1. Tasks
   - **Description**: Specific activities with set deadlines (e.g., assignments), including subtasks for tracking progress.

### 2. Events
   - **Description**: Reserves time blocks for commitments such as appointments, weddings, and conferences.

### 3. Reminders
   - **Description**: Alerts for one-time notifications, like birthdays and anniversaries.

## App Structure
### Main Pages
- **Login Page**: For user authentication.
- **User Page**: Displays the user's daily schedule and tasks.

### Functions
- **Login/Logout**: Secure user account access.
- **Create User**: Process for new account creation.
- **CRUD Operations**:
  - **Tasks**: Create, read, update, and delete tasks.
  - **Reminders**: Management of reminders.
  - **Meetings**: Scheduling and managing meetings.

## Technical Stack
- **Frontend**: Developed with React.js, making API calls for data handling.
- **Backend and Database**: Utilizing Express for both backend services and Firebase for database/authentication. 
- **Data Synchronization**: Real-time data sync between the frontend and Firebase database through API calls.

## Clarifications and Adjustments
- Backend functionality is provided by Firebase's database services, with frontend API calls for data interaction.
- Ensuring real-time data updates and consistency with synchronous CRUD operations for user data.
- The application's focus is on two main pages: the login page for authentication and the user page displaying daily tasks and schedules.
- Functionalities include user login/logout, account creation, and CRUD operations for tasks, reminders, and meeting schedules.

