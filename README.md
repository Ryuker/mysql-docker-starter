# Express MySQL CRUD Boilerplate
Starter for a MySQL server in Express using a docker approach for a quick local development setup.


**Uses:**
- Node v18.17.1 (use NVM 18)

! Make sure to run the database before running the server.

# Database
## To run database
``` JS Terminal
cd database
docker compose up -d
```

## To close database container
``` JS database terminal
docker compose down
```


# Server
## To install
``` JS Terminal
npm install
```

## To Run Server
``` JS Terminal
cd server
```
```
`npm run dev`
```

## To Close Server
```JS Terminal
ctrl + c
```