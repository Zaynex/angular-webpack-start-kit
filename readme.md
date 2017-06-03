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

#### event.stopImmediatePropagation
> 如果某个元素有多个相同类型事件的事件监听函数,则当该类型的事件触发时,多个事件监听函数将按照顺序依次执行.如果某个监听函数执行了 event.stopImmediatePropagation()方法,则除了该事件的冒泡行为被阻止之外(event.stopPropagation方法的作用),该元素绑定的后序相同类型事件的监听函数的执行也将被阻止.

### 待解决的问题
svg引入失败