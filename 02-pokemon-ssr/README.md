# PokemonSsr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

# Instalations

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
