import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[onHoverMyButton]',
})
export class OnHoverMyButtonDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') onMouseOver() {
    this.renderer.addClass(this.el.nativeElement, 'btn__mouseover');
    this.renderer;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'btn__mouseover');
  }
}
