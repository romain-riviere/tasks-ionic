import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the RecurrentTasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recurrent-tasks',
  templateUrl: 'recurrent-tasks.html',
})
export class RecurrentTasksPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecurrentTasksPage');
  }


  onToggleMenu() {
    this.menuCtrl.open();
  }
}
