import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let ConfigSchema = new Schema({
    date_from: {
        type: Date
    },
    date_to: {
        type: Date
    }
});

export default mongoose.model('Config', ConfigSchema);