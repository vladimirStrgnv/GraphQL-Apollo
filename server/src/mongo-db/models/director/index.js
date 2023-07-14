const { model, Schema} = require('mongoose');

const directorSchema = new Schema({
    id: Number,
    name: String
});

module.exports = model('Director', filmSchema);