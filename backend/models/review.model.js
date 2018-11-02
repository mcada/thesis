import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
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
        ref: 'Employee',
        required: true
    },
    period: {
        type: Schema.Types.ObjectId,
        ref: 'Config',
        required: true
    }
});

export default mongoose.model('Review', ReviewSchema);