import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { inject } from '@angular/core';


class MockCalculatorService {
  public resultText = jasmine.createSpy('resultTest').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('20');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public buildNumber = jasmine.createSpy('buildNumber');
}

describe('CalculatorComponent', () => {

  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

    // fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the beginning getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('120');
    mockCalculatorService.subResultText.and.returnValue('20');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(compiled.querySelector('span')?.innerText).toBe('20 *')

    expect(component.resultText()).toBe('120');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator button components', () => {
    expect(component.calculatorButtons).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator button components with projections', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
  });

  it('should handle keyboards events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
    expect( mockCalculatorService.buildNumber ).toHaveBeenCalledWith('=');

    const eventEscape = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(eventEscape);
    expect( mockCalculatorService.buildNumber ).toHaveBeenCalledWith('C');
  });

  it('should display text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('12');
    mockCalculatorService.lastOperator.and.returnValue('+');
    fixture.detectChanges();

    expect(component.resultText()).toBe('123');

    expect(compiled.querySelector('span')?.textContent).toBe('12 +');
  });

});
