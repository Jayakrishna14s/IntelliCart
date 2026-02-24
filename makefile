up:
	docker compose -f docker-compose.dev.yaml up

down:
	docker compose -f docker-compose.dev.yaml down

build:
	docker compose -f docker-compose.dev.yaml up --build

logs:
	docker compose -f docker-compose.dev.yaml logs -f

ps:
	docker compose -f docker-compose.dev.yaml ps