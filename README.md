# Sage

A experimental web app to use various AI tools to generate "alt" and "longdesc" text for images of artworks, moderate that generated content, and provide access via a RESTful API.

## Stack

- [AdonisJS](https://docs.adonisjs.com/guides/introduction)/[Typescript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Inertia.js](https://inertiajs.com/) + [Vue.js](https://vuejs.org/)

## Development

To get started clone the repository install dependencies and run:

```bash
npm run dev
```

## Local Environment

Local development requires a PostgreSQL database. A Docker Compose file is provided to setup a local Postgres database.

> [!IMPORTANT]  
> Prior to starting the docker container you'll want to create the local directory where Postgres stores data. This allows Postgres data to persist when the container starts/stops, and creating the directory manually will limit the possibility of permissions issues.

Create the local Postgres data directory:

```bash
mkdir data
```

Now start the container:

```bash
docker compose up -d
```

After starting you can access the PG Admin app by logging into `http://localhost:5050` using:

- username: `admin@si.edu`
- password: `password`

The first time you login to PG Admin you'll want to register your access to `db` docker container:

- hostname: `db`
- username: `admin`
- password: `password`

## Create tables

You can get a start on a fresh install by running [migrations](https://lucid.adonisjs.com/docs/migrations) and seeding the database.

```bash
node ace migration:run && node ace db:seed
```
