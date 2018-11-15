import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    jira_link: {
        type: String,
        default: 'no-link'
    },
    date: {
        type: Date,
        required: true
    },
    bonus_points: {
        type: Number,
        default: 0
    },
    managers_note: {
        type: String,
        default: ''
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
});

export default mongoose.model('Task', TaskSchema);