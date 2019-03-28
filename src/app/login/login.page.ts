import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../environments/environment';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nome: String;
  
  email:String;

  password: String;

  erro: any;

  registro: any = false;
  
  mensagem: any;

  constructor(public http: HttpClient, 
    public httpClient: HttpClient,
    private navCtrl: NavController,
    public toastController: ToastController
    ) { }

  ngOnInit() {
  }

  login() {
    var self = this;
    
    self.erro = false;
    self.mensagem = false;

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
          self.presentToast();
        }else{
          self.erro = resp.erro;
          self.presentToast();
        }
      }else if(resp.status == 1){
        localStorage.setItem('user', JSON.stringify(resp.user))
        self.mensagem = resp.message;
        self.presentToast().then(e=>{
          self.navCtrl.navigateRoot('/tabs');
        })
        
      }
    }).catch(e => {
      console.log("bad",e);
    })
    
  }

  async presentToast() {
    var self = this;
    
    let toast: any;
    if(self.erro){
     toast = await self.toastController.create({
        message: self.erro,
        duration: 1000,
        position: 'bottom'
      });
      toast.present();
    }
    else if (self.mensagem){
      toast = await self.toastController.create({
        message: self.mensagem,
        duration: 1000,
        position: 'bottom'
      });
      toast.present();
    }
    else{
      toast = await self.toastController.create({
        message:"teste",
        duration: 1000,
        showCloseButton: true,
        position: 'bottom'
      });
      toast.present();
    }

    

    
  }

  cadastro(){
    var self = this;
    
    self.erro = false;
    self.mensagem = false;

    var body = {
      "nome":self.nome,
      "email":self.email,
      "pass": self.password
    }
    
    new Promise((resolve) => {
      self.http.post(SERVER_URL+'register', body).subscribe(response => {
        resolve(response)
      })
    }).then(data => {
      var resp: any = data;
      if(resp.status == 0){
        if(resp.erro.indexOf("index") >= 0){
          self.erro = "Email ou senha inválidos";
          self.presentToast();
        }else{
          self.erro = resp.erro;
          self.presentToast();
        }
      }else if(resp.status == 1){
        self.mensagem = resp.message;
        self.presentToast();
        self.registro = false;
      }
    });
    
  }


}

