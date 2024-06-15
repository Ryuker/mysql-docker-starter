# MySQL CRUD Boilerplate

using: 
- MySQL Docker Compose setup
- MySQL2 package for database queries - [MySQL2](https://sidorares.github.io/node-mysql2/docs)
- NodeJS with ExpressJS package


**login:** 
- ip adress: 172.18.0.2 
- username: root
- password: example_pass

## To get IP adress:
``` Terminal
docker container ls 
```
    - gets all containers, copy the name of the database container
``` Terminal
docker inspect {dbname}
```
  - inspects the database container
  - copy the ip adress (it can differ per session)


## resources:
[persistent data config](https://tecadmin.net/docker-compose-persistent-mysql-data/)




