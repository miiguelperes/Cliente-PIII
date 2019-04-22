import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @Input() value: any;

  problem: any;

  constructor(
    public http: HttpClient,
    navParams: NavParams
    ) {
  
  }


  ngOnInit() {
    this.load();
  }

  load(){
    var self = this;
    var marker = self.value;
    if(marker){
       self.getProblem(marker.id);
    }
  }
  getProblem(identify){
    this.http.post(SERVER_URL + 'problema', {id: identify}).subscribe((r:any) =>{
      this.problem = r.data;
    })
  }

}
