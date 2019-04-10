/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController  } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare var google;

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})


export class OptionsPage implements OnInit {
  
  
  opcoes: any = false;
  tipo: any;
  descricao: any;
  causa: any;
  endereco: any;
  nivel: any;
  images: any = [];

  slideOpts = {
    effect: 'flip'
  };

  constructor(
    navParams: NavParams, 
    navCtrl: NavController, 
    public http: HttpClient, 
    public geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private modalCtrl:ModalController,
    private camera: Camera
    ) {
      
     }
     
  ngOnInit() {
    var self = this;
    this.getTiposProblemas();
    
  }
  newPic(){
    var self = this;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //self.descricao = imageData;
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      self.images.push(base64Image);
      
      //console.log(base64Image);
     }, (err) => {
      // Handle error
     });
  }
  getCurrent(){
    var self = this;
    var end: any;
    new Promise(resolve=>{
      self.geolocation.getCurrentPosition().then((position) => {
        let lat = position.coords.latitude
        let long = position.coords.longitude
  
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        var latlng = {lat: lat, lng: long};
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': latlng},(results, status) => {
             resolve(results[0].formatted_address);
        });
      })
    }).then(r=>{
      self.endereco = r;
    })
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  adicionar() {
    var self = this;
    var user = JSON.parse(localStorage.getItem('user'));
    var body = {
      user: user.id,
      tipo: self.tipo,
      descricao: self.descricao,
      causa: self.causa,
      endereco: self.endereco,
      img_path:"array com as imagens do problema",
      nivel: self.nivel,
      previsao: 1
    };
    console.log(body)
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + self.endereco + '&key=AIzaSyC0x-fKDpBgy6ldxYgHyJD_gFuGos-1CxE').subscribe((geo: any) => {
      console.log(geo.results[0].geometry.location)
    })
    self.http.post(SERVER_URL+'novoproblema', body).subscribe(resposta=>{
      console.log(resposta);
    })
    this.closeModal();
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
