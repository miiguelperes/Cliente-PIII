import { Component, OnInit } from '@angular/core';
import { SobrePage } from '../sobre/sobre.page';
import { HomePage } from '../home/home.page';
import { MenuPage } from '../menu/menu.page';
import { ViewChild } from '@angular/core';
import { MenuController, IonSlides, NavController } from '@ionic/angular';
import { StartPage } from '../start/start.page';
import { ModalController } from '@ionic/angular';
import { OptionsPage } from '../options/options.page';

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
  optionsPage: any = OptionsPage;

  slideOpts = {
    effect: 'flip'
  };

  pages: any = [ 
    {path: this.startPage, name:"Start", index: 0},
    {path: this.homePage, name:"Home", index: 1},
    {path: this.menuPage, name:"Menu", index: 2},
    {path: this.pageSobre, name:"Sobre", index: 3},
    
  ];


  atualPage: any;

  constructor(
    private menu: MenuController, 
    private navCtrl: NavController,
    public modalController: ModalController) { 
      var self = this;

      var user = localStorage.getItem('user');

      if(user){

      }else{
        self.navCtrl.navigateRoot('/login');
      }
      
      self.atualPage = self.pages[0];
  }

  ngAfterViewInit() {
    var self = this;
    self.atualPage = self.pages[0];
  }
  async presentModal() {
    var self = this;
    const modal = await this.modalController.create({
      component: self.optionsPage,
      componentProps: { value: 123 },
      cssClass: "modal-fullscreen"
    });
    return await modal.present();
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
      self.atualPage = self.pages[rep];
    });
  }
  slideTo(index: any){
    var self = this;
    self.slides.slideTo(index);
  }
  ngOnInit() {
    
  }

}
