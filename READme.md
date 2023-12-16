# How to start

## Docker Compose

    cd functions
    docker compose up -d

## Restore Data

You must execute this command in the `/functions` directory:

    bash scripts/restore.sh

## How to Get Image

You should upload `.jpg` images. You can access the uploaded images at:

    http://localhost:6767/static/images/{{image_name}}

For example:

    http://localhost:6767/static/images/hh.jpg

:warning: The `image_name` is determined by the filename when the frontend uploads the image.

## How to Backup Data

You must execute this command in the `/functions` directory:

    bash scripts/backup.sh

## Import Postman Collection

Navigate to the `/postman` directory:

1. `Andes.postman_collection.json` : collection
2. `local.postman_environment.json` : environment

After sending the `register` API request, paste the received token into the environment variable in Postman.
