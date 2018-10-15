import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    date: {
        type: Date
    },
    total_points: {
        type: Number
    },
    feedback_manager: {
        type: String
    },
    feedback_team_lead: {
        type: String
    },
    points_from_team_lead: {
        type: Number,
    },
    total_points_from_tasks: {
        type: Number,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
});

export default mongoose.model('Review', ReviewSchema);