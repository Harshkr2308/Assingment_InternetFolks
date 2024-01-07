
## Authors
# The Internet Folks: SDE Intern Assignment
This project includes authentication, community creation, and member management functionalities. It uses Node.js with Express for the backend, MongoDB as the database, and Postman for testing API endpoints.
## Features
- **Authentication**: Sign up and sign in using JWT for token-based authentication.
- **Community**: Create, retrieve, and manage communities.
- **Member Management**: Add and remove members from communities based on user roles.
## Technologies Used
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
# API Endpoints
## Authentication
### Sign Up
- **Endpoint**: `POST /auth/signup`
- **Request Payload**:
  - `name`: User's name
  - `email`: User's email
  - `password`: User's password
### Sign In
- **Endpoint**: `POST /auth/signin`
- **Request Payload**:
  - `email`: User's email
  - `password`: User's password
### Get User Details
- **Endpoint**: `GET /auth/me`
- **Request Headers**:
  - `Authorization`: Bearer token
## Community
### Create Community
- **Endpoint**: `POST /community`
- **Request Payload**:
  - `name`: Name of the community
### Get All Communities
- **Endpoint**: `GET /community`
## Member Management
### Add Member

- **Endpoint**: `POST /member`
- **Request Headers**:
  - `Authorization`: Bearer token
- **Request Payload**:
  - `community`: ID of the community
  - `user`: ID of the user
  - `role`: ID of the role

### Remove Member

- **Endpoint**: `DELETE /member/:id`
- **Request Headers**:
  - `Authorization`: Bearer token
- **Path Variables**:
  - `id`: ID of the member to be removed




### Installation


### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js]
- [MongoDB]
- [Postman]

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
npm install
