import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { RecurrentTask } from '../../models/RecurrentTask';
import { Subscription } from 'rxjs/Subscription';
import { RecurrentTasksService } from '../../services/recurrent-tasks.service';
import { ToastHelper } from '../../helpers/toast.helper';
import { RecurrentTaskPage } from './recurrent-task/recurrent-task';

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
export class RecurrentTasksPage implements OnInit, OnDestroy {
  recurrentTasks: RecurrentTask[];
  recurrentTasksSubscription: Subscription;
  recurrentTasksLoading: boolean;
  newRecurrentTaskName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public recurrentTasksService: RecurrentTasksService,
    public toastHelper: ToastHelper
  ) { }

  ngOnInit() {
    this.recurrentTasksSubscription = this.recurrentTasksService.recurrentTasks$.subscribe(
      (tasks: RecurrentTask[]) => {
        this.recurrentTasks = tasks;
      }
    )
    this.recurrentTasksService.emitRecurrentTasks();
    this.onLoadTaskLists();
  }

  ngOnDestroy() {
    this.recurrentTasksSubscription.unsubscribe();
  }

  onLoadTaskLists() {
    this.recurrentTasksLoading = true;
    this.recurrentTasksService.retrieveRecurrentTasks()
      .then(() => {
        this.recurrentTasksLoading = false;
      })
      .catch((error) => {
        if (error !== 'USER_UNDEFINED') {
          this.toastHelper.presentErrorToast(error)
        }
      });
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onLoadRecurrentTask(uuid: string) {
    let modal = this.modalCtrl.create(RecurrentTaskPage, { uuid: uuid, mode: 'update' });
    modal.present();
  }

  onCreateRecurrentTask() {
    let modal = this.modalCtrl.create(RecurrentTaskPage, { uuid: null, mode: 'create' });
    modal.present();
  }


  onDoneStateChanged = () => {
    this.recurrentTasksService.saveRecurrentTasks();
  }
}
