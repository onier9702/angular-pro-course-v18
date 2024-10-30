# I18nApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

# Installations

1. Package to handle cookies

```
npm i ngx-cookie-service-ssr
```

2. Translate

```
npm i @ngx-translate/core
```

```
npm i @ngx-translate/http-loader
```

# Important step to use ngx cookies service ssr package

Add this two line to server.ts file:
{ provide: 'REQUEST', useValue: req },
{ provide: 'RESPONSE', useValue: res },

# Cookie on server side is empty when application render the first time

Problem: The view make a jump of english to the another current language selected and stored on cookies
Solution: Pass the cookie value to server side Node using custom injection token from the Language Service and use it on server.ts file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
