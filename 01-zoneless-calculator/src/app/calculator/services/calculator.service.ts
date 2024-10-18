import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public buildNumber(value: string): void {
    // validate input
    if (![...numbers, ...specialOperators, ...operators].includes(value)) {
      // console.log('Invalid input');

      return;
    }

    if (value === '=') {
      // console.log('Calculate result');
      this.calculateResult();
      return;
    }

    // clean results
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Backspace
    if (value === 'Backspace') {
      if (this.resultText() === '0') return;

      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update(v => v.slice(0, -1));

      return;
    }

    // apply operators
    if (operators.includes(value)) {
      // this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');

      return;
    }

    // limit for amount of characters
    if (this.resultText().length > 6) {
      // console.log('Max length reached');

      return;
    }

    // validate decimal point
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');

        return;
      }

      this.resultText.update(v => v + '.');

      return;
    }

    // handle zero at the beginning
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    // change signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update(v => v.slice(1));

        return;
      }

      this.resultText.update(v => '-' + v);
    }


    // Numbers
    if (numbers.includes(value)) {

      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);

        return;
      }

      this.resultText.update(v => v + value);
      return;
    }
  }

  public calculateResult(): void {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;

      default:
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }
}
