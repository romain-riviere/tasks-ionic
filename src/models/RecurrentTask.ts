import { Task } from "./Task";
import uuidv4 from "uuid/v4";

export class RecurrentTask {
    task: Task;
    time: string;
    days = [
        {
            name: 'Monday',
            dayCode: 1,
            isSelected: false
        }, {
            name: 'Tuesday',
            dayCode: 2,
            isSelected: false
        }, {
            name: 'Wednesday',
            dayCode: 3,
            isSelected: false
        }, {
            name: 'Thursday',
            dayCode: 4,
            isSelected: false
        }, {
            name: 'Friday',
            dayCode: 5,
            isSelected: false
        }, {
            name: 'Saturday',
            dayCode: 6,
            isSelected: false
        }, {
            name: 'Sunday',
            dayCode: 0,
            isSelected: false
        },
    ];
    uuid: string;

    constructor() {
        this.uuid = uuidv4();
        this.task = new Task('');
    }
}