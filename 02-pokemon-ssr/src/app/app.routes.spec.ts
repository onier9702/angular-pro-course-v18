import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { Location } from "@angular/common";

import { routes } from "./app.routes"

describe('App routes configured ok', () => {

  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
      ],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Should navigate to "About" and redirect to "/about"', async () => {

    // console.log(routes);

    await router.navigate(['/about']);

    // console.log(location.path());

    expect(location.path()).toBe('/about');
  })
  it('Should navigate to "/pokemons/page/1" and redirect to "/pokemons/page/1"', async () => {
    await router.navigate(['/pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  })
  it('Should navigate to "/about" and redirect to "/about"', async () => {
    await router.navigate(['/unknown-page']);
    expect(location.path()).toBe('/about');
  })

  it('Should load the proper component', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    // console.log(aboutRoute);
    expect(aboutRoute).toBeDefined();

    const aboutComponent = await aboutRoute.loadComponent!() as any;

    expect(aboutComponent.default.name).toBe('AboutComponent');
  })
  it('Should load the proper component pokemon/page/:page', async () => {
    const pokemonPageRoute = routes.find((route) => route.path === 'pokemons/page/:page')!;
    // console.log(aboutRoute);
    expect(pokemonPageRoute).toBeDefined();

    const pokemonPageComponent = await pokemonPageRoute.loadComponent!() as any;

    expect(pokemonPageComponent.default.name).toBe('PokemonsComponent');
  })

})
