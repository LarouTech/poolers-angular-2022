import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sideMenuItemEffect]',
})
export class OnOverMenuItemDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') onMouseOver() {
    this.renderer.addClass(this.el.nativeElement, 'menu__item--hover');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'menu__item--hover');
  }

  // @HostListener('click') onClick() {
  //   this.renderer.addClass(this.el.nativeElement, 'menu__item--selected');
  // }
}
