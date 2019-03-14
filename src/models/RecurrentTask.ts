import { Task } from "./Task";
import uuidv4 from "uuid/v4";

export class RecurrentTask {
    task: Task;
    time: string;
    days = [
        {
            name: 'Monday',
            isSelected: false
        }, {
            name: 'Tuesday',
            isSelected: false
        }, {
            name: 'Wednesday',
            isSelected: false
        }, {
            name: 'Thursday',
            isSelected: false
        }, {
            name: 'Friday',
            isSelected: false
        }, {
            name: 'Saturday',
            isSelected: false
        }, {
            name: 'Sunday',
            isSelected: false
        },
    ];
    uuid: string;

    constructor() {
        this.uuid = uuidv4();
        this.task = new Task('');
    }
}