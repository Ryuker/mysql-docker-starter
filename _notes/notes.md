# MySQL CRUD Boilerplate


login: 
- ip adress: 172.18.0.2 
- username: root
- password: example_pass

To get IP adress:
``` Terminal
docker container ls 
```
    - gets all containers, copy the name of the database container
``` Terminal
docker inspect {dbname}
```
  - inspects the database container
  - copy the ip adress (it can differ per session)


resources:
[persistent data config](https://tecadmin.net/docker-compose-persistent-mysql-data/)




