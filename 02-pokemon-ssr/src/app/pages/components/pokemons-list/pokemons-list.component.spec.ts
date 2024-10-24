import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonsListComponent } from './pokemons-list.component';
import { SimplePokemon } from '../../../interfaces/simple-pokemon.interface';
import { provideRouter } from '@angular/router';

const pokemonsListMock: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

describe('PokemonListComponent', () => {

  type NewType = PokemonsListComponent;

  let fixture: ComponentFixture<NewType>;
  let compiled: HTMLElement;
  let component: PokemonsListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsListComponent);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list and image correctly', () => {
    fixture.componentRef.setInput('pokemons', pokemonsListMock);
    fixture.detectChanges();
    console.log(compiled); // to watch the HTML

    expect(compiled.querySelectorAll('pokemon-card').length).toBe(pokemonsListMock.length);
  });

  it('should render "There are not pokemons" html div', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    expect(compiled.querySelector('div')?.textContent).toContain('There are not pokemons');
  });

});
