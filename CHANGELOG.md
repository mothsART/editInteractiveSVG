# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased : 2.0.X]
### Added
- i18n based on fluent : https://projectfluent.org/
- optimise export file with lib like **svgo**

## [Unreleased : 1.X]
### Added
  - checkbox without native (browser) widget
  - loader on charging SVG file
  - Option > background color (white) and decoration on legend
  - color (fore and back) option on editor.
  - emojis option on editor.
  - optimise perf :
    - minify js and css and concat it
    - javascript : https://jsperf.com/innertext-vs-textcontent-vs-textnode/6
  - progress bar on uploading svg or html files.
  - indice will keep size after zooming
  - Use media query "prefers-reduced-motion"

### Fixed
  - no natural behavior on dezooming indice too close of the edge
  - responsive menu on little size.

## [Unreleased : 1.2.X]
### Added

  - video and sound on comments with base64 : http://www.iandevlin.com/blog/2012/09/html5/html5-media-and-data-uri/
  - Undo/Redo and history changes
  - Open (or drag and drop) picture's files : png, gif and jpg files

### Fixed
  - build templates
  - optimise perf with js "defer"

## [1.1.3]

### Fixed
  - version migration break drag and drop feature

## [1.1]
### Added
  - user can add copyrights
  - change svg source without delete legend.
  - shortcuts on preview mode and export files.
  - change zoom with and without preview
### Fixed
  - better beahavior on legend and description without ugly superposition
  - export file has ugly placement. (css)
  - adjust size of <input> title.
  - add a link on description will always open a new tab.
  - long words (or with insecable space) overflows the description frame.
  - full responsive drag and drop button.

## [1.0.1]
### Fixed
  - reactivate debug mode
  - on firefox, return to edit will keep translation on svg (after a zoom on view mode)
