import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCopyclip]'
})
export class CopyclipDirective {

  @Input() appCopyclip = '';

  constructor() { }

  @HostListener('click') onClick() {
    navigator.clipboard.writeText(`\n${this.appCopyclip}\n\n`);
  }

}
