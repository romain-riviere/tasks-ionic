import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { TaskList } from '../../../models/TaskList';
import { TaskListsService } from '../../../services/task-lists.service';
import { Task } from '../../../models/Task';

/**
 * Generated class for the TaskListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  index: number;
  taskList: TaskList;
  newTaskName: string;

  constructor(
    public navParams: NavParams,
    public taskListsService: TaskListsService,
    public viewCtrl: ViewController,
  ) { }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.taskList = this.taskListsService.taskLists[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onCreateTask() {
    if (this.newTaskName && this.newTaskName !== '') {
      if (!this.taskList.tasks) this.taskList.tasks = [];
      this.taskList.tasks.push(new Task(this.newTaskName));
      this.newTaskName = '';
      this.taskListsService.saveTaskLists();
    }
  }

  onDeleteList() {
    this.taskListsService.deleteTaskList(this.taskList)
    this.dismissModal();
  }

  onDoneStateChanged = () => {
    this.taskListsService.saveTaskLists();
  }
}
