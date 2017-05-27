import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {DialogDemoComponent} from './demo/dialog.demo';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: 'dialog',
      component: DialogDemoComponent 
    }])
  ],
  declarations: [
    AppComponent,
    DialogDemoComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
