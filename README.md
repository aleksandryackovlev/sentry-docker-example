# sentry-docker-example

An example setup for `sentry` with the `minio` filestorage.

## Usage

To begin, you'll need to upgrade `sentry` before the first launch:

```console
$ docker-compose run sentry-web upgrade
```

Then start the `sentry` service:
```
$ docker-compose up
```

After the service is up, go to minio `http://localhost:9000` and create a bucket with the name `sentry`. Don't forget to add `read-write` permissions for this newly created bucket, otherwise the filestorage is not going to work.

Finally, setup `sentry` project on the `localhost:8080`.

You are ready to track errors!
