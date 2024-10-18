import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  imports: [PokemonsListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent implements OnInit {

  // public isLoading = signal(true);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // SERVICES
  private pokemonService = inject(PokemonService);

  // METADATA
  private title = inject(Title);

  // DATA
  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page) ),
      map(page => Math.max(1, page)),
    )
  );


  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 2000);

    this.loadPokemons();
  }

  public loadPokemons(page = 0): void {
    if (this.currentPage() === 1 && page === -1) return;

    const pageToLoad = this.currentPage()! + page;
    this.pokemonService.loadPage(pageToLoad)
    .pipe(
      tap(
        () => this.router.navigate([], {queryParams: { 'page': pageToLoad }})
      ),
      tap(() => this.title.setTitle(`Pokemons-SSR Page ${pageToLoad}`)),
    )
    .subscribe(resp => {
      this.pokemons.set(resp);
    });
  }
}
