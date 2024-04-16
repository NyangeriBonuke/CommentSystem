const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/commentController')

router.get('/test', (req, res) => {res.send('Hello World')})

router.post('/comment', CommentController.topComment)
router.post('/comment-reply', CommentController.commentReply)
router.get('/comment', CommentController.getComment)
router.delete('/comment', CommentController.commentDelete)
router.put('/comment', CommentController.commentEdit)

module.exports = router