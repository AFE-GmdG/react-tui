# react-tui

A [React](https://facebook.github.io/react/) custom renderer for the terminal.

This renderer is in early development phase ans should be considered as experimental. It will only work withReact's latest version (`~18.0.2`, using Fiber).

It's inspired by [blessed](https://github.com/chjj/blessed)/[neo-blessed](https://github.com/embarklabs/neo-blessed) and [react-blessed](https://github.com/Yomguithereal/react-blessed) but a complete own, new implementation using typescript. It does not use the blessed or neo-blessed library at all.

## Summary
* [Installation](#installation)
* [Demo](#demo)
* [Usage](#usage)

## Installation
You can install `react-tui` through npm:
```bash
npm install @afegmdg/react-tui
```

## Demo
For a quick demo of what you could achieve you can clone this repository and check the example:
```bash
git clone https://github.com/AFE-GmdG/react-tui.git
cd react-tui
npm install

npm run builddemo
npm run demo
```

## Usage
Currently you cannot use this version, since it's incomplete.

## Next steps
- [x] Figure out, how to bundle the library the correct way, so it can be used with other projects.
- [ ] Complete the reconciler implementation
  - [ ] no more `debugger` / `throw new Error("Method not implemented.")`
- [ ] Basic layout calculations
- [ ] Colored output
- [ ] Implement basic components
  - [ ] Text
  - [ ] Box
  - [ ] Button
  - [ ] Input
