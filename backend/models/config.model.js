import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let ConfigSchema = new Schema({
    current_employee_id: {
        type: String
    },
    date_from: {
        type: Date
    },
    date_to: {
        type: Date
    }
});

export default mongoose.model('Config', ConfigSchema);