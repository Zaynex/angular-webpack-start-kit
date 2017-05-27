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
    // 在Ynote中全屏时需要获得iframe的DOM元素，因为不能直接获得，（异步）
    // 所以可以先放大body，待元素获得完全后再通过zindex去覆盖body
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
