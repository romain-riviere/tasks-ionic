import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import { RecurrentTask } from '../models/RecurrentTask';

export class RecurrentTasksService {
    recurrentTasks$ = new Subject<RecurrentTask[]>();
    recurrentTasks: RecurrentTask[] = [];

    emitRecurrentTasks() {
        this.recurrentTasks$.next(this.recurrentTasks);
    }

    saveRecurrentTasks() {
        return new Promise((resolve, reject) => {
            const uid = firebase.auth().currentUser.uid;
            firebase.database().ref('recurrentTasks/' + uid).set(this.recurrentTasks).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    retrieveRecurrentTasks() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser !== null) {
                const uid = firebase.auth().currentUser.uid;
                firebase.database().ref('recurrentTasks/' + uid).once('value').then(
                    (data) => {
                        if (data.val() !== null) {
                            this.recurrentTasks = data.val();
                        } else {
                            this.recurrentTasks = [];
                        }
                        this.emitRecurrentTasks();
                        resolve('Données récupérées avec succès !');
                    }, (error) => {
                        reject(error);
                    }
                );
            } else {
                reject('USER_UNDEFINED');
            }
        })
    }

    getRecurrentTaskByUUID(uuid: string): RecurrentTask {
        var returnTask;
        this.recurrentTasks.map((task) => {
            if (task.uuid === uuid) returnTask = task;
        });
        return returnTask;
    }

    addRecurrentTask(recurrentTask: RecurrentTask) {
        this.recurrentTasks.push(recurrentTask);
        this.emitRecurrentTasks();
        this.saveRecurrentTasks();
    }

    updateRecurrentTask(recurrentTask: RecurrentTask) {
        this.recurrentTasks.map((task) => {
            if (task.uuid === recurrentTask.uuid) return recurrentTask;
        })
        this.emitRecurrentTasks();
        this.saveRecurrentTasks();

    }

    deleteRecurrentTask(recurrentTask: RecurrentTask) {
        const indexToRemove = this.recurrentTasks.indexOf(recurrentTask);
        if (indexToRemove !== -1) {
            this.recurrentTasks.splice(indexToRemove, 1);
            this.emitRecurrentTasks();
            this.saveRecurrentTasks();
        }
    }


}