sentry-init:
	docker-compose run sentry-web upgrade

sentry-start:
	docker-compose up sentry-web sentry-worker sentry-cron

app-init:
	docker-compose run --rm app-install

app-build:
	docker-compose run --rm app-build

app-start:
	docker-compose up app-start
