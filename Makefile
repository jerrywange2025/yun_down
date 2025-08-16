PROJECT = download
VERSION = $(shell date +%m%d%H%M)
URL = registry.gitlab.com/instrumentes/$(PROJECT)
REGISTRY_RELEASE = $(URL):$(VERSION)
REGISTRY_LATEST = $(URL):latest

build:
	npm run build
	docker buildx build --platform linux/amd64,linux/arm64 -t $(PROJECT) .

push:
	docker tag $(PROJECT) $(REGISTRY_RELEASE)
	docker tag $(PROJECT) $(REGISTRY_LATEST)
	docker push $(REGISTRY_RELEASE)
	docker push $(REGISTRY_LATEST)
	docker rmi $(REGISTRY_LATEST)
	docker rmi $(REGISTRY_RELEASE)

mac:
	npm run build
	docker build -t $(PROJECT) .
