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


    async findComment(){
        try{
            const comments = await Comment.find({})
            return comments;
        }
        catch(error){
            throw new Error(`Usecase error ${error}`)
        }
    }

    
    async deleteComment(commentId){
        try{
            const comment = await Comment.findById(commentId)

            if(!comment){
                throw new Error("Comment not found")
            }

            if(comment.children.length > 0){
                comment.deleted = true
                await comment.save()
                return(`Commented marked as deleted`) 
            }

            if(comment.parent){
                const parentComment = await Comment.findById(comment.parent)
                parentComment.children = parentComment.children.filter(childId => childId.toString() !== commentId)
                await parentComment.save()

                if(parentComment.deleted && parentComment.children.length === 0){
                    await parentComment.deleteOne()
                }
            }
            await comment.deleteOne()
            await Comment.updateMany({parent: comment._id}, {$set: {parent: null}})
            return(`Comment Deleted Successfully`)
        }
        catch(error){
            throw new Error(`Usecase delete comment ${error}`)
        }
    }

    async editComment(commentId, newContent){
        try{
            const existingComment = await Comment.findById(commentId)
            if(!existingComment){
                throw new Error('Comment not found')
            }

            existingComment.content = newContent
            const updatedComment = await existingComment.save()
            return updatedComment;
        }
        catch(error){
            throw new Error(`Usecase edit comment ${error}`)
        }
    }
}

module.exports = new CommentUseCase