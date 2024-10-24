import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { catchError } from 'rxjs';

const expectedPokemonsListMock: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const pokemonMock = {
  id: '1',
  name: 'bulbasaur',
};

const mockPokeApiResponse = {
  "count": 1302,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
    "previous": null,
    "results": [
      {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/"
      },
      {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/"
      },
    ],
}

describe('PokemonService', () => {

  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // set ready the next test
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should load page of SimplePokemons', () => {
    service.loadPage(1).subscribe( pokemons => {
      expect(pokemons).toEqual(expectedPokemonsListMock);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load page 5 of SimplePokemons', () => {
    service.loadPage(5).subscribe( pokemons => {
      expect(pokemons).toEqual(expectedPokemonsListMock);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=40&limit=10`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load pokemon by ID', () => {
    const pokemonId = '1';

    service.loadPokemon(pokemonId).subscribe( (pokemon: any) => {
      expect(pokemon).toEqual(pokemonMock);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(pokemonMock);
  });

  it('should load pokemon by name', () => {
    const pokemonName = 'bulbasaur';

    service.loadPokemon(pokemonName).subscribe( (pokemon: any) => {
      expect(pokemon).toEqual(pokemonMock);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(pokemonMock);
  });

  it('should catch error and pokemon not found', () => {
    const pokemonName = 'it-does-not-exist';

    service.loadPokemon(pokemonName)
    .pipe(
      catchError(err => {
        // console.log(err);
        expect(err.message).toContain('Pokemon not found');
        return [];
      })
    )
    .subscribe();

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not found',
    });
  });

});
