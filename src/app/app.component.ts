// Angular
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<navi-bar></navi-bar>
            <router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'app';
}
