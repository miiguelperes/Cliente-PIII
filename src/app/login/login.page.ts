import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment, SERVER_URL } from '../../environments/environment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:String;

  password: String;

  erro: any;

  constructor(public http: HttpClient, 
    public httpClient: HttpClient,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  login() {
    var self = this;
    
    self.erro = false;

    var body = {
      "email":self.email,
      "pass": self.password
    }
    
    new Promise((resolve) => {
      self.http.post(SERVER_URL+'login', body).subscribe(response => {
        //console.log(response)
        resolve(response)
      })
    }).then(data =>{
      console.log("data", data)
      let resp:any = data;
      if(resp.status == 0){
        if(resp.erro.indexOf("index") >= 0){
          self.erro = "Email ou senha inválidos";
        }else{
          self.erro = resp.erro;
        }
      }else if(resp.status == 1){
        localStorage.setItem('user', resp.user)
        self.navCtrl.navigateRoot('/tabs');
      }
    }).catch(e => {
      console.log("bad",e);
    })
    
  }

  cadastro(){
    alert('hsuaidhisa')
  }


}

