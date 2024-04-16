const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Comment', CommentSchema)