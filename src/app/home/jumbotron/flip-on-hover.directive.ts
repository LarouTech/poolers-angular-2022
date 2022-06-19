import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[flipOnHover]',
})
export class FlipOnHoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') onMouseOver() {
    this.renderer.addClass(this.el.nativeElement, 'jumbotron__scroller--hover');
    this.renderer;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(
      this.el.nativeElement,
      'jumbotron__scroller--hover'
    );
  }
}
