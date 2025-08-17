build-and-install:
	rm ./resources/build.log
	date >> ./resources/build.log
	npm run build:mac
	rm  -rf /Applications/gh-status-tray.app
	cp -r ./dist/mac-arm64/gh-status-tray.app /Applications/gh-status-tray.app
