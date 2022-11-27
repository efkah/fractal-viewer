# Fractal Viewer
I created this special fractal viewer to make some fractal art. 
There are currently no plans to make this any bigger.

## How to run the project
1. Install the dependencies, this is a one time setup.
```shell
npm ci
```

2. Then start the typescript compiler, along with a server.
```shell
npm start
```

You can also `npm run watch` and `npm run server` seperately.


## Roadmap

### Release 1.0.0 (Open source)
- [x] 🚧 AR: Cleanup package.json, add readme.md
- [x] 🚧 AR: Remove local development server as dependancy, (move to dev-dependancy or use nginx docker?)
- [x] 🚧 AR: Split Fractal Calc and Drawing 
- [x] 🚧 AR: Add a documentation
- [x] 🚧 AR: Check/Remove unused routines and types, like 'Pixels'
- [x] 🚀 Feature: Add a spinner/progress bar
- [x] 🚀 Feature: Make `control+s` run the code
- [x] 🚀 Feature: disable buttons while calculating
- [x] 🐛 Bug: Calculations take longer the more calculations you make (see console.log 'calc')
- [x] 🐛 Bug: Picture is shown before calculations finish


