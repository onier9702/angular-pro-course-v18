import { Component, inject, OnInit, signal } from '@angular/core';
import { OnePokemon } from '../../interfaces/one-pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-one-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './one-pokemon.component.html',
})
export default class OnePokemonComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<OnePokemon|null>(null);

  ngOnInit(): void {
    const pokemonId: string = this.route.snapshot.paramMap.get('id') ?? '1';
    this.loadPokemon(+pokemonId);
  }

  loadPokemon(pokemonId: number): void {
    this.pokemonService.loadPokemon(pokemonId)
    .pipe(
      tap(pokemon => {
        const pageTitle = `#${pokemon.id}-${pokemon.name}`;
        this.title.setTitle(pageTitle);
        this.meta.updateTag({ name: 'description', content: `Pokemon page ${pokemon.id}` });
        this.meta.updateTag({ name: 'og:title', content: pageTitle });
        this.meta.updateTag({ name: 'og:description', content: `Pokemon page ${pokemon.id}` });
        this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png` });
      })
    )
    .subscribe(pokemon => {
      if (pokemon && pokemon.id) {
        this.pokemon.set(pokemon);
      }
    });
  }

}
