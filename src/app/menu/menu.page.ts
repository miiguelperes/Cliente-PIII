import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @Input() value: any;

  problem: any;

  constructor(navParams: NavParams) {
  
  }


  ngOnInit() {
    this.load();
  }

  load(){
    this.problem = this.value;
    console.log(this.value);
  }

}
