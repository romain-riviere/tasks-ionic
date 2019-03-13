import { Task } from "./Task";

export class TaskList {
    tasks: Task[];
    toDoCount: number;
    constructor(public name: string) {
        this.tasks = [];
    }
}