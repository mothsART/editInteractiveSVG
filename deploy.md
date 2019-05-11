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

## Create a Flatpak package

```sh
flatpak install flathub org.freedesktop.Platform//18.08 org.freedesktop.Sdk//18.08
```

```sh
flatpak-builder build-dir org.flatpak.edit-interactive-svg.json --force-clean
```

