import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    description: {
        type: String
    },
    jira_link: {
        type: String
    },
    date: {
        type: Date
    },
    bonus_points: {
        type: Number,
        default: 0
    },
    managers_note: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
});

export default mongoose.model('Task', TaskSchema);