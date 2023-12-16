# How to start

## docker-compose

```bash
cd functions
docker compose up -d
```

## restore data (you must execute this command in `/functions` directory)

```bash
bash scripts/restore.sh
```

## how to get image
**you better upload `.jpg` image**

http://localhost:6767/static/images/{{image_name}}

example: http://localhost:6767/static/images/hh.jpg


:warning: **the `image_name` is determined by the filename when frontend uploads**

## how to backup data (you must execute this command in `/functions` directory)

```bash
bash scripts/backup.sh
```

## import postman collection ---> `/postman` directory

1. `Andes.postman_collection.json` : collection
2. `local.postman_environment.json` : environment

**after sending `register` API, you have to paste the token into the environment variable into POSTMAN**