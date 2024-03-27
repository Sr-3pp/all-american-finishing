prod:
	@docker compose -f docker-compose.yml up -d --build
	
down-prod:
	@docker compose -f docker-compose.yml down

dev:
	@docker compose -f docker-compose.dev.yml up -d --build

down-dev:
	@docker compose -f docker-compose.dev.yml down

test:
	@npm run test