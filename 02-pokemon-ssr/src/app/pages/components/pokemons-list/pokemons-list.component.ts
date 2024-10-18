import { Component, input } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { SimplePokemon } from '../../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemons-list',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './pokemons-list.component.html',
})
export class PokemonsListComponent {

  public pokemons = input.required<SimplePokemon[]>();

}
