import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AuthService } from '../services/auth.service';
import { AuthPage } from '../pages/auth/auth';
import { TaskListsService } from '../services/task-lists.service';
import { RecurrentTasksService } from '../services/recurrent-tasks.service';
import { TaskListsPage } from '../pages/task-lists/task-lists';
import { TaskListPage } from '../pages/task-lists/task-list/task-list';
import { RecurrentTasksPage } from '../pages/recurrent-tasks/recurrent-tasks';
import { ToastHelper } from '../helpers/toast.helper';
import { RecurrentTaskPage } from '../pages/recurrent-tasks/recurrent-task/recurrent-task';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SettingsPage,
    TaskListsPage,
    TaskListPage,
    RecurrentTasksPage,
    RecurrentTaskPage,
    AuthPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SettingsPage,
    TaskListsPage,
    TaskListPage,
    RecurrentTasksPage,
    RecurrentTaskPage,
    AuthPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TaskListsService,
    RecurrentTasksService,
    AuthService,
    ToastHelper,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
