const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/commentController')

router.post('/comment', CommentController.topComment)
router.post('/comment-reply', CommentController.commentReply)
router.get('/get-comments', CommentController.getReplyComment)
router.get('/gettopcomments', CommentController.getTopLevelComments)
router.delete('/deletecomment', CommentController.commentDelete)
router.put('/editcomment', CommentController.commentEdit)

module.exports = router