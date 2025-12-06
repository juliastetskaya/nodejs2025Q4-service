# Home Library Service

A RESTful API service for managing a home music library built with NestJS. This service allows you to manage users, artists, albums, tracks, and favorites.

## Features

- **User Management**: Create, read, update, and delete users with password management
- **Artist Management**: Manage music artists in your library
- **Album Management**: Organize albums with artist associations
- **Track Management**: Manage individual tracks with album and artist references
- **Favorites**: Add and remove artists, albums, and tracks to/from favorites
- **In-Memory Storage**: Fast data access using in-memory data structures

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 22.14.0 or higher (LTS recommended)
- **npm**: Version 8.x or higher (comes with Node.js)
- **Git**: For cloning the repository

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nodejs2025Q4-service
```

### 2. Install Dependencies

```bash
npm install
```

## Configuration

### Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit the `.env` file to configure your application:

```env
PORT=4000

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h
```

## Running the Application

### Development Mode

Run the application in development mode with hot-reload:

```bash
npm run start:dev
```

The server will start at `http://localhost:4000` (or the port specified in your `.env` file).

### Production Mode

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start:prod
```

### Debug Mode

Run the application in debug mode (allows attaching a debugger):

```bash
npm run start:debug
```

### Standard Mode

Run the application without hot-reload:

```bash
npm start
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
