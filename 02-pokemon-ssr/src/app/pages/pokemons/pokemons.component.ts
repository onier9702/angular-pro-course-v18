import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

import { PokemonService } from '../../services/pokemon.service';

import { PokemonsListComponent } from "../components/pokemons-list/pokemons-list.component";
import PokemonListSkeletonComponent from '../components/pokemon-list-skeleton/pokemon-list-skeleton.component';

import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemons',
  standalone: true,
  imports: [
    RouterLink,
    PokemonsListComponent,
    PokemonListSkeletonComponent,
  ],
  templateUrl: './pokemons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent {

  // public isLoading = signal(true);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // SERVICES
  private pokemonService = inject(PokemonService);

  // METADATA
  private title = inject(Title);

  // DATA
  public pokemons = signal<SimplePokemon[]>([]);

  public testNumber: number = 1;
  public test = signal<number>(this.testNumber);

  // with query params
  // public currentPage = toSignal<number>(
  //   this.route.queryParamMap.pipe(
  //     map(params => params.get('page') ?? '1'),
  //     map(page => (isNaN(+page) ? 1 : +page) ),
  //     map(page => Math.max(1, page)),
  //   )
  // );

  // with params
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page) ),
      map(page => Math.max(1, page)),
    )
  );

  // with params solution now the load of new pokemons is trigered by a effect
  // EFFECT new in Angular
  public loadOnPageParamChanges = effect(() => {
    // console.log('Page changed to: ', this.currentPage());
    this.loadPokemons(this.currentPage()!);
    console.log('Test ocurred: ', this.test());
  }, {
    allowSignalWrites: true, // to avoid this error: Writing to signals is not allowed in a `computed` or an `effect` by default. Use `allowSignalWrites` in the `CreateEffectOptions` to enable this inside effects.
  });

  // with query params solution the buttons click events triggered the load of new pokemons
  // ngOnInit(): void {
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 2000);

  //   this.loadPokemons();
  // }

  public loadPokemons(page: number): void {
    if (page < 1) return;

    this.pokemonService.loadPage(page)
    .pipe(
      // tap( // with query params solution at section 6
      //   () => this.router.navigate([], {queryParams: { page: pageToLoad }})
      // ),
      tap(() => this.title.setTitle(`Pokemons-SSR Page ${page}`)),
    )
    .subscribe(resp => {
      this.pokemons.set(resp);
    });
  }

  incrementTest(): void {
    this.test.set(this.testNumber += 1);
  }
}
