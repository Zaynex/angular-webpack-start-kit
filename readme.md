### 注意事项
#### Cannot read property 'parentInjector' of undefined 
在该组件被render之前渲染该组件，会出现这个问题。
所以需要做一些初始化的工作。
即在
`app.componment.ts` 文件中在 constructor 里面加入
```
constructor(
        private dialog: Dialog,
        private vcr: ViewContainerRef
    ) {
        this.dialog.defaultVCRef = this.vcr;
    }
```
前面的dialog组件中
```
export class Dialog{
    defaultVCRef: ViewContainerRef;
}
```

#### @ViewChild
```
 @ViewChild('DialogInBody', {read: ViewContainerRef}) private bvRef: ViewContainerRef;
```
该指令用于获得在DOM组件中的指令的视图DOM。
在`dialog`组件中获得`widget-dialog-body` 这部分视图DOM。

### 待解决的问题
svg引入失败