# Edit Interactive SVG

[![Build Status](https://travis-ci.org/mothsART/editInteractiveSVG.png?branch=master)](https://travis-ci.org/mothsART/editInteractiveSVG)
[![LICENSE](https://img.shields.io/badge/license-BSD-blue.svg)](LICENSE)

Because SVG illustration designed to **educative programs** is really better when it's interactive!

## Goals (1.2)

- [x] Undo/Redo and history changes
- [x] Open (or drag and drop) picture's files : png and jpg files
- [x] Use video and sound on comments

## Goals (1.1)

- [x] shortcuts on preview mode and export files.
- [x] user can add copyrights
- [x] change svg source without delete legend.
- [x] change zoom with and without preview

## Goals (1.0 version)

- [x] Intuitive and minimalist
- [x] Responsive
- [x] import static SVG files
- [x] export a unique HTML file with an interactive content
- [x] re-import HTML file to edit
- [x] i18n
- [x] several concrete examples
- [x] fluid : animations and resize must be done by css, not javascript

## Goals (1.X)

- [ ] Use WebP or Avif file

## Goals (2.0)

- [ ] Use Makefile on debian package
- [ ] Store a list of recent document
- [ ] Import verification on product and static (svg) file
- [ ] delete dependance (full vanilla js): dragula, twitter bootstrap, jquery
- [ ] on load, use a minifier (default option) like SVGO
- [ ] drag indice precisly
- [ ] active drag and drop in zoom mode.
- [ ] Add a document title
- [ ] warnings => auto-correction

- mask
- clipPath

## Contributing

2 Mode : Debug and Release

Actualy, to use **edit mode**, simply change the class of the <body> to "debug" like this :

```html
<body class="debug">
...
</body>
```

## Create a Debian package

```sh
git clone https://github.com/mothsART/editInteractiveSVG.git
cd editInteractiveSVG
debuild -us -uc
```

## Build

```sh
make build
```

## Launch test

```sh
make test
```

## Upgrade examples documents

```sh
make upgrade
```
