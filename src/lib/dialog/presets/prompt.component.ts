import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { DialogOverlay } from '../overlay.component';

@Component({
    selector: 'dialog-prompt',
    template: `
    <div class="prompt">
        <input widget-auto-focus type="text" [(ngModel)]="message" maxLength="maxLength" />
    </div>
    `
})
export class DialogPrompt implements OnInit {
    @Input() public maxLength: string;
    @Input() public overlay: DialogOverlay;
    @Input() public message: string;

    public constructor() { }

    public ngOnInit(): void {
        this.overlay.btns = [{
            text: '确定',
            cssClass: 'primary',
            onClick: (): void => {
                this.overlay.resolve(this.message);
            }
        }, {
            text: '取消',
            cssClass: 'cancel',
            onClick: (): void => {
                this.overlay.reject();
            }
        }];
    }
}