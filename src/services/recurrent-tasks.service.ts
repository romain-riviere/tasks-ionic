import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import { RecurrentTask } from '../models/RecurrentTask';

export class RecurrentTasksService {
    recurrentTaskList$ = new Subject<RecurrentTask[]>();

    recurrentTaskList: RecurrentTask[];

    emitRecurrentTaskLists() {
        this.recurrentTaskList$.next(this.recurrentTaskList);
    }

    saveRecurrentTaskLists() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('recurrentTaskList').set(this.recurrentTaskList).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    retrieveRecurrentTaskLists() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('recurrentTaskList').once('value').then(
                (data) => {
                    this.recurrentTaskList = data.val();
                    this.emitRecurrentTaskLists();
                    resolve('Données récupérées avec succès !');
                }, (error) => {
                    reject(error);
                }
            );
        });
    }
}