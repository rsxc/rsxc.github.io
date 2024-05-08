.PHONY: all build run

all: build run

build:
	docker build -t raghav-portfolio .

run: build
	docker run -p 3000:80 raghav-portfolio
