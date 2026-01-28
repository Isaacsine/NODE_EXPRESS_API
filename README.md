# User Management API

A simple Node.js Express API for managing users with a web-based frontend.

## Features
- Create, read, update, and delete users
- Persistent data storage using JSON file
- Input validation for user data
- Responsive web interface
- CORS enabled for cross-origin requests

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NODE_EXPRESS_API
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000` (or the port specified in the `PORT` environment variable).

## API Endpoints

### GET /users
Retrieve all users

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "Sinethemba",
    "lastName": "Nkosi",
    "age": 24
  }
]
```

### POST /users
Create a new user

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 30
}
```

### GET /users/:id
Retrieve a user by ID

### PUT /users/:id
Update a user by ID

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "age": 28
}
```

### DELETE /users/:id
Delete a user by ID

## Project Structure

- `index.js` - Main Express server configuration
- `users.js` - User routes and handlers
- `dataStore.js` - File-based data persistence logic
- `users.json` - JSON file storing user data
- `index.html` - Frontend HTML interface
- `script.js` - Frontend JavaScript for API interactions
- `style.css` - Frontend styling

## Requirements

- Node.js (v16 or higher)
- npm

## Dependencies

- **express** (^5.2.1) - Web framework
- **nodemon** (^3.1.11) - Development tool for auto-reloading

## Environment Variables

- `PORT` - Server port (defaults to 5000)

## License

ISC
