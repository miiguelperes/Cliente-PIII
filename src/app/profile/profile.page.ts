import { SERVER_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;

  constructor(
    public http: HttpClient,
    public navCrtl: NavController,
    public toastController: ToastController
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
  }

  ngOnInit() {

  }
  async updateUser() {
    var self = this;
    var body = this.user;
    new Promise(resolve => {
      this.http.post(SERVER_URL + 'update', body).subscribe(r => {
        resolve(r);
      })
    }).then(r => {
      var resp: any = r;
      if (resp.status == 1) {
        self.user = resp.user;
        localStorage.setItem('user', resp.user);
        self.presentToast(resp.message);
      }
    })


  }
  async presentToast(msg) {
    var self = this;

    let toast: any;
    toast = await self.toastController.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    });
    toast.present();

  }
  close() {
    this.navCrtl.navigateRoot('/tabs');
  }

}
