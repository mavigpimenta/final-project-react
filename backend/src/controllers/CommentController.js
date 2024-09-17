const { Comment } = require('../models/comment');
const { User } = require('../models/user');
const { Post } = require('../models/post');

class CommentController {
    static async create(req, res) {
        const { description } = req.body;
        const { postId } = req.query;
        
        if (!description || !postId) {
            return res.status(400).send({ message: "PostId and description are required." });
        }

        try {
            const id = req.user?.id; 
            const userId = await User.findById(id);
            console.log('User ID from token:', userId); 
            const comment = new Comment({
                postId,
                userId,
                description,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            });

            const postComment = await Post.findById(postId);
            postComment.comments.push(comment);

            await postComment.save();
            await comment.save();
            
            return res.status(201).send({ message: "Comment created successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Failed to create comment.", error: error.message });
        }
    }

    static async edit(req, res) {
        const { commentId } = req.query; 
        const { description } = req.body;

        if (!description) {
            return res.status(400).send({ message: "Description is required." });
        }

        try {
            const comment = await Comment.findById(commentId);
            if (!comment) 
                return res.status(404).send({ message: "Comment not found." });

            if (comment.userId.id !== req.user.id) 
                return res.status(403).send({ message: "You are not authorized to edit this comment." });

            comment.description = description;
            await comment.save();

            return res.status(200).send({ message: "Comment updated successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Failed to update comment.", error: error.message });
        }
    }

    static async delete(req, res) {
        const { commentId } = req.params;

        try {
            const comment = await Comment.findById(commentId);
            if (!comment) return res.status(404).send({ message: "Comment not found." });

            if (req.user.role !== 'ADMIN') {
                return res.status(403).send({ message: "You are not authorized to delete this comment." });
            }

            comment.removedAt = Date.now()
            await comment.save();
            return res.status(200).send({ message: "Comment deleted successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Failed to delete comment.", error: error.message });
        }
    }
}

module.exports = CommentController