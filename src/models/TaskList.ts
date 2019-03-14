import { Task } from "./Task";
import uuidv4 from "uuid/v4";

export class TaskList {
    uuid: string;
    tasks: Task[];
    toDoCount: number;
    constructor(public name: string) {
        this.uuid = uuidv4();
        this.tasks = [];
    }
}