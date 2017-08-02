# Axure Interactive Redline Tool

This plugin intends to mimic some of the functionality of the plugin [Measure](http://utom.design/measure/) for Sketch or InVision Inspect. Within my organization, we overly rely on the use of Axure - which doesn't offer many easy options to provide redlines for developers. As Axure does not support plugins within the application itself, this code resides within and is applied to your AxShare projects. 

[Super Basic Demo](http://71gjur.AxShare.com/#g=1&p=test)

## Plugin Usage

To use this plugin, you'll need to copy and paste the code found within [**/axure-redline-tool/web/plugin.txt**](https://github.com/srm985/axure-redline-tool/blob/master/web/plugin.txt) into your AxShare project as a plugin. The code combination is derived from the markup framework, CDN links, the pertinent CSS, and the supporting JavaScript / jQuery code base.

To apply this code to one of your AxShare hosted projects, navigate to [www.share.axure.com](https://share.axure.com) and log into your account. Once logged in, you will see an inline gear icon to the far right of each Axure project. Hovering over this icon provides a list of options, including *PLUGINS* which you should select. Once on the plugin page, select *NEW PLUGIN*. Name your plugin whatever you deem appropriate and select *End of the Head* as the insertion location. Paste your plugin.min.htm code into the content area and save the plugin. Select all desired pages within which you'd like to have the interactive redline tool. If you would like to have the plugin appended to any new pages, you may select *Add to new pages by default*. Once saved, your plugin should be activated. To modify the plugin, simply select *edit* and paste in any replacement code.

[Axure Plugin Tutorial](https://www.axure.com/c/forum/AxShare-general-discussion/9953-create-edit-plugin-AxShare-tutorial.html)

![plugin demo](http://www.seanmcquay.com/axure-redline-tool/axure-redline-tool.gif)

## Installation / Running

Install [Node.js](https://nodejs.org/en/download/)

Update npm to the latest version.

```sh
$ npm install npm@latest -g
```

Install [http-server](https://www.npmjs.com/package/http-server) or your own preferred server.

```sh
$ npm install http-server -g
$ cd /axure-redline-tool/src/
$ http-server
```

_Feel free to disregard these instructions if you have your own preferred server package or are running it live._

#### Prerequisites / Dependencies

This project was built and tested on jQuery 3.2 and Axure RP.

## Building Modified Plugin

If you've made changes and would like to build a new version of the plugin, run the following commands and plugin.txt will be updated.

```sh
$ cd /axure-redline-tool/
$ npm install
$ grunt
```

## Bugs / Drawbacks

As this code is embedded within Axure projects, it does not have direct control of how assets are exported from within Axure. Additionally, Axure projects allow much more functionality and interactivity than those generated in Sketch and it's difficult to intercept and interact with these. The code makes every attempt to handle the various nested elements exported from Axure, but if you do encounter an issue, please let me know and I'll promptly resolve it.

You may find the generated artboard sizing odd during initial use. This tool scans all page elements and sizes the artboard based on the most-extreme elements. If you would like a specific size artboard, I would suggest using a background rectangle within Axure to define this. Alternatively, you may use a combination of vertical and horizontal lines to define your artboard border.

Axure chooses to export some common elements such as circles and lines as images instead of using CSS. As such, you may find it difficult to find accurate dimensions on some items. A workaround for circles is to place a square in Axure and set the border radius greater than or equal to 50% of the square's dimensions.

## Coming Features

* Provide Sliced Images
* Document Color Palette
* CDN Link (Low Priority)

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Authors

* **Sean McQuay** - *Initial work* - [GitHub](https://github.com/srm985) - [Website](http://www.seanmcquay.com)

See also the list of [contributors](https://github.com/srm985/mok-project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/srm985/axure-redline-tool/blob/master/LICENSE) file for details.

## Change Log

#### Version 1.1

* Resolved the issue of overflow scrolling content affecting artboard sizing. In Axure terms, hidden dynamic panel content no longer causes the generated artboard to be bigger than visible elements.
* Resolved how the tool handle Axure annotations. Annotations can be read while the tool is disabled and while the tool is enabled, their icons are not considered interactive elements.
* Added key command functionality to support zoom controls through [Ctrl +] / [Ctrl -] and Esc key to close the redline tool panel / deselect the element.
* Added zoom tracking support to ensure current zoom level is maintained while progressing through flows.

#### Version 1.1.1

* Revised code to handle artboard rendering issues. Axure uses images instead of CSS for many common elements such as lines and circles. These exported images often have incorrect dimensions which cause the redline tool to incorrectly size the artboard. The code has been revised accordingly to handle these scenarios. 
* The tool now removes element focus when the page is scrolled. This issue caused the orange selection box to remain fixed while the element below was scrolled. Code currently closes the redline tool when scrolling occurs. Later enhancement will be to bind orange selection box to the element selected so that even with scrolling the box remains.