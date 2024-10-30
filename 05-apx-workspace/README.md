# ApxWorkspace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

# Description

Monorepo for all angular applications you want to create using the same shared dependencies and others things

# Installations

1. To generate the second app in this monorepo (allow you to create another app in this monorepo workspace)
   ng generate application apx-testbed-app

# Open specific project

ng server <name-application-project>

# Login to npm

```
npm login
```

# Publish some package to npm (remember to create this command script in the package.json)

Any change in the code you want to be reflected on npm cloud you need to run this command

```
npm run apx-aside-menu:publish
```

# Commands to generate dist folder, test and linter (remember to change my-lib for the name you want)

```
ng build my-lib --configuration development
```

```
ng test my-lib
```

```
ng lint my-lib
```

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
