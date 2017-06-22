import { Component } from '@angular/core';

import { History } from '../history/history';
import { Request } from '../request/request';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = History;
  tab3Root = Request;

  constructor() {
  }
}
