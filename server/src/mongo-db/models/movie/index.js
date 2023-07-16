const { model, Schema} = require('mongoose');

const moviechema = new Schema({
    name: String,
    genre: String,
    directorId: String,
    id: String
});

module.exports = model('Movie', moviechema);