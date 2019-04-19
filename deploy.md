# Deploy

## Create a Debian/Ubuntu package

```sh
git clone https://github.com/mothsART/editInteractiveSVG.git
cd editInteractiveSVG
debuild
```

## deploy on ppa

```sh
debuild
cd ..
dput ppa:jerem-ferry/app-illustration edit-interactive-svg_*.changes
```
