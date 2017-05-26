import { Component } from '@angular/core';

import { AboutPage } from './about';
import { ContactPage } from './contact';
import { HomePage } from './home';

@Component({
  templateUrl: '../view/tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
