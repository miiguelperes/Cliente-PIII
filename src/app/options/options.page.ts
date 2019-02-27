import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController  } from '@ionic/angular';
import { ViewController } from '@ionic/core';


@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  
  viewCtrl: any = ViewController;
  
  constructor(
    navParams: NavParams, 
    navCtrl: NavController, 
    private modalCtrl:ModalController
    ) {
      
     }

  ngOnInit() {
  }
  close(){
    this.modalCtrl.dismiss();
  }
}
