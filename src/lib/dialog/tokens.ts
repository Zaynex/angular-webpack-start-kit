import {
    Type,
    ResolvedReflectiveProvider
} from '@angular/core';

import { DialogOverlay } from './overlay.component';

export interface DialogBtnHandler {
    (overlay: DialogOverlay, $event: MouseEvent): void;
}
export interface DialogBtnConfig {
    cssClass: string;
    text: string;
    onClick?: DialogBtnHandler;
    disabled?: boolean;
}

export class DialogCompileConfig {
    constructor(
        public component: Type<any>,
        public inputs?: Object,
        public bindings?: ResolvedReflectiveProvider[]) {}
}

export interface DialogOption {
    title?: string;
    hideFooter?: boolean;

    /**
     * Dialog's button
     */
    btns?: Array<DialogBtnConfig>;

    /**
     * the inputs will assignment to the component's @Input parameter
     */
    inputs?: Object;
    output?: Function;

    /**
     * the resolved provider will inject into the component
     */
    bindings?: ResolvedReflectiveProvider[];
    height?: string;
    width?: string;
    cls?: string;
    closeAction?: string;
    buttonAlign?: string;
    disableEsc?:  boolean;
    reverseBtns?: boolean;
    ok?: string;
}
