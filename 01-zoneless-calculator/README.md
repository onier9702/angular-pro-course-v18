# ZonelessCalculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

# Notes

1. Remove zone.js from polyfills in the angular.json to avoid this warning on console:
   `NG0914: The application is using zoneless change detection, but is still loading Zone.js. Consider removing Zone.js to get the full benefits of zoneless. In applications using the Angular CLI, Zone.js is typically included in the "polyfills" section of the angular.json file.`

2. Add this config of baseUrl and paths in the tsconfig.json
   "baseUrl": ".",
   "paths": {
   "@/_": ["src/app/_"]
   },

# Tests

1. to run the default tests
   `ng test`

2. To run the tests by angular documentation, add this line to package.json or update them
   "build": "npm run test && ng build",
   "test": "ng test --no-watch --no-progress --browsers=ChromeHeadless",
   "test:coverage": "ng test --code-coverage"

3. To see the coverage of test run `npm run test:coverage` and open the file created atin the path `coverage` and find `index.html`

# Instalations

1. Tailwind

```
npm install -D tailwindcss postcss autoprefixer
```

```
npx tailwindcss init
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
