import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    rhnick: {
        type: String
    },
    manager: {
        type: String
    },
    team_lead: {
        type: String
    },
    position: {
        type: String,
        enum: ['associate', 'engineer', 'senior', 'principal']
    }
});

export default mongoose.model('Employee', EmployeeSchema);