import { Employee } from "./employee.model";
import { Config } from "./config.model";
import { Review } from "./review.model";

export interface State {
    employee: Employee;
    period: Config;
}