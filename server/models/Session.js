const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
    sessionId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    sessionData: {
        type: Schema.Types.Mixed,
        default: {}
    }
});



const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
