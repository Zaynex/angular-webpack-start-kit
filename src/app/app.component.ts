import { Component, ElementRef } from '@angular/core';

import '../assets/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private _element: ElementRef
  ){}
  public toggleFullScreen() {
    let elem = this._element.nativeElement.querySelector('.demo-content');
    if(elem.requestFullScreen) {
        elem.requestFullScreen();
    } else if(elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    } else if(elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if(elem.msRequestFullScreen) {
        elem.msRequestFullScreen();
    } else {
        alert("your broswer doesn't support fullscreen");
    }
  }
 }
