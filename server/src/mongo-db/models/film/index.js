const { model, Schema} = require('mongoose');

const filmSchema = new Schema({
    id: Number,
    name: String
});

module.exports = model('Film', filmSchema);