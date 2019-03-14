import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import { TaskList } from '../models/TaskList';

export class TaskListsService {
    taskLists$ = new Subject<TaskList[]>();
    taskLists: TaskList[] = [];

    emitTaskLists() {
        this.taskLists$.next(this.taskLists);
    }

    saveTaskLists() {
        return new Promise((resolve, reject) => {
            const uid = firebase.auth().currentUser.uid;
            this.taskLists.map((taskList) => {
                var count = 0;
                if (taskList.tasks) {
                    taskList.tasks.map((task) => {
                        if (!task.isDone) count++;
                    })
                }
                taskList.toDoCount = count;
            })
            firebase.database().ref('taskLists/' + uid).set(this.taskLists).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    retrieveTaskLists() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser !== null) {
                const uid = firebase.auth().currentUser.uid;
                firebase.database().ref('taskLists/' + uid).once('value').then(
                    (data) => {
                        if (data.val() !== null) {
                            this.taskLists = data.val();
                        } else {
                            this.taskLists = [];
                        }
                        this.emitTaskLists();
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

    addTaskList(name: string) {
        this.taskLists.push(new TaskList(name));
        this.emitTaskLists();
        this.saveTaskLists();
    }

    deleteTaskList(taskList: TaskList) {
        const indexToRemove = this.taskLists.indexOf(taskList);
        this.taskLists.splice(indexToRemove, 1);
        this.emitTaskLists();
        this.saveTaskLists();
    }
}