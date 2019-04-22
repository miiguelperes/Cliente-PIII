/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    public navCtrl: NavController,
    public http: HttpClient,
    public geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private modalCtrl: ModalController,
    private camera: Camera
  ) {

  }

  ngOnInit() {
    var self = this;
    this.getTiposProblemas();

  }

  removePic(img) {

    var self = this;

    const index: number = self.images.indexOf(img);
    if (index !== -1) {
      self.images.splice(index, 1);
    }
  }
  newPic() {
    var self = this;

    const options: CameraOptions = {
      quality: 1,
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
    //self.descricao = self.images[0];
  }
  getCurrent() {
    var self = this;
    var end: any;
    new Promise(resolve => {
      self.geolocation.getCurrentPosition().then((position) => {
        let lat = position.coords.latitude
        let long = position.coords.longitude

        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        var latlng = { lat: lat, lng: long };
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({ 'location': latlng }, (results, status) => {
          resolve(results[0].formatted_address);
        });
      })
    }).then(r => {
      self.endereco = r;
    })
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  converBase64toBlob(dataURI) {
    return new Promise(resolve => {
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else
        byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ia], { type: mimeString });
      var file = new File([blob], "filename", { type: mimeString, lastModified: Date.now() });
      resolve(file);
    })
  }

  upImages() {
    var self = this;
    return new Promise(resolve => {
      var promisses = [];
      //imagem exemplo
      //self.images = ['data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABuCAYAAADRebYyAAAAqUlEQVR42u3RMREAAAgEoDe50bWF5wAVqEk6vFFChCBECEKEIEQIQoQIEYIQIQgRghAhCBGCEIQIQYgQhAhBiBCEIEQIQoQgRAhChCAEIUIQIgQhQhAiBCEIEYIQIQgRghAhCEGIEIQIQYgQhAhBCEKEIEQIQoQgRAhCECIEIUIQIgQhQhCCECEIEYIQIQgRghAhQoQgRAhChCBECEKEIAQhQhAiBCFCuLOtdqSTYVWkfAAAAABJRU5ErkJggg=='];
      self.images.forEach(element => {
        promisses.push(

          new Promise(resolve => {
            //self.dataURItoBlob(element).then(r => {
            //var el = 
            self.converBase64toBlob(element).then((el: any) => {
              let data = new FormData();
              data.append('file', el);
              console.log(data);
              
              let headers = new HttpHeaders();
              //this is the important step. You need to set content type as null
              headers.set('Content-Type', 'multipart/form-data');
              //headers.set('Accept', "multipart/form-data");

              let params = new HttpParams();

              self.http.post(SERVER_URL + 'upload', data, { params, headers }).subscribe((re: any) => {
                //alert(r);
                console.log(re);
                console.log('1')
                resolve(re.imagem.url);
              });
            });
            //            });

          })
        );
      });
      resolve(Promise.all(promisses));
    });
  }

  adicionar() {
    var self = this;

    var user = JSON.parse(localStorage.getItem('user'));
    self.upImages().then(r => {
      var path = r;
      console.log('2')
      //console.log(r);
      var body = {
        user: user.id,
        tipo: self.tipo,
        descricao: self.descricao,
        causa: self.causa,
        endereco: self.endereco,
        img_path: path,
        nivel: self.nivel,
        previsao: 1
      };

      self.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + self.endereco + '&key=AIzaSyC0x-fKDpBgy6ldxYgHyJD_gFuGos-1CxE').subscribe((geo: any) => {
        //console.log(geo.results[0].geometry.location)
        var geol = geo.results[0].geometry.location;

        self.http.post(SERVER_URL + 'novoproblema', body).subscribe((resposta: any) => {

          var r = Object.assign({}, resposta);

          var markerBody = {
            idproblema: r.id,
            idmarker: self.tipo,
            lat: geol.lat,
            long: geol.lng,
          }

          self.http.post(SERVER_URL + 'novomarker', markerBody).subscribe(resp => {
            self.closeModal();
            console.log("resp", resp)//sucesso cadastro markers/problema
            //self.navCtrl.navigateRoot('/tabs');
          });

        })
      })
    })

    //
  }
  getTiposProblemas() {
    var self = this;
    new Promise(resolve => {
      this.http.get(SERVER_URL + 'tiposproblemas').subscribe(r => {
        resolve(r);
      })
    }).then(resp => {

      let r: any = resp;
      if (r.status == 1) {
        self.opcoes = r.data;
      }

    })
  }
  close(id) {
    this.modalCtrl.dismiss();
  }
}
