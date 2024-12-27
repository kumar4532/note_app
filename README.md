# Note App

## Project Setup

**Installation**
Clone the repository:

```
git clone https://github.com/kumar4532/note_app.git
```


Install dependencies:
```
cd frontend
npm install
```

```
cd backend
npm install
```

Ensure MongoDB is running either locally or through a service like MongoDB Atlas.

### Environment Variables
Create a .env file in the backend and set the following variables:

```
PORT=<Any port>
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
AUTH=<Email for sending mail>
PASS=<Password for given email>
GOOGLE_CLIENT_ID=<Client id for google auth>
GOOGLE_CLIENT_SECRET=<Client secret for google auth>
```

Create a .env file in the frontend and set the following variables:

```
VITE_GOOGLE_CLIENT_ID=<Client id for google auth>
VITE_REACT_APP_BASEURI=<backend url>
```

## Running the Application

Start the backend:
```
cd backend
npm run dev
```
This will run the server using nodemon, which automatically restarts the server upon file changes.

Start the frontend:
```
cd frontend
npm run dev
```

[Deployed App](https://note-app-client-alpha.vercel.app)