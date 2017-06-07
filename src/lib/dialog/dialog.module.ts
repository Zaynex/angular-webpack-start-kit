import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogAlert, DialogOverlay, DialogPrompt, Defer, Dialog } from './';
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        DialogOverlay,
        DialogAlert,
        DialogPrompt
    ],
    entryComponents: [
        DialogOverlay,
        DialogAlert,
        DialogPrompt
    ],
    providers: [
        Dialog,
        Defer
    ]
})
export class YnDialogModule{}