const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
    note: {
        type: String,
    },

 
});

const Note = mongoose.model('note', noteSchema)
module.exports = Note