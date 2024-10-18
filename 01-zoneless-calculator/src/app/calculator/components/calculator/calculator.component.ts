import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';

import { CalculatorService } from '@/calculator/services/calculator.service';

import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent,
  ],
  templateUrl: './calculator.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // recommended way to handle HostListener
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {

  // signal to get children elements
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  private calculatorService = inject(CalculatorService);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(event: string): void {
    this.calculatorService.buildNumber(event);
  }

  // @HostListener('document:keyup', ['$event']) // do not use it, instead set it in decorator @Component
  handleKeyboardEvent(event: KeyboardEvent): void {

    const keyEquivalents: Record<string, string> = {
      Clear: 'C',
      Escape: 'C',
      Enter: '=',
      c: 'C',
      C: 'C',
      'x': '*',
      'X': '*',
      '/': '÷',
    }

    const key = event.key;
    const finalKey = keyEquivalents[key] ?? key;

    this.handleClick(finalKey);

    this.calculatorButtons().forEach(btnComponent => {
      // we have all properties and methods from calculator button child component
      btnComponent.keyboardPressedStyle(finalKey);
    });
  }

}
