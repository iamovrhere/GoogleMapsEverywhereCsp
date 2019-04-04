Google Maps Everywhere CSP (Firefox Addon)
======

![Google Maps Everywhere CSP Plugin Icon](./src/icons/icon-raw.png)

[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) is an important aspect of Web Security; plugging the potential holes where [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)) may force its way through (compromised 3rd parties, libraries, novice mistakes, etc.). It works by limiting the sources and contexts in which JavaScript may execute.

Unfortunately, this means that if an end user wishes to insert APIs into the page (such as Google Maps) it won't work due to very asynchronous nature of the scripts.

This is a (very quick) Firefox plugin for the purposes of allowing Google Maps API everywhere by modifying the CSP.

## Usage

Currently the extension is unpublished.

### Installation from Zip

1. Download the [current zip](./bin/google-maps-everywhere-csp.zip).
2. Go to `about:addons`
3. Click the gear (in line with "Manage Extensions")
4. Click "Install Add-on From File"
5. Read the Caution that the plugin is unverified and press "Add" if you accept project's [License](./LICENSE).
6. ???

### Debugging

Follow [FireFox Instructions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) for installation.

## TODO's

- [ ] Clearer instructions
- [ ] Tests.
- [ ] Make websites configurable
- [ ] Split off into its own plugin of hosts -> api pairings
- [ ] Publish?

## License

#### MIT LICENSE

Copyright (c) 2019  Jason J. (iamovrhere)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
