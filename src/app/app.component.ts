import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AuthPage } from '../pages/auth/auth';
import * as FirebaseConfig from '../config/firebase.config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  authPage: any = AuthPage;
  tabsPage: any = TabsPage;
  settingsPage: any = SettingsPage;

  isAuth: boolean = false;

  @ViewChild('content') content: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(FirebaseConfig.FIREBASE_CONFIG);
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.content.setRoot(TabsPage);
        } else {
          this.isAuth = false;
          this.content.setRoot(AuthPage, { mode: 'connect' });
        }
      }
    );
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }

  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }
}