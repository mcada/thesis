import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    total_points: {
        type: Number,
        default: 0
    },
    feedback_manager: {
        type: String,
        default: ''
    },
    feedback_team_lead: {
        type: String,
        default: ''
    },
    points_from_team_lead: {
        type: Number,
        default: 0
    },
    points_from_manager: {
        type: Number,
        default: 0
    },
    total_points_from_tasks: {
        type: Number,
        default: 0
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