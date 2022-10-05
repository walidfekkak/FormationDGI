import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { DomController } from 'ionic-angular';
/**
 * Generated class for the AbsoluteDragDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[absolute-drag]' // Attribute selector
})
export class AbsoluteDragDirective {

    @Input('startLeft') startLeft: any;
    @Input('startTop') startTop: any;
    constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {
    }
    ngAfterViewInit() {
    	this.renderer.setElementStyle(this.element.nativeElement, 'z-index', '99999');
        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'fixed');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');
        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });
        hammer.on('pan', (ev) => {
          this.handlePan(ev);
        });

        
    }
    handlePan(ev){
        let newLeft = ev.center.x;
        let newTop = ev.center.y;
        if(newLeft > window.innerWidth - 80) return
        if(newTop > window.innerHeight - 40) return
        if(newLeft <  0) return
        if(newTop <  0) return
        this.domCtrl.write(() => {
            this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
            this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
        });
    }

}
