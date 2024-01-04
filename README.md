# Tasks

Backend is located in `apps/api`, and frontend is located in `apps/web`.

# Getting started

```bash
# Install dependencies
npm install

# In tab 1 start API
# This will serve API at http://localhost:5000/api
npx nx run api:serve
# In tab 2 start web
# This will serve web at http://localhost:4200
npx nx run web:serve
```

# Account info

email: 'test@example.com'
password: 'password'

# To run tests

```bash
# This will run both web and api tests
npx nx run-many -t test
```
