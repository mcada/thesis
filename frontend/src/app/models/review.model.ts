import { Employee } from "./employee.model";

export class Review {
    _id: String
    total_points: number
    feedback_manager: String
    feedback_team_lead: String
    points_from_team_lead: number
    points_from_manager: number
    total_points_from_tasks: number
    owner: Employee
    period: String
}
