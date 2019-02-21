import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SobrePage } from '../sobre/sobre.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;

  pageSobre: any = SobrePage;

  slideOpts = {
    effect: 'flip'
  };

  constructor(
    public navCtrl: NavController, 
    public geolocation: Geolocation
  ){
    
    
  }
  ionViewWillEnter() {
    var self = this;
    self.loadMap();
  }

  loadMap() {
    var self = this;
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER
        },
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false

      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      self.addMarker();
    }, (err) => {
      console.log(err);
    });

  }
  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}

