import { Task } from './task.model';
import { Review } from './review.model';


export class Employee {
    first_name: String
    last_name: String
    rhnick: String
    manager: String
    team_lead: String
    position: String
    tasks: Task[]
    reviews: Review[]
}
