import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokemonAPIResponse } from '../interfaces/response-api-pokemon.interface';
import { OnePokemon } from '../interfaces/one-pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);

  constructor() { }

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http.get<PokemonAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 10}&limit=10`)
      .pipe(
        map(resp => {
          const simplePokemons: SimplePokemon[] = resp.results.map(pokemon => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));

          return simplePokemons;
        })
      );
  }

  public loadPokemon(pokemonId: string): Observable<OnePokemon> {
    return this.http.get<OnePokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .pipe(
        catchError(this.handleError),
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error ocurred in the client side: ', error.error);
    } else {
      console.log(`Backend returned code: ${error.status}, body: ${error.error}` );
    }

    const errorMessage = error.error ?? 'An error ocurred';

    return throwError(() => new Error(errorMessage));
  }
}
