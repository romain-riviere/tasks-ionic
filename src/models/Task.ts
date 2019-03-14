
import uuidv4 from "uuid/v4";
export class Task {
    isDone: boolean;
    uuid: string;
    constructor(public name: string) {
        this.uuid = uuidv4();
        this.isDone = false;
    }
}