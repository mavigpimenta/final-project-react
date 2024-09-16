import { Post } from "../models/post";

class PostController {
    static createLog(error) {
        const timestamp = Date.now();
        const archivePath = path.resolve(__dirname, '..', `logs-${timestamp}.txt`);
        const errorString = JSON.stringify(error.message);

        fs.writeFile(archivePath, errorString, function (err, result) {
            if (err) console.log(err);
        });
    }

    static async getAll(req, res) {
        try {
            const posts = await Post.find({ removedAt: null })
                .populate('author', 'name') 
                .populate({
                    path: 'comment', 
                    match: { removedAt: null }, 
                    populate: { path: 'userId', select: 'name' } 
                }).exec();

            return res.status(200).json(posts);
        } catch (error) {
            PostController.createLog(error);
            return res.status(500).send({ message: "Failed to retrieve posts", data: error.message });
        }
    }

    static async create(req, res) {
        const { title, text } = req.body;

        if (!title || !text)
            return res.status(400).send({ message: "There is incomplete information" });

        try {
            const id = req.user.id;
            const userId = await User.findById(id);

            const post = {
                comment: [],
                userId,
                title,
                description,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            };

            await Post.create(post);
            return res.status(201).send({ message: "Created post wit sucessfully" });
        } catch (error) {
            PostController.createLog(error);
            return res.status(500).send({ error: "Something wrong", data: error.message });
        }
    }

    static async edit(req, res) {
        const { id } = req.params; 
        const { title, description } = req.body;

        if (!title || !description)
            return res.status(400).send({ message: "There is incomplete information" });

        try {
            const post = await Post.findById(id);
            if (!post) 
                return res.status(404).send({ message: "Post not found" });

            if (post.userId.id !== req.user.id) 
                return res.status(403).send({ message: "You are not authorized to edit this comment." });

            post.title = title;
            post.description = description;
            post.updatedAt = Date.now();

            await post.save();
            return res.status(200).send({ message: "Updated post with sucessfully." });
        } catch (error) {
            PostController.createLog(error);
            return res.status(500).send({ error: "Something wrong", data: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            const post = await Post.findById(id);
            if (!post) return res.status(404).send({ message: "Post not found" });

            if (req.user.role !== 'ADMIN') 
                return res.status(403).send({ message: "Forbbiden" });
            
            post.removedAt = Date.now();
            await post.save();

            return res.status(200).send({ message: "Deleted post with sucessfully" });
        } catch (error) {
            PostController.createLog(error);
            return res.status(500).send({ error: "Something wrong", data: error.message });
        }
    }
}

module.exports = PostController;
