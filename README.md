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

## Create tables

You can get a start on a fresh install by running [migrations](https://lucid.adonisjs.com/docs/migrations) and seeding the database.

```bash
node ace migration:fresh --seed
```

## PG Admin

You can access the PG Admin database administration GUI by logging into `http://localhost:5050` using:

- username: `admin@si.edu`
- password: `password`

The first time you login to PG Admin you'll want to register your access to `db` docker container:

- hostname: `db`
- username: `admin`
- password: `password`

## Deploy

For rapid development and testing, the `fly.toml`, `Dockerfile`, and `docker-entrypoint.js` files are provided to make it quick and easy to deploy to [Fly.io](https://fly.io). See the AdonisJS [documentation for deployment](https://docs.adonisjs.com/guides/getting-started/deployment) on any other platform.

To get started you'll need a Fly.io account, and will need to [install the Fly CLI tool](https://fly.io/docs/flyctl/install/) on your local machine.

Run the [launch](https://fly.io/docs/apps/launch/#) command, without initially deploying, from your local project directory to configure the remote application.

```bash
fly launch --no-deploy
```

Before deploying your application you'll need to set _all_ the project's environmental variables as Fly.io [secrets](https://fly.io/docs/reference/secrets/), including the database credentials and connection information output when the new Postgres cluster is created.

for example:

```bash
fly secrets set DB_USER=postgres
```

Then deploy your application

```bash
fly deploy
```
