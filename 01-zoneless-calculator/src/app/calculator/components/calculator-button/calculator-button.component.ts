import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-1/4]': '!isDoubleSize()', // new use of @HostBinding
    '[class.w-2/4]': 'isDoubleSize()', // new use of @HostBinding
    // attribute: 'hello',
    // 'data-id': '2',
  },
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {

  public isCommand = input(false, {
    transform: (value: boolean|string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean|string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isPressed = signal(false);

  // OLD Versions of Angular
  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  // OLD Versions of Angular
  // @HostBinding('class.w-2/4') get doubleSize() {
  //   return this.isDoubleSize();
  // }

  handleClick() {
    if (!this.contentValue()?.nativeElement) return;

    const textBtnValue = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(textBtnValue!.trim());
  }

  keyboardPressedStyle(key: string): void {
    if (!this.contentValue()) return;

    const textValue = this.contentValue()!.nativeElement.innerText;

    if (textValue !== key) return;

    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
