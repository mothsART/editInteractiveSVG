# Edit Interactive SVG

[![Build Status](https://travis-ci.org/mothsART/editInteractiveSVG.png?branch=master)](https://travis-ci.org/mothsART/editInteractiveSVG)
[![LICENSE](https://img.shields.io/badge/license-BSD-blue.svg)](LICENSE)

Because SVG illustration designed to **educative programs** is really better when it's interactive!

## Goals (1.0 version)

- [x] Intuitive and minimalist
- [x] Responsive
- [x] import static SVG files
- [x] export a unique HTML file with an interactive content
- [x] re-import HTML file to edit
- [x] i18n
- [x] several concrete examples
- [x] fluid : animations and resize must be done by css, not javascript

## Goals (1.1)

- [x] shortcuts on preview mode and export files.
- [x] user can add copyrights
- [x] change svg source without delete legend.
- [x] change zoom with and without preview

## Goals (1.2)

## Goals (2.0)

- [ ] Undo/Redo (using a diff DOM) + historic
- [ ] Store a list of recent document
- [ ] Import verification on product and static (svg) file
- [ ] delete dependance (full vanilla js): dragula, twitter bootstrap, jquery
- [ ] on load, use a minifier (default option) like SVGO
- [ ] drag indice precisly
- [ ] active drag and drop in zoom mode.
- [ ] Add a title
- [ ] warnings => auto-correction on :

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
dpkg-buildpackage -us -uc
```

## Launch test

```sh
npm test
```

## Upgrade examples documents

```sh
node upgrade.js
```
