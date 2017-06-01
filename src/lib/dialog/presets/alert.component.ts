import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'dialog-alert',
    template: `<div class="alert"><span>{{content}}</span></div>`
})
export class DialogAlert {
    @Input() public content: string;

    constructor() { }
}