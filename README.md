# sentry-docker-example

An example setup for `sentry` with the `minio` filestorage.

## Prerequisites

In order to run the example there should be `docker`, `docker-compose` and `make` installed on your work station.

## Getting Started

### Setup sentry service
To begin, you'll need to upgrade `sentry` and create the an admin user before the first launch:

```console
$ make sentry-init
```

Then start `sentry` service:
```
$ make sentry-start
```

### Setup minio
After the service is up, go to minio [http://localhost:9000](http://localhost:9000) and create a bucket with the name `sentry`.

Don't forget to add `read-write` permissions for this newly created bucket, otherwise the filestorage is not going to work. 

Minio credentials are:
```
MINIO_ACCESS_KEY: minio-access-key
MINIO_SECRET_KEY: minio-secret-key
```

### Setup sentry project
Finally, setup `sentry` project on the [http://localhost:8080](http://localhost:8080).

At first, create a new project on [http://localhost:8080/organizations/sentry/projects/new](http://localhost:8080/organizations/sentry/projects/new)

Next, turn off `Allow JavaScript source fetching` on [http://localhost:8080/organizations/sentry](http://localhost:8080/organizations/sentry)

### Setup example project

Copy `.env.sample` to `.env` and fill in all environment variables.

`SENTRY_DSN` - value from the "DSN (Deprecated)" from `http://localhost:8080/settings/sentry/projects/YOUR_PROJECT_NAME/keys/`
`SENTRY_AUTH_TOKEN` - token from [http://localhost:8080/settings/account/api/auth-tokens/](http://localhost:8080/settings/account/api/auth-tokens/)
`SENTRY_RELEASE` - a new release id, leave it as it is if you don't know what to write here
`SENTRY_PROJECT` - your project name
`SENTRY_ORG` - your organization naem, by default it's `sentry`

Then install application's dependencies by running:
```
make app-init
```

Build the app and upload source maps to sentry:
```
make app-build
```

Start the application:
```
make app-start
```

You are ready to track errors!

### Generate errors
Go to [http://localhost:3000](http://localhost:3000) and press `Generate error`.
Go check in your project on [http://localhost:8080](http://localhost:8080).
