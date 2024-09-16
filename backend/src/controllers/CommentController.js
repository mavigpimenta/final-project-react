class CommentController {
    static async create(req, res) {
        const { postId, description } = req.body;
        
        if (!description || !postId) {
            return res.status(400).send({ message: "PostId and description are required." });
        }

        try {
            const id = req.user.id;
            const userId = User.findById(id);  
            const comment = new Comment({
                postId,
                userId,
                description,
            });

            await comment.save();
            return res.status(201).send({ message: "Comment created successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Failed to create comment.", error: error.message });
        }
    }

    static async edit(req, res) {
        const { commentId } = req.params; 
        const { description } = req.body;

        if (!description) {
            return res.status(400).send({ message: "Description is required." });
        }

        try {
            const comment = await Comment.findById(commentId);
            if (!comment) 
                return res.status(404).send({ message: "Comment not found." });

            if (comment.userId.toString() !== req.user.id) 
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

            await comment.remove();
            return res.status(200).send({ message: "Comment deleted successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Failed to delete comment.", error: error.message });
        }
    }
}
