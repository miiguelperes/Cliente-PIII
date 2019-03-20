/* tslint:disable */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ModalController } from '@ionic/angular';
import { SobrePage } from '../sobre/sobre.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';
import { MenuPage } from '../menu/menu.page';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  menuPage: any = MenuPage;
  pageSobre: any = SobrePage;

  slideOpts = {
    effect: 'flip'
  };

  marker: any;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public http: HttpClient, 
    public modalController: ModalController
  ) {}

  ionViewWillEnter() {
    var self = this;
    self.loadMap();
  }
  
  ionViewDidEnter() {
    var self = this;
    setTimeout(function(){
      self.getMarkers();
    },1000) 
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
      self.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      //self.addMarker();
    }, (err) => {
      console.log(err);
    });
  }

  toggleBounce() {
    var self = this;
    if (self.marker.getAnimation() !== null) {
      self.marker.setAnimation(null);
    } else {
      self.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  placeMarker(location) {
    let marker: any;
    var self = this;

    if (marker == null) {
      marker = new google.maps.Marker({
        position: location,
        map: self.map
      });
    } else {
      marker.setPosition(location);
    }
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = '<h4>Information!</h4>';

    
  }

  async presentModal(maker) {
    var self = this;
    const modal = await this.modalController.create({
      component: self.menuPage,
      componentProps: { value: maker },
      cssClass: "modal-fullscreen"
    });
    return await modal.present();
  }

  openModal(marker) {
    console.log(marker);
      this.presentModal(marker);
   
  }  

  addInfoWindow(marker, content) {
    var self = this;
    
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
     // infoWindow.open(this.map, marker);

      self.openModal(content);
    });
  }

  getMarkers() {
    var self = this;
    self.http.get('assets/data/markers.json').subscribe(data => {
      self.addMarkersToMap(data);
    })
  }

  addMarkersToMap(markers: any) {
    var self = this;
    for (var marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let markerInfo = new google.maps.Marker({
        position: position,
        title: marker.name
      });
      markerInfo.addListener('click', function() {
        self.openModal(marker);
      });
      markerInfo.setMap(this.map);
      
     // this.addInfoWindow(markerInfo, marker);
    }
  }

}

