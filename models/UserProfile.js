const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const UserProfileSchema = new Schema({
user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
},
notes: [{
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: 'note'
    },
    date: {
        type: Date,
        default: Date.now
    }
}]

});
module.exports = UserProfile = mongoose.model('userprofile',UserProfileSchema);