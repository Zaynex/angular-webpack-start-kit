import { Component, ElementRef } from '@angular/core';

import '../assets/css/styles.css';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
        <h1>Reactive Forms</h1>
        <hero-detail></hero-detail>
    </div>
  `
})
export class AppComponent {}
