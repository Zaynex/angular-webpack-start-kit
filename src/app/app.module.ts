import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DialogDemoComponent } from './demo/dialog.demo';
import { YnDialogModule } from '../lib/dialog/dialog.module';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    YnDialogModule
  ],
  declarations: [
    AppComponent,
    DialogDemoComponent
  ],
  providers:[
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
