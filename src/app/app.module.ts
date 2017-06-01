import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Dialog, DialogOverlay, DialogAlert, DialogPrompt } from './../lib/dialog';
import { Defer } from './../lib/services/promise';
import { DialogDemoComponent } from './demo/dialog.demo';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DialogOverlay,
    DialogAlert,
    DialogPrompt,
    DialogDemoComponent
  ],
  providers:[
    Dialog,
    Defer
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [
    DialogOverlay,
    DialogAlert,
    DialogPrompt
  ]
})
export class AppModule { }
