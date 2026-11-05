.PHONY: help install build core cli api gui lint format \
	dev up down logs cli-dev api-dev gui-dev

# Extra args after `--`, e.g. `make cli-dev -- --uf sp --ddd 12 --produto x --preco 1`
ARGS := $(filter-out $@,$(MAKECMDGOALS))

help:
	@echo "Garimpeiro OLX — apps are isolated; build core before cli/api/gui."
	@echo ""
	@echo "  make install          npm ci"
	@echo "  make build            core → cli → api → gui"
	@echo "  make core|cli|api|gui build one package (cli/api/gui depend on core)"
	@echo "  make lint|format"
	@echo "  make dev              Docker API + Vite (http://localhost:5173)"
	@echo "  make up|down|logs     production stack / tear down / follow logs"
	@echo "  make cli-dev -- …     CLI with tsx watch (pass args after --)"
	@echo "  make api-dev|gui-dev  host API or API+GUI without Docker"

install:
	npm ci

core:
	npm run build -w @garimpeiro/core

cli: core
	npm run build -w @garimpeiro/cli

api: core
	npm run build -w @garimpeiro/api

gui: core
	npm run build -w gui

build: core
	npm run build -w @garimpeiro/cli
	npm run build -w @garimpeiro/api
	npm run build -w gui

lint:
	npm run lint

format:
	npm run format

dev:
	docker compose -f docker-compose.dev.yml up --build

up:
	docker compose up --build -d

down:
	docker compose down
	docker compose -f docker-compose.dev.yml down

logs:
	docker compose logs -f

cli-dev: core
	npm run dev -- $(ARGS)

api-dev: core
	npm run dev:api

gui-dev: core
	npm run dev:gui

# Absorb unknown goals so `make cli-dev -- --help` does not fail
%:
	@:
