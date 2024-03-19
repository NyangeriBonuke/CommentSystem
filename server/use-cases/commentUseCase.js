const Comment = require('../models/commentModel')

class CommentUseCase{
    async topLevelComment(content, authorId){
        try{
            const topComment = new Comment({content, authorId})
            const savedTopComment = await topComment.save()
            return savedTopComment;
        }
        catch(error){
            throw new Error(`Usecase error ${error}`)
        }
    }

    async replyComment(content, authorId, parentId){
        try{
            const commentReply = new Comment({content, authorId, parent: parentId})
            const savedReplyComment = await commentReply.save()

            await Comment.findOneAndUpdate(
                { _id: parentId, children: { $ne: savedReplyComment._id }},
                { $push: { children: savedReplyComment._id } },
                { new: true }
            )

            return savedReplyComment;
        }
        catch(error){
            throw new Error(`Usecase error ${error}`)
        }
    }

    async getComment(commentId = null){
        try{
            const comments = await Comment.find({parent: commentId}).populate('children')

            for(const comment of comments){
                comments.children = await this.getComments(comment._id)
            }

            return comments;
        }
        catch(error){
            throw new Error(`Usecase error ${error}`)
        }
    }

    async getTopComments(){
        try{
            const topLevelComments = await Comment.find({ parent: null }).populate('children')
            return topLevelComments
        }
        catch(error){
            throw new Error(`Usecase get all comments error ${error}`)
        }
    }

    async deleteComment(commentId){
        try{
            const comment = await Comment.findById(commentId)

            if(comment){
                for(const childId of comment.children){
                    await this.deleteComment(childId)
                }
                await Comment.findByIdAndDelete(commentId)
            }
        }
        catch(error){
            throw new Error(`Usecase delete comment ${error}`)
        }
    }
}

module.exports = new CommentUseCase