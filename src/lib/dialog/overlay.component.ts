import {
    Input,
    Output,
    EventEmitter,
    ViewChild,
    Component,
    ComponentRef,
    OnInit,
    ViewContainerRef,
    ReflectiveInjector,
    ComponentFactoryResolver
} from '@angular/core';
import {
    DialogCompileConfig,
    DialogBtnConfig
} from './tokens';
import { Defer } from '../services/promise';
import * as _ from 'underscore';

let stack: Array<DialogOverlay> = [];

@Component({
    selector: 'dialog-overlay',
    host: {
        '(body:keydown)': 'documentKeypress($event)'
    },
    templateUrl: './overlay.component.html'
})
export class DialogOverlay implements OnInit {
    @Input() closeAction: string;
    @Input() title: string;
    @Input() hideFooter: boolean = false;
    @Input() btns: Array<DialogBtnConfig>;
    @Input() width: string;
    @Input() height: string;
    @Input() cls: string;
    @Input() buttonAlign: string;
    @Input() cmpRef: ComponentRef<any>;
    @Input() defer: Defer;
    @Input() disableEsc: boolean;
    @Input() reverseBtns: boolean;
    @Output() overlayEvent = new EventEmitter();
    @ViewChild('DialogInBody', {read: ViewContainerRef}) private bvRef: ViewContainerRef;

    public visibility = 'hidden';

    constructor(
        private compileConfig: DialogCompileConfig,
        private vcRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) {
            this.buttonAlign = 'right';
    }

    ngOnInit() {
        const contentCmp = this.componentFactoryResolver.resolveComponentFactory(this.compileConfig.component);

        const injector = ReflectiveInjector.fromResolvedProviders(this.compileConfig.bindings || [], this.vcRef.parentInjector);
        // (componentFactory, index, injector)
        const cmpRef = this.vcRef.createComponent(contentCmp, 0, injector);

        // if (this.compileConfig.inputs) {_.extend(cmpRef.instance, this.compileConfig.inputs, {overlay: this});
        // }
        
        // 给实例(比如DialogAlert)增加 inputs对象和 overlay，这里的this表示当前类 DialogOverlay
        _.extend(cmpRef.instance, this.compileConfig.inputs, {overlay: this});

        this.bvRef.element.nativeElement.appendChild(cmpRef.location.nativeElement);
        this.show();
    }

    public resolve(value?: any, keepOverlay?: boolean): void {
        this.defer.resolve(value);
        if (!keepOverlay) {
            this.hide();
            this.cmpRef.destroy();
        }
    }

    public reject(value?: any, keepOverlay?: boolean): void {
        this.defer.reject(value);
        if (!keepOverlay) {
            this.hide();
            this.cmpRef.destroy();
        }
    }

    public dismiss(value?: any): void {
        this.hide();
        this.cmpRef.destroy();
        this.defer.resolve(value);
    }

    public close(): void {
        this.hide();
        this.cmpRef.destroy();
        if (this.closeAction) {
            if (this.closeAction === 'resolve') {
                this.resolve();
            } else if (this.closeAction === 'reject') {
                this.reject();
            }
        } else {
            this.reject();
        }
    }

    public hide(): void {
        stack.splice(stack.indexOf(this), 1);
        this.visibility = 'hidden';
    }

    public show(): void {
        stack.push(this);
        this.visibility = 'visible';
    }

    onClick(btn, $event: MouseEvent) {
        $event.stopPropagation();
        btn.onClick(this, $event);
    }

    documentKeypress(evt) {
        switch (evt.keyCode) {
            case 27:
                let self = _.last(stack);
                if (self.disableEsc) {
                    break;
                }
                if (self.cmpRef) {
                    self.close();
                }
                evt.preventDefault();
                evt.stopImmediatePropagation();
            case 13:
            default:
                return;
        }
    }
}
