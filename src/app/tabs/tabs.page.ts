import { Component, OnInit } from '@angular/core';
import { SobrePage } from '../sobre/sobre.page';
import { HomePage } from '../home/home.page';
import { MenuPage } from '../menu/menu.page';
import { ViewChild } from '@angular/core';
import { MenuController, IonSlides, NavController } from '@ionic/angular';
import { StartPage } from '../start/start.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})


export class TabsPage implements OnInit {
  
  @ViewChild('slider') slides: IonSlides;
  

  pageSobre: any = SobrePage;
  homePage: any = HomePage;
  menuPage: any = MenuPage;
  startPage: any = StartPage;

  slideOpts = {
    effect: 'flip'
  };
  
 

  pages: any = [ 
    {path: this.startPage, name:"Start", index: 0},
    {path: this.homePage, name:"Home", index: 1},
    {path: this.menuPage, name:"Menu", index: 2},
    {path: this.pageSobre, name:"Sobre", index: 3},
    
  ];

  atualPage: any = this.pages[0];
  
  constructor(private menu: MenuController, private navCtrl: NavController) { 
    

  }
  openCart(){
    this.navCtrl.navigateForward('cart');
  }
  openMenu(){
    this.menu.open('first');
  }
  slideChanged(event: any){
    var self = this;
    self.slides.getActiveIndex().then(rep=>{
      //console.log("index", rep)
      self.atualPage = self.pages[rep];
    });
  }
  slideTo(index: any){
    console.log("tes");
    var self = this;
    self.slides.slideTo(index);
  }
  ngOnInit() {
  }

}
