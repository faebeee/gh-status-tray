build:
	rm ./resources/build.log
	date >> ./resources/build.log
	npm run build:mac

install-app:
	rm  -rf /Applications/gh-status-tray.app
	cp -r ./dist/mac-arm64/gh-status-tray.app /Applications/gh-status-tray.app

build-and-install:
	make build
	make install-app
