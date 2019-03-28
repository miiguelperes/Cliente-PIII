import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SobrePageModule } from './sobre/sobre.module';
import { HomePageModule } from './home/home.module';
import { MenuPageModule } from './menu/menu.module';
import { TabsPageModule } from './tabs/tabs.module';
import { CartPageModule } from './cart/cart.module';
import { StartPageModule } from './start/start.module';
import { OptionsPageModule } from './options/options.module';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Camera } from '@ionic-native/camera/ngx';


@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  
  entryComponents: [
    
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SobrePageModule,
    HomePageModule,
    MenuPageModule,
    TabsPageModule,
    CartPageModule,
    StartPageModule,
    OptionsPageModule,
    HttpClientModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  
}
