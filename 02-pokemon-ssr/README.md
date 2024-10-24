# PokemonSsr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

# Testing

1. Add testing to build application (important when using CI/CD)
   Add this line to package.json file
   ng test --no-watch --no-progress --browsers=ChromeHeadless

# Installations

1. Install taiwind

```
npm install -D tailwindcss postcss autoprefixer
```

```
npx tailwindcss init
```

2. Set this code inside tailwind.config.ts
   content: [
   "./src/**/*.{html,ts}",
   ],

3. Set this code inside styles.css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

4. Angular SSR

```
ng add @angular/ssr
```
