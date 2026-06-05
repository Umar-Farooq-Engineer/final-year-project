# Final Year Project

This repository contains the final year project for smart potato disease detection and cold storage monitoring.

## Structure

- `MLModel/` - Python model training and Flask backend code
- `NodeJSServer/` - Node.js authentication and user history API
- `react-app/my-react-app/` - React frontend application

## Notes

- The repository ignores generated files, virtual environments, node_modules, and dataset folders.
- The frontend uses JWT authentication for protected routes.
- The backend stores user history in MongoDB.

## Run

### Node server
```bash
cd NodeJSServer
env npm install
npm start
```

### React app
```bash
cd react-app/my-react-app
npm install
npm run dev
```

### Python model backend
```bash
cd MLModel
venv\Scripts\activate
cd backend
python app.py
```
