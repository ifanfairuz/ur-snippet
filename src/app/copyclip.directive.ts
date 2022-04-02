import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[copy-clip]'
})
export class CopyclipDirective {

  @Input('copy-clip') copyClip = '';
  @Input('copied-label') copiedSelector: string|undefined = undefined;
  @Input('copied-style') copiedStype: string = 'block';

  constructor(private el: ElementRef<HTMLElement>) { }

  @HostListener('click') onClick() {
    navigator.clipboard.writeText(`\n${this.copyClip}\n\n`);
    this.callback();
  }

  private getCopiedLabelComp() {
    return this.copiedSelector ? document.body.querySelector<HTMLElement>(this.copiedSelector) : undefined;
  }

  callback() {
    const label = this.getCopiedLabelComp();
    if (label) {
      label.style.setProperty('display', this.copiedStype);
      setTimeout(() => {
        label.style.setProperty('display', 'none');
      }, 1000);
    }
  }

}
