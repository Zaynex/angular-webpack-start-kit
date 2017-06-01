import {
    Type,
    Injectable,
    ViewContainerRef,
    ComponentFactoryResolver,
    ReflectiveInjector
} from '@angular/core';
import { DialogOverlay } from './overlay.component';
import { DialogOption, DialogCompileConfig } from './tokens';
import { DialogAlert } from './presets/alert.component';
import { DialogPrompt } from './presets/prompt.component';
import { Defer, PromiseFinally } from '../services/promise';
import * as _ from 'underscore';

@Injectable()
export class Dialog {
    defaultVCRef: ViewContainerRef;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {

    }

    /**
     * open a custom component in a dialog with dialogOption
     * this open function will auto inject 'defer' to the custom component
     * so the custom component can use the 'defer' to control dialog
     * @param vcRef
     * @param dialogOption
     * @param cmp custom component
     */
    open(option: DialogOption, cmp: Type<any>): PromiseFinally {
        let defer = new Defer();

        let compileConfig = new DialogCompileConfig(cmp, option.inputs, option.bindings);

        let b = ReflectiveInjector.resolve([
            { provide: DialogCompileConfig, useValue: compileConfig }
        ]);

        const injector = ReflectiveInjector.fromResolvedProviders(b, this.defaultVCRef.parentInjector);

        const overlayFactory = this.componentFactoryResolver.resolveComponentFactory(DialogOverlay);
        let cmpRef = this.defaultVCRef.createComponent(overlayFactory, 0, injector);
        const instance = cmpRef.instance;
        // Input
        _.extend(instance, option, {
            cmpRef: cmpRef,
            defer: defer
        });
        // Output
        if (option.output) {
            instance.overlayEvent.subscribe(data => option.output(data));
        }

        document.body.appendChild(cmpRef.location.nativeElement);

        return defer.promise;
    }

    public alert(title: string, content?: string, option?: DialogOption): PromiseFinally {
        option = _.extend({}, {
            title: title,
            width: '320px',
            buttonAlign: 'right',
            closeAction: 'resolve',
            btns: [{
                cssClass: 'primary',
                text: option && option.ok || '确认',
                onClick: (overlay: DialogOverlay, $event: MouseEvent): void => {
                    overlay.resolve();
                }
            }],
            inputs: {
                content: content
            }
        }, option);
        return this.open(option, DialogAlert);
    }

    public confirm(title: string, content: string, option?: DialogOption): PromiseFinally {
        option = _.extend({}, {
            title: title,
            width: '320px',
            closeAction: 'reject',
            btns: [{
                cssClass: 'primary',
                text: '确认',
                onClick: (overlay: DialogOverlay, $event: MouseEvent): void => {
                    overlay.resolve();
                }
            }, {
                cssClass: 'cancel',
                text: '取消',
                onClick: (overlay: DialogOverlay, $event: MouseEvent): void => {
                    overlay.reject();
                }
            }],
            inputs: {
                content: content
            }
        }, option);
        if (option.reverseBtns) {
            option.btns.reverse();
        }
        return this.open(option, DialogAlert);
    }

    public prompt(title: string, message: string, maxLength?: number, option?: DialogOption): PromiseFinally {
        option = Object.assign({}, {
            title: title,
            width: '320px',
            inputs: {
                maxLength: maxLength,
                message: message
            }
        }, option);
        return this.open(option, DialogPrompt);
    }
}