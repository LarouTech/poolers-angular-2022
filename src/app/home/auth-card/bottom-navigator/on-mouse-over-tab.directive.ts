import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[onMouseOverTab]',
})
export class OnMouseOverTabDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') onMouseOver() {
    this.renderer.addClass(this.el.nativeElement, 'tab__mouseover');
    this.renderer;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'tab__mouseover');
  }
}
