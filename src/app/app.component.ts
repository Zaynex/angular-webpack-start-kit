import { Component, ElementRef, ViewContainerRef } from '@angular/core';
import { Dialog } from '../lib/dialog/index';
import '../assets/css/styles.css';
// import {DialogDemoComponent} from './demo/dialog.demo';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        private _element: ElementRef,
        private dialog: Dialog,
        private vcr: ViewContainerRef
    ) {
        this.dialog.defaultVCRef = this.vcr;
    }

    public toggleFullScreen() {
        // 在Ynote中全屏时需要获得iframe的DOM元素，因为不能直接获得，（异步）
        // 所以可以先放大body，待元素获得完全后再通过zindex去覆盖body
        let elem = this._element.nativeElement.querySelector('main');

        if (elem.requestFullScreen) {
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

    public showDialog() {
        // this.dialog.open({
        //     width: 'auto',
        //     height: 'auto'
        // }, DialogDemoComponent).then(() => {
        //     console.log('test')
        // });
        this.dialog.alert('打开文件', '文件不存在')
    }
 }