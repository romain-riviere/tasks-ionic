import { Component } from '@angular/core';
import { RecurrentTasksPage } from '../recurrent-tasks/recurrent-tasks';
import { TaskListsPage } from '../task-lists/task-lists';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  recurrentTasksPage = RecurrentTasksPage;
  taskListsPage = TaskListsPage;
}