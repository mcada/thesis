import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let SettingSchema = new Schema({
    updated: {
        type: Date
    },
    token: {
        type: String
    }
});

export default mongoose.model('Setting', SettingSchema);