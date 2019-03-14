import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { RecurrentTask } from '../../../models/RecurrentTask';
import { RecurrentTasksService } from '../../../services/recurrent-tasks.service';

/**
 * Generated class for the TaskListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recurrent-task',
  templateUrl: 'recurrent-task.html',
})
export class RecurrentTaskPage {
  uuid: string;
  mode: string;
  recurrentTask: RecurrentTask;

  constructor(
    public navParams: NavParams,
    public recurrentTasksService: RecurrentTasksService,
    public viewCtrl: ViewController,
  ) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'update') {
      this.uuid = this.navParams.get('uuid');
      this.recurrentTask = this.recurrentTasksService.getRecurrentTaskByUUID(this.uuid);
    } else {
      this.recurrentTask = new RecurrentTask();
    }
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onDeleteRecurrentTask() {
    this.recurrentTasksService.deleteRecurrentTask(this.recurrentTask)
    this.dismissModal();
  }

  onSaveRecurrentTask() {
    if (this.recurrentTask.task.name && this.recurrentTask.task.name !== '' && this.recurrentTask.time && this.recurrentTask.time !== '') {
      switch (this.mode) {
        case 'update':
          this.recurrentTasksService.updateRecurrentTask(this.recurrentTask);
          break;
        case 'create':
          this.recurrentTasksService.addRecurrentTask(this.recurrentTask);
          break;
      }
      this.dismissModal();
    }
  }

  onToggleDay(dayToToggle) {
    this.recurrentTask.days.map(
      (day) => {
        if (day === dayToToggle) day.isSelected = !day.isSelected;
      });
  }
}
