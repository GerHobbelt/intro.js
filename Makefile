BASE = .

all: build

build: npm-install
	cd BUILD && node BUILD.js

npm-install: node_modules/node-minify/package.json

node_modules/node-minify/package.json: package.json
	npm install

clean:
	-rm -f minified/*.js
	-rm -f minified/*.css

superclean: clean
	-rm -rf node_modules


.PHONY: all build npm-install clean superclean
