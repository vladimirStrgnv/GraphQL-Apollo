const { model, Schema} = require('mongoose');

const directorSchema = new Schema({
    name: String,
    age: Number,
    id: String

});

module.exports = model('Director', directorSchema);