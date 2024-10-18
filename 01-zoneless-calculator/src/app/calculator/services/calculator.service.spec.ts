import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('Calculator service', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService); // injecting service
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('service should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it("service should set resultText and subResult to '0' when 'C' is pressed ", () => {

    service.resultText.set('140');
    service.subResultText.set('240');
    service.lastOperator.set('-');

    service.buildNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it("service should update resultText with number input", () => {

    service.buildNumber('1');
    expect(service.resultText()).toBe('1');

    service.buildNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it("service should handle operators correctly", () => {
    service.buildNumber('1');
    service.buildNumber('+');

    expect(service.lastOperator()).toBe('+');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  });

  it("service should calculate correctle for addition", () => {
    service.buildNumber('2');
    service.buildNumber('0');
    service.buildNumber('+');
    service.buildNumber('3');
    service.buildNumber('=');
    expect(service.resultText()).toBe('23');
  });

  it("service should calculate correctle for subtraction", () => {
    service.buildNumber('2');
    service.buildNumber('0');
    service.buildNumber('-');
    service.buildNumber('3');
    service.buildNumber('=');
    expect(service.resultText()).toBe('17');
  });

  it("service should calculate correctle for multiplication", () => {
    service.buildNumber('2');
    service.buildNumber('0');
    service.buildNumber('*');
    service.buildNumber('3');
    service.buildNumber('=');
    expect(service.resultText()).toBe('60');
  });

  it("service should calculate correctle for divition", () => {
    service.buildNumber('2');
    service.buildNumber('0');
    service.buildNumber('/');
    service.buildNumber('2');
    service.buildNumber('=');
    expect(service.resultText()).toBe('10');
  });

  it("service should handle decimal point correctly starting with zero", () => {
    service.buildNumber('1');
    service.buildNumber('.');
    service.buildNumber('.');
    service.buildNumber('.');
    service.buildNumber('5');
    expect(service.resultText()).toBe('1.5');
    service.buildNumber('.');
    expect(service.resultText()).toBe('1.5');
  });

  it("service should handle sign change correctly", () => {
    service.buildNumber('1');
    service.buildNumber('+/-');

    expect(service.resultText()).toBe('-1');
    service.buildNumber('+/-');
    expect(service.resultText()).toBe('1');
  });

  it("service should handle backspace correctly", () => {
    service.resultText.set('159');
    service.buildNumber('Backspace');

    expect(service.resultText()).toBe('15');
    service.buildNumber('Backspace');
    expect(service.resultText()).toBe('1');
    service.buildNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it("service should handle max length correctly", () => {
    for (let i = 0; i < 10; i++) {
      service.buildNumber(i.toString());

    }

    expect(service.resultText().length).toBe(7);
    service.buildNumber('1');
    expect(service.resultText().length).toBe(7);
  });

});
