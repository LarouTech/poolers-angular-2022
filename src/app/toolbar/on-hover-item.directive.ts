import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[onHoverItem]',
})
export class OnHoverItemDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') onMouseOver() {
    this.renderer.addClass(this.el.nativeElement, 'toolbar__branding--hover');
    this.renderer;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(
      this.el.nativeElement,
      'toolbar__branding--hover'
    );
  }
}
