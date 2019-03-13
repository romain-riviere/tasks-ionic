import { Task } from "./Task";

export class RecurrentTask {
    task: Task;

    constructor(
        public recurrenceRule: Date,
        name: string
    ) {
        this.task = new Task(name);
    }
}