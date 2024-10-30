import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ApxAsideMenuComponent } from './apx-aside-menu.component';

describe('ApxAsideMenuComponent', () => {
  let component: ApxAsideMenuComponent;
  let fixture: ComponentFixture<ApxAsideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApxAsideMenuComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApxAsideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSignOut when logout button is clicked', () => {
    spyOn(component.onSignIn, 'emit');
    fixture.componentRef.setInput('isAuthenticated', false);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-login]') as HTMLButtonElement;
    expect(button).toBeTruthy();
    // console.log(button);
    button.click();

    expect(component.onSignIn.emit).toHaveBeenCalled();
  });
  it('should call onSignOut when logout button is clicked', () => {
    spyOn(component.onSignOut, 'emit');
    fixture.componentRef.setInput('isAuthenticated', true);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-logout]') as HTMLButtonElement;
    expect(button).toBeTruthy();
    // console.log(button);
    button.click();

    expect(component.onSignOut.emit).toHaveBeenCalled();
  });
});
