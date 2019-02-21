import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  slideTo(index: any){
    console.log(this.navCtrl);
  }

}
