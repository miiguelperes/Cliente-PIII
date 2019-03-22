import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment, SERVER_URL } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:String;

  password: String;

  erro: any;

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  login() {
    var self = this;
    var body = {
      "email":this.email,
      "pass": this.password
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
        self.erro = resp.erro;
      }
    }).catch(e => {
      console.log("bad",e);
    })
    
  }

  cadastro(){
    alert('hsuaidhisa')
  }


}

