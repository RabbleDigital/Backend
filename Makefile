build:
	docker build --platform linux/amd64 . -t techlexity/rabble:back

prune:
	docker image prune -f

push:build prune
	docker push techlexity/rabble:back
