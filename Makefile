.PHONY: test build upgrade build.debian build.debian.source deploy.debian

test:
	npm test

build:
	node build

upgrade:
	node upgrade

build.debian:
	debuild -us -uc #binary package : .deb, alias of dpkg-buildpackage -rfakeroot -d -us -uc

build.debian.source:
	debuild -S -sa #source package : alias of dpkg-buildpackage -rfakeroot -d -us -uc -S

deploy.debian:
	build.debian.source
	dput ppa:jerem-ferry/app-illustration `/bin/ls -d ../edit-interactive-svg*.changes`
