import { Employee } from "./employee.model";
import { Config } from "./config.model";
import { Review } from "./review.model";
import { Task } from "./task.model";

export interface State {
    employee: Employee;
    period: Config;
    reviews: Review[];
    tasks: Task[];
    configs: Config[]
}