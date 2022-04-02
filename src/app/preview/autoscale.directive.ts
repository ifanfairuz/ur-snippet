import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[previewAutoscale]'
})
export class PreviewAutoscaleDirective {

  @Input() previewAutoscale = 48;

  static countScalePreview(offset: number) {
    const initial = 540;
    const screenW = window.innerWidth;
    if (screenW < 768) {
      const dimension = screenW - offset;
      const scale = dimension / initial;
      return scale < 1 ? `scale(${scale})` : 'none';
    }
    return `none`;
  }

  constructor(private el: ElementRef) { }

  count() {
    this.el.nativeElement.style.transform = PreviewAutoscaleDirective.countScalePreview(this.previewAutoscale);
  }

  ngOnInit(): void {
    this.count();
    window.addEventListener('resize', this.count.bind(this));
  }

}
