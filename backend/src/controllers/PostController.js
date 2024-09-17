const { Post } = require('../models/post');
const { User } = require('../models/user')

class PostController {
    static async getAll(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit; 
    
        try {
            const posts = await Post.find({ removedAt: null })
                .skip(skip)
                .limit(limit)
                .populate('userId', 'name')
                .populate({
                    path: 'comment',
                    match: { removedAt: null },
                    populate: { path: 'userId', select: 'name' }
                })
                .exec();
    
            const totalPosts = await Post.countDocuments({ removedAt: null }); 
    
            return res.status(200).json({
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts,
                posts
            });
        } catch (error) {
            return res.status(500).send({ message: "Failed to retrieve posts", data: error.message });
        }
    }
    
    static async getByTitle(req, res) {
        const { title } = req.query; 
    
        if (!title)
            return res.status(400).send({ message: "Title query parameter is required" });
    
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 
    
        try {
            const posts = await Post.find({ 
                title: new RegExp(title, 'i'), 
                removedAt: null
            })
            .skip(skip)
            .limit(limit)
            .populate('userId', 'name')
            .populate('comments')
            .exec();
    
            const totalPosts = await Post.countDocuments({ 
                title: new RegExp(title, 'i'), 
                removedAt: null 
            }); 
    
            return res.status(200).json({
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts,
                posts
            });
        } catch (error) {
            return res.status(500).send({ message: "Failed to search posts", data: error.message });
        }
    }
    

    static async create(req, res) {
        const { title, description } = req.body;

        if (!title || !description)
            return res.status(400).send({ message: "There is incomplete information" });

        try {
            const id = req.user?.id;
            const userId = await User.findById(id);
            console.log('User ID from token:', userId);

            const post = {
                comments: [],
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
            return res.status(500).send({ error: "Something wrong", data: error.message });
        }
    }
}

module.exports = PostController;
