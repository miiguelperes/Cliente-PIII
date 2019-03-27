import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController  } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';


@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  
  viewCtrl: any = ViewController;
  opcoes: any = false;

  constructor(
    navParams: NavParams, 
    navCtrl: NavController, 
    public http: HttpClient, 
    private modalCtrl:ModalController
    ) {
      
     }

  ngOnInit() {
    this.getTiposProblemas();
  }
  getTiposProblemas(){
    var self = this;
    new Promise(resolve=>{
      this.http.get(SERVER_URL+'tiposproblemas').subscribe(r=>{
        resolve(r);
      })
    }).then(resp => {
      
      let r: any = resp;
      if(r.status == 1){
        self.opcoes = r.data;
      }
      
    })
  }
  close(id){
    this.modalCtrl.dismiss();
  }
}
