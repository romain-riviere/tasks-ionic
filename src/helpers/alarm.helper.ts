import { Injectable } from "@angular/core";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { RecurrentTask } from '../models/RecurrentTask'
import { Platform } from "ionic-angular";

@Injectable()
export class AlarmHelper {
    hasNotificationsPermission: boolean = false;

    constructor(public localNotifications: LocalNotifications, public platform: Platform) { }

    checkNotificationPermission() {
        return new Promise((resolve, reject) => {
            this.localNotifications.hasPermission().then(
                (hasPermission) => {
                    console.log('hasPermission: ' + hasPermission);
                    if (hasPermission) {
                        resolve(true);
                    } else {
                        this.localNotifications.requestPermission()
                            .then(
                                (hasPermission) => {
                                    console.log('requestPermission: ' + hasPermission);
                                    if (hasPermission) {
                                        resolve(true);
                                    } else {
                                        resolve(false);
                                    }
                                }
                            )
                            .catch(
                                (error) => {
                                    reject(error);
                                }
                            )
                    }
                }
            )
        });
    }

    addRecurrentTaskAlarm(recurrentTask: RecurrentTask) {
        const now = new Date();
        const currentDay = now.getDay();
        const chosenTime = recurrentTask.time.split(':');
        var notifications = [];

        recurrentTask.days.map((day) => {
            if (day.isSelected) {
                var notificationTime = new Date(now.getTime());
                notificationTime.setHours(Number.parseInt(chosenTime[0]));
                notificationTime.setMinutes(Number.parseInt(chosenTime[1]));
                notificationTime.setSeconds(0);
                var dayDifference = day.dayCode - currentDay
                if (dayDifference < 0 || (dayDifference == 0 && (notificationTime.getTime() - now.getTime()) < 0)) {
                    dayDifference = dayDifference + 7;
                }
                notificationTime.setTime(notificationTime.getTime() + dayDifference * 24 * 3600000);

                const notification = {
                    id: day.dayCode,
                    title: recurrentTask.task.name,
                    text: recurrentTask.time,
                    trigger: { at: notificationTime.getTime() },
                };
                notifications.push(notification);
            }
        });

        console.log(notifications);
        /*
        this.checkNotificationPermission().then(
            (hasPermission) => {
                if (hasPermission) {
                    this.localNotifications.cancelAll().then(
                        () => {
                            this.localNotifications.schedule(notifications);
                        }
                    );
                }
            }
        )
        */
    }

}