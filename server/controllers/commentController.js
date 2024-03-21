const CommentUseCase = require('../use-cases/commentUseCase')

class CommentController{
    async topComment(req, res){
        try{
            const {content, authorId} = req.body
            const savedComment = await CommentUseCase.topLevelComment(content, authorId)
            res.status(200).send(savedComment)
        }
        catch(error){
            res.status(500).send(`Controller comment error ${error}`)
        }
    }

    async commentReply(req, res){
        try{
            const {content, authorId, parentId} = req.body
            const savedCommentReply = await CommentUseCase.replyComment(content, authorId, parentId)
            res.status(200).send(savedCommentReply)
        }
        catch(error){
            res.status(500).send(`Controller reply comment error ${error}`)
        }
    }

    async getReplyComment(req, res){
        try{
            const { commentId } = req.body
            const comments = await CommentUseCase.getComment(commentId)
            res.status(200).send(comments)
        }
        catch(error){
            res.status(500).send(`Controller get comments error ${error}`)
        }
    }

    async getTopLevelComments(req, res){
        try{
            const topComments = await CommentUseCase.getTopComments()
            res.status(200).send(topComments)
        }
        catch(error){
            res.status(500).send(`Controller error while getting top comments ${error}`)
        }
    }

    async commentDelete(req, res){
        try{
            const { commentId } = req.body
            const deltedComment = await CommentUseCase.deleteComment(commentId)
            res.status(200).send(deltedComment)
        }
        catch(error){
            res.status(500).send(`Controller error while deleting comments ${error}`)
        }
    }

    async commentEdit(req, res){
        try{
            const {commentId, newContent} = req.body
            const editedComment = await CommentUseCase.editComment(commentId, newContent)
            res.status(200).send(editedComment)
        }
        catch(error){
            res.status(500).send(`Controller error while editing comments ${error}`)
        }
    }
}

module.exports = new CommentController