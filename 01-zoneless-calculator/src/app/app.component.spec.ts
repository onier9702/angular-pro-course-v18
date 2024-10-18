import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with CSS classes', () => {
    const divElement = compiled.querySelector('div');
    expect(divElement).not.toBeNull();

    const mostHaveClasses = 'min-w-screen min-h-screen bg-gray-600 flex items-center justify-center px-5 py-5'.split(' ');
    const divClasses = divElement?.classList.value.split(' ');

    mostHaveClasses?.forEach(className => {
      expect(divClasses).toContain(className);
    });
  });

  it("should contain the title: 'Buy me a beer' link ", () => {
    const anchorElement = compiled.querySelector('a');
    expect(anchorElement).not.toBeNull();

    expect(anchorElement?.title).toBe('Buy me a beer');

  });
});
