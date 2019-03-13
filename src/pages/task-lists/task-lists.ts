import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { TaskList } from '../../models/TaskList';
import { TaskListsService } from '../../services/task-lists.service';
import { TaskListPage } from './task-list/task-list';
import { ToastHelper } from '../../helpers/toast.helper';

/**
 * Generated class for the TaskListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-task-lists',
  templateUrl: 'task-lists.html',
})
export class TaskListsPage implements OnInit, OnDestroy {
  taskLists: TaskList[]
  taskListsSubscription: Subscription;
  taskListsLoading: boolean;
  newTaskListName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public taskListsService: TaskListsService,
    public toastHelper: ToastHelper
  ) { }

  ngOnInit() {
    this.taskListsSubscription = this.taskListsService.taskLists$.subscribe(
      (lists: TaskList[]) => {
        this.taskLists = lists
      }
    )
    this.taskListsService.emitTaskLists();
    this.onLoadTaskLists();
  }

  ngOnDestroy() {
    this.taskListsSubscription.unsubscribe();
  }

  onLoadTaskLists() {
    this.taskListsLoading = true;
    this.taskListsService.retrieveTaskLists()
      .then(() => {
        this.taskListsLoading = false;
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

  onLoadTaskList(index: number) {
    let modal = this.modalCtrl.create(TaskListPage, { index: index });
    modal.present();
  }

  onCreateTaskList() {
    if (this.newTaskListName && this.newTaskListName !== '') {
      this.taskListsService.addTaskList(this.newTaskListName);
      this.newTaskListName = '';
    }
  }
}
